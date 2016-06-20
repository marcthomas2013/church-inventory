import React from 'react';

export default class CreateItemDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    showModal() {
        $('#createItem').modal();
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
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label for="name" className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input id="name"
                                                className="form-control"
                                                type="text"
                                                placeholder="Please enter an item name" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                type="textarea"
                                                rows="3"
                                                placeholder="Please enter an item description" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Notes</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                className="form-control"
                                                type="textarea"
                                                rows="3"
                                                placeholder="Please enter item notes" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Is Asset</label>
                                        <div className="col-sm-10">
                                            <input className="form-control" type="checkbox" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Value</label>
                                        <div className="col-sm-10">
                                            <input
                                                className="form-control"
                                                type="number"
                                                placeholder="Please enter item value" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Reference</label>
                                        <div className="col-sm-10">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Please enter item asset reference" />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}