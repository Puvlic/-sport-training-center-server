const db = require('../db')

class TrainingCampLeaders {
    async addTrainingCampLeader (req, res) {
        const {training_camp_id, user_id} = req.body
        console.log(training_camp_id, user_id)
        const training_camp_leader = await db.query(`INSERT INTO training_camp_leaders (training_camp_id, user_id, post) VALUES ($1, $2, $3) RETURNING *`, [training_camp_id, user_id, "Спортсмен"])
        res.json(training_camp_leader.rows[0])
    }

    async getAllTrainingCampLeaders (req, res) {
        const training_camp_leaders = await db.query(`SELECT * FROM training_camp_leaders`)
        res.json(training_camp_leaders.rows)
    }

    async getOneTrainingCampLeader (req, res) {
        const {training_camp_id, user_id} = req.body
        const training_camp_leader = await db.query(`SELECT * FROM training_camp_leaders WHERE training_camp_id = $1 AND user_id = $2`, [training_camp_id, user_id])
        res.json(training_camp_leader.rows[0])
    }

    async getTrainingCampMembers (req, res) {
        const training_camp_id = req.params.id
        const training_camp_members = await db.query(`SELECT * FROM training_camp_leaders WHERE training_camp_id = $1`, [training_camp_id])
        res.json(training_camp_members.rows)
    }


    async deleteTrainingCampLeader (req, res) {
        const {training_camp_id, user_id} = req.body
        const deletedTrainingCampLeader = await db.query(`DELETE FROM training_camp_leaders WHERE training_camp_id = $1 AND user_id = $2`, [training_camp_id, user_id])
        res.json(deletedTrainingCampLeader.rows[0])
    }
}

module.exports = new TrainingCampLeaders()