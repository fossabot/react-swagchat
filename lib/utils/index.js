"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dateHumanize(ISO3339) {
    var nowDate = new Date();
    var itemDate = new Date(ISO3339);
    var nowYYYYMMDD = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate();
    var itemYYYYMMDD = itemDate.getFullYear() + '-' + itemDate.getMonth() + '-' + itemDate.getDate();
    if (nowYYYYMMDD === itemYYYYMMDD) {
        return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
    }
    else {
        var dayList = ['日', '月', '火', '水', '木', '金', '土'];
        return dayList[new Date().getDay()];
    }
}
exports.dateHumanize = dateHumanize;
function dateFormateHHMM(ISO3339) {
    var itemDate = new Date(ISO3339);
    return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
}
exports.dateFormateHHMM = dateFormateHHMM;
function dateFormateMMDD(ISO3339) {
    var itemDate = new Date(ISO3339);
    return (itemDate.getMonth() + 1) + '/' + itemDate.getDate();
}
exports.dateFormateMMDD = dateFormateMMDD;
function date2ISO3339String(date) {
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return date.getUTCFullYear() + '-'
        + pad(date.getUTCMonth() + 1) + '-'
        + pad(date.getUTCDate()) + 'T'
        + pad(date.getUTCHours()) + ':'
        + pad(date.getUTCMinutes()) + ':'
        + pad(date.getUTCSeconds()) + 'Z';
}
exports.date2ISO3339String = date2ISO3339String;
function opponentUser(users, myUserId) {
    var userForRooms = new Array;
    users.forEach(function (user) {
        if (user.userId !== myUserId) {
            userForRooms.push(user);
        }
    });
    return userForRooms;
}
exports.opponentUser = opponentUser;
//# sourceMappingURL=index.js.map