import React from 'react';

import client from '../../client';
import createAlert from '../../alerts';

import OrganisationControl from '../organisation/OrganisationControl';
import StorageControl from '../storage/StorageControl';

export default class CreateItemDialog extends React.Component {

    constructor(props) {
        super(props);

        this.onCreate = this.onCreate.bind(this);
        this.onChangeNameHandler = this.onChangeNameHandler.bind(this);
        this.onChangeDescriptionHandler = this.onChangeDescriptionHandler.bind(this);
        this.onChangeNotesHandler = this.onChangeNotesHandler.bind(this);
        this.onChangeIsAssetHandler = this.onChangeIsAssetHandler.bind(this);
        this.onChangeValueHandler = this.onChangeValueHandler.bind(this);
        this.onChangeReferenceHandler = this.onChangeReferenceHandler.bind(this);
        this.onStorageChangeHandler = this.onStorageChangeHandler.bind(this);
        this.onOrganisationChangeHandler = this.onOrganisationChangeHandler.bind(this);
        this.state = {name: "", description: "", notes: "", isAsset: false, value: "", reference: "", storageId: "1", organisationId: "1"};
    }

    showModal() {
        $('#createItem').modal();
    }

    onChangeNameHandler(e) {
        e.preventDefault();
        this.setState({"name": e.target.value});
    }

    onChangeDescriptionHandler(e) {
        e.preventDefault();
        this.setState({"description": e.target.value});
    }

    onChangeNotesHandler(e) {
        e.preventDefault();
        this.setState({"notes": e.target.value});
    }

    onChangeIsAssetHandler(e) {
        e.preventDefault();
        this.setState({"isAsset": e.target.value});
    }

    onChangeValueHandler(e) {
        e.preventDefault();
        this.setState({"value": e.target.value});
    }

    onChangeReferenceHandler(e) {
        e.preventDefault();
        this.setState({"reference": e.target.value});
    }

    onOrganisationChangeHandler(value) {
        var values = value.split("/");
        this.setState({"organisationId": values[values.length - 1]});
    }

    onStorageChangeHandler(value) {
        var values = value.split("/");
        this.setState({"storageId": values[values.length - 1]});
    }

    onCreate() {
        var item = {
            "name": this.state.name,
            "description": this.state.description,
            "notes": this.state.notes,
            "value": this.state.value,
            "isAsset": (this.state.isAsset === "on"),
            "reference": this.state.reference,
            "storageId": this.state.storageId,
            "organisationId": this.state.organisationId
        };

        client({
            method: 'POST',
            path: 'http://localhost:5000/api/createitem',
            entity: item,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Changes have been saved successfuly', 'alert-success');

            console.log('Success: ' + response);

            $('#createItem').modal('hide');
            this.props.onCreateUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not save the changes, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.showModal}>
                    Create New Item
                </button>

                <div id="createItem" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Create a new item</h4>
                            </div>

                            <div className="modal-body">
                                <form className="form-horizontal" onsubmit="">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input id="name"
                                                className="form-control"
                                                type="text"
                                                placeholder="Please enter an item name"
                                                   onChange={this.onChangeNameHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                type="textarea"
                                                rows="3"
                                                placeholder="Please enter an item description"
                                                onChange={this.onChangeDescriptionHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Notes</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                type="textarea"
                                                rows="3"
                                                placeholder="Please enter item notes"
                                                onChange={this.onChangeNotesHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Is Asset</label>
                                        <div className="col-sm-10">
                                            <input className="form-control" type="checkbox" onChange={this.onChangeIsAssetHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Value</label>
                                        <div className="col-sm-10">
                                            <input
                                                className="form-control"
                                                type="number"
                                                placeholder="Please enter item value" onChange={this.onChangeValueHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Reference</label>
                                        <div className="col-sm-10">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Please enter item asset reference" onChange={this.onChangeReferenceHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Storage</label>
                                        <div className="col-sm-10">
                                            <StorageControl self={this.state.originalStorage} field='Storage' storage={this.props.storage} readOnly={false} onChangeHandler={this.onStorageChangeHandler}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Organisation</label>
                                        <div className="col-sm-10">
                                            <OrganisationControl self={this.state.originalOrganisation} field='Organisation' organisations={this.props.organisations} readOnly={false} onChangeHandler={this.onOrganisationChangeHandler}/>
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