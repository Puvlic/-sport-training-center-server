const db = require('../db')

class UserOnCompetitionController {
    async addUser (req, res) {
        const {user_id, competition_id} = req.body
        const sportsmen_on_competition = await db.query(`INSERT INTO sportsmens_on_competition (competition_id, user_id) VALUES ($1, $2) RETURNING *`,
                                                         [competition_id, user_id])
        res.json(sportsmen_on_competition.rows[0])
    }

    async removeUser (req, res) {
        const {user_id, competition_id} = req.body
        const removed_sportsmen = await db.query(`DELETE FROM sportsmens_on_competition WHERE user_id = $1 AND competition_id = $2`,
                                                  [user_id, competition_id])
        res.json(removed_sportsmen.rows[0])
    }

    async getUserOnCompetition (req, res) {
        const user_id = req.params.id
        const user_info = await db.query(`SELECT * FROM sportsmens_on_competition WHERE user_id = $1`, [user_id])
        res.json(user_info.rows)
    }
}

module.exports = new UserOnCompetitionController()