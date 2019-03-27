import React from "react";
import "./switch.css"

class Switch extends React.Component {

    render() {
        return <div className="customSwitch">
            <label className="switch">
                <input type="checkbox" checked={this.props.checked} onChange={this.props.setFinalAssessmentSwitch}/>
                <span className="slider round"></span>
            </label>
            <div className="customSwitchLabel">
                {this.props.description}
            </div>
        </div>




        /*return <li>
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
        </li>*/
    }
}

export default Switch;