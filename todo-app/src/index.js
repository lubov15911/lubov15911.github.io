const angular = require('angular');
let ngModule = angular.module('TodoApp', []);

require('./controllers/todosCtrl')(ngModule);
