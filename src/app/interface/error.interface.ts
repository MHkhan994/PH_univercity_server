export type TErrorSources =   {
    path: string | number,
    message: string
}[]
  
export   type TGenericErrorResponse = {
        statusCode: string | number,
        message: string,
        errorSources: TErrorSources
    }