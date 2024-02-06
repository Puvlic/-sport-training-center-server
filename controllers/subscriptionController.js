const db = require('../db')

class SubscriptionController {
    async createSubscription (req, res) {
        const {name, action_time, price, sport_id} = req.body
        const new_subscription = await db.query(`INSERT INTO subscription (name, action_time, price, sport_id) VALUES
                                                 ($1, $2, $3, $4) RETURNING *`, [name, action_time, price, sport_id])
        res.json(new_subscription.rows[0])
    }

    async getOneSubscription (req, res) {
        const id = req.params.id
        const subscription = await db.query('SELECT * FROM subscription WHERE id = $1', [id])
        res.json(subscription.rows[0])
    }

    async getAllSubscriptions (req, res) {
        const subscription = await db.query(`SELECT * FROM subscription`)
        res.json(subscription.rows)
    }

    async updateSubscription (req, res) {
        const {name, action_time, price, sport_id, subscription_id} = req.body
        const updated_subscription = await db.query(`UPDATE subscription SET name = $1, action_time = $2, price = $3, sport_id = $4
                                                     WHERE id = $5`, [name, action_time, price, sport_id, subscription_id])
        res.json(updated_subscription.rows[0])
    }

    async deleteSubscription (req, res) {
        const id = req.body
        const deleted_subscription = await db.query(`DELETE FROM subscription WHERE id = $1`, [id])
        res.json(deleted_subscription.rows[0])
    }
}

module.exports = new SubscriptionController()