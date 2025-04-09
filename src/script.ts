/**
 * TreeRender - приложение для визуализации текстового представления дерева
 */

/**
 * Интерфейс для узла дерева
 */
interface TreeNode {
  value: string;
  children: TreeNode[];
  parent: Tree | TreeNode;
  level: number;
}

interface Tree {
  children: TreeNode[];
}

document.addEventListener("DOMContentLoaded", () => {
  const treeInput = document.getElementById(
    "tree-input"
  ) as HTMLTextAreaElement;
  const renderButton = document.getElementById(
    "render-button"
  ) as HTMLButtonElement;
  const treeOutput = document.getElementById("tree-output") as HTMLPreElement;

  const render = () => {
    const input = treeInput.value.trim();
    try {
      const tree = parseString(input);
      console.log(tree);
      const renderedTree = renderTree(tree);
      treeOutput.textContent = renderedTree;
    } catch (error) {
      if (error instanceof Error) {
        treeOutput.textContent = `Ошибка: ${error.message}`;
      } else {
        treeOutput.textContent = "Произошла неизвестная ошибка";
      }
    }
  };

  renderButton.addEventListener("click", render);

  /**
   * Парсит текстовое представление дерева
   * @param input - Строка с определением дерева
   * @returns Объектное представление дерева
   */
  function parseString(input: string): Tree {
    let charPosition = 0;
    let nestingLevel = 0;
    const result: Tree = {
      children: [],
    };
    let currentParent: Tree | TreeNode = result;

    function throwError(message: string): void {
      throw new Error(`Ошибка в позиции ${charPosition}: ${message}`);
    }

    function addChild(): void {
      currentParent.children.push({
        value: "",
        children: [],
        parent: currentParent,
        level: nestingLevel,
      });
    }

    function ensureNestingLevel(): void {
      if (input[charPosition] === "(") {
        if (input[charPosition - 1] === "(") {
          throwError("Ожидалось значение узла");
        }
        if (nestingLevel > 0) {
          currentParent =
            currentParent.children[currentParent.children.length - 1];
        } else if (charPosition && !nestingLevel) {
          throwError("Поддерживается только одна корневая скобочная группа");
        }
        nestingLevel++;
      } else if (input[charPosition] === ")") {
        if (input[charPosition - 1] === "(") {
          throwError("Пустая скобочная группа");
        }
        if (nestingLevel > 0) {
          currentParent = (currentParent as TreeNode).parent;
          nestingLevel--;
        } else {
          throwError("Лишняя закрывающая скобка: )");
        }
      }
    }

    function updateChildValue(): void {
      currentParent.children[currentParent.children.length - 1].value +=
        input[charPosition];
    }

    while (charPosition < input.length) {
      if ("()".includes(input[charPosition])) {
        ensureNestingLevel();
      } else {
        if ("( ".includes(input[charPosition - 1])) {
          if (input[charPosition] === " ") {
            throwError("Ожидалось значение узла");
          } else {
            addChild();
          }
        }
        if (" " !== input[charPosition]) {
          updateChildValue();
        }
      }
      charPosition++;
    }
    if (nestingLevel !== 0) {
      throwError("Незакрытая скобочная группа");
    }

    return result;
  }

  /**
   * Создает текстовое представление дерева
   * @param node - Дерево для отображения
   * @returns Текстовое представление дерева
   */
  function renderTree(tree: Tree): string {
    // Результирующий массив строк
    const lines: string[] = [];

    const branch = "---+";

    renderChildren(tree.children, "", lines);

    return lines.join("\n");

    // Функция для отрисовки детей узла
    function renderChildren(
      nodes: TreeNode[],
      indent: string,
      result: string[]
    ): void {
      const count = nodes.length;

      for (let i = 0; i < count; i++) {
        const node = nodes[i];
        const isLastChild = i === count - 1;

        // Добавляем текущий узел
        result.push(
          indent + node.value + (node.children.length > 0 ? branch : "")
        );

        // Если узел имеет детей, рекурсивно их обрабатываем
        if (node.children.length > 0) {
          const currentIndent = " ".repeat(
            node.value.length - 1 + branch.length
          );
          // Добавляем вертикальные линии для текущего уровня
          const nextIndent =
            indent +
            (isLastChild ? currentIndent : "|" + currentIndent.slice(1));

          // Рекурсивно отрисовываем детей
          renderChildren(node.children, nextIndent, result);
        }
      }
    }
  }

  // Отрисовываем дерево из примера при загрузке
  render();
});
