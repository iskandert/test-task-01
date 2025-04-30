import { ITree } from '../models/models';

/**
 * Хранилище дерева с паттерном "Наблюдатель"
 */
export class TreeStore {
  private _tree: ITree | null = null;
  private _subscribers: Array<(tree: ITree) => void> = [];

  /**
   * Устанавливает новое дерево и уведомляет подписчиков
   */
  setTree(tree: ITree): void {
    this._tree = tree;
    this.notifySubscribers();
  }

  /**
   * Возвращает текущее дерево
   */
  getTree(): ITree | null {
    return this._tree;
  }

  /**
   * Подписывается на изменения дерева
   * @returns функция для отписки
   */
  subscribe(callback: (tree: ITree) => void): () => void {
    this._subscribers.push(callback);
    return () => {
      this._subscribers = this._subscribers.filter(cb => cb !== callback);
    };
  }

  /**
   * Уведомляет всех подписчиков об изменении
   */
  private notifySubscribers(): void {
    if (!this._tree) return;
    this._subscribers.forEach(callback => callback(this._tree!));
  }
}