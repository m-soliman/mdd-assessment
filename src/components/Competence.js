import React from "react";
import Indicator from "./Indicator";
import CompetenceStatusBar from "./CompetenceStatusBar";
import CompetenceSummary from "./CompetenceSummary";

class Competence extends React.Component {
    constructor(props) {
        super(props);

        this.select = this.select.bind(this);
    }


    select(value) {
        this.props.saveIndicatorAnswer(this.props.indicators[this.props.indicatorStep].id, parseInt(value));
    }

    render() {
        if (this.props.showSummary) {
            return <CompetenceSummary competenceDescription={this.props.competence}
                                      showIndicator={this.props.setIndicatorStep}
                                      indicators={this.props.indicators}
                                      levelSelections={this.props.levelSelections}/>
        }

        let indicatorStep = this.props.indicatorStep;
        let indicator = this.props.indicators[indicatorStep];
        let selectedLevel = this.props.levelSelections !== null ? this.props.levelSelections[indicator.id] : null;

        return (
            <div>
                <h2>{this.props.competence}</h2>
                <CompetenceStatusBar current={indicatorStep} max={this.props.indicators.length}/>

                {this.props.showSummary ?
                    this.renderSummary() :
                    <div>Indicator: {indicatorStep + 1} of {this.props.indicators.length}
                        <div className="row">
                            <Indicator
                                key={indicator.id}
                                id={indicator.id}
                                description={indicator.description}
                                levels={indicator.levels}
                                select={this.select}
                                selectedLevel={selectedLevel}
                            />
                        </div>

                        <div className="row">
                            <button className="btn btn-default navButton" disabled={indicatorStep === 0}
                                    onClick={this.props.setIndicatorStep.bind(this, indicatorStep - 1)}>
                                Previous please
                            </button>
                            <button className="btn btn-default navButton" disabled={selectedLevel === null}
                                        onClick={this.props.setIndicatorStep.bind(this, indicatorStep + 1)}>
                                Next please
                            </button>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default Competence;