<template>
    <Card style="width:350px;margin: 0 auto;margin-top: 150px;">
        <p slot="title" style="text-align: center;">
           登录
        </p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <Form-item prop="user">
                <Input type="text" v-model="formInline.user" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item style="text-align: center;">
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                <Button type="primary"  @click="modal = true">注册</Button>
            </Form-item>
        </Form>
        <Modal v-model="modal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>用户注册</span>
            </p>
            <div style="text-align:center">
                <Form :model="formLeft" label-position="left" ref="formLeft" :label-width="100" :rules="ruleLeft">
                    <Form-item label="账户" prop="account">
                        <Input v-model="formLeft.account" placeholder="账户"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="password">
                        <Input type="password" v-model="formLeft.password" placeholder="密码"></Input>
                    </Form-item>
                    <Form-item label="姓名" prop="name">
                        <Input v-model="formLeft.name" placeholder="姓名"></Input>
                    </Form-item>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="success" size="large" @click="register('formLeft')">注册</Button>
            </div>
        </Modal>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                modal: false,
                formInline: {
                    user: '',
                    password: ''
                },
                formLeft: {
                    account: '',
                    name: '',
                    password:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                ruleLeft: {
                    account: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url = this.baseServerUrl + '/users/login';
                        var data = {
                            withCredentials:true,
                            account:this.formInline.user,
                            password:this.formInline.password,
                        };
                        var _self = this;
                        this.$ajax.post(url,data)
                            .then(function(res){
                                if(res.data.code == 200){
                                    _self.$Message.success('登录成功!');
                                    localStorage.setItem('uid',res.data.data.uid);
                                    localStorage.setItem('name',res.data.data.name);
                                    _self.$router.push('/index/order');
                                }else{
                                    _self.$Message.error(res.data.msg);
                                }
                            })
                            .catch(function(err){
                                _self.$Message.error('登录异常!');
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            },
            register (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url = this.baseServerUrl + '/users/register';
                        var data = {
                            name:this.formLeft.name,
                            account:this.formLeft.account,
                            password:this.formLeft.password,
                        };
                        var _self = this;
                        this.$ajax.post(url,data)
                            .then(function(res){
                                if(res.data.code == 200){
                                    _self.$Message.success('注册成功!');
                                    setTimeout(function () {
                                        _self.modal = false;
                                    },1000);
                                }else{
                                    _self.$Message.error(res.data.msg);
                                }
                            })
                            .catch(function(err){
                                _self.$Message.error('注册异常!');
                            });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            }
        }
    };
</script>
