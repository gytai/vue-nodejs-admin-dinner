<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: auto;
        background: #fff;
        border-radius: 4px;
        height: 80%;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
        bottom: 0;
        width: 100%;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-menu-left a{
        color: white;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        text-align: center;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex" style="height: 100%;">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            订餐管理
                        </template>
                        <router-link to="/index/order"><Menu-item name="1-1"> 订餐预定</Menu-item></router-link>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad"></Icon>
                            系统设置
                        </template>
                        <router-link to="/index/reset"><Menu-item name="2-1">  修改密码</Menu-item></router-link>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <span>胜果订餐管理系统</span>
                    <Dropdown style="float: right;margin-right: 20px;margin-top: 20px;">
                        <a href="javascript:void(0)">
                            {{ name }}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                           <Dropdown-item >
                               <i-button type="text" @click="quitSys">
                                   <Icon type="log-out"></Icon>退出
                                </i-button>
                           </Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2017-2018 &copy; 邰广银
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                name:localStorage.getItem('name')
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            quitSys(){
                localStorage.setItem('uid','');
                localStorage.setItem('name','');
                this.$router.push('/');
            }
        }
    }
</script>