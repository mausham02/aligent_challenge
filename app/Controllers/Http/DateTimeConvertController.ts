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
            if(!parsedDate.isValid){
                if (parsedDate.invalidReason == 'unsupported zone') {
                    throw new Error('The timezone parameter is invalid')
                }
                throw new Error('Date has been provided in incorrect form')
            }
        }
        return parsedDate;
    }

    /**
     * Returning the difference in the dates in different formats
     * @param _result - in seconds
     * @param _format 
     * @returns 
     */
    public static formatDate(_result, _format){
        switch(_format){
            case 'minutes': return _result / 60

            case 'hours': return _result / 60 

            case 'seconds': return _result

            case 'years': return _result / 60

            default: 
                throw new Error('The parameter format is invalid')
        }
    }

}