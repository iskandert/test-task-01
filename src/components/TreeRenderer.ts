import { ITree, ITreeNode } from '../models/models';

/**
 * Класс для отрисовки дерева
 */
export class TreeRenderer {
  private readonly branch: string = "---+";

  /**
   * Создает текстовое представление дерева
   * @param tree - Дерево для отображения
   * @returns Текстовое представление дерева
   */
  public render(tree: ITree): string {
    // Результирующий массив строк
    const lines: string[] = [];

    // Если дерево пустое, возвращаем пустую строку
    if (tree.children.length === 0) {
      return "";
    }

    // Используем рекурсивный алгоритм для большей понятности
    this.renderNodes(tree.children, "", lines, true);

    return lines.join("\n");
  }

  /**
   * Рекурсивно отрисовывает узлы дерева
   * @param nodes - массив узлов для отрисовки
   * @param indent - текущий отступ
   * @param result - результирующий массив строк
   * @param isRoot - является ли уровень корневым
   */
  private renderNodes(
    nodes: ReadonlyArray<ITreeNode>,
    indent: string,
    result: string[],
    isRoot: boolean
  ): void {
    const count = nodes.length;

    for (let i = 0; i < count; i++) {
      const node = nodes[i];
      const isLastChild = i === count - 1;

      // Добавляем текущий узел
      const nodeText = indent + node.value + (node.children.length > 0 ? this.branch : "");
      result.push(nodeText);

      // Если узел имеет детей, рекурсивно их обрабатываем
      if (node.children.length > 0) {
        // Вычисляем отступ для следующего уровня
        const nextIndent = this.calculateNextIndent(indent, node.value, isLastChild, isRoot);

        // Рекурсивно отрисовываем детей
        this.renderNodes(node.children, nextIndent, result, false);
      }
    }
  }

  /**
   * Вычисляет отступ для следующего уровня
   * @param currentIndent - текущий отступ
   * @param nodeValue - значение узла
   * @param isLastChild - является ли узел последним на уровне
   * @param isRoot - является ли уровень корневым
   * @returns отступ для следующего уровня
   */
  private calculateNextIndent(
    currentIndent: string,
    nodeValue: string,
    isLastChild: boolean,
    isRoot: boolean
  ): string {
    // Основной отступ - пробелы по длине значения и ветки
    const baseIndent = " ".repeat(nodeValue.length + this.branch.length - 1);

    // Если узел последний на уровне, не добавляем вертикальную линию
    // Иначе добавляем вертикальную линию в начале отступа
    let nextIndent = currentIndent;

    if (isLastChild) {
      nextIndent += baseIndent;
    } else {
      // Добавляем вертикальную линию и пробелы
      nextIndent += "|" + " ".repeat(baseIndent.length - 1);
    }

    return nextIndent;
  }
}