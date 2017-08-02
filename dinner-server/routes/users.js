var express = require('express');
var router = express.Router();
var mysql = app.get("mysql");
var common = require('../utils/common');

/* GET users listing. */
router.post('/reset', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var uid = req.body.uid;

    if(!password){
        return res.send({code:400,msg:'缺少参数'});
    }

    var sql = 'update users set password=?';
    var cons = [password];
    if(name){
        sql += ',name=?';
        cons.push(name);
    }
    sql += ' where id=?';
    cons.push(uid);
    mysql.query(sql, cons,function (err,data) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        return res.send({code:200,msg:'修改成功'});
    });
});

router.post('/login', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;

    var sql = 'select * from users where account=? and password=?';
    mysql.query(sql, [account,password],function (err,data) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        if(data.length > 0){
            var user = data[0];
            req.session.uid = user.id;
            req.session.account = user.account;
            return res.send({code:200,msg:'登录成功',data:{uid:user.id,name:user.name}});
        }else{
            return res.send({code:400,msg:'用户名或者密码错误'});
        }
    });

});

router.post('/register', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    var name = req.body.name;

    var sql = 'select * from users where account=?';
    mysql.query(sql, [account,password],function (err,data) {
        if(err){
            return res.send({code:400,msg:err.toLocaleString()});
        }
        if(data.length > 0){
            return res.send({code:400,msg:'用户名已存在'});
        }
        var sql = 'insert into users(account,password,name,create_time) values(?,?,?,?)';
        mysql.query(sql, [account,password,name,common.dateFormat()],function (err,data) {
            if(err){
                return res.send({code:400,msg:err.toLocaleString()});
            }
            return res.send({code:200,msg:'注册成功'});
        });

    });

});
module.exports = router;
