import React from "react";
import Tasks from "../component/Tasks";

const App = () => {
    return(
    <div className="container text-center">
        <div>
            <h1 className="header">ToDo's</h1>
        </div>
        <Tasks />
    </div>
    );
};

export default App;