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
var TodoHeader_1 = require("./TodoHeader");
var TodoList_1 = require("./TodoList");
var TodoFooter_1 = require("./TodoFooter");
var TodoIndex = /** @class */ (function (_super) {
    __extends(TodoIndex, _super);
    function TodoIndex(props) {
        return _super.call(this, props) || this;
    }
    TodoIndex.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(TodoHeader_1.default, null),
            React.createElement(TodoList_1.default, null),
            React.createElement(TodoFooter_1.default, null)));
    };
    return TodoIndex;
}(React.Component));
exports.default = TodoIndex;
