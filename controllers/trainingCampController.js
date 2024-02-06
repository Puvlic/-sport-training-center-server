const db = require('../db')

class TrainingCampController {
    async createTrainingCamp (req, res) {
        const {name, start_date, end_date, location} = req.body
        const trainingCamp = await db.query(`INSERT INTO training_camp (name, start_date, duration, location, year) VALUER ($1, $2, $3, $4, $5) RETURNING *`,
                                             [name, start_date, end_date, location, year])
        res.json(trainingCamp.rows[0])
    }

    async getAllTrainingCamps (req, res) {
        const trainingCamps = await db.query(`SELECT * FROM training_camp`)
        res.json(trainingCamps.rows)
    }

    async getOneTrainingCamp (req, res) {
        const id = req.params.id
        const trainingCamp = await db.query(`SELECT * FROM training_camp WHERE id = $1`, [id])
        res.json(trainingCamp.rows[0])
    }

    async getTrainingCampsByYearAndMonth (req, res) {
        const {year, month} = req.body
        console.log(year, month)
        let sorted_training_camps = []
        const trainingCamps = await db.query(`SELECT * FROM training_camp WHERE year = $1 AND month = $2`, [year, month])

        // for (let i = 0; i < trainingCamps.rows.length; i++) {
        //     let training_camp = String(trainingCamps.rows[i]).split('-')
        //
        //     console.log(trainingCamps.rows[i].year, year)
        //
        //     if (trainingCamps.rows[i].year === year && training_camp.rows[i].month === month) {
        //         sorted_training_camps.push(trainingCamps.rows[i])
        //     }
        // }
        // res.json(sorted_training_camps)
        res.json(trainingCamps.rows)
    }

    async updateTrainingCamp (req, res) {
        const {id, name, start_date, end_date, location, year} = req.body
        const updatedTrainingCamp = await db.query(`UPDATE training_camp SET name = $2, start_date = $3, duration = $4, location = $5, year = $6 WHERE id = $1`,
                                                    [id, name, start_date, end_date, location, year])
        res.json(updatedTrainingCamp.rows[0])
    }

    async deleteTrainingCamp (req, res) {
        const id = req.body
        const deletedTrainingCamp = await db.query(`DELETE FROM training_camp WHERE id = $1`, [id])
        res.json(deletedTrainingCamp.rows[0])
    }

    async getTrainingCampsByUserId (req, res) {
        const id = req.params.id
        const trainingCampsId = await db.query(`SELECT training_camp_id FROM training_camp_leaders WHERE user_id = $1`, [id])
        const trainingCamps = []
        for (let i = 0; i < trainingCampsId.rows.length; i++) {
            const trainingCamp = await db.query(`SELECT * FROM training_camp WHERE id = $1`, [trainingCampsId.rows[i].training_camp_id])
            trainingCamps.push(trainingCamp.rows[0])
        }
        res.json(trainingCamps)
    }
}

module.exports = new TrainingCampController()