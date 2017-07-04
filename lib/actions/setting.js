"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_SETTING = 'SET_SETTING';
exports.SET_ROOM_LIST_TITLE = 'SET_ROOM_LIST_TITLE';
exports.SET_ROOM_LIST_TABBAR = 'SET_ROOM_LIST_TABBAR';
exports.SET_NO_ROOM_LIST_TEXT = 'SET_NO_ROOM_LIST_TEXT';
exports.SET_NO_ROOM_LIST_IMAGE = 'SET_NO_ROOM_LIST_IMAGE';
exports.SET_NO_MESSAGE_TEXT = 'SET_NO_MESSAGE_TEXT';
exports.SET_NO_MESSAGE_IMAGE = 'SET_NO_MESSAGE_IMAGE';
exports.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT = 'SET_INPUT_MESSAGE_PLACEHOLDER_TEXT';
exports.SET_ROOM_SETTING_TITLE = 'SET_ROOM_SETTING_TITLE';
exports.SET_ROOM_MENBERS_TITLE = 'SET_ROOM_MENBERS_TITLE';
exports.setSettingActionCreator = function (setting) { return ({
    type: exports.SET_SETTING,
    setting: setting,
}); };
exports.setRoomListTitleActionCreator = function (roomListTitle) { return ({
    type: exports.SET_ROOM_LIST_TITLE,
    roomListTitle: roomListTitle,
}); };
exports.setRoomListTabbarActionCreator = function (roomListTabbar) { return ({
    type: exports.SET_ROOM_LIST_TABBAR,
    roomListTabbar: roomListTabbar,
}); };
exports.setNoRoomListTextActionCreator = function (noRoomListText) { return ({
    type: exports.SET_NO_ROOM_LIST_TEXT,
    noRoomListText: noRoomListText,
}); };
exports.setNoRoomListImageActionCreator = function (noRoomListImage) { return ({
    type: exports.SET_NO_ROOM_LIST_IMAGE,
    noRoomListImage: noRoomListImage,
}); };
exports.setNoMessageTextActionCreator = function (noMessageText) { return ({
    type: exports.SET_NO_MESSAGE_TEXT,
    noMessageText: noMessageText,
}); };
exports.setNoMessageImageActionCreator = function (noMessageImage) { return ({
    type: exports.SET_NO_MESSAGE_IMAGE,
    noMessageImage: noMessageImage,
}); };
exports.setInputMessagePlaceholderTextActionCreator = function (inputMessagePlaceholderText) { return ({
    type: exports.SET_INPUT_MESSAGE_PLACEHOLDER_TEXT,
    inputMessagePlaceholderText: inputMessagePlaceholderText,
}); };
exports.setRoomSettingTitleActionCreator = function (roomSettingTitle) { return ({
    type: exports.SET_ROOM_SETTING_TITLE,
    roomSettingTitle: roomSettingTitle,
}); };
exports.setRoomMembersTitleActionCreator = function (roomMembersTitle) { return ({
    type: exports.SET_ROOM_MENBERS_TITLE,
    roomMembersTitle: roomMembersTitle,
}); };
//# sourceMappingURL=setting.js.map