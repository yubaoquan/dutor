<template>
  <my-toast ref="toastRef"></my-toast>
  <common-header></common-header>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';
import MyToast from './components/my-toast.vue';
import commonHeader from './components/common-header.vue';

const toastRef = ref<any>(null);

const toast = (msg: string) => toastRef.value.toast(msg);
provide('toast', toast);
</script>

<style lang="less" scoped></style>
