import React from "react";
import Indicator from "./Indicator";
import ProgressBar from "./ProgressBar";
import CompetenceSummary from "./CompetenceSummary";

class Competence extends React.Component {
    constructor(props){
        super(props);

        this.showIndicator = this.showIndicator.bind(this);
        this.select = this.select.bind(this);
    }

    showIndicator(step) {
        this.props.setIndicatorStep(step);
        this.setState();
    }

    select(value) {
        this.props.saveIndicatorAnswer(this.props.indicators[this.props.indicatorStep].id, parseInt(value));
    }

    render() {
        if (this.props.showSummary) {
            return <CompetenceSummary competenceDescription={this.props.competence}
                                      showIndicator={this.showIndicator}
                                      indicators={this.props.indicators}
                                      levelSelections={this.props.levelSelections}/>
        }

        let indicatorStep = this.props.indicatorStep;
        let indicator = this.props.indicators[indicatorStep];

        return (
            <div>
                <h2>Competence: {this.props.competence}</h2>
                    <ProgressBar current={indicatorStep} max={this.props.indicators.length}/>

                    {indicatorStep >= this.props.indicators.length ?
                        this.renderSummary() :
                        <div>Indicator: {indicatorStep + 1} of {this.props.indicators.length}

                            <Indicator
                                key={indicator.id}
                                id={indicator.id}
                                description={indicator.description}
                                levels={indicator.levels}
                                select={this.select}
                                selectedLevel={this.props.levelSelections[indicator.id]}
                            />

                            <button disabled={indicatorStep === 0} onClick={this.showIndicator.bind(this, indicatorStep-1)}>Previous please</button>
                            <button disabled={this.props.levelSelections[indicator.id] == null} onClick={this.showIndicator.bind(this, indicatorStep+1)}>Next please</button>

                        </div>
                    }

            </div>
        )
    }
}
export default Competence;