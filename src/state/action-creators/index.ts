import {ActionType} from "../action-types";
import {DeleteCellAction, InsertCellBeforeAction, MoveCellAction, MoveDirection, UpdateCellAction} from "../actions";
import {CellsTypes} from "../cell";

export const updateCell = (
    id: string,
    content: string,
): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content,
        },
    }
}

export const deleteCell = (
    id: string,
): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id,
    }
}

export const moveCell = (
    id: string,
    direction: MoveDirection
): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction,
        },
    }
}

export const insertCellBefore = (
    id: string | null,
    type: CellsTypes,
): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type,
        },
    }
}