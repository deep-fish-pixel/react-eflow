"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var eflow_1 = require("../../../src/eflow");
var TodoStore = /** @class */ (function (_super) {
    __extends(TodoStore, _super);
    function TodoStore(options) {
        var _this = _super.call(this, options) || this;
        _this.count = 0;
        _this.initState({
            todos: [],
            filterTodos: [],
            filter: 'All'
        });
        return _this;
    }
    TodoStore.prototype.addTodo = function (text) {
        var dispatch = this.dispatch;
        this.dispatch({ request: true });
        dispatch({ request: false });
        this.todos({
            text: text,
            id: ++this.count,
            completed: false
        });
    };
    TodoStore.prototype.todos = function (todo) {
        var todos = this.data();
        todos.push(todo);
        this.dispatch(todos);
    };
    TodoStore.prototype.editTodo = function (_todo) {
        var todos = this.data();
        todos.some(function (todo) {
            if (_todo.id == todo.id) {
                todo.text = _todo.text;
                return true;
            }
        });
        this.dispatch(todos);
    };
    TodoStore.prototype.toggleTodo = function (id) {
        var todos = this.data();
        todos.some(function (todo, index) {
            if (id == todo.id) {
                //注意替换新值
                todos[index] = __assign({}, todo, { completed: !todo.completed });
                return true;
            }
        });
        this.dispatch(todos);
    };
    TodoStore.prototype.deleteTodo = function (id) {
        var todos = this.data();
        todos = todos.filter(function (todo) {
            return todo.id !== id;
        });
        this.dispatch(todos);
    };
    TodoStore.prototype.showAll = function () {
        this.filter('All');
    };
    TodoStore.prototype.showActive = function () {
        this.filter('Active');
    };
    TodoStore.prototype.showCompleted = function () {
        this.filter('Completed');
    };
    TodoStore.prototype.filter = function (filter) {
        this.dispatch(filter);
    };
    TodoStore.prototype.filterTodos = function (dispatch, _todos) {
        var todos = this.data();
        var filter = this.data(this.filter);
        var filterTodos = this.getTodos(todos, filter);
        this.dispatch(filterTodos);
    };
    TodoStore.prototype.testTodos = function (_todos) {
        this.testTodosDone = true;
        var todos = this.data();
        var filter = this.data(this.filter);
        var filterTodos = this.getTodos(todos, filter);
        this.dispatch(filterTodos);
    };
    TodoStore.prototype.getTodos = function (todos, filter) {
        switch (filter) {
            case 'All':
                return todos;
            case 'Completed':
                return todos.filter(function (t) { return t.completed; });
            case 'Active':
                return todos.filter(function (t) { return !t.completed; });
            default:
                throw new Error('Unknown filter: ' + filter);
        }
    };
    TodoStore.prototype.operateTodos = function (prevDispatchCallback, dispatchCallback) {
        var dispatch = this.dispatch(this.todos), data = this.data, todos = this.data(this.todos), length = todos.length;
        this.data(this.addTodo, { request: true });
        this.data(this.addTodo, { request: false });
        this.data(this.addTodo, { request: true });
        for (var i = 0; i < length; i++) {
            if (i < length / 2) {
                todos[i] = __assign({}, todos[i], { completed: !todos[i].completed });
                data(this.todos, todos);
            }
            else {
                todos.pop();
                data(this.todos, todos);
            }
        }
        prevDispatchCallback && prevDispatchCallback.call(this, this.updateQueue, todos);
        this.dispatch(todos);
        dispatchCallback && dispatchCallback.call(this, this.updateQueue, todos);
    };
    TodoStore.prototype.testDispatchUsedParam = function () {
        this.dispatch([{
                text: 'testDispatchUsedParam',
                id: ++this.count
            }]);
    };
    TodoStore.prototype.testObject = function () {
        var dispatch = this.dispatch;
        dispatch({});
    };
    __decorate([
        eflow_1.data('todos'),
        eflow_1.dispatch('todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "toggleTodo", null);
    __decorate([
        eflow_1.data('todos'),
        eflow_1.dispatch('todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "deleteTodo", null);
    __decorate([
        eflow_1.data('todos'),
        eflow_1.param('todos.data'),
        eflow_1.dispatch,
        eflow_1.flowFrom('filter', 'todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Array]),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "filterTodos", null);
    __decorate([
        eflow_1.data('todos'),
        eflow_1.flowFrom('filter', 'todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "testTodos", null);
    __decorate([
        eflow_1.dispatch('todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Function, Function]),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "operateTodos", null);
    __decorate([
        eflow_1.dispatch('todos'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TodoStore.prototype, "testDispatchUsedParam", null);
    return TodoStore;
}(eflow_1.Store));
var todoStore1 = new TodoStore();
exports.todoStore1 = todoStore1;
var todoStore2 = new TodoStore();
exports.todoStore2 = todoStore2;
var todoStore3 = new TodoStore();
exports.todoStore3 = todoStore3;
var todoStore4 = new TodoStore();
exports.todoStore4 = todoStore4;
todoStore4.testDispatchUsedParam();
todoStore4.testObject();
todoStore4.getState();
exports.default = new TodoStore();
