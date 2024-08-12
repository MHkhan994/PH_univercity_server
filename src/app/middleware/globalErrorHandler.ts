/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error.interface'
import config from '../config'
import handleZodError from '../errors/handleZodError'



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req,
  res,
  next,
) => {
  let statusCode = error.statusCode || 500
  let message = error.message || 'Something went wrong'

  let errorSources: TErrorSources = [
    {
      path: "",
      message:""
    }
  ]


  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }



  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  })
}

export default globalErrorHandler

/*
success
message
errorSources:[
path:'',
]
stack
*/
