import React from "react";
import {useActions} from "../../hooks/useActions";
import ActionBarButton from "./action-bar-button/action-bar-button";

import './action-bar.css';

interface ActionBarProps {
    id: string,
    children?: React.ReactNode
}

const ActionBar: React.FC<ActionBarProps> = (
    { id }
) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <ActionBarButton onClick={() => moveCell(id, 'up')} icon="fa-arrow-up"/>

            <ActionBarButton onClick={() => moveCell(id, 'down')} icon="fa-arrow-down"/>

            <ActionBarButton onClick={() => deleteCell(id)} icon="fa-trash"/>
        </div>
    );
}

export default ActionBar;