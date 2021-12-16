import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DateTimeConvertController from './DateTimeConvertController';


export default class DaysController {

    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format','timezone'])
        // Data validation for checking if the body is missing first date and second date
        if (!body.first_date || !body.second_date) {
            ctx.response.status(400).json({
                message: 'Missing parameters'
            })
            return;
        }
        // Passing the argument to get the date in standard format according to timezone
        const firstDate =  DateTimeConvertController.transformDate(body.first_date, body.timezone);
        const secondDate = DateTimeConvertController.transformDate(body.second_date, body.timezone);
 
        // Data Validation for checking if the date is valid
        if (!firstDate.isValid || !secondDate.isValid) {
            ctx.response.status(400).json({
                message: 'Date has been provided in incorrect form'
            })
            return;
        }

        const _format = body.format;

        const _result = firstDate.diff(secondDate, 'days').toObject()
        if(_format){
            
            const daysInSecs = Math.trunc(Number(_result.days)) * 24 * 60 * 60;
            return {
                // Making sure the result is postive and rounding it to the nearest integer.
                result : DateTimeConvertController.formatDate(daysInSecs, _format)
            };
        }else{
            return {
                // Default format of result if there is no preference for output (Days/ Minutes / .......)
                result : Math.trunc(Number(_result.days))
            }
        }
    };
    
    

}