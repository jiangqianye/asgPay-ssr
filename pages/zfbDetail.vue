<template>
  <div class="zfbDeail">
    <img
      src="~/static/zfbImg/close.png"
      alt=""
      class="alipayClose"
      @click="ShowZfbModal()"
    />
    <img src="~/static/zfbImg/zfbTop.png" alt="" width="100%" />
    <div class="alipayDetailContent">
      <div>
        <img src="~/static/zfbImg/qipao.png" alt="" class="titleImg" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle">支付时请勿在VPN网络下操作</p>
          <p class="alipayDetailTitle2">
            请先检查是否正在使用VPN,若正在使用VPN网络,请先关闭VPN后再次尝试
          </p>
        </div>
      </div>
      <div style="height: 30px">
        <img src="~/static/zfbImg/qipao.png" alt="" class="titleImg" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle">跳到支付宝网页,点击付款无反应</p>
        </div>
      </div>
      <div style="height: 3.57rem">
        <img src="~/static/zfbImg/t1.png" alt="" class="titleImg2" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle2">
            请尝试切换您当前网络(WI-FI切换到4G或4G切换到WI-FI),再次尝试支付
          </p>
        </div>
      </div>
      <div>
        <img src="~/static/zfbImg/t2.png" alt="" class="titleImg2" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle">
            若您未安装支付宝APP或切换网络依然无法跳转
          </p>
          <p class="alipayDetailTitle2">
            请点击支付宝网页中的“继续浏览器付款”按钮,使用网页付款
          </p>
          <img src="~/static/zfbImg/shiyi.png" alt="" width="290" />
        </div>
      </div>
      <div>
        <img src="~/static/zfbImg/qipao.png" alt="" class="titleImg" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle">海外用户</p>
          <p class="alipayDetailTitle2">
            若您当前在海外,使用非中国大陆地区网络,支付会稍有延迟,请耐心等待
          </p>
          <p class="alipayDetailTitle2">
            若超过10秒钟还没有反应,请尝试切换您当前的网络(WI-FI切换到4G或4G切换到WI-FI),再次尝试支付
          </p>
        </div>
      </div>
      <div>
        <img src="~/static/zfbImg/qipao.png" alt="" class="titleImg" />
        <div class="alipayDetailTitleDiv">
          <p class="alipayDetailTitle">若有其他支付问题,请联系在线客服</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    ShowZfbModal() {
      this.$parent.modal_zfbDetail = false;
    },
  },
};
</script>

<style scoped></style>
