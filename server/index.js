require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const { addHook } = require('./db')
const errorHandler = require('./middleware/ErrorHandlingMIddleware')

const PORT = process.env.PORT || 6000

//настройка функций
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


//обработаем ошибки
app.use(errorHandler)

const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log('Server up on ' + PORT ))
    } catch (e) {
        console.log(e)
    }
}


//исполняем

app.get('/', (req, res)=>{
    res.status(200).json({message:"it's alive"})
})


start()