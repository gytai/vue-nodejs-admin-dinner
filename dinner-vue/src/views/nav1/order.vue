<style scoped>
    .order_table{
        margin-top: 15px;
    }
    .orderBtn{
        margin-top: 15px;
    }
</style>
<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <Breadcrumb-item href="#">订餐管理</Breadcrumb-item>
                <Breadcrumb-item>预定晚餐</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <div>

        </div>
        <Button type="primary" v-on:click="order()" class="orderBtn">预定晚餐</Button>
        <Table  :columns="columns" :data="data" class="order_table"></Table>
        <div style="margin-top: 10px;">今日订餐人数：{{num}} 人</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '订餐时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.cancel(params.index);
                                        }
                                    }
                                }, '取消预定')
                            ]);
                        }
                    }
                ],
                data: this.getTodayOrder(),
                nav_name:'预定晚餐',
                type:1,
                num:0
            }
        },
        methods: {
            order:function () {
                var _self = this;
                var url = this.baseServerUrl + '/order';
                this.$ajax.post(url,{'uid':localStorage.getItem('uid')})
                    .then(function (res) {
                       if(res.data.code == 200){
                           var data = {
                               uid:localStorage.getItem('uid'),
                               name:localStorage.getItem('name'),
                               time:_self.Util.dateFormat(new Date( ))
                           }
                           _self.data.push(data);
                           _self.num += 1;
                           _self.$Message.success('预定成功!');
                       }else{
                           _self.$Message.error(res.data.msg);
                       }
                    })
                    .catch(function (error) {
                        _self.$Message.error('登录异常!');
                    });
            },
            cancel:function (index) {
                var _self = this;
                this.$Modal.confirm({
                    title: '取消订餐',
                    content: '<p>是否确认取消订餐？</p>',
                    onOk: () => {
                        if(localStorage.getItem('uid') == this.data[index].uid){
                           var url = this.baseServerUrl + '/cancel';
                            _self.$ajax.post(url,{'uid':localStorage.getItem('uid')})
                               .then(function (res) {
                                   if(res.data.code == 200){
                                       _self.data.splice(index,1);
                                       _self.num -= 1;
                                       _self.$Message.success('取消成功!');
                                   }else{
                                       _self.$Message.error(res.data.msg);
                                   }
                               })
                               .catch(function (error) {
                                   _self.$Message.error('登录异常!');
                               });
                       }else{
                           _self.$Message.error('不能取消别人的订餐!');
                       }
                    }
                });
            },
            getTodayOrder:function () {
                var _self = this;
                var url = this.baseServerUrl + '/get';
                var data = {type:this.type};
                this.$ajax.get(url,data)
                    .then(function (res) {

                        res.data.data.map(function (obj) {
                            obj.time = _self.Util.dateFormat(new Date(obj.time ));
                        });
                        _self.data = res.data.data;
                        _self.num = res.data.data.length;
                    })
                    .catch(function (error) {
                        _self.data =  [];
                    });
            }
        }
    };


</script>
