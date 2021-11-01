<template>
  <div>
    <div v-if="modalSwich" class="modal">
      <div class="modal_content">
        <h3>
          银行卡收款
          <img src="~/static/bank_close.png" alt="" @click="ClossMoalEvent()" />
        </h3>
        <p>1、请复制收款账号和收款人,使用<span>手机银行转账支付</span></p>
        <p>2、转账前如有任何问题<span>请咨询客服</span></p>
        <p>3、<span>转账后请联系客服确认,</span>以确保充值成功</p>
        <div class="model_content_bottom">
          <div class="model_content_bottom_detail">
            <label>本人姓名</label>
            <input
              class="modalBankInputName"
              type="text"
              placeholder="请填写与您银行卡一致的真实姓名"
              v-model="selectPayData.name"
            />
          </div>
          <div class="model_content_bottom_detail">
            <label>银行卡号</label>
            <input
              class="bank_input"
              readonly="readonly"
              type="text"
              :value="selectPayData.cardNumber"
            />
            <span class="copySpan" @click="SaveParamModal('bank_input')"
              >复制</span
            >
          </div>
          <div class="model_content_bottom_detail">
            <label>开户姓名</label>
            <input
              class="name_input"
              readonly="readonly"
              type="text"
              :value="selectPayData.payee"
            />
            <span class="copySpan" @click="SaveParamModal('name_input')"
              >复制</span
            >
          </div>
          <div class="model_content_bottom_detail">
            <label>充值金额</label>
            <input
              class="amount_input"
              readonly="readonly"
              type="text"
              :value="selectPayData.moneySave"
            />
            <span class="copySpan" @click="SaveParamModal('amount_input')"
              >复制</span
            >
          </div>
          <div class="model_content_bottom_detail">
            <label>收款银行</label>
            <input
              class="bank_input"
              readonly="readonly"
              type="text"
              :value="selectPayData.bankName"
            />
          </div>
          <div class="model_content_bottom_detail">
            <label>入款时间</label>
            <span class="span_input">{{ getCurrentTime() }}</span>
          </div>
        </div>
        <div class="btnClass btnBgRed" @click="CloseBankModal()">
          完成转账 提交凭证
        </div>
      </div>
    </div>
    <!-- 提交凭证 -->
    <div v-if="modalSwichOk" class="modal">
      <div class="modalBankSuccessContent">
        <p v-if="modalSwichOk === 1">凭证已提交，请联系客服</p>
        <p v-if="modalSwichOk === 2">凭证提交失败，请联系客服</p>
        <div class="btnClass btnBgRed" @click="ClossMoalEvent()">我知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectPayData: {}, // 选中的金额数据
      modalSwich: false,
      modalSwichOk: 0, // 1-成功，2-失败
      userId: "",
    };
  },
  methods: {
    propsVal(val, val2) {
      this.selectPayData = val;
      this.userId = val2.userId;
      this.modalSwich = true;
    },
    // 保存复制值
    SaveParamModal(val) {
      const saveVal = document.getElementsByClassName(val)[0];
      saveVal.select();
      document.execCommand("Copy");
    },
    // 关闭银行卡弹窗
    CloseBankModal() {
      if (!this.selectPayData.name) {
        this.$parent.toolTipsFunc(900);
        return;
      }
      this.modalSwich = false;
      const obj = {
        amount: this.selectPayData.moneySave,
        remark: this.selectPayData.name,
        userId: this.userId,
        source: 3,
      };
      const that = this;
      that.$parent.loading = true;
      this.$axios.post("trade/makeOrder", obj).then((res) => {
        that.$parent.loading = false;
        if (res.code === 200) {
          this.modalSwichOk = 1;
        } else {
          this.modalSwichOk = 2;
        }
      });
    },
    ClossMoalEvent() {
      this.modalSwichOk = 0;
      this.modalSwich = false;
    },
    getCurrentTime() {
      //获取当前时间并打印
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      mm = mm < 10 ? "0" + mm : mm;
      let dd = new Date().getDate();
      dd = dd < 10 ? "0" + dd : dd;
      let hh = new Date().getHours();
      hh = hh < 10 ? "0" + hh : hh;
      let mf = new Date().getMinutes();
      mf = mf < 10 ? "0" + mf : mf;
      let ss = new Date().getSeconds();
      ss = ss < 10 ? "0" + ss : ss;
      _this.gettime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return _this.gettime;
    },
  },
};
</script>

<style scoped></style>
