/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error.interface'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req,
  res,
  next,
) => {
  let statusCode: number | string =  500
  let message =  'Something went wrong'

  let errorSources: TErrorSources = [
    {
      path: "",
      message:""
    }
  ]

  const setSimplifiedErrors = (simplifiedError:TGenericErrorResponse) => {
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }


  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)

    setSimplifiedErrors(simplifiedError)
  }

  else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error)
    setSimplifiedErrors(simplifiedError)
  }

  else if (error.name === "CastError") {
    const simplifiedError = handleCastError(error)
    
    setSimplifiedErrors(simplifiedError)
  }

  else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error)
    setSimplifiedErrors(simplifiedError)
  }

  else if (error instanceof AppError) {
    statusCode = error?.statusCode
    message = error?.message
    errorSources = [
      {
        path: "",
        message: error?.message
      }
    ]
  }

  else if (error instanceof Error) {
     message = error?.message
    errorSources = [
      {
        path: "",
        message: error?.message
      }
    ]
  }


  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null,
    // error
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
