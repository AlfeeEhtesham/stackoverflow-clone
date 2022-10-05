 import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import userRoutes from './routes/users.js'

const app = express();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get('/',(req,res) => {
       res.send("This is a stack overflow clone API")
})

app.use('/user' , userRoutes) 

const PORT = process.env.PORT || 5000

const CONNECTION_URL = "mongodb://admin:admin@ac-v8mbjmz-shard-00-00.4ljdpje.mongodb.net:27017,ac-v8mbjmz-shard-00-01.4ljdpje.mongodb.net:27017,ac-v8mbjmz-shard-00-02.4ljdpje.mongodb.net:27017/?ssl=true&replicaSet=atlas-yei8ju-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect( CONNECTION_URL , {useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
  .catch((err) => console.log(err.message)) 