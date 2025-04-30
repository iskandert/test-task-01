import { ITree } from '../models/models';
import { TreeNode } from './TreeNode';

/**
 * Класс, реализующий дерево
 */
export class Tree implements ITree {
  private _children: TreeNode[] = [];

  constructor() {}

  get children(): ReadonlyArray<TreeNode> {
    return this._children;
  }

  addChild(value: string): TreeNode {
    const node = new TreeNode(value, this);
    this._children.push(node);
    return node;
  }
}