import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DateTimeConvertController from './DateTimeConvertController';

export default class WeeksController {

    /**
     * creating an instance of the DateTimeController Class to 
         access different functionality to get the required result
     **/
    convertDateTime: DateTimeConvertController;
    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format', 'timezone'])

        if (!body.first_date || !body.second_date) {
            ctx.response.status(400).json({
                message: 'Missing parameters'
            })
            return;
        }

        const firstDate = DateTimeConvertController.transformDate(body.first_date, body.timezone);
        const secondDate = DateTimeConvertController.transformDate(body.second_date, body.timezone);

        const _format = body.format;

        
        const _result = firstDate.diff(secondDate, 'weeks').toObject()
        if(_format){
            const weeksInSecs = Math.trunc(_result.weeks || 0)* 24 * 60 * 60 * 7;
            console.log(weeksInSecs);
            return {
                // Making sure the result is postive and rounding it to the nearest integer.
                result : DateTimeConvertController.formatDate(weeksInSecs, _format)
            };
        }else{
            return {
                // Default format of result if there is no preference for output (Days/ Minutes / .......)
                result : Math.trunc(_result.weeks || 0)
            }
        }
    }
}