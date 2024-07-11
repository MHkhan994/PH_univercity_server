import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { studentRoutes } from './app/modules/students/student.route'
import { userRoutes } from './app/modules/user/user.route'

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running')
})

export default app
