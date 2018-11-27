import React from "react";

class CompetenceSummary extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.competenceDescription}</h2>
                <i>Todo: This should be graphical :)</i>

                <ul className="summary">
                    {this.props.indicators.map((indicator, i) => {

                            let className = "levelSummary grade";
                            let description = 'No answer given yet';

                            if (this.props.levelSelections !== null && this.props.levelSelections.hasOwnProperty(indicator.id)) {
                                className = "levelSummary grade" + indicator.levels[this.props.levelSelections[indicator.id]].grade;
                                description = indicator.levels[this.props.levelSelections[indicator.id]].description;
                            }

                            return <li className={className}>
                                <div className="levelSummaryContent">
                                    <h4><a onClick={this.props.showIndicator.bind(this, i)}>{indicator.description}</a></h4>
                                    <div className="gradeDescription">{description}</div>
                                </div>
                                <div className="levelSummaryEdit"><button className="btn btn-default">Edit</button></div>
                            </li>
                        }
                    )}

                </ul>
            </div>
        )
    }
}

export default CompetenceSummary;