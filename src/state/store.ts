import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import {useActions} from "../hooks/useActions";
import {useDispatch} from "react-redux";
import {ActionType} from "./action-types";

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk),
)

store.dispatch(
    {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id: null,
            type: 'code',
        }
    }
)

store.dispatch(
    {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id: null,
            type: 'text',
        }
    }
)
