import { pipe } from './pipe'
import { pick } from './pick'

const htmlDecode = input => {
  let e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

const dateToString = timeStamp => (new Date(timeStamp).toLocaleString());
const dateToTimeStamp = date => (new Date(date).getTime());

const dateToTimeAgo = timeStamp => {
  timeStamp = parseInt(timeStamp);
  const currentTime = Date.now();
  const timeAgo = Math.round((currentTime - timeStamp)/3600000)

  return (timeAgo<=0)
      ? '不久前' 
      : (timeAgo<24)
          ? timeAgo+'小時前' 
          : (timeAgo>=24)
              ? Math.round((timeAgo/24))+'天前'
              : dateToString(timeStamp).substring(5,5);
}
const is_url = url => (/^(http(s)?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(url)? url : false)

export {
  pipe, pick,
  htmlDecode,
  dateToString,
  dateToTimeStamp,
  dateToTimeAgo,
  is_url,
}