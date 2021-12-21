import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';

export default class WeeksController {

    /**
     * This method handles the http post request from /weeks route
     * @param ctx It holds the information like the request body, cookies, headers, etc
     * @returns the response in the JSON format
     */
    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        const firstDate = transformDate(body.first_date, body.timezone);
        const secondDate = transformDate(body.second_date, body.timezone);
        const _format = body.format;

        const _result = firstDate.diff(secondDate, 'weeks').toObject()
        if (_format) {
            const weeksInSecs = Math.trunc(_result.weeks || 0) * 24 * 60 * 60 * 7;
            return {
                // Math.abs is used to make the result positive all the time
                // Math.trunc is used to ignore the decimals
                result: Math.abs(Math.trunc(formatDate(weeksInSecs, _format)))
            }
        } else {
            return {
                result: Math.abs(Math.trunc(_result.weeks || 0))
            }
        }
    }
}