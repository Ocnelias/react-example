import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {edit: false}
        this.newTxt = React.createRef();
    }

    edit = () => {
        this.setState({edit: true});
    }

    remove = (e) => {
        this.props.deleteBlock(this.props.index);
    }

    save = (e) => {
        e.preventDefault();
        this.props.updateText(this.newTxt.current.value, this.props.index);
        this.setState({edit: false});
    }


    render() {
        let editBlock;
        if (this.state.edit === true) {
            editBlock = <>
                <input type="text" ref={this.newTxt} className="form-control" defaultValue={this.props.children}
                       onClick={this.edit}/>
                <button onClick={this.save} className="btn light">Save</button>
            </>
        } else {
            editBlock = <>
                <div className="text"> {this.props.children} </div>
                <button onClick={this.edit} className="btn btn-info">Edit</button>
                <button onClick={this.remove} className="btn red">Delete</button>
            </>
        }


        return (
            <div className="box">
                {editBlock}
            </div>
        )
    }
}

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                't1',
                't2',
                't3'
            ]
        }
    }

    deleteBlock = (i) => {
        var arr = this.state.tasks;
        arr.splice(i, 1);
        this.setState({tasks: arr});
    }

    updateText = (text, i) => {
        var arr = this.state.tasks;
        arr[i] = text;
        this.setState({tasks: arr});
    }

    eachTask = (item, i) => {
        return (
            <Task key={i} index={i} updateText={this.updateText} deleteBlock={this.deleteBlock}
                  name={item}>{item}</Task>
        )
    }

    add = (text) => {
        var arr = this.state.tasks;
        arr.push(text);
        this.setState({tasks: arr});
    }

    render() {
        return (
            <div className="field">
                {
                    this.state.tasks.map(this.eachTask)
                }


                <button onClick={this.add.bind(null,"new task")} className="btn light">New task</button>
            </div>
        )
    }
}


class NewTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            showNewTaskInput: false
        }
    }

    showNewTaskInput = () => {
        this.setState({showNewTaskInput: true});
    }


    render() {
        let newTaskBlock;
        if (this.state.showNewTaskInput === true) {
            newTaskBlock = <>
                <input type="text" className="form-control"
                       name="newName"
                       onClick={this.edit}/>
                <button onClick={this.add} className="btn light">Save</button>
            </>
        } else {
            newTaskBlock = <>
                <button onClick={this.showNewTaskInput} className="btn btn-info">Add new task</button>
            </>
        }
        return (
            <div>
                {newTaskBlock}
            </div>
        )
    }
}

ReactDOM.render(
    <>
        <Field/>
    </>,
    document.getElementById('root')
);


