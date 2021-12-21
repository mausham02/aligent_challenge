import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';

export default class WeekDaysController {

    /**
      * This method handles the http post request from /weekdays route
      * @param ctx It holds the information like the request body, cookies, headers, etc
      * @returns the response in the JSON format
      */
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
                // Math.abs is used to make the result positive all the time
                // Math.trunc is used to ignore the decimals
                result: Math.abs(Math.trunc(formatDate(weekdaysInSecs, _format)))
            }
        } else {
            return {
                result: Math.abs(Math.trunc(Number(_result)))
            }
        }
    }
}