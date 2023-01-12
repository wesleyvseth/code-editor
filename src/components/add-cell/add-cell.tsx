import './add-cell.css';

import {useActions} from "../../hooks/useActions";

interface AddCellProps {
    nextCellId: string | null,
    children?: React.ReactNode,
};

const AddCell: React.FC<AddCellProps> = (
    { nextCellId }
) => {
    const { insertCellAfter } = useActions();

    return (
        <div className="add-cell">
            <div className="add-buttons-wrapper">
                <button className="add-button button is-primary is-small" onClick={() => insertCellAfter(nextCellId, 'code')}> Code </button>
                <button className="add-button button is-primary is-small" onClick={() => insertCellAfter(nextCellId, 'text')}> Text </button>
            </div>

            <div className="divider"></div>
        </div>
    )
}

export default AddCell;