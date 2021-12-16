import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { formatDate, transformDate } from '../../utils/DateTimeUtils';

export default class WeeksController {

    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        const firstDate = transformDate(body.first_date, body.timezone);
        const secondDate = transformDate(body.second_date, body.timezone);
        const _format = body.format;

        const _result = firstDate.diff(secondDate, 'weeks').toObject()
        if (_format) {
            const weeksInSecs = Math.trunc(_result.weeks || 0) * 24 * 60 * 60 * 7;

            return {
                // Making sure the result is postive and rounding it to the nearest integer.
                result: formatDate(weeksInSecs, _format)
            };
        } else {
            return {
                // Default format of result if there is no preference for output (Days/ Minutes / .......)
                result: Math.trunc(_result.weeks || 0)
            }
        }
    }
}