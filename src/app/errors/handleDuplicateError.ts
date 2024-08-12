import { TErrorSources, TGenericErrorResponse } from "../interface/error.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const statusCode = 409

    const errorSources : TErrorSources = [
        {
            path: Object.keys(err.keyValue)[0] || "",
            message: `${err.keyValue[Object.keys(err.keyValue)[0]]} already exists`
        }
    ]

return {
        statusCode,
        message: 'Invalid Id',
        errorSources
    }
}

export default handleDuplicateError