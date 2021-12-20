/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/',()=>{
    return {
        "Task" : "This project is about finding the interval between two dates in days/complete weeks/ weekdays and optionally converting it into seconds/hours/minutes/years"
    }
});

Route
    .group(() => {
        Route.post('/days', 'DaysController.handleRequest');
        Route.post('/weeks', 'WeeksController.handleRequest');
        Route.post('/weekdays', 'WeekDaysController.handleRequest');
    })
    .middleware('datetime');