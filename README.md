<strong> This Project uses AdonisJS as a framework </strong>

AdonisJS is a backend framework for Node.js. The framework is written in TypeScript and the application created using AdonisJS is also in TypeScript. It includes everything that is required to create a fully functional web app or an API server. AdonisJS offers a stable ecosystem to write server-side web application. Further explanation can be found [here](https://adonisjs.com/)

<h4>Luxon</h4>

The [luxon](https://moment.github.io/luxon/) library is used for dealing with date time in this project.


5. Testing 
6. Running the code
7. Middleware
8. Figure for File structure 


1. Command for running the app
```
node ace serve --watch
```
2. Command for running the test 
```
node -r @adonisjs/assembler/build/register japaFile.ts test
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


API 
These api accepts "first_date" and "second_date" as two parameters and optional parameters which are "format(Output type)" and "timezone" to give the required results.

http://localhost/days
This API is for calculation of numbers of <strong>days</strong> between two dates

<strong>Input</strong>
  
```json
{ 
  "first_date" : "2019-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2019-03-17T00:)1:00 Asia/kuwait"
}
```

<strong>Default format</strong>
```json
{ "result" : 2 }

<strong>Input with format</strong>

```json
{ 
  "first_date" : "2022-09-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:)1:00 Asia/kuwait",
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
  "first_date" : "2021-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:)1:00 Asia/kuwait",
  "format" : "hours" ,
  "timezone" : "Asia/Kuala_lumpur"
}
```

<strong>Output in hours</strong>
```json
{ 
  "result" : 8832
}
```

http://localhost/weeks
This API is for calculation of numbers of <strong>weekdays</strong> between two dates
```json
{ 
  "first_date" : "2021-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-21T00:)1:00 Asia/kuwait",
  "format" : "seconds" ,
  "timezone" : "Asia/Kuwait"
}
```

<strong>output in seconds for weekdays</strong>
```json
{ "result" : 22723200 }


http://localhost/weekdays
This API is for calculation of numbers of <strong>complete weeks</strong> between two dates

<strong>Input</strong>
```json
{ 
  "first_date" : "2022-03-20T00:01:00 Asia/Damascus" ,
  "second_date" : "2021-03-17T00:)1:00 Asia/kuwait"
}
```

<strong>output in default format</strong>
```json
{ "result" : 263 }
```




