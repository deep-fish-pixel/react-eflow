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
/**
 * Created by mawei on 17/8/11.
 */
var React = require("react");
var eflow_1 = require("../../../src/eflow");
var TodoStore_1 = require("../store/TodoStore");
var TodoItem_1 = require("./TodoItem");
var TodoList = /** @class */ (function (_super) {
    __extends(TodoList, _super);
    function TodoList(props) {
        return _super.call(this, props) || this;
    }
    TodoList.prototype.componentWillMount = function () {
    };
    TodoList.prototype.render = function () {
        var filterTodos = this.props.filterTodos;
        var todoViews = filterTodos && filterTodos.map(function (todo) {
            return (React.createElement(TodoItem_1.default, { todo: todo }));
        });
        return (React.createElement("ul", null, todoViews));
    };
    TodoList = __decorate([
        eflow_1.wrapComponent([TodoStore_1.default.filterTodos], function aaa() {
            return {};
        }),
        __metadata("design:paramtypes", [Object])
    ], TodoList);
    return TodoList;
}(React.Component));
//export default wrapComponent(TodoList, [todoStore.filterTodos]);
exports.default = TodoList;
