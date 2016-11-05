/**
 * Created by marc.thomas on 06/05/2016.
 */
import React from "react";
import client from "../../client";
import createAlert from "../../alerts";

export default class CreateRoomDialog extends React.Component {

    constructor(props) {
        super(props);

        this.onCreate = this.onCreate.bind(this);
        this.onChangeNameHandler = this.onChangeNameHandler.bind(this);
        this.state = {name: ""};
    }

    showModal() {
        $('#createRoom').modal();
    }

    onChangeNameHandler(e) {
        e.preventDefault();
        this.setState({"name": e.target.value});
    }

    onCreate() {
        var item = {
            "name": this.state.name
        };

        client({
            method: 'POST',
            path: 'http://localhost:5000/api/createRoom',
            entity: item,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Room created successfuly', 'alert-success');

            console.log('Success: ' + response);

            $('#createRoom').modal('hide');
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not create the room, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.showModal}>
                    Create New Room
                </button>

                <div id="createRoom" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create a new room</h4>
                            </div>

                            <div className="modal-body">
                                <form className="form-horizontal" onsubmit="">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input id="name"
                                                   className="form-control"
                                                   type="text"
                                                   placeholder="Please enter a room name"
                                                   onChange={this.onChangeNameHandler}/>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.onCreate}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}