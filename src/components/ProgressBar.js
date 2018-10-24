import React from "react";

class ProgressBar extends React.Component {
    render() {
        let progressPercentage = ((this.props.current) / this.props.max) * 100;
        return (
            <div className="progress">
                <div className="progress-bar" role="progressbar"
                     aria-valuemin="0"
                     aria-valuemax={this.props.max} style={{width: progressPercentage + '%'}}>
                    <span className="sr-only">{progressPercentage}% Complete</span>
                </div>
            </div>
        )
    }
}

export default ProgressBar;