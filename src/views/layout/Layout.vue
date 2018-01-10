<template>
  <el-container style="height:100%;">
    <el-aside style="width:250px;">
      <div class="mvc-slider">
        <div class="mvc-slider-logo"></div>
        <el-menu
          class="mvc-slider-menu"
          default-active="1"
          @open="handleOpen"
          @close="handleClose"
          background-color="#2d3a4b"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <router-link :to="{path:'/myMoney'}" tag="span" exact>我的资金</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <router-link :to="{path:'/clearMoney'}" tag="span" exact>清退货币</router-link>
          </el-menu-item>
        </el-menu>
        <div class="mvc-slider-private">
          <el-dropdown placement="top">
            <span class="mvc-dropdown-link">
              <i class="el-icon-arrow-up el-icon--right"></i>账号：{{username.cellphone}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{path: '/changePwd'}">修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="{path: '/changePhone'}">修改手机</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header class="mvc-header">
        <el-breadcrumb separator="/" class="mvc-header-bread">
          <el-breadcrumb-item v-if="k>0" v-for="(v, k) in $route.matched" :key="k" :to="{ path: v.path}">{{v.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="mvc-header-handler">
          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">退出</el-menu-item>
            <el-menu-item index="3" class="back-style"><a href="#">返回首页</a></el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>

        <transition name="fade" mode="out-in">
          <!-- <router-view :key="key"></router-view> -->
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { removeToken } from '../../utils/auth'

  export default {
    name: 'layout',
    data() {
      return {
        username: window.sessionStorage.getItem('mvcUser') ? JSON.parse(window.sessionStorage.getItem('mvcUser')) : ''
      }
    },
    methods: {
      handleOpen() {
      },
      handleClose() {
      },
      handleSelect(v) {
        if (v === '1') {
          removeToken()
          this.$router.replace('/login')
        }
      }
    },
    mounted() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "./index";
</style>
