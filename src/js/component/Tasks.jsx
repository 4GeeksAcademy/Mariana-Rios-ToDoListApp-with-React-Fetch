import React, { useEffect } from "react";
import { useState } from "react";

const Tasks = () => {

    const [taskList, setTasklist ] = useState([]);

    const [isHovering, setIsHovering] = useState(false); 

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        loadTodos(taskList);
    }, [taskList]);


    //API Stuff:
    const getTodos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/mrios')
            .then(resp => {
                console.log("is response succesful: " + resp.ok); // will be true if the response is successfull
                console.log("status code: "+ resp.status); // the status code = 200 or code = 400 etc.
                return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //here is where your code should start after the fetch finishes
                console.log(data); //this will print on the console the exact object received from the server
                setTasklist(data)
            })
            .catch(error => {
                //error handling
                console.log(error);
            });
    };

    const loadTodos = (todos) => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/mrios', {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(resp => {
              console.log(resp.ok); // will be true if the response is successfull
              console.log(resp.status); // the status code = 200 or code = 400 etc.
              console.log(resp.text()); // will try return the exact result as string
              return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
          })
          .then(data => {
              //here is where your code should start after the fetch finishes
              console.log(data); //this will print on the console the exact object received from the server
          })
          .catch(error => {
              //error handling
              console.log(error);
          });
    };




    const submitNewtask = (e) => {
        if (e.key === "Enter") {
            const newTodo = {label: e.target.value, done: false, id: getNextID()};
            setTasklist([...taskList, ...[newTodo]]);
            console.log(newTodo);
        };
    };

    const getNextID = () => {
        return Math.max.apply(Math, taskList.map(function(o) { return o.id; })) + 1;
    };

    
    const hovering = (i) => {
        document.querySelector("#deletebtn" + i).style.visibility = "visible"
    };

    const notHovering = (i) => {
        document.querySelector("#deletebtn" + i).style.visibility = "hidden"
    };

    const deleteTask = (i) =>{
        let newTaskList = taskList.filter((item, indx) => indx !== i)
        setTasklist(newTaskList);
    };

    return(
        <div>
            <div>
                <input type="text" className="py-3 w-100 inputLine" placeholder="What needs to be done?" onKeyDown={(e) => submitNewtask(e)}/>
            </div>
            <div>
                <ul className="tasksUL">
                    {taskList.map((task, i) => (
                        <li className="listItem" onMouseOver={() => hovering(i)} onMouseOut={() => notHovering(i)} key={i}>
                            {task.label}
                            <i onClick={() => deleteTask(i)} className="fa-solid fa-xmark deletebtn" id={"deletebtn" + i}></i>
                        </li>
                        ))}
                </ul>
            </div>
            <div className="itemsLeft">{taskList.length} Items Left</div>
        </div>
    );
};

export default Tasks;