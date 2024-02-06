const db = require('../db')

class RoleController {
    async createRole (req, res) {
        const {name} = req.body
        const role = await db.query(`INSERT INTO role (name) VALUES ($1) RETURNING *`, [name])
        res.json(role.rows[0])
    }

    async getAllRoles (req, res) {
        const roles = await db.query(`SELECT * FROM role`)
        res.json(roles.rows)
    }

    async getOneRole (req, res) {
        const id = req.params.id
        const role = await db.query(`SELECT * FROM role WHERE id = $1`, [id])
        res.json(role.rows[0])
    }

    async deleteRole (req, res) {
        const id = req.params.id
        const deletedRole = await db.query(`DELETE FROM role WHERE id = $1`, [id])
    }
}

module.exports = new RoleController()