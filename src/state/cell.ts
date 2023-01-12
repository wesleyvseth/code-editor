export type CellsTypes = 'code' | 'text';

export interface Cell {
    id: string,
    type: CellsTypes,
    content: string,
}