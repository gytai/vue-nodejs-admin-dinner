<template>
    <div>
        <Breadcrumb>
            <Breadcrumb-item href="#">系统管理</Breadcrumb-item>
            <Breadcrumb-item>修改密码</Breadcrumb-item>
        </Breadcrumb>
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" style="width: 350px;margin-top: 20px;">
            <Form-item label="密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </Form-item>
            <Form-item label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </Form-item>
            <Form-item label="姓名" prop="age">
                <Input type="text" v-model="formCustom.name"></Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    name: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var url = this.baseServerUrl + '/users/reset';
                        var data = {
                            uid:localStorage.getItem('uid'),
                            name:this.formCustom.name,
                            password:this.formCustom.passwd,
                        };
                        var _self = this;
                        this.$ajax.post(url,data)
                            .then(function(res){
                                if(res.data.code == 200){
                                    _self.$Message.success('修改成功!');
                                }else{
                                    _self.$Message.error(res.data.msg);
                                }
                            })
                            .catch(function(err){
                                _self.$Message.error('修改异常!');
                            });
                    } else {
                        this.$Message.error('请填写正确的内容!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
