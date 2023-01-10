import {useEffect, useRef} from "react";
import './preview.css';

interface PreviewProps {
    code: string,
    children?: React.ReactNode;
}

// Mimicks a fetched HTML file
const html = `
    <html>
        <head>
        </head>
        <body>
            <div id='root'>
            </div>
            
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch(err) {
                        const root = document.querySelector('#root');
    
                        root.innerHTML = '<div style="color:red;"> <h4> Runtime error: </h4>' + err +  '</div>';
                        console.error(err);
                    }
                }, false);
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = (
    { code }
) => {
    const iFrame = useRef<any>();

    useEffect(
        () => {
            iFrame.current.srcdoc = html;

            iFrame.current.contentWindow.postMessage(code, '*');
        },
        [code]
    )

    return (
        <div>
            <iframe
                className="preview-wrapper"
                title="preview"
                ref={iFrame}
                sandbox="allow-scripts"
                srcDoc={html}/>
        </div>

    )
};

export default Preview;