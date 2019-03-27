import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieNameAnswers  = 'mdd-assessment-answers';
const cookieNameNotes    = 'mdd-assessment-notes';
const cookieNameSettings = 'mdd-assessment-settings';

/**
 * Client to handle access to user data.
 * This includes the answers given for the indicators.
 */
class UserDataClient {

    // ------- USER ANSWER MANAGEMENT -------
    static getUserAnswers(id) {
        let content = cookies.get(cookieNameAnswers);
        if (content !== undefined && content !== null) {
            return content;
        }
        return {};
    }

    static saveUserAnswers(userAnswers, id) {
        cookies.set(
            cookieNameAnswers,
            userAnswers,
            {path: '/', expires: new Date(2019, 12, 31, 23, 59, 59)}
        );
    }

    static deleteUserAnswers(id) {
        cookies.remove(cookieNameAnswers);
    }

    // ------- USER NOTES MANAGEMENT -------

    static getUserNotes(indicatorId) {
        let cookieName = this.getCookieNameForNotes(indicatorId);
        let content = cookies.get(cookieName);
        if (content !== undefined && content !== null) {
            return content;
        }
        return [];
    }

    static saveUserNotes(indicatorId, userNotes) {
        cookies.set(
            this.getCookieNameForNotes(indicatorId),
            userNotes,
            {path: '/', expires: new Date(2019, 12, 31, 23, 59, 59)}
        );
    }

    static getCookieNameForNotes(indicatorId) {
        return cookieNameNotes + '_' + indicatorId.toString();
    }

    // ------- USER SETTINGS MANAGEMENT ------- //
    static getUserSettings() {
        let settings = cookies.get(cookieNameSettings);
        if (settings !== undefined && settings !== null) {
            return settings;
        }
        return {};
    }

    static saveUserSettingsFinalAssessment(finalAssessment) {
        if(typeof finalAssessment !== "boolean") {
            finalAssessment = false;
        }

        let settings = this.getUserSettings();
        settings.finalAssessment = finalAssessment;
        cookies.set(
            cookieNameSettings,
            settings,
            {path: '/', expires: new Date(2019, 12, 31, 23, 59, 59)}
        );
    }

}

export default UserDataClient;