/**
 * Created by marc.thomas on 06/05/2016.
 */
import React from "react";
import client from "../../client";
import createAlert from "../../alerts";

export default class CreateStorageDialog extends React.Component {

    constructor(props) {
        super(props);

        this.onCreate = this.onCreate.bind(this);
        this.onChangeNameHandler = this.onChangeNameHandler.bind(this);
        this.onChangeStorageContentsHandler = this.onChangeStorageContentsHandler.bind(this);
        this.onChangeNotesHandler = this.onChangeNotesHandler.bind(this);
        this.state = {name: "", mainContents: "", notes: ""};
    }

    showModal() {
        $('#createStorage').modal();
    }

    onChangeNameHandler(e) {
        e.preventDefault();
        this.setState({"name": e.target.value});
    }

    onChangeStorageContentsHandler(e) {
        e.preventDefault();
        this.setState({"mainContents": e.target.value});
    }

    onChangeNotesHandler(e) {
        e.preventDefault();
        this.setState({"notes": e.target.value});
    }

    onCreate() {
        var item = {
            "name": this.state.name,
            "mainContents": this.state.mainContents,
            "notes": this.state.notes
        };

        client({
            method: 'POST',
            path: 'http://localhost:5000/api/createStorage',
            entity: item,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Storage created successfuly', 'alert-success');

            console.log('Success: ' + response);

            $('#createStorage').modal('hide');
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not create the storage, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.showModal}>
                    Create New Storage
                </button>

                <div id="createStorage" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create a storage</h4>
                            </div>

                            <div className="modal-body">
                                <form className="form-horizontal" onsubmit="">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input id="name"
                                                   className="form-control"
                                                   type="text"
                                                   placeholder="Please enter the storage name"
                                                   onChange={this.onChangeNameHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Main Contents</label>
                                        <div className="col-sm-10">
                                            <input id="mainContents"
                                                   className="form-control"
                                                   type="text"
                                                   placeholder="Please enter the main storage contents"
                                                   onChange={this.onChangeStorageContentsHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Notes</label>
                                        <div className="col-sm-10">
                                            <input id="notes"
                                                   className="form-control"
                                                   type="textarea"
                                                   rows="3"
                                                   placeholder="Please enter any notes"
                                                   onChange={this.onChangeNotesHandler}/>
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