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


  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? error?.stack : null
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
