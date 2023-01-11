import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.css';
import {useEffect, useState} from "react";

interface ResizableProps {
    direction: 'horizontal' | 'vertical',
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = (
    {direction, children}
) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(innerWidth * 0.75);

    let resizableProps: ResizableBoxProps;

    // Reset the constraints of the resizableBox
    useEffect(
        () => {
            const listener = () => {
                let timer: any;

                if (timer) {
                    clearTimeout(
                        timer
                    );
                }

                timer = setTimeout(
                    () => {
                        setInnerHeight(
                            window.innerHeight,
                        );

                        setInnerWidth(
                            window.innerWidth,
                        );
                    },
                    200
                );

                if(window.innerWidth * 0.75 < window.innerWidth) {
                    setWidth(window.innerWidth * 0.75);
                }
            };

            window.addEventListener(
                'resize',
                listener,
            );

            return () => {
                window.removeEventListener(
                    'resize',
                    listener,
                );
            }
        },
        [width]
    )

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resizable-horizontal',
            height: Infinity,
            width,
            resizeHandles: ['e'],
            minConstraints: [innerWidth * 0.2, Infinity],
            maxConstraints: [innerWidth * 0.75, Infinity],
            onResizeStop: (event, data) => {
                setWidth(
                    data.size.width,
                )
            }
        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, 48],
            maxConstraints: [Infinity, innerHeight * 0.9]
        }
    }


    return (
        <ResizableBox {...resizableProps}>

            {children}
        </ResizableBox>
    )
}

export default Resizable;