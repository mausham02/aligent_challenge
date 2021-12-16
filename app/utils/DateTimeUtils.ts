import { DateTime } from "luxon";

const ACCEPTED_FORMATS = {
    MINUTES: 'minutes',
    HOURS: 'hours',
    SECONDS: 'seconds',
    YEARS: 'years'
}

const isValidFormat = (format) => {
    for (let property in ACCEPTED_FORMATS) {
        if (ACCEPTED_FORMATS[property] == format) {
            return true
        }
    }
    return false
}

/**
 * 
 * @param original 
 * @param timezone 
 * @returns 
 */
const transformDate = (original: string, timezone?: string): DateTime => {
    const [_date, _timezone] = original.trim().split(' ');
    let parsedDate = DateTime.fromISO(_date, {
        zone: _timezone,
        setZone: true
    });
    if (timezone) {
        parsedDate = parsedDate.setZone(timezone)
    }
    if (!parsedDate.isValid) {
        if (parsedDate.invalidReason == 'unsupported zone') {
            throw new Error('The timezone is invalid')
        }
        throw new Error('Date is in incorrect form')
    }
    return parsedDate;
}

/**
 * Returning the difference in the dates in different formats
 * @param _result - in seconds
 * @param _format 
 * @returns 
 */
const formatDate = (_result, _format) => {
    switch (_format) {
        case ACCEPTED_FORMATS.MINUTES: return _result / 60

        case ACCEPTED_FORMATS.HOURS: return _result / 3600

        case ACCEPTED_FORMATS.SECONDS: return _result

        case ACCEPTED_FORMATS.YEARS: return _result / 31536000

        default:
            throw new Error('The format is invalid')
    }
}

export { isValidFormat, transformDate, formatDate }