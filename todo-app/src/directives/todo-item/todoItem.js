module.exports = function (ngModule) {
    ngModule.directive('todoItem', [function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: './directives/todo-item/todoItem.html',
            link: function (scope) {
            }
        }
    }]);
};