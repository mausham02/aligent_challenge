<h1>Aligent Date Time Programming Challenge</h1>
This is the programming challenge from Aligent Consulting for Backend Developer position.

<h3> Description</h3>

<i>Create an API that can be used to:
1. Find out the number of days between two datetime parameters.
2. Find out the number of weekdays between two datetime parameters.
3. Find out the number of complete weeks between two datetime parameters.
4. Accept a third parameter to convert the result of (1, 2 or 3) into one of
seconds, minutes, hours, years.
5. Allow the specification of a timezone for comparison of input parameters from
different timezones.
</i>

<h2><strong> This Project uses AdonisJS as a framework </strong></h2>

AdonisJS is a backend framework for Node.js. The framework is written in TypeScript and the application created using AdonisJS is also in TypeScript. It includes everything that is required to create a fully functional web app or an API server. AdonisJS offers a stable ecosystem to write server-side web application. Further explanation can be found [here](https://adonisjs.com/)

<h1>Luxon</h1>

The [luxon](https://moment.github.io/luxon/) library is used for dealing with date time in this project.


<h1>Testing the API</h1>
<h2>Japa</h2>

Japa is a test runner to create test runners. It is a tiny Node.js test runner that can be used to test apps or even create test runner. It is simple, fast
and has minimal core. It doesn't ship with any CLI. [Read More](https://github.com/thetutlage/japa/)

<h2>SuperTest</h2>

In this project, supertest is used to make HTTP requests. More about the <strong>supertest</strong> can be found [here](https://github.com/visionmedia/supertest/).

<strong><i>Command for running the test</i></strong>

```
npm run test
```

<i>OR</i>
```
node -r @adonisjs/assembler/build/register japaFile.ts test
```


<h2>Middleware</h2>

In this project middleware is used to check the validity of the input. Middleware is a series of function that are executed during an HTTP request before it
reaches the route handler. Every middleware class must implement the handle method to handle the http request and call the next method to forward the request 
to the next middleware or the route handler. More about the middleware in adonis can be found [here](https://docs.adonisjs.com/guides/middleware#document).

[Link for the Further explanation](https://www.youtube.com/watch?v=HxkCHZ3ek-4)


<h1><strong>Running the code</strong></h1>
<h4>Notes:</h4>

* AdonisJS is a Node.js framework, and hence it requires Node.js to be installed on computer. We need at least the latest release of Node.js v14.
* Use command below to install all the required packages
    ```
    npm install
    ```
* API development environment : [Postman](https://www.postman.com/downloads/)




Command for running the app
```
node ace serve --watch
```

<i>OR</i>

```
npm run dev
```

The port number is defined in .env file which is 80. So, after running the app, the user needs to enter http://localhost/ in the browser for GET request and http://localhost/<i>ROUTENAME</i> in the API development Environment for POST request.

<i>WHERE</i>  <strong>ROUTENAME</strong> can be listed using the command below: 

Command for listing all the routes
```
node ace list:routes
```


Method | Route | Handler | Middleware | Name |
--- | --- | --- | --- |--- |
HEAD, GET | /uploads/* | Closure | | drive.local.serve | 
HEAD, GET | / | Closure | | | 
POST  | /days | DaysController.handleRequest | |  | 
POST | /weeks | WeeksController.handleRequest | |  | 
POST | /weekdays | WeekDays.controller.handleRequest | | |


<h2>API Description</h2>
Note:
<h4>These api accepts "first_date" and "second_date" as two parameters and optional parameters which are "format(Output type)" and "timezone" to give the required results.</h4>
<hr>

<h3>http://localhost/days</h3>

This API is for calculation of numbers of <strong>days</strong> between two dates

<h5>Example 1 </h5>

Input with first_date and second_date parameter
  
```json
{ 
  "first_date" : "2019-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2019-03-17T00:01:00 Asia/kuwait"
}
```

Result in default format

```json
{ 
  "result" : 3 
}
```
<h5>Example 2 </h5>

Input with format

```json
{ 
  "first_date" : "2022-09-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:01:00 Asia/kuwait",
  "format" : "seconds"  
}
```

Output in Seconds

```json
{ 
  "result" : 47347200
}
```
<h5>Example 3 </h5>

Input with format and Timezone

```json
{ 
  "first_date" : "2022-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:01:00 Asia/kuwait",
  "format" : "seconds" ,
  "timezone" : "Asia/Kuala_lumpur"
}
```

Output in seconds

```json
{ 
  "result" : 31449600
}
```

<h5>Data Validation Example</h5>

Input with wrong first_date parameter

```json
{
  "first_date": "sdfdsfsdf",
  "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
  "format": "days",
  "timezone": "Asia/Kuala_Lumpur"
}
```

Result

```json
{
  "error": "Date is in incorrect form",
  "parameter": "first_date"
}
```

<h3>http://localhost/weeks</h3>
  
This API is for calculation of numbers of <strong>complete weeks</strong> between two dates

<h5>Example 1 </h5>

Input with all the possible parameters
```json
{ 
  "first_date" : "2017-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2014-03-17T12:01:00 Asia/kuwait",
  "format" : "minutes" ,
  "timezone" : "Asia/Kuwait"
}
```

Output in Minutes

```json
{ "result" : 1572480  }
```

<h5>Example 2 </h5>

Input all the parameters except timezone.

```json
{
  "first_date": "2021-05-01T00:00:00",
  "second_date": "2021-05-15T00:00:00",
  "format": "seconds"
}
      
```

Result in seconds

```json
{
    "result": 1209600
}

```


<h5>Example 3 </h5>

Input with all the parameters and expected result in minutes

```json
{
  "first_date": "2021-03-20T00:01:00",
  "second_date": "2021-05-23T00:01:00",
  "format": "minutes",
  "timezone" : "Asia/kuwait"
}
```

Result in minutes

```json
{
    "result": 90720
}

```

<h5>Data Validation example for /weeks API </h5>

Input with incorret format parameter
```json
{
  "first_date": "2021-03-20T00:01:00 Asia/Damascus",
  "second_date": "2021-03-21T00:01:00 Asia/Kuwait",
  "format": "secon",
  "timezone": "Asia/Kuala_Lumpur"
}
      
```

Expected Output

```json
{
    "error": "Parameter is not acceptable",
    "parameter": "format"
}

```

<hr>

<h3>http://localhost/weekdays</h3>
This API is for calculation of numbers of <strong>weekdays</strong> between two dates

<h5>Example 1 </h5>

Input with first_date and second_date parameter

```json
{ 
  "first_date" : "2022-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-17T00:01:00 Asia/kuwait"
}
```

Output in default format

```json
{ 
  "result" : 263 
}
```

<h5>Example 2 </h5>

Input with all the parameters except timezone

```json
{
  "first_date": "2021-05-01T00:00:00",
  "second_date": "2021-05-15T00:00:00",
  "format": "seconds"
}
```

Output in seconds

```json
{
    "result": 864000
}
```

<h5>Example 3 </h5>

Input with all the parameters and expected number of weekdays in years.

```json
{
  "first_date": "2021-03-20T00:01:00 Australia/sydney",
  "second_date": "2023-05-17T00:01:00",
  "format": "years",
  "timezone" : "Asia/kuwait"
}
```

Output in years

```json
{
    "result": 1
}
```

<h5>Data Validation example for /weekdays </h5>

Input with wrong timezone

```json
{
  "first_date": "2021-03-20T00:01:00 Asia/kuwait",
  "second_date": "2021-01-17T12:02:01 Asia/Kuala_Lumpur",
  "format": "seconds",
  "timezone": "Asiala_Lur"
}

```

Error shown as a result

```json
{
    "error": "The timezone is invalid",
    "parameter": "timezone"
}

```

