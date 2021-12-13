import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DateTimeConvertController from './DateTimeConvertController';

export default class WeeksController {
    convertDateTime:DateTimeConvertController;
    public async handleRequest(ctx: HttpContextContract) {
        const body = ctx.request.only(['first_date', 'second_date', 'format','timezone'])

        if (!body.first_date || !body.second_date) {
            ctx.response.status(400).json({
                message: 'Missing parameters'
            })
            return;
        }

        const firstDate =  DateTimeConvertController.transformDate(body.first_date, body.timezone);
        const secondDate = DateTimeConvertController.transformDate(body.second_date, body.timezone);
        const _format = body.format;

        if(_format){
            DateTimeConvertController.formatDate(firstDate,secondDate,_format);
        }else{
            return firstDate.diff(secondDate, 'days').toObject().weeks;
        }
       
    }
}