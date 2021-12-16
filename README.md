1. Explain Framework
2. Explain Luxon
3. 


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
