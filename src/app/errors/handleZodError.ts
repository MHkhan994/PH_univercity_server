import { ZodError, ZodIssue } from "zod"
import config from "../config"

    const handleZodError = (err: ZodError) => {
      const statusCode = 400
      
      const errorSources = err.issues.map((issue: ZodIssue) => {
        return {
          path: issue?.path[issue.path.length - 1],
          message: issue?.message
        }
      })

      return {
        statusCode,
        message: 'Data Validation Error',
        errorSources,
        stack: config.node_env === 'development' ? err?.stack : null
    }
}
  
export default handleZodError