import moment from 'moment';
/**
 * 格式化时间戳
 * @param val
 * @returns {string}
 */

export const time = (val)=>{
    if(!val) return '';
    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - val; // 参数时间戳与当前时间戳相差秒数
    var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
    var tmDate = new Date( val * 1000 );  // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
    if ( timestampDiff < 60 ) { // 一分钟以内
        return "刚刚";
    } else if( timestampDiff < 3600 ) { // 一小时前之内
        return Math.floor( timestampDiff / 60 ) + "分钟前";
    } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
        return '今天' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
    } else {
        var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
        if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
            return '昨天' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        } else if ( curDate.getFullYear() == Y ) {
            return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        } else {
            return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i) + ':' + zeroize(s);
        }
    }
}

export const timeD = (val)=>{
    if (!val) return ''
    return moment.unix(val).format('YYYY-MM-DD'); // 这是时间戳转时间
}
export const timeS = (val)=>{
    if (!val) return ''
    return moment.unix(val).format('YYYY-MM-DD HH:mm:ss'); // 这是时间戳转时间
}

export const timeP = (val,param)=>{
    if (!val) return ''
    return moment.unix(val).format(param); // 这是时间戳转时间
}


function zeroize( num ) {
    return (String(num).length == 1 ? '0' : '') + num;
}