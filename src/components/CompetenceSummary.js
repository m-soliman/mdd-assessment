import React from "react";
import Indicator from "./Indicator";
import ProgressBar from "./ProgressBar";

class CompetenceSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Summary of competence {this.props.competenceDescription}</h3>

                {this.props.indicators.map((indicator, i) =>
                    (<div>
                        <h4>{indicator.description}</h4>
                        <a onClick={this.props.showIndicator.bind(this, i)}>
                            {this.props.levelSelections.hasOwnProperty(indicator.id)
                                ? indicator.levels[this.props.levelSelections[indicator.id]].description
                                : 'give answer'
                            }</a>
                    </div>)
                )}

            </div>
        )
    }
}

export default CompetenceSummary;