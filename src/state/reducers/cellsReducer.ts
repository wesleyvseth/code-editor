import {ActionType} from "../action-types";
import {Action} from "../actions";
import {Cell} from "../cell";
import produce from "immer";

interface CellsState {
    loading: boolean,
    error: string | null,
    order: string[],
    data: {
        [key: string]: Cell,
    }
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

//Wrapping the reducer with produce makes use of the Immer NPM package which simplifies updating states. Instead of return the complete same object with 1 modification
// we can simply change the object we actually updated and Immer will make sure to return a proper Redux friendly object.
const reducer = produce(
    (
        state: CellsState = initialState,
        action: Action,
    ) => {

        switch (action.type) {
            case ActionType.UPDATE_CELL:
                // The id and content of the to be updated cell
                const {id, content} = action.payload;


                state.data[id].content = content;

                return;

            case ActionType.DELETE_CELL:
                delete state.data[action.payload];

                state.order = state.order.filter(
                    id => id !== action.payload
                );

                return;

            case ActionType.MOVE_CELL:
                const {direction} = action.payload;

                const index = state.order.findIndex(
                    (id) => id === action.payload.id
                );
                const targetIndex = direction === 'up' ? index - 1: index + 1;

                if (targetIndex < 0 || targetIndex > state.order.length -1){
                    return;
                }

                state.order[index] = state.order[targetIndex];
                state.order[targetIndex] = action.payload.id;

                return;

            case ActionType.INSERT_CELL_BEFORE:
                const cell: Cell = {
                    type: action.payload.type,
                    content: '',
                    id: '';
                }

                return;

            default:
                return state;
        }
    }
)

const randomId = () => {
    Math.random().toString(36).substr(
        2,5
    );
}

export default reducer;