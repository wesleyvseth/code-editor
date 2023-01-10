import { useState } from 'react';

import CodeEditor from './code-editor';
import Preview from "./preview";
import bundle from '../bundler';

const CodeCell = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const builtCode = await bundle(input);

        setCode(
            builtCode
        );
    };

    return (
        <div>
            <CodeEditor
                initialValue="const a = 1;"
                onChange={(value) => setInput(value)}>
            </CodeEditor>

            <div>
                <button onClick={onClick}> Submit </button>
            </div>

            <Preview code={code}>
            </Preview>
        </div>
    );
}

export default CodeCell;
