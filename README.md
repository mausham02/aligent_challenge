<h1>ABOUT</h1>
This is the programming challenge from Aligent Consulting for Backend Developer position.
<hr>
<strong> Description</strong>
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

<h4>Luxon</h4>

The [luxon](https://moment.github.io/luxon/) library is used for dealing with date time in this project.


<h2>Testing the API</h2>
<strong>Japa</strong>

Japa is a test runner to create test runners. It is a tiny Node.js test runner that can be used to test apps or even create test runner. It is simple, fast
and has minimal core. It doesn't ship with any CLI. 

<strong>SuperTest</strong>

In this project, supertest is used to make HTTP requests. More about the <strong>supertest</strong> can be found [here](https://github.com/visionmedia/supertest/).

<strong><i>Command for running the test</i></strong>

```
npm run test
```

<i>OR</i>
```
node -r @adonisjs/assembler/build/register japaFile.ts test
```


<strong>Middleware</strong>

<h1><strong>Running the code</strong></h1>


1. Command for running the app
```
node ace serve --watch
```

> Command for listing all the routes
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

http://localhost/days
This API is for calculation of numbers of <strong>days</strong> between two dates

<strong>Input</strong>
  
```json
{ 
  "first_date" : "2019-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2019-03-17T00:01:00 Asia/kuwait"
}
```

<strong>Default format</strong>

```json
{ 
  "result" : 3 
}
```

<strong>Input with format</strong>

```json
{ 
  "first_date" : "2022-09-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:01:00 Asia/kuwait",
  "format" : "seconds"  
}
```

<strong>Output in Seconds</strong>

```json
{ 
  "result" : 47347200
}
```

<strong>Input with format and Timezone</strong>

```json
{ 
  "first_date" : "2022-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:01:00 Asia/kuwait",
  "format" : "seconds" ,
  "timezone" : "Asia/Kuala_lumpur"
}
```

<strong>Output in hours</strong>

```json
{ 
  "result" : 31449600
}
```

http://localhost/weeks
This API is for calculation of numbers of <strong>complete weeks</strong> between two dates

```json
{ 
  "first_date" : "2017-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2014-03-17T12:01:00 Asia/kuwait",
  "format" : "minutes" ,
  "timezone" : "Asia/Kuwait"
}
```

<strong>output in seconds for Minutes</strong>

```json
{ "result" : 1572480  }
```

http://localhost/weekdays
This API is for calculation of numbers of <strong>weekdays</strong> between two dates

<strong>Input</strong>
```json
{ 
  "first_date" : "2022-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-17T00:01:00 Asia/kuwait"
}
```

<strong>output in default format</strong>

```json
{ "result" : 263 }
```




