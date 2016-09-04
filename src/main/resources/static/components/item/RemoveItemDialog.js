import React from 'react';

export default class RemoveItemDialog extends React.Component {

    constructor(props) {
        super(props);
        
        this.showModal = this.showModal.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    showModal() {
        var values = this.props.value.split("/");
        var id = "deleteItem" + values[values.length - 1];
        $('#' + id).modal();
    }
    
    onDeleteHandler() {
        this.props.onDeleteHandler(this.props.value);
        var values = this.props.value.split("/");
        var id = "deleteItem" + values[values.length - 1];
        $('#' + id).modal('hide');
    }

    render() {
        var values = this.props.value.split("/");
        var id = "deleteItem" + values[values.length - 1];

        return (
            <span>
                <span className="glyphicon glyphicon-remove buttonPadding" aria-hidden="true" onClick={this.showModal}></span>

                <div id={id} className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Confirmation</h4>
                            </div>

                            <div className="modal-body">
                                Are you sure you want to delete this item?
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                                <button type="button" className="btn btn-primary" onClick={this.onDeleteHandler}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}