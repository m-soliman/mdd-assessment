import React from "react";

class Level extends React.Component {

    render() {
        let labelClass = "level grade" + this.props.grade;
        return <li>
            <div className="radio">
                <input
                    type="radio"
                    className="hideMe"
                    name={this.props.indicatorId}
                    id={this.props.grade}
                    value={this.props.grade}
                    onChange={this.props.onLevelSelect}
                    defaultChecked={this.props.checked}
                /><label className={labelClass} htmlFor={this.props.grade}>{this.props.description}</label>
            </div>
        </li>
    }
}

export default Level;