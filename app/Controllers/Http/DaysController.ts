import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';


export default class DaysController {

    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        // Passing the argument to get the date in standard format according to timezone
        const firstDate = transformDate(body.first_date, body.timezone);
        const secondDate = transformDate(body.second_date, body.timezone);
        const _format = body.format;

        const _result = firstDate.diff(secondDate, 'days').toObject()
        if (_format) {
            const daysInSecs = Math.trunc(Number(_result.days)) * 24 * 60 * 60;
            return {
                // Making sure the result is postive and rounding it to the nearest integer.
                result: formatDate(daysInSecs, _format)
            };
        } else {
            return {
                // Default format of result if there is no preference for output (Days/ Minutes / .......)
                result: Math.trunc(Number(_result.days))
            }
        }
    };
    
}