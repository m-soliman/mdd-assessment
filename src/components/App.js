import React from "react";
import Competence from "./Competence.js";
import CompetenceDataClient from "./../utils/CompetenceDataClient";
import UserDataClient from "../utils/UserDataClient";
import Switch from "./Switch/Switch";

class App extends React.Component {
    constructor(props) {
        super(props);

        let userAnswers     = UserDataClient.getUserAnswers();
        let settings        = UserDataClient.getUserSettings();
        let finalAssessment = settings.finalAssessment !== undefined ? settings.finalAssessment : false;
        let competenceId    = finalAssessment ? 5 : 0;

        this.state = {
            finalAssessment: finalAssessment,
            competenceId: competenceId,
            indicatorStep: 0,
            showSummary: true,
            userAnswers: userAnswers
        };
        this.showCompetence           = this.showCompetence.bind(this);
        this.saveIndicatorAnswer      = this.saveIndicatorAnswer.bind(this);
        this.setIndicatorStep         = this.setIndicatorStep.bind(this);
        this.deleteCookieData         = this.deleteCookieData.bind(this);
        this.setFinalAssessmentSwitch = this.setFinalAssessmentSwitch.bind(this);
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
        App.reload();
    }

    setFinalAssessmentSwitch(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : false;
        UserDataClient.saveUserSettingsFinalAssessment(value);
        this.setState({
            finalAssessment: value
        });
        App.reload();
    }

    static reload() {
        window.scrollTo(0, 0);
        window.location.reload(true);
    }

    render() {
        let competence = CompetenceDataClient.getCompetenceById(this.state.competenceId);
        let selection = this.state.userAnswers.hasOwnProperty(competence.id)
            ? this.state.userAnswers[competence.id]
            : [];

        return (
            <div className="main-content">
                <div className="sidebar">
                    <div className="heading">
                        <h1>Self-assessment tool</h1>
                        <h4>for Master Digital Design courses</h4>
                    </div>
                    <Switch description="Final assessment"
                            setFinalAssessmentSwitch={this.setFinalAssessmentSwitch}
                            checked={this.state.finalAssessment}
                    />
                    <div className="row">
                        <ul className="nav">
                            {CompetenceDataClient.getListOfCompetences(this.state.finalAssessment).map((description, id) =>
                                <li key={id}>
                                    <a onClick={this.showCompetence.bind(this, id, true)}>{description}</a>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-md-12"><button className="btn btn-default" onClick={this.deleteCookieData}>Clear all answers</button></div>
                    </div>
                </div>

                <div className="content">
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