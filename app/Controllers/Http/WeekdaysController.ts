import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';

export default class WeekDaysController {

    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        const firstDate = transformDate(body.first_date, body.timezone);
        const secondDate = transformDate(body.second_date, body.timezone);
        const _format = body.format;

        // Use of "date-fns" Library to get the number of weekdays between two dates
        const _result = differenceInBusinessDays(Number(firstDate), Number(secondDate))

        if (_format) {
            const weekdaysInSecs = Math.trunc(Number(_result)) * 24 * 60 * 60;
            return {
                // Making sure the result is postive and rounding it to the nearest integer.
                result: formatDate(weekdaysInSecs, _format)
            };
        } else {
            return {
                // Default format of result if there is no preference for output (Days/ Minutes / .......)
                result: Math.trunc(Number(_result))
            }
        }

    }
}