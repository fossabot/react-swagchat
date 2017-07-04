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
var React = require("react");
var ReactDom = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var react_router_redux_1 = require("react-router-redux");
var react_redux_1 = require("react-redux");
var setting_1 = require("../actions/setting");
var message_1 = require("../actions/message");
var combined_1 = require("../actions/combined");
var stores_1 = require("../stores");
var _1 = require("../containers/");
var RouteRoomSettingPage = (function (_super) {
    __extends(RouteRoomSettingPage, _super);
    function RouteRoomSettingPage(props, context) {
        var _this = _super.call(this, props, context) || this;
        stores_1.store.dispatch(message_1.clearMessagesActionCreator());
        stores_1.store.dispatch(setting_1.setRoomSettingTitleActionCreator(props.route ? props.route.roomSettingTitle : props.roomSettingTitle));
        stores_1.store.dispatch(setting_1.setRoomMembersTitleActionCreator(props.route ? props.route.roomMembersTitle : props.roomMembersTitle));
        stores_1.store.dispatch(combined_1.combinedUserAndRoomFetchRequestActionCreator(props.route ? props.route.apiKey : props.apiKey, props.route ? props.route.apiEndpoint : props.apiEndpoint, props.route ? props.route.realtimeEndpoint : props.realtimeEndpoint, props.route ? props.route.userId : props.userId, props.route ? props.route.userAccessToken : props.userAccessToken, props.params.roomId));
        return _this;
    }
    RouteRoomSettingPage.prototype.render = function () {
        return (React.createElement(react_redux_1.Provider, { store: stores_1.store },
            React.createElement(react_router_redux_1.ConnectedRouter, { history: stores_1.routerHistory },
                React.createElement(react_router_dom_1.Route, { exact: true, path: "", component: _1.ContainerRoomSettingPage }))));
    };
    return RouteRoomSettingPage;
}(React.Component));
exports.RouteRoomSettingPage = RouteRoomSettingPage;
exports.renderRoomSetting = function (params) {
    ReactDom.render(React.createElement(RouteRoomSettingPage, { roomSettingTitle: params.roomSettingTitle, roomMembersTitle: params.roomMembersTitle, renderDomId: params.renderDomId, apiKey: params.apiKey, apiEndpoint: params.apiEndpoint, realtimeEndpoint: params.realtimeEndpoint, userId: params.userId, userAccessToken: params.userAccessToken }), document.getElementById(params.renderDomId));
};
//# sourceMappingURL=RouteRoomSettingPage.js.map