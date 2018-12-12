import React, { Component } from 'react';


class TodoList extends Component 
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            high:[],
            medium:[],
            low:[],
        }
    }

    handleClick = (selectedItem) =>
    {
        var newArray;
        if(selectedItem.priority === "Low")
        {
            newArray=this.state.low.map((item) =>{
                if(item.taskName === selectedItem.taskName)
                  {  item.done = !item.done;}
                return item;
            });
            this.setState({low:newArray});   
        }
        if(selectedItem.priority === "Medium")
        {
            newArray=this.state.medium.map((item) =>{
                if(item.taskName === selectedItem.taskName)
                  {  item.done = !item.done;}
                return item;
            });
            this.setState({medium:newArray});   
        }
        if(selectedItem.priority === "High")
        {
            newArray=this.state.high.map((item) =>{
                if(item.taskName === selectedItem.taskName)
                  {  item.done = !item.done;}
                return item;
            });
            this.setState({high:newArray});
        }
    }

    addTask = () => 
    {
        var newArray;
        var item = document.getElementById("addTask").value;
        var priorityValue = document.getElementById("priority").value;
        console.log(priorityValue);
        if(item.length!==0)
        {
                console.log(item);
                if(priorityValue === "select priority")
                {
                    alert("select priority");
                }
                else
                {
                    var obj = {
                        taskName:item,
                        done:false,
                        priority:priorityValue,
                    }
                    var flag =true;
                    if(obj.priority === "High")
                    {
                            if(this.state.high.length!==0)
                            {
                                this.state.high.map((item) =>
                                {
                                    if(item.taskName === obj.taskName) 
                                        flag=false;
                                    return item;
                                });
                            }
                            if(flag)
                            {
                                newArray = [...this.state.high,obj];
                                document.getElementById("addTask").value="";
                                document.getElementById("priority").value="select priority";
                                this.setState({high:newArray});                
                            }
                    }
                    if(obj.priority === "Medium")
                    {
                            if(this.state.medium.length!==0)
                            {
                                this.state.medium.map((item) =>
                                {
                                    if(item.taskName === obj.taskName) 
                                        flag=false;
                                    return item;
                                });
                            }
                            if(flag)
                            {
                                newArray = [...this.state.medium,obj];
                                document.getElementById("addTask").value="";
                                document.getElementById("priority").value="select priority";
                                this.setState({medium:newArray});                
                            }
                    }
                    if(obj.priority === "Low")
                    {   
                            if(this.state.low.length!==0)
                            {
                                this.state.low.map((item) =>
                                    {
                                        if(item.taskName === obj.taskName) 
                                            flag=false;
                                        return item;
                                    });
                            }

                            if(flag)
                            {
                                newArray = [...this.state.low,obj];
                                document.getElementById("addTask").value="";
                                document.getElementById("priority").value="select priority";
                                this.setState({low:newArray});                
                            }

                    }
                    if(!flag)
                    {
                        alert("Task already exists");
                        document.getElementById("addTask").value="";
                        document.getElementById("priority").value="select priority";
                    }
            }
        }
        else {
            alert("Task empty");
            document.getElementById("priority").value="select priority";
        }
    }

    removeTodo = (ItemToRemove) => {
        console.log("Item to removed");
        console.log(ItemToRemove);
        var newArray;
        if(ItemToRemove.priority === "Low")
        {
            newArray = this.state.low;
            newArray.splice(this.findIndex(newArray,ItemToRemove.taskName),1);
            this.setState({low:newArray});
        }
        else if(ItemToRemove.priority === "Medium")
        {
            newArray = this.state.medium;
            newArray.splice(this.findIndex(newArray,ItemToRemove.taskName),1);
            this.setState({medium:newArray});
        }
        else
        {
            newArray = this.state.low;
            newArray.splice(this.findIndex(newArray,ItemToRemove.taskName),1);
            this.setState({high:newArray});
        }
    }

    findIndex =(list,name) => {

        var index;
        list.map((item,i) =>
            {   
                if(item.taskName === name)
                {
                    index =i;
                }
            }
        );

        return index;

    }
    render() {
        return(
            <div className="todoListApp">
                <h2>TODO LIST APP</h2>
                Enter Task:<input type="text" id="addTask"/>
                <select id="priority" defaultValue="select priority">
                <option disabled value="select priority" >select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High           </option>
                </select>
                <button id="add" onClick={() => this.addTask()}>Add Task</button>
                
                {
                    this.state.high.length !==0 &&
                        <ul>
                        {
                             this.state.high.map((item,i) =>
                                <div key={i} className="itemList" style ={{background:item.done?"lightgreen":" lightcoral"}}>
                                    <li style ={{textDecorationLine:item.done?"line-through":"none"}}>{item.taskName}</li>
                                    <b>{item.priority}</b>
                                    {
                                        item.done === false &&<input type="button" value="Mark Done"onClick={()=>this.handleClick(item)}/>
                                    }
                                    <input type="button" value="Remove" onClick={()=>this.removeTodo(item)}/>
                                </div>
                                )
                        }
                    </ul>
                }
                {
                    this.state.medium.length !==0 &&
                        <ul>
                        { 
                            this.state.medium.map((item,i) =>
                                <div key={i} className="itemList" style ={{background:item.done?"lightgreen":" lightskyblue"}}>
                                    <li style ={{textDecorationLine:item.done?"line-through":"none"}}>{item.taskName}</li>
                                    <b>{item.priority}</b>
                                    {
                                        item.done === false &&<input type="button" value="Mark Done"onClick={()=>this.handleClick(item)}/>
                                    }
                                    <input type="button" value="Remove" onClick={()=>this.removeTodo(item)}/>
                                </div>
                                )
                        }
                    </ul>
                }
                {
                    this.state.low.length !==0 &&
                        <ul>
                        { 
                            this.state.low.map((item,i) =>
                                <div key={i} className="itemList" style ={{background:item.done?"lightgreen":"lightsalmon"}}>
                                    <li style ={{textDecorationLine:item.done?"line-through":"none"}}>{item.taskName}</li>
                                    <b>{item.priority}</b>
                                    {
                                        item.done === false &&<input type="button" value="Mark Done"onClick={()=>this.handleClick(item)}/>
                                    }
                                    <input type="button" value="Remove" onClick={()=>this.removeTodo(item)}/>
                                </div>
                                )
                        }
                    </ul>
                }
            </div>
        );
    }
}

export default TodoList;