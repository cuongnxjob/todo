import React, {Component} from "react";
import Search from "./Search";
import Sort from "./Sort";

export default class TaskItem extends Component {

    onUpdateStatus = (event) => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = (event) => {
        this.props.onDelete(this.props.task.id);
    }

    onUpdate = (event) => {
        this.props.onUpdate(this.props.task.id);
    }



    render() {
        var {task, index} = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className="label label-success">{task.status === true ? 'Active' : 'Disable'}</span>
                </td>
                <td className="text-center">
                    <button type="button" onClick={this.onUpdate} className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" onClick={this.onDelete} className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
