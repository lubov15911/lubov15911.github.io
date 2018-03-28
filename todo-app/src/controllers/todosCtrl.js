module.exports = function (ngModule) {

    const ERORRS = Object.assign({
        EmptyField: 'The text field is empty. Please enter any todo name.',
        MinimumTodoLength: 'Todo name should be at least 20 symbols.'
    });

    class Todo {
        constructor(text) {
            this.text = text;
            this.time = new Date();
            this.doneState = false;
            this.hidden = false;
        }

        complete() {
            this.doneState = true;
        }
    }

    ngModule.controller('TodosCtrl', ['$scope', function ($scope) {
        console.log('New Angular Controller: TodosCtrl');

        $scope.resetForm = function () {
            $scope.form = {};
            $scope.form.error = null;
        };

        $scope.createNewTodo = function (text) {
            console.log('Create new todo:', text);
            if (!text) {
                $scope.form.error = ERORRS.EmptyField;
                return;
            } else if (text.length < 3) {
                $scope.form.error = ERORRS.MinimumTodoLength;
                return;
            }

            $scope.todosList.push(new Todo(text));
            $scope.resetForm();
        };

        $scope.edit = function (todo) {
            $scope.form = todo;
        };

        $scope.$watch('filter', function (newValue) {
            $scope.todosList = $scope.todosList.map(item => {
                item.hidden = newValue ? !(item.time.getFullYear() === newValue.getFullYear() &&
                                           item.time.getMonth() === newValue.getMonth() &&
                                           item.time.getDate() === newValue.getDate()) : false;
                return item;
            });
        });

        $scope.form = {}; // form model
        $scope.todosList = [];
        $scope.filter = null;
    }]);
};