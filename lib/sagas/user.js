"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var swagchat_sdk_1 = require("swagchat-sdk");
var user_1 = require("../actions/user");
var client_1 = require("../actions/client");
function authUser() {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return swagchat_sdk_1.User.auth({
                            apiKey: state.user.apiKey,
                            apiEndpoint: state.user.apiEndpoint,
                            realtimeEndpoint: state.user.realtimeEndpoint,
                            userId: state.user.userId,
                            accessToken: state.user.accessToken,
                        });
                    })];
            case 2:
                res = _a.sent();
                if (!res.user) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(client_1.setClientActionCreator(res.user._client))];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(res.user))];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(res.error))];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
function fetchContacts() {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function () {
                        return state.user.user.getContacts();
                    })];
            case 2:
                res = _a.sent();
                if (!res.users) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(user_1.contactsFetchRequestSuccessActionCreator(res.users))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.contactsFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function fetchUser(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (userId, accessToken) {
                        return state.client.client.getUser(userId, accessToken);
                    }, action.userId, action.accessToken)];
            case 2:
                res = _a.sent();
                if (!res.user) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(user_1.userFetchRequestSuccessActionCreator(res.user))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.userFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function markAsRead(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (roomId) {
                        return state.user.user.markAsRead(roomId);
                    }, action.roomId)];
            case 2:
                res = _a.sent();
                if (!res.error) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestFailureActionCreator(res.error))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.markAsReadRequestSuccessActionCreator())];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function fetchUserBlock(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (blockUserIds) {
                        return state.user.user.addBlockUsers(blockUserIds);
                    }, action.blockUserIds)];
            case 2:
                res = _a.sent();
                if (!res.blockUsers) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(user_1.userBlockFetchRequestSuccessActionCreator(res.blockUsers))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.userBlockFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function fetchUserUnBlock(action) {
    var state, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                return [4 /*yield*/, effects_1.call(function (blockUserIds) {
                        return state.user.user.removeBlockUsers(blockUserIds);
                    }, action.blockUserIds)];
            case 2:
                res = _a.sent();
                if (!res.blockUsers) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.put(user_1.userUnBlockFetchRequestSuccessActionCreator(res.blockUsers))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, effects_1.put(user_1.userUnBlockFetchRequestFailureActionCreator(res.error))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
function userSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(user_1.USER_AUTH_REQUEST, authUser)];
            case 1:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(user_1.CONTACTS_FETCH_REQUEST, fetchContacts)];
            case 2:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(user_1.USER_FETCH_REQUEST, fetchUser)];
            case 3:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(user_1.MARK_AS_READ_REQUEST, markAsRead)];
            case 4:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(user_1.USER_BLOCK_FETCH_REQUEST, fetchUserBlock)];
            case 5:
                _a.sent();
                return [4 /*yield*/, effects_1.takeLatest(user_1.USER_UNBLOCK_FETCH_REQUEST, fetchUserUnBlock)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.userSaga = userSaga;
//# sourceMappingURL=user.js.map