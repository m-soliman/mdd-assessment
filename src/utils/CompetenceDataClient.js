import competenceData from "../data/competences.json";

class CompetenceDataClient {
    static competencesById = [];

    static getKeyOfCompetenceById(id) {
        for(let key in competenceData) {
            if(competenceData.hasOwnProperty(key) && competenceData[key].id === id) {
                return key;
            }
        }
        return 0;
    }

    static getIndicatorsCountForCompetenceWithId(id) {
        let competence = this.getCompetenceById(id);
        return competence.indicators.length;
    }

    static getCompetenceById(id) {
        if (!this.competencesById.hasOwnProperty(id)) {
            for (let key in competenceData) {
                if (competenceData.hasOwnProperty(key) && competenceData[key].id === id) {
                    this.competencesById[id] = competenceData[key];
                    break;
                }
            }
        }

        return this.competencesById[id];
    }

    /**
     * ['id' => 'description']
     * @returns {Array}
     */
    static getListOfCompetences() {
        let list = [];
        for (let key in competenceData) {
            if (competenceData.hasOwnProperty(key)) {
                list[competenceData[key].id] = competenceData[key].competenceDescription;
                this.competencesById[competenceData[key].id] = competenceData[key];
            }
        }
        return list;
    }
}

export default CompetenceDataClient;