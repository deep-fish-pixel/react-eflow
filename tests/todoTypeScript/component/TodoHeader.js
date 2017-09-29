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
var TodoHeader = /** @class */ (function (_super) {
    __extends(TodoHeader, _super);
    function TodoHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.enterDown = _this.enterDown.bind(_this);
        _this.change = _this.change.bind(_this);
        _this.state = {
            value: ''
        };
        return _this;
    }
    TodoHeader.prototype.simulateEnterDown = function (value) {
        if (value) {
            TodoStore_1.default.addTodo(value);
            this.setState({
                value: ''
            });
        }
    };
    TodoHeader.prototype.enterDown = function (event) {
        var value = this.state.value;
        if (event.keyCode === 13 && value) {
            TodoStore_1.default.addTodo(value);
            this.setState({
                value: ''
            });
        }
    };
    TodoHeader.prototype.change = function (event) {
        this.setState({
            value: event.target.value
        });
    };
    TodoHeader.prototype.render = function () {
        var request = this.props.addTodo;
        return (React.createElement("div", null,
            React.createElement("input", { value: this.state.value, onKeyDown: this.enterDown, onChange: this.change })));
    };
    return TodoHeader;
}(React.Component));
exports.default = TodoHeader;
