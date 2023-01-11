import MDEditor from '@uiw/react-md-editor'
import {useEffect, useRef, useState} from "react";

import './text-editor.css';

const TextEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const [editing, setEditing] = useState(false);
    const [markdown, setMarkdown] = useState('# Header');

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
                <MDEditor value={markdown} onChange={(markdown) => {setMarkdown(markdown || '')}}></MDEditor>
            </div>
        );
    }

    return (
        <div className="text-editor card" onClick={() => {setEditing(true)}}>
            <div className="card-content">
                <MDEditor.Markdown source={markdown}></MDEditor.Markdown>
            </div>
        </div>
    );
}

export default TextEditor;