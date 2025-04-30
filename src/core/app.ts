import { TreeParser } from '../components/TreeParser';
import { TreeRenderer } from '../components/TreeRenderer';
import { TreeStore } from '../components/TreeStore';

/**
 * Главный класс приложения
 */
export class TreeRenderApp {
  private treeInput: HTMLTextAreaElement;
  private renderButton: HTMLButtonElement;
  private treeOutput: HTMLPreElement;

  private treeParser: TreeParser;
  private treeRenderer: TreeRenderer;
  private treeStore: TreeStore;

  constructor() {
    this.treeInput = document.getElementById("tree-input") as HTMLTextAreaElement;
    this.renderButton = document.getElementById("render-button") as HTMLButtonElement;
    this.treeOutput = document.getElementById("tree-output") as HTMLPreElement;

    this.treeParser = new TreeParser();
    this.treeRenderer = new TreeRenderer();
    this.treeStore = new TreeStore();

    // Подписываемся на изменения в хранилище
    this.treeStore.subscribe(tree => {
      const renderedTree = this.treeRenderer.render(tree);
      this.treeOutput.textContent = renderedTree;
    });

    // Инициализируем обработчики событий
    this.initEventHandlers();

    // Обрабатываем рендеринг при загрузке страницы
    this.handleRender();
  }

  /**
   * Инициализирует обработчики событий
   */
  private initEventHandlers(): void {
    this.renderButton.addEventListener("click", this.handleRender.bind(this));
  }

  /**
   * Обрабатывает нажатие на кнопку рендеринга
   */
  private handleRender(): void {
    const input = this.treeInput.value.trim();
    try {
      const tree = this.treeParser.parse(input);
      console.log(tree);
      this.treeStore.setTree(tree);
    } catch (error) {
      if (error instanceof Error) {
        this.treeOutput.textContent = error.message;
      } else {
        this.treeOutput.textContent = "Произошла неизвестная ошибка";
      }
    }
  }
}

// Инициализация приложения при загрузке DOM
document.addEventListener("DOMContentLoaded", () => {
  new TreeRenderApp();
});