import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DateTimeConvertController from './DateTimeConvertController';
import differenceInBusinessDays from 'date-fns/differenceInBusinessDays';

export default class WeekDaysController {
    // creating an instance of the DateTimeController Class to access different functionality to get the required result
    convertDateTime:DateTimeConvertController;
    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'timezone'])

        if (!body.first_date || !body.second_date) {
            ctx.response.status(400).json({
                message: 'Missing parameters'
            })
            return;
        }

        const firstDate =  DateTimeConvertController.transformDate(body.first_date, body.timezone);
        const secondDate = DateTimeConvertController.transformDate(body.second_date, body.timezone);
       
        // Use of "date-fns" Library to get the number of weekdays between two dates
        return differenceInBusinessDays(Number(firstDate), Number(secondDate));

    }
}