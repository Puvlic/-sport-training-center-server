const db = require('../db')

class TrainingController {

    async createTraining (req, res) {
        const {start_time, end_time, trainer_id, sport_id, gym_id} = req.body
        const training = await db.query(`INSERT INTO training (start_time, end_time, trainer_id, sport_id, gym_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [start_time, end_time, trainer_id, sport_id, gym_id])
        res.json(training)
    }

    async getAllTrainings (req, res) {
        const trainings = await db.query(`SELECT * FROM training`)

        let trainings_info = []

        for (let i = 0; i < trainings.rows.length; i++) {
            const trainer = await db.query(`SELECT name, surname, patronymic FROM users WHERE id = $1`, [trainings.rows[i].trainer_id])
            const sport = await db.query(`SELECT sport FROM sport WHERE id = $1`, [trainings.rows[i].sport_id])
            const gym = await db.query(`SELECT name FROM gym WHERE id = $1`, [trainings.rows[i].gym_id])

            let training_info = {
                id: trainings.rows[i].id,
                start_time: trainings.rows[i].start_time,
                end_time: trainings.rows[i].end_time,
                trainer: `${trainer.rows[0].surname} ${trainer.rows[0].name} ${trainer.rows[0].patronymic}`,
                sport: sport.rows[0].sport,
                gym: gym.rows[0].name
            }

            trainings_info.push(training_info)
        }

        res.json(trainings_info)
    }

    async getOneTraining (req, res) {
        const id = req.params.id
        const training = await db.query(`SELECT * FROM training WHERE id = $1`, [id])

        const trainer = await db.query(`SELECT name, surname, patronymic FROM users WHERE id = $1`, [training.rows[i].trainer_id])
        const sport = await db.query(`SELECT sport FROM sport WHERE id = $1`, [training.rows[i].sport_id])
        const gym = await db.query(`SELECT name FROM gym WHERE id = $1`, [training.rows[i].gym_id])

        let training_info = {
            start_time: training.rows[0].start_time,
            end_time: training.rows[0].end_time,
            trainer: `${trainer.rows[0].surname} ${trainer.rows[0].name} ${trainer.rows[0].patronymic}`,
            sport: sport.rows[0].sport,
            gym: gym.rows[0].name
        }

        res.json(training_info.rows[0])
    }

    async updateTraining (req, res) {
        const {id, start_time, end_time, trainer_id, sport_id, gym_id} = req.body
        const updated_training = await db.query(`UPDATE training SET start_time = $1, end_time = $2, trainer_id = $3, sport_id = $4, gym_id = $5
                                                     WHERE id = $6`, [start_time, end_time, trainer_id, sport_id, gym_id, id])
        res.json(updated_training.rows[0])
    }

    async deleteTraining (req, res) {
        const id = req.body
        const deleted_training = await db.query(`DELETE FROM training WHERE id = $1`, [id])
        res.json(deleted_training.rows[0])
    }
}

module.exports = new TrainingController()