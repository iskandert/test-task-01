import { ITree, ITreeNode, MAX_NESTING_LEVEL, ParseError, ParserState, ParserStateType } from '../models/models';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode';

/**
 * Класс для парсинга текстового представления дерева
 */
export class TreeParser {
  /**
   * Создает и выбрасывает объект ошибки парсинга
   * @param position - позиция в исходном тексте
   * @param message - сообщение об ошибке
   */
  private throwError(position: number, message: string): never {
    const error: ParseError = {
      position,
      message,
      code: 'PARSE_ERROR'
    };
    throw new Error(`Ошибка в позиции ${error.position}: ${error.message}`);
  }

  /**
   * Парсит текстовое представление дерева
   * @param input - Строка с определением дерева
   * @returns Объектное представление дерева
   */
  public parse(input: string): ITree {
    const tree = new Tree();
    if (!input.trim()) {
      return tree;
    }

    // Проверяем корректность входной строки
    this.validateInput(input);

    let charPosition = 0;
    let nestingLevel = 0;
    let currentParent: ITree | ITreeNode = tree;
    let parserState: ParserStateType = ParserState.INITIAL;

    const processChar = (char: string): void => {
      switch (char) {
        case '(':
          if (parserState === ParserState.OPENING_BRACKET) {
            this.throwError(charPosition, "Ожидалось значение узла");
          }

          if (nestingLevel > 0) {
            currentParent = (currentParent as ITreeNode).children[(currentParent as ITreeNode).children.length - 1];
          } else if (charPosition && !nestingLevel) {
            this.throwError(charPosition, "Поддерживается только одна корневая скобочная группа");
          }

          nestingLevel++;
          if (nestingLevel > MAX_NESTING_LEVEL) {
            this.throwError(charPosition, `Превышена максимальная глубина вложенности (${MAX_NESTING_LEVEL})`);
          }

          parserState = ParserState.OPENING_BRACKET;
          break;

        case ')':
          if (parserState === ParserState.OPENING_BRACKET) {
            this.throwError(charPosition, "Пустая скобочная группа");
          }

          if (nestingLevel > 0) {
            currentParent = (currentParent as ITreeNode).parent;
            nestingLevel--;
          } else {
            this.throwError(charPosition, "Лишняя закрывающая скобка: )");
          }

          parserState = ParserState.CLOSING_BRACKET;
          break;

        case ' ':
          if (parserState === ParserState.OPENING_BRACKET) {
            this.throwError(charPosition, "Ожидалось значение узла");
          }

          if (parserState === ParserState.READING_NODE) {
            parserState = ParserState.INITIAL;
          }
          break;

        default:
          if (parserState === ParserState.INITIAL ||
              parserState === ParserState.OPENING_BRACKET ||
              parserState === ParserState.CLOSING_BRACKET) {
            createNode(currentParent);
            parserState = ParserState.READING_NODE;
          }

          if (parserState === ParserState.READING_NODE) {
            updateNodeValue(currentParent, char);
          }
          break;
      }
    };

    const createNode = (parent: ITree | ITreeNode): void => {
      if (parent instanceof Tree) {
        (parent as Tree).addChild('');
      } else {
        (parent as TreeNode).addChild('');
      }
    };

    const updateNodeValue = (parent: ITree | ITreeNode, char: string): void => {
      // Получаем последний узел
      const lastIndex = parent.children.length - 1;
      const lastChild = parent.children[lastIndex] as TreeNode;
      const newValue = lastChild.value + char;

      // Просто обновляем значение узла вместо его пересоздания
      lastChild.setValue(newValue);
    };

    while (charPosition < input.length) {
      processChar(input[charPosition]);
      charPosition++;
    }

    if (nestingLevel !== 0) {
      this.throwError(charPosition, "Незакрытая скобочная группа");
    }

    return tree;
  }

  /**
   * Проверяет корректность входной строки
   * @param input - Строка для проверки
   */
  private validateInput(input: string): void {
    if (!input.trim()) {
      this.throwError(0, "Пустая строка ввода");
    }

    // Проверка сбалансированности скобок
    let balance = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '(') balance++;
      if (input[i] === ')') balance--;
      if (balance < 0) {
        this.throwError(i, "Несбалансированные скобки");
      }
    }

    if (balance !== 0) {
      this.throwError(input.length - 1, "Несбалансированные скобки");
    }
  }
}