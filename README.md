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
These api accepts "first_date" and "second_date" as two parameters and optional parameters which are "format(output_type)" and "timezone" to give the required results.

http://localhost/weeks
This API is for calculation of numbers of <strong>complete weeks</strong> between two dates

http://localhost/weekdays
This API is for calculation of numbers of <strong>weekdays</strong> between two dates

http://localhost/days
This API is for calculation of numbers of <strong>days</strong> between two dates
