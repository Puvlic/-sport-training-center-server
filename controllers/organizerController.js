const db = require('../db')

class OrganizerController {
    async createOrganizer (req, res) {
        const {name} = req.body
        const organizer = await db.query(`INSERT INTO organizer (name) VALUES ($1) RETURNING *`, [name])
        res.json(organizer.rows[0])
    }

    async getAllOrganizers (req, res) {
        const organizers = await db.query(`SELECT * FROM organizer`)
        res.json(organizers.rows)
    }

    async getOneOrganizer (req, res) {
        const id = req.params.id
        const organizer = await db.query(`SELECT * FROM organizer WHERE id = $1`, [id])
        res.json(organizer.rows[0])
    }

    async updateOrganizer (req, res) {
        const {id, name} = req.body
        const updated_organizer = await db.query(`UPDATE organizer SET name = $2 WHERE id = $1`, [id, name])
        res.json(updated_organizer.rows[0])
    }

    async deleteOrganizer (req, res) {
        const id = req.params.id
        const deleted_organizer = await db.query(`DELETE FROM organizer WHERE id = $1`, [id])
        res.json(deleted_organizer.rows[0])
    }
}

module.exports = new OrganizerController()