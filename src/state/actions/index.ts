import {ActionType} from "../action-types";
import {CellsTypes} from "../cell";

export type MoveDirection = 'up' | 'down';

export interface MoveCellAction {
    type: ActionType.MOVE_CELL,
    payload: {
        id: string,
        direction: MoveDirection,
    },
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL,
    payload: string,
}

export interface insertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: string | null,
        type: CellsTypes,
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL,
    payload: {
        id: string,
        content: string,
    },
}

export type Action = MoveCellAction | DeleteCellAction | insertCellAfterAction | UpdateCellAction;
