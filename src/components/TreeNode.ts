import { ITree, ITreeNode } from '../models/models';

/**
 * Класс, реализующий узел дерева
 */
export class TreeNode implements ITreeNode {
  private _value: string;
  private _children: TreeNode[] = [];
  private _parent: ITree | ITreeNode;

  constructor(value: string, parent: ITree | ITreeNode) {
    this._value = value;
    this._parent = parent;
  }

  get value(): string {
    return this._value;
  }

  get children(): ReadonlyArray<TreeNode> {
    return this._children;
  }

  get parent(): ITree | ITreeNode {
    return this._parent;
  }

  /**
   * Устанавливает новое значение узла
   * @param value - новое значение
   */
  setValue(value: string): void {
    this._value = value;
  }

  addChild(value: string): TreeNode {
    const node = new TreeNode(value, this);
    this._children.push(node);
    return node;
  }
} 