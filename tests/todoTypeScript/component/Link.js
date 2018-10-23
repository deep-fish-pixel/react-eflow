"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TodoStore_1 = require("../store/TodoStore");
var eflow_1 = require("../../../src/eflow");
var Link = function (_a) {
    var filter = _a.filter, active = _a.active, children = _a.children, onClick = _a.onClick;
    if (active) {
        return React.createElement("span", null, children);
    }
    return (
    // eslint-disable-next-line
    React.createElement("a", { href: "#", onClick: function (e) {
            e.preventDefault();
            onClick();
        } }, children));
};
//export default Link;
exports.default = eflow_1.wrapComponent(Link, [TodoStore_1.default.filter], function (state, oldProps) {
    return {
        //此时返回值值在组件Link的props中对应名称即为active和onClick
        active: state.filter === oldProps.filter,
        onClick: function () {
            TodoStore_1.default.filter(oldProps.filter);
        }
    };
});
