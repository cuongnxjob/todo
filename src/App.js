import React, {Component} from 'react';
import './App.css';
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm: true,
            taskEditing: null
        }
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id: uuidv4(),
                name: 'Hoc lap trinh',
                status: true
            },
            {
                id: uuidv4(),
                name: 'Hoc yeu',
                status: true
            },
            {
                id: uuidv4(),
                name: 'Đi đu đưa đi',
                status: true
            }
        ];
        // this.setState({
        //     tasks: tasks
        // })
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks);
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm : !this.state.isDisplayForm
        })

    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm : false
        })
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm : true
        })
    }


    onSubmit = (data) => {
        var {tasks} = this.state;
        if(data.id == '') {
            data.id = uuidv4();
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index != -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if(task.id == id) {
                result =  index;
            }
        })
        return result;
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index != -1) {
            tasks.splice(index,1);
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();
    }



    render() {
        var { tasks, isDisplayForm, taskEditing } = this.state;
        var elementTaskForm = isDisplayForm
            ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing}/>
            : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    {elementTaskForm}
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" onClick={ this.onToggleForm } className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-success" onClick={ this.onGenerateData }>
                            <span className="fa fa-plus mr-5"></span>Generate Date
                        </button>
                        <Control />
                        <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete} onUpdate={this.onUpdate}/>
                    </div>
                </div>
            </div>
        );
    }

}

