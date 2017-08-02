/**
 * Created by taiguangyin on 17/8/2.
 */
/**
 * Created by GuangYin on 2016-09-12.
 */

/**
 * 时间格式转换辅助方法
 * @param   {date}      date
 * @param   {String}    fmt格式
 * @return  {Array}     数组
 */
function dateFormat(date, fmt) {
    if(!date){
        date = new Date();
    }
    if(!fmt){
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function randomNum(len) {
    len = len || 6;
    var $chars = '0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

exports.dateFormat = dateFormat;
exports.randomNum = randomNum;