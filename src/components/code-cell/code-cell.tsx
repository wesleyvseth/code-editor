import {useEffect, useState} from 'react';

import CodeEditor from '../code-editor/code-editor';
import Preview from "../preview/preview";
import bundle from '../../bundler';
import Resizable from "../resizable/rezisable";
import {Cell} from "../../state";
import {useActions} from "../../hooks/useActions";

interface CodeCellProps {
    cell: Cell,
    children?: React.ReactNode
}

const CodeCell: React.FC<CodeCellProps> = (
    { cell }
) => {
    const [code, setCode] = useState('');
    const [bundleErr, setBundleErr] = useState('');

    const { updateCell } = useActions();

    useEffect(
        () => {
            const timer = setTimeout(
                async () => {
                    const output = await bundle(cell.content);

                    setCode(
                        output.code
                    );

                    setBundleErr(
                        output.bundleErr,
                    );
                },
                1000
            );

            return () => {
                clearTimeout(timer);
            }
        },
        [cell.content]
    );

    return (
        <Resizable direction={'vertical'}>
            <div style={{height: '100%', display:'flex' }}>

                <Resizable direction={'horizontal'}>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}>
                    </CodeEditor>
                </Resizable>

                <Preview bundleErr={bundleErr} code={code}>
                </Preview>
            </div>
        </Resizable>
    );
}

export default CodeCell;
