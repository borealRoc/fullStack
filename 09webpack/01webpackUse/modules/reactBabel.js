
import React, { Component } from "react"
import ReactDom from "react-dom"
import Child from "./reactChild.jsx"
class App extends Component {
    render() {
        return (
            <div>
                <Child />
            </div>
        );
    }
}
ReactDom.render(<App />, document.getElementById("root"))