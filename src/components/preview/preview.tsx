import {useEffect, useRef} from "react";
import './preview.css';

interface PreviewProps {
    code: string,
    bundleErr: string,
    children?: React.ReactNode;
}

// Mimicks a fetched HTML file
const html = `
    <html>
        <head>
            <style>
                html {
                    background-color:white;
                }
            </style>
        </head>
        <body>
            <div id='root'>
            </div>
            
            <script>
                const handleError = (err) => {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color:red;"> <h4> Runtime error: </h4>' + err +  '</div>';
                    console.error(err);
                };
                
                window.addEventListener('error', (event) => {
                    event.preventDefault();
                    handleError(event.error.message);
                });
            
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch(err) {
                       handleError(err);
                    }
                }, false);
            </script>
        </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = (
    { code, bundleErr}
) => {
    const iFrame = useRef<any>();

    useEffect(
        () => {
            if (!bundleErr) {
                iFrame.current.srcdoc = html;
            }

            setTimeout(
                () => {
                    iFrame.current.contentWindow.postMessage(code, '*');
                },
                50
            );
        },
        [code]
    )

    return (
        <div className="preview-wrapper">
            {
                bundleErr && <div className="bundle-error-wrapper">
                    <span className="bundle-error">  {bundleErr} </span>
                </div>
            }

            {
                !bundleErr && <iframe
                title="preview"
                ref={iFrame}
                sandbox="allow-scripts"
                srcDoc={html}/>
            }
        </div>

    )
};

export default Preview;