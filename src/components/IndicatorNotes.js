import React from "react";
import UserDataClient from "../utils/UserDataClient";

class IndicatorNotes extends React.Component {

    constructor(props) {
        super(props);

        let notes = UserDataClient.getUserNotes(this.props.indicatorId);
        this.state = {
            textareaValue: '',
            notes: notes
        };

        this.handleChange = this.handleChange.bind(this);
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    addNote() {
        let newNote = this.state.textareaValue;
        let notes = newNote === '' ? this.state.notes : [...this.state.notes, newNote];

        UserDataClient.saveUserNotes(this.props.indicatorId, notes);
        this.setState({notes:notes, textareaValue:''});
    }

    handleChange(event) {
        this.setState({textareaValue: event.target.value})
    }

    deleteNote(index) {
        let notes = this.state.notes;
        notes.splice(index, 1);
        UserDataClient.saveUserNotes(this.props.indicatorId, notes);
        this.setState({notes:notes});
    }

    render() {
        let notes = this.state.notes;

        if (notes.length > 0) {
            console.log('length > 0 ', notes.length);
        } else {

        }

        return (
            <div className="col-md-4 form-group notes">
                <h3>Notes</h3>
                <ul className="list-group">
                    {notes.length > 0 ? notes.map((note, i) =>
                        <li className="note list-group-item" key={i}>
                            <span onClick={this.deleteNote.bind(this, i)}>{note}</span>
                        </li>
                    ) : ''}
                </ul>
                <div className="form-group"><textarea value={this.state.textareaValue} className="form-control" id="notes" onChange={this.handleChange}/></div>
                <button type="submit" className="btn btn-default btn-sm" onClick={this.addNote}>Add note</button>
            </div>
        )
    };

}

export default IndicatorNotes;