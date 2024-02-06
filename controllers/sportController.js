const db = require('../db')

class SportController {
    async createSport (req, res) {
        const {name} = req.body
        const sport = await db.query(`INSERT INTO sport (sport) VALUES ($1) RETURNING *`, [name])
        res.json(sport.rows[0])
    }

    async getOneSport (req, res) {
        const id = req.params.id
        const sport = await db.query(`SELECT * FROM sport WHERE id = $1`, [id])
        res.json(sport.rows[0])
    }

    async getAllSports (req, res) {
        const sports = await db.query(`SELECT * FROM sport`)
        res.json(sports.rows[0])
    }

    async updateSport (req, res) {
        const {id, name} = req.body
        const updatedSport = await db.query(`UPDATE sport SET sport = $2 WHERE id = $1 RETURNING *`, [id, name])
        res.json(updatedSport.rows[0])
    }

    async deleteSport (req, res) {
        const id = req.params.id
        const deletedSport = await db.query(`DELETE FROM sport WHERE id = $1`, [id])
        res.json(deletedSport.rows[0])
    }
}

module.exports = new SportController()