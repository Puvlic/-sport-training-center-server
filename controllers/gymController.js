const db = require('../db')

class GymController {
    async createGym (req, res) {
        const {name} = req.body
        const sport = await db.query(`INSERT INTO gym (sport) VALUES ($1) RETURNING *`, [name])
        res.json(sport.rows[0])
    }

    async getOneGym (req, res) {
        const id = req.params.id
        const sport = await db.query(`SELECT * FROM gym WHERE id = $1`, [id])
        res.json(sport.rows[0])
    }

    async getAllGym (req, res) {
        const sports = await db.query(`SELECT * FROM gym`)
        res.json(sports.rows[0])
    }

    async updateGym (req, res) {
        const {id, name} = req.body
        const updatedSport = await db.query(`UPDATE gym SET name = $2 WHERE id = $1 RETURNING *`, [id, name])
        res.json(updatedSport.rows[0])
    }

    async deleteGym (req, res) {
        const id = req.params.id
        const deletedSport = await db.query(`DELETE FROM gym WHERE id = $1`, [id])
        res.json(deletedSport.rows[0])
    }
}

module.exports = new GymController()