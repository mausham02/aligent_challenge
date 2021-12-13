import { DateTime } from "luxon";

export default class DateTimeConvertController{
    /** Function for converting the timezone to the standard format */
    public static transformDate(original: string, timezone: string | undefined): DateTime {
        const [_date, _timezone] = original.trim().split(' ');
        let parsedDate = DateTime.fromISO(_date, {
            zone: _timezone,
            setZone: true
        });
        // data validation for timezone and output type
        if (timezone) {
            parsedDate = parsedDate.setZone(timezone)
        }
        return parsedDate;
    }

    // Returning the difference in the dates in different formats
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