import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical',
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = (
    {direction, children}
) => {
    let resizableProps: ResizableBoxProps;

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resizable-horizontal',
            height: Infinity,
            width: window.innerWidth * 0.75,
            resizeHandles: ['e'],
            minConstraints: [window.innerWidth * 0.2, Infinity],
            maxConstraints: [window.innerWidth * 0.75, Infinity]
        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, 48],
            maxConstraints: [Infinity, window.innerHeight * 0.9]
        }
    }


    return (
        <ResizableBox {...resizableProps}>

            {children}
        </ResizableBox>
    )
}

export default Resizable;