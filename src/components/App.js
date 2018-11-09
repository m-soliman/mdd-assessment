import React from "react";
import Competence from "./Competence.js";
import CompetenceDataClient from "./../utils/CompetenceDataClient";
import UserDataClient from "../utils/UserDataClient";

class App extends React.Component {
    constructor(props) {
        super(props);

        let userAnswers = UserDataClient.getUserAnswers();

        this.state = {
            competenceId: 0,
            indicatorStep: 0,
            showSummary: false,
            userAnswers: userAnswers
        };
        this.showCompetence         = this.showCompetence.bind(this);
        this.saveIndicatorAnswer    = this.saveIndicatorAnswer.bind(this);
        this.setIndicatorStep       = this.setIndicatorStep.bind(this);
        this.deleteCookieData       = this.deleteCookieData.bind(this);
    }

    showCompetence(id, showSummary) {
        if(typeof showSummary !== "boolean") {
            showSummary = false;
        }

        this.setState({competenceId: id, showSummary: showSummary, indicatorStep:0});
    }

    setIndicatorStep(indicatorStep) {
        if (indicatorStep >= 0) {
            // fallback, in case user tries to access non existing indicator step, show summary view
            let showSummary = indicatorStep >= CompetenceDataClient.getIndicatorsCountForCompetenceWithId(this.state.competenceId);
            this.setState({indicatorStep: indicatorStep, showSummary:showSummary});
        }
    }

    saveIndicatorAnswer(indicatorId, indicatorAnswer) {
        let updatedUserAnswers = this.state.userAnswers;
        if (!updatedUserAnswers.hasOwnProperty(this.state.competenceId)
            || updatedUserAnswers[this.state.competenceId] === null) {
            updatedUserAnswers[this.state.competenceId] = {};
        }
        updatedUserAnswers[this.state.competenceId][indicatorId] = indicatorAnswer;

        UserDataClient.saveUserAnswers(updatedUserAnswers);
        this.setState({userAnswers: updatedUserAnswers});
    }

    deleteCookieData() {
        UserDataClient.deleteUserAnswers();
        this.setState({userAnswers: {}});
        window.location.reload(true);
    }

    render() {
        let competence = CompetenceDataClient.getCompetenceById(this.state.competenceId);
        let selection = this.state.userAnswers.hasOwnProperty(competence.id)
            ? this.state.userAnswers[competence.id]
            : [];

        return (
            <div class="main-content">

                <div class="sidebar">
                    <div class="heading">
                        <h1>Self-assessment tool</h1>
                        <h4>for Master Digital Design courses</h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12"><button className="btn btn-default" onClick={this.deleteCookieData}>Clear all answers</button></div>
                    </div>

                    <ul className="nav">
                        {CompetenceDataClient.getListOfCompetences().map((description, id) =>
                            <li>
                                <a onClick={this.showCompetence.bind(this, id, true)}>{description}</a>
                            </li>
                        )}
                    </ul>
                </div>

                <div class="content">

                    <Competence saveIndicatorAnswer={this.saveIndicatorAnswer}
                                competence={competence.competenceDescription}
                                indicators={competence.indicators}
                                indicatorStep={this.state.indicatorStep}
                                setIndicatorStep={this.setIndicatorStep}
                                levelSelections={selection}
                                showSummary={this.state.showSummary}
                    />

                </div>

            </div>
        )
    }
}

export default App;