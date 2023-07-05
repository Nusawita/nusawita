const Session = require('../models/Session');

class SessionRepository {
    async createSession(sessionData) {
        try {
            const createdSession = await Session.create(sessionData);
            return [createdSession, null];
        } catch (error) {
            return [null, error];
        }
    }

    async getSession(sessionToken) {
        try {
            const session = await Session.findOne({where: {id: `${sessionToken}`}});
            return [session, null]
        } catch (error) {
            return [null, error]
        }
    }

    async deleteSession(sessionToken) {
        try {
            const deletedSession = await Session.destroy({where: {id: `${sessionToken}`}});
            return null
        } catch (error) {
            return error
        }
    }
}
  
module.exports = SessionRepository;