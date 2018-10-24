import React from "react";
import competenceData from "../data/competences.json";
import Competence from "./Competence.js";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            competenceStep: 0,
            indicatorStep: 0,
            userAnswers: []
        };
        this.showCompetence         = this.showCompetence.bind(this);
        this.saveIndicatorAnswer    = this.saveIndicatorAnswer.bind(this);
        this.setIndicatorStep       = this.setIndicatorStep.bind(this);
    }

    showCompetence(id, showSummary) {
        if(typeof showSummary !== "boolean") {
            showSummary = false;
        }

        let step = 0;
        let indicatorStep = 0;
        for(let key in competenceData) {
            if(competenceData.hasOwnProperty(key) && competenceData[key].id === id) {
                step = key;
                if (showSummary) {
                    indicatorStep = competenceData[key].indicators.length;
                }
            }
        }
        this.setState({competenceStep: step, indicatorStep:indicatorStep});

    }

    setIndicatorStep(indicatorStep) {
        if (indicatorStep >= 0) {
            this.setState({indicatorStep: indicatorStep});
        }
    }

    saveIndicatorAnswer(indicatorId, indicatorAnswer) {
        let updatedUserAnswers = this.state.userAnswers;
        let competence = competenceData[this.state.competenceStep];
        if (!updatedUserAnswers.hasOwnProperty(competence.id)) {
            updatedUserAnswers[competence.id] = [];
        }
        updatedUserAnswers[competence.id][indicatorId] = indicatorAnswer;

        this.setState({userAnswers: updatedUserAnswers});
    }

    render() {
        let competence = competenceData[this.state.competenceStep];
        let selection = this.state.userAnswers.hasOwnProperty(competence.id)
            ? this.state.userAnswers[competence.id]
            : [];
        let showSummary = this.state.indicatorStep >= competenceData[this.state.competenceStep]['indicators'].length;

        return (
            <div>
                <h1>Self-assessment tool <small>for Master Digital Design courses</small></h1>
                <ul>
                {competenceData.map((c, i) =>
                    <li>
                        <a onClick={this.showCompetence.bind(this, c.id, true)}>{c.competenceDescription}</a>
                    </li>
                )}
                </ul>


                <Competence saveIndicatorAnswer={this.saveIndicatorAnswer}
                            competence={competence.competenceDescription}
                            indicators={competence.indicators}
                            indicatorStep={this.state.indicatorStep}
                            setIndicatorStep={this.setIndicatorStep}
                            levelSelections={selection}
                            showSummary={showSummary}/>
            </div>
        )
    }
}

export default App;