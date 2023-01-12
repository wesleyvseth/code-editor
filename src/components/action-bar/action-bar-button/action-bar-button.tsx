import React from "react";

interface ActionBarButtonProps {
    onClick: () => {},
    icon: string,
}

const ActionBarButton: React.FC<ActionBarButtonProps> = (
    {onClick, icon}
) => {
    return (
        <button className="button is-primary is-small" onClick={onClick}>
                <span className="icon">
                    <i className={`fas ${icon}`}/>
                </span>
        </button>
    );
}

export default ActionBarButton;