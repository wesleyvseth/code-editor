import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import TextEditor from "./components/text-editor/text-editor";

const App = () => {
    return (
        <div>
            <TextEditor />
        </div>
    );
}

ReactDOM.render(
    <TextEditor />,
    document.querySelector('#root'),
);
