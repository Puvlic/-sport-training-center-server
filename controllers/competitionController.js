const db = require('../db')

class CompetitionController {
    async createCompetition (req, res) {
        const {name, start_date, location, sport_id, organizer_id, year, month, duration} = req.body
        const competition = await db.query(`INSERT INTO competition (name, start_date, location, sport_id, organizer_id, year, month, duration)
                                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                                      [name, start_date, location, sport_id, organizer_id, year, month, duration])
        res.json(competition.rows[0])
    }

    async getAllCompetitions (req, res) {
        const competitions = await db.query(`SELECT * FROM competition`)
        res.json(competitions.rows)
    }

    async getOneCompetition (req, res) {
        const id = req.params.id
        const competition = await db.query(`SELECT * FROM competition WHERE id = $1`, [id])
        res.json(competition.rows[0])
    }

    async updateCompetition (req, res) {
        const {id, name, start_date, location, sport_id, organizer_id, year, month, duration} = req.body
        const updated_competition = await db.query(`UPDATE competition SET name = $2, start_date = $3, location = $4, sport_id = $5, organizer_id = $6, year = $7, month = $8, duration = $9 WHERE id = $1`,
                                                    [id, name, start_date, location, sport_id, organizer_id, year, month, duration])
        res.json(updated_competition.rows[0])
    }

    async deleteCompetition (req, res) {
        const id = req.params.id
        const deleted_competition = await db.query(`DELETE FROM competition WHERE id = $1`, [id])
        res.json(deleted_competition.rows[0])
    }
}

module.exports = new CompetitionController()