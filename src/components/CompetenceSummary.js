import React from "react";

class CompetenceSummary extends React.Component {

    render() {
        return (
            <div>
                <h3>Summary of competence {this.props.competenceDescription}</h3>
                <i>Todo: This should be graphical :)</i>

                <ul className="list">
                    {this.props.indicators.map((indicator, i) =>
                        (
                            <li>
                                <h4>{indicator.description}</h4>
                                <a onClick={this.props.showIndicator.bind(this, i)}>
                                    {this.props.levelSelections !== null && this.props.levelSelections.hasOwnProperty(indicator.id)
                                        ? indicator.levels[this.props.levelSelections[indicator.id]].description
                                        : 'give answer'
                                    }</a>
                            </li>
                        )
                    )}
                </ul>

            </div>
        )
    }
}

export default CompetenceSummary;