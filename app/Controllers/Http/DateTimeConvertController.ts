import { DateTime } from "luxon";

export default class DateTimeConvertController{
    
    public static transformDate(original: string, timezone: string | undefined): DateTime {
        const [_date, _timezone] = original.trim().split(' ');
        let parsedDate = DateTime.fromISO(_date, {
            zone: _timezone,
            setZone: true
        });
        console.log('Before:' + parsedDate.toString());
        if (timezone) {
            parsedDate = parsedDate.setZone(timezone)
        }
        console.log('After:' + parsedDate.toString());
        return parsedDate;
    }

    public static formatDate(firstDate, secondDate, _format){
        switch(_format){
            case 'days' : return firstDate.diff(secondDate, 'days').toObject().days;
            break;
            
            case 'minutes' : return firstDate.diff(secondDate, 'minutes').toObject().minutes;
            break;

            case 'hours' : return  firstDate.diff(secondDate, 'hours').toObject().hours;
            break;

            case 'seconds' : return firstDate.diff(secondDate, 'seconds').toObject().seconds;
            break;

            case 'years' : return firstDate.diff(secondDate, 'years').toObject().years;
            break;

            default: return {'nothing': 'Null'}
            break;
        }
    }

}