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
