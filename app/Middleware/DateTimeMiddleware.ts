import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { isValidFormat, transformDate } from 'App/utils/DateTimeUtils';
import { DateTime } from 'luxon';

export default class DateTimeMiddleware {

  private httpContext: HttpContextContract;

  /**
   * 
   * @param httpContext 
   * @param next 
   * @returns 
   */
  public async handle(httpContext: HttpContextContract, next: () => Promise<void>) {

    this.httpContext = httpContext;

    // check if the dates have been provided and are valid
    if (!this.checkDates()) {
      return
    }

    // check if a timezone has been provided and is valid
    if (!this.checkTimezone()) {
      return
    }

    // check if the format parameter has been provided and accepted by the api
    if (!this.checkFormat()) {
      return
    }

    await next()
  }

  /**
   * 
   * @returns 
   */
  private checkDates(): boolean {
    const fields = ['first_date', 'second_date']
    for (let i in fields) {
      let field = this.httpContext.request.input(fields[i])

      if (!field) {
        this.send400Response('Parameter is missing', fields[i])
        return false
      }

      try {
        transformDate(field)
      } catch (error) {
        this.send400Response(error.message, fields[i])
        return false
      }
    }
    return true
  }

  /**
   * 
   * @returns boolean
   */
  private checkTimezone(): boolean {
    const timezone = this.httpContext.request.input('timezone')
    if (!timezone) {
      return true
    }

    const tzTest = DateTime.local().setZone(timezone);

    const isInvalidTz = tzTest.invalidReason == 'unsupported zone'
    if (isInvalidTz) {
      this.send400Response('The timezone is invalid', 'timezone')
      return false
    }
    return true
  }

  /**
   * 
   * @returns boolean
   */
  private checkFormat(): boolean {
    const format = this.httpContext.request.input('format')
    // if the format parameter hasn't been provided we ignore it
    if (!format)
      return true

    if (!isValidFormat(format)) {
      this.send400Response('Parameter is not acceptable', 'format')
      return false
    }

    return true
  }

  /**
   * 
   * @param error string
   * @param parameter string
   */
  private send400Response(error: string, parameter: string) {
    this.httpContext.response.status(400).json({ error, parameter })
  }
}
