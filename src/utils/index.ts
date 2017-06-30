import { IUserForRoom, IUserMini } from 'swagchat-sdk';

export function dateHumanize(ISO3339: string): string {
  const nowDate = new Date();
  const itemDate = new Date(ISO3339);
  const nowYYYYMMDD = nowDate.getFullYear() + '-' + nowDate.getMonth()  + '-' +  nowDate.getDate();
  const itemYYYYMMDD = itemDate.getFullYear()  + '-' +  itemDate.getMonth()  + '-' +  itemDate.getDate();
  if (nowYYYYMMDD === itemYYYYMMDD) {
    return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
  } else {
    const dayList = ['日', '月', '火', '水', '木', '金', '土'];
    return  dayList[new Date().getDay()];
  }
}

export function dateFormateHHMM(ISO3339: string): string {
  const itemDate = new Date(ISO3339);
  return itemDate.getHours() + ':' + ('00' + itemDate.getMinutes()).slice(-2);
}

export function dateFormateMMDD(ISO3339: string): string {
  const itemDate = new Date(ISO3339);
  return (itemDate.getMonth() + 1) + '/' + itemDate.getDate();
}

export function date2ISO3339String(date: Date) {
  function pad(n: any) {
    return n < 10 ? '0' + n : n;
  }
  return date.getUTCFullYear() + '-'
    + pad(date.getUTCMonth() + 1) + '-'
    + pad(date.getUTCDate()) + 'T'
    + pad(date.getUTCHours()) + ':'
    + pad(date.getUTCMinutes()) + ':'
    + pad(date.getUTCSeconds()) + 'Z';
}

export function opponentUser(users: IUserForRoom[] | IUserMini[], myUserId: string): (IUserForRoom[] | null) {
  let userForRooms = new Array;
  (users as IUserForRoom[]).forEach((user) => {
    if (user.userId !== myUserId) {
      userForRooms.push(user);
    }
  });
  return userForRooms;
}