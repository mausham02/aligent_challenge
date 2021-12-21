import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';

export default class DaysController {

    /**
     * This method handles the http post request from /days route
     * @param ctx It holds the information like the request body, cookies, headers, etc
     * @returns the response in the JSON format
     */
    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        const firstDate = transformDate(body.first_date, body.timezone);
        const secondDate = transformDate(body.second_date, body.timezone);
        const _format = body.format;

        const _result = firstDate.diff(secondDate, 'days').toObject()
        if (_format) {
            const daysInSecs = Math.trunc(Number(_result.days)) * 24 * 60 * 60;
            return {
                // Math.abs is used to make the result positive all the time
                // Math.trunc is used to ignore the decimals
                result: Math.abs(Math.trunc(formatDate(daysInSecs, _format)))
            }
        } else {
            return {
                result: Math.abs(Math.trunc(Number(_result.days)))
            }
        }
    }
}