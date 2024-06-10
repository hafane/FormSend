import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
const app = express()
const prisma = new PrismaClient()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.post('/api', async (req, res) => {
    const {email, name, lastName, surName, gender, passport, phone} = req.body
    if(!email || !name || !lastName || !gender || !passport || !phone) {
       return res.status(400).send('Required: Email, Name, lastName, gender, passport, phone')
    }
    try {
        const createUser = await prisma.userInfo.create({
            data: {
                email,
                name,
                lastName,
                surName,
                gender,
                passport,
                phone
            },
        })
        res.json(createUser)
    } catch (error) {
        res.status(400).send({message: error})
        console.log(error)
    }
})

const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})