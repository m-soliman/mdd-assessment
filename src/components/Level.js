import React from "react";

class Level extends React.Component {

    render() {
        return <li>
            <div className="radio"><label>
            <input
                type="radio"
                name={this.props.indicatorId}
                value={this.props.grade}
                onChange={this.props.onLevelSelect}
                defaultChecked={this.props.checked}
            /> {this.props.description}</label>
        </div>
        </li>
    }
}

export default Level;