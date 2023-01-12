import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import TextEditor from "./components/text-editor/text-editor";
import {Provider} from "react-redux";
import {store} from "./state";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TextEditor />
            </div>
        </Provider>

    );
}

ReactDOM.render(
    <TextEditor />,
    document.querySelector('#root'),
);
