/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { studentRoutes } from './app/modules/students/student.route'
import { userRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running')
})

app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app
