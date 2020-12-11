import React from 'react';
import './App.css';
import {GoogleMap} from "./components/GoogleMap";

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="App">
                <GoogleMap height={1000} width={1000}/>
            </div>
        );
    }
}

export default App;
