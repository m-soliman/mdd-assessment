import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieNameAnswers = 'mdd-assessment-answers';

/**
 * Client to handle access to user data.
 * This includes the answers given for the indicators.
 */
class UserDataClient {
    static getUserAnswers(id) {
        let content = cookies.get(cookieNameAnswers);
        if (content !== undefined && content !== null) {
            return content;
        }
        return {};
    }

    static saveUserAnswers(userAnswers, id) {
        cookies.set(cookieNameAnswers, userAnswers);
    }

    static deleteUserAnswers(id) {
        cookies.remove(cookieNameAnswers);
    }
}

export default UserDataClient;