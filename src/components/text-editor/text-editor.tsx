import MDEditor from '@uiw/react-md-editor'
import {useEffect, useRef, useState} from "react";

import './text-editor.css';
import {Cell} from "../../state";
import {useActions} from "../../hooks/useActions";

interface TextEditorProps {
    cell: Cell,
    children?: React.ReactNode,
}

const TextEditor: React.FC<TextEditorProps> = (
    { cell }
) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const { updateCell } = useActions();

    const [editing, setEditing] = useState(false);

    useEffect(
        () => {
            const listener = (
                event: MouseEvent,
            ) => {
                if (
                    editorRef.current
                    && event.target
                    && editorRef.current.contains(
                        event.target as Node)
                    ) {
                        return;
                 }

                setEditing(false);
            }

            window.addEventListener(
                'click',
                listener,
                {
                    capture: true,
                }
            );

            return () => {
                document.removeEventListener('click', listener, {capture: true})
            }
        },
        []
    )

    if(editing) {
        return (
            <div className="text-editor" ref={editorRef}>
                <MDEditor value={cell.content} onChange={(markdown) => {updateCell(cell.id, markdown || '')}}></MDEditor>
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => {setEditing(true)}}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'}></MDEditor.Markdown>
            </div>
        </div>
    );
}

export default TextEditor;