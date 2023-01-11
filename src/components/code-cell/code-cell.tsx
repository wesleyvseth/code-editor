import { useState } from 'react';

import CodeEditor from '../code-editor/code-editor';
import Preview from "../preview/preview";
import bundle from '../../bundler';
import Resizable from "../resizable/rezisable";

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const executeCode = async () => {
        const builtCode = await bundle(input);

        setCode(
            builtCode
        );
    };

    return (
        <Resizable direction={'vertical'}>
            <div style={{height: '100%', display:'flex' }}>

                <Resizable direction={'horizontal'}>
                    <CodeEditor
                        initialValue="const a = 1;"
                        onChange={(value) => setInput(value)}>
                    </CodeEditor>
                </Resizable>

                <Preview code={code}>
                </Preview>
            </div>
        </Resizable>
    );
}

export default CodeCell;
