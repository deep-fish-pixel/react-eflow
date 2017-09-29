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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by mawei on 17/8/11.
 */
var React = require("react");
var TodoStore_1 = require("../store/TodoStore");
var TodoItem = /** @class */ (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TodoItem.prototype.render = function () {
        var props = this.props, todo = props.todo, completed = todo.completed;
        return (React.createElement("li", null,
            React.createElement("span", { style: { 'textDecoration': completed ? 'line-through' : 'none' }, onClick: function () {
                    TodoStore_1.default.toggleTodo(todo.id);
                } }, todo && todo.text),
            React.createElement("span", { style: { marginLeft: 10 }, onClick: function () {
                    TodoStore_1.default.deleteTodo(todo.id);
                } }, "delete")));
    };
    return TodoItem;
}(React.Component));
exports.default = TodoItem;
