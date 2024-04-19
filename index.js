const userRouter = require('./routes/userRouter')
const subscriptionRouter = require('./routes/subscriptionRouter')
const userSubscriptionRouter = require('./routes/userSubscriptionRouter')
const roleRouter = require('./routes/roleRouter')
const trainingCampRouter = require('./routes/trainingCampRouter')
const trainingCampLeadersRouter = require('./routes/trainingCampLeadersRouter')
const sportRouter = require('./routes/sportRouter')
const gymRouter = require('./routes/gymRouter')
const trainingRouter = require('./routes/trainingRouter')
const usersOnTrainingRouter = require('./routes/usersOnTrainingRouter')
const competitionRouter = require('./routes/competitionRouter')
const userOnCompetitionRouter = require('./routes/userOnCompetitionRouter')
const subscriptionsChecking = require('./cron/subscriptionsСhecking')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', userRouter)
app.use('/api', subscriptionRouter)
app.use('/api', userSubscriptionRouter)
app.use('/api', roleRouter)
app.use('/api', trainingCampRouter)
app.use('/api', trainingCampLeadersRouter)
app.use('/api', sportRouter)
app.use('/api', gymRouter)
app.use('/api', trainingRouter)
app.use('/api', usersOnTrainingRouter)
app.use('/api', competitionRouter)
app.use('/api', userOnCompetitionRouter)

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

subscriptionsChecking()