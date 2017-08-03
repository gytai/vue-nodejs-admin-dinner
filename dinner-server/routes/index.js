var express = require('express');
var router = express.Router();
var mysql = app.get("mysql");
var common = require('../utils/common');

router.get('/', function(req, res, next) {
   res.redirect('/index.html');
});

/* GET home page. */
router.get('/get', function(req, res, next) {
    var now = new Date();
    var start_time = common.dateFormat(now,'yyyy-MM-dd 00:00:00');
    var end_time = common.dateFormat(now,'yyyy-MM-dd 23:59:59');
    var sql = 'select a.uid,a.create_time as time,b.name from dinner a join users b on a.uid=b.id where a.create_time>? and a.create_time<?';
    mysql.query(sql, [start_time,end_time],function (err,data) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'获取成功',data:data});
    });
});

router.post('/order', function(req, res, next) {
    var uid = req.body.uid;
    if(!uid){
        return res.send({code:400,msg:'未登录'});
    }
    var now = new Date();
    if(now.getHours() >= 17){
        return res.send({code:400,msg:'超过五点不能预定'});
    }
    var start_time = common.dateFormat(now,'yyyy-MM-dd 00:00:00');
    var end_time = common.dateFormat(now,'yyyy-MM-dd 23:59:59');
    var sql = 'select * from dinner  where uid=? and create_time>? and create_time<?';
    mysql.query(sql, [uid,start_time,end_time],function (err,ret) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        if(ret.length > 0){
            return res.send({code:400,msg:'已经预定'});
        }
        var sql = 'insert into dinner(uid,create_time) values(?,?)';
        mysql.query(sql, [uid,common.dateFormat()],function (err,data) {
            if(err){
                return res.send({code:400,msg:err.toLocaleString()});
            }
            return res.send({code:200,msg:'预定成功'});
        });
    });
});

router.post('/cancel', function(req, res, next) {
    var uid = req.body.uid;
    if(!uid){
        return res.send({code:400,msg:'未登录'});
    }
    var now = new Date();
    if(now.getHours() >= 17){
        return res.send({code:400,msg:'超过五点不能取消预定'});
    }
    var start_time = common.dateFormat(now,'yyyy-MM-dd 00:00:00');
    var end_time = common.dateFormat(now,'yyyy-MM-dd 23:59:59');
    var sql = 'select * from dinner where uid=? and create_time>? and create_time<?';
    mysql.query(sql, [uid,start_time,end_time],function (err,data) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        if(data.length == 0){
            return res.send({code:400,msg:'未预定'});
        }
        var sql = 'delete from dinner where uid=? and create_time>? and create_time<?';
        mysql.query(sql, [uid,start_time,end_time],function (err,data) {
            if(err){
                return res.send({code:400,msg:err.toLocaleString()});
            }
            return res.send({code:200,msg:'取消预定成功'});
        });
    });
});

module.exports = router;
