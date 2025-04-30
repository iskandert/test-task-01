/**
 * Интерфейсы для работы с деревьями
 */

export interface ITreeNode {
  value: string;
  readonly children: ReadonlyArray<ITreeNode>;
  readonly parent: ITree | ITreeNode;
}

export interface ITree {
  readonly children: ReadonlyArray<ITreeNode>;
}

export interface ParseError {
  position: number;
  message: string;
  code: string;
}

export const ParserState = {
  INITIAL: 'INITIAL',
  READING_NODE: 'READING_NODE',
  OPENING_BRACKET: 'OPENING_BRACKET',
  CLOSING_BRACKET: 'CLOSING_BRACKET'
} as const;

export type ParserStateType = typeof ParserState[keyof typeof ParserState];

export const MAX_NESTING_LEVEL = 100; 