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
            tasks : []
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

    render() {
        var { tasks } = this.state;
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <TaskForm />
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <button type="button" className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button type="button" className="btn btn-success" onClick={ this.onGenerateData }>
                            <span className="fa fa-plus mr-5"></span>Generate Date
                        </button>
                        <Control />
                        <TaskList tasks={tasks}/>
                    </div>
                </div>
            </div>
        );
    }

}

