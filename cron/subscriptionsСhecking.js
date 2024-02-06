const cron = require("node-cron");
const db = require("../db");

const SubscriptionsChecking = () => {
    cron.schedule('0 7 * * *', async function () {
        let date = new Date()
        console.log(date.getDate())

        const subscriptions = await db.query(`SELECT * FROM user_subscription`)
        for (let i = 0; i < subscriptions.rows.length; i++) {
            let subscriptionEndDateArray = subscriptions.rows[i].end_date.split('-') // [year, month, date]

            const subscriptionEndDate = new Date(subscriptionEndDateArray[0], subscriptionEndDateArray[1], subscriptionEndDateArray[2]);

            if (subscriptionEndDate < date) {
                await db.query(`DELETE FROM user_subscription WHERE id = $1`, [subscriptions.rows[i].id]);
                console.log(`User with id ${subscriptions.rows[i].id} subscription has expired`);
            }
        }
    })
}


module.exports = SubscriptionsChecking