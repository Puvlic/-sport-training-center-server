const db = require('../db')

class UsersOnTrainingController {
    async addUserOnTraining (req, res) {
        const {user_id, training_id} = req.body
        const new_table = await db.query(`INSERT INTO sportsmens_on_training (training_id, sportsmen_id)
                                          VALUES ($1, $2) RETURNING *`, [training_id, user_id])
        res.json(new_table.rows[0])
    }

    async removeUserOnTraining (req, res) {
        const {user_id, training_id} = req.body
        const deleted_table = await db.query(`DELETE FROM sportsmens_on_training WHERE training_id = $1 AND
                                              sportsmen_id = $2`, [training_id, user_id])
        res.json(deleted_table.rows[0])
    }

    async getUserTrainingsSubscribes (req, res) {
        const user_id = req.params.id
        const subscribes = await db.query(`SELECT * FROM sportsmens_on_training WHERE sportsmen_id = $1`, [user_id])
        res.json(subscribes.rows)
    }

    async getUserTrainings (req, res) {
        const user_id = req.params.id
        const subscribes = await db.query(`SELECT * FROM sportsmens_on_training WHERE sportsmen_id = $1`, [user_id])

        let trainings = []

        for (let i = 0; i < subscribes.rows.length; i++) {
            const training = await db.query(`SELECT * FROM training WHERE id = $1`, [subscribes.rows[i].training_id])

            const trainer = await db.query(`SELECT name, surname, patronymic FROM users WHERE id = $1`, [training.rows[i].trainer_id])
            const sport = await db.query(`SELECT sport FROM sport WHERE id = $1`, [training.rows[i].sport_id])
            const gym = await db.query(`SELECT name FROM gym WHERE id = $1`, [training.rows[i].gym_id])

            let training_info = {
                id: training.rows[i].id,
                start_time: training.rows[i].start_time,
                end_time: training.rows[i].end_time,
                trainer: `${trainer.rows[0].surname} ${trainer.rows[0].name} ${trainer.rows[0].patronymic}`,
                sport: sport.rows[0].sport,
                gym: gym.rows[0].name
            }

            trainings.push(training_info)
        }

        res.json(trainings)
    }
}

module.exports = new UsersOnTrainingController()