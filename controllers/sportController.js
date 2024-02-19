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
        res.json(sports.rows)
    }

    async updateSport (req, res) {
        const {id, name} = req.body
        const updatedSport = await db.query(`UPDATE sport SET sport = $2 WHERE id = $1 RETURNING *`, [id, name])
        res.json(updatedSport.rows[0])
    }

    async deleteSport (req, res) {
        try {
            const {name} = req.body
            const deletedSport = await db.query(`DELETE FROM sport WHERE sport = $1`, [name])
            res.json("Удалено")
        } catch (e) {
            res.json(e.detail)
            console.log(e.detail)
        }
    }
}

module.exports = new SportController()