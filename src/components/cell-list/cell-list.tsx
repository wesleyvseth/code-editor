import {useTypedSelector} from "../../hooks/useTypedSelector";
import CellListItem from "../cell-list-item/cell-list-item";

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
            <CellListItem key={cell.id} cell={cell} />
        )
    )

    return <div>{renderedCells}</div>
};

export default CellList;