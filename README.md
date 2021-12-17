This Project uses AdonisJS as a framework. 

AdonisJS is a backend framework for Node.js. The framework is written in TypeScript and the application created using AdonisJS is also in TypeScript. It includes everything that is required to create a fully functional web app or an API server. AdonisJS offers a stable ecosystem to write server-side web application. Further explanation can be found here.


3. Explain Luxon
4. Explain API
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
