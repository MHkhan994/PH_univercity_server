import { RequestHandler } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
      })

      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
