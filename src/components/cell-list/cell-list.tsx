import {Fragment} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import CellListItem from "../cell-list-item/cell-list-item";
import AddCell from "../add-cell/add-cell";

interface CellListProps {
    children?: React.ReactNode
};

const CellList: React.FC<CellListProps> = () => {
    const cells = useTypedSelector(
        (
            {cells: {order,data}}
        ) => order.map(
                (id) => {
                    return data[id];
                }
            )
    );

    const renderedCells = cells.map(
        cell => (
            <Fragment key={cell.id}>
                <AddCell key={cell.id} nextCellId={cell.id} />
                <CellListItem key={cell.id} cell={cell} />
            </Fragment>
        )
    )

    return <div>
        {renderedCells}
        <AddCell key="" nextCellId={null} />
    </div>
};

export default CellList;