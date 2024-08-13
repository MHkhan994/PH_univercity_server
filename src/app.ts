/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'

app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running')
})

app.get('/test', async (req, res) => {
  // Promise.reject()
})

app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app
