const db = require('../db')

class DayOfWeekController {
    async getOneDay (req, res) {
        const id = req.params.id
        const day = await db.query(`SELECT * FROM dayofweek WHERE id = $1`, [id])
        res.json(day.rows[0])
    }

    async getAllDays (req, res) {
        const day = await db.query(`SELECT * FROM dayofweek`)
        res.json(day.rows)
    }

}

module.exports = new DayOfWeekController()