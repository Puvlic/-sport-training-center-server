const db = require('../db')

// function return current month length
const setMonthLength = (month, year) => {
    const months = {
        1: 31,
        2: year % 4 === 0 ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    }
    return months[month]
}

class UserSubscriptionController {
    async createUserSubscription (req, res) {

        const {user_id, subscription_id} = req.body
        const action_time_request = await db.query(`SELECT action_time FROM subscription WHERE id = $1`, [subscription_id]) // get subscription duration
        const action_time = action_time_request.rows[0].action_time

        // date when subscription started
        const start_date = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
        }

        //date when subscription ended
        let end_date = {}

        //set start values for end date for further calculation the correct end date
        for (let key in start_date) {
            end_date[key] = start_date[key]
        }

        let month_length = setMonthLength(end_date.month, end_date.year)

        end_date.day += action_time

        // calculation the correct end date
        while (end_date.day > month_length) {
            end_date.day -= month_length
            end_date.month += 1
            if (end_date.month > 12) {
                end_date.month = 1
                end_date.year += 1
            }
            month_length = setMonthLength(end_date.month, end_date.year)
        }

        // bringing dates into the required data form
        let result_start_date = `${start_date.year}-${start_date.month}-${start_date.day}`
        let result_end_date = `${end_date.year}-${end_date.month}-${end_date.day}`
        console.log (result_start_date, result_end_date)
        const user_subscription = await db.query(`INSERT INTO user_subscription (subscription_id, user_id, start_date, end_date) values ($1, $2, $3, $4)`, [subscription_id, user_id, result_start_date, result_end_date])

        res.json(user_subscription.rows[0])
    }

    async deleteUserSubscription (req, res) {
        const id = req.params.id
        const deletedUserSubscription = await db.query(`DELETE FROM user_subscription WHERE id = $1`, [id])
        res.json(deletedUserSubscription.rows[0])
    }

    async updateUserSubscription (req, res) {
        const {id, user_id, subscription_id, start_date, end_date} = req.body
        const updatedUserSubscription = await db.query(`UPDATE user_subscription SET user_id = $2, subscription_id = $3, start_date = $4, end_date = $5 WHERE id = $1`,
                                                        [id, user_id, subscription_id, start_date, end_date])
        res.json(updatedUserSubscription.rows[0])
    }

    async getUserSubscriptions (req, res) {
        const userSubscriptions = await db.query(`SELECT * FROM user_subscription`)
        res.json(userSubscriptions.rows)
    }
}

module.exports = new UserSubscriptionController()