<template>
  <div>
    <div v-if="!modal_zfbDetail" class="bodyContent">
      <!-- 支付类型 -->
      <ul class="header">
        <li
          v-if="bankList.length > 0"
          :class="selectHeader === 'bank' ? 'header_li h_active' : 'header_li'"
          @click="changePayType('bank')"
        >
          <span v-if="presentRate.BANK" class="h_topTips">{{
            presentRate.BANK
          }}</span>
          <img class="h_imgTop" src="~/static/header_bank.png" alt="" />
          <p>网银直充</p>
          <img class="h_imgBottom" src="~/static/header_selected.png" alt="" />
        </li>
        <li
          v-if="ALIPAYList.length > 0"
          :class="
            selectHeader === 'ALIPAY' ? 'header_li h_active' : 'header_li'
          "
          @click="changePayType('ALIPAY')"
        >
          <span v-if="presentRate.ALIPAY" class="h_topTips">{{
            presentRate.ALIPAY
          }}</span>
          <img class="h_imgTop" src="~/static/header_zfb.png" alt="" />
          <p>支付宝充值</p>
          <img class="h_imgBottom" src="~/static/header_selected.png" alt="" />
        </li>
        <li
          v-if="vipList.length > 0"
          :class="selectHeader === 'vip' ? 'header_li h_active' : 'header_li'"
          @click="changePayType('vip')"
        >
          <span v-if="presentRate.DY_PAY" class="h_topTips">{{
            presentRate.DY_PAY
          }}</span>
          <img class="h_imgTop" src="~/static/header_vip.png" alt="" />
          <p>VIP充值</p>
          <img class="h_imgBottom" src="~/static/header_selected.png" alt="" />
        </li>
        <li
          v-if="zfbQuickList.length > 0"
          :class="
            selectHeader === 'zfbQuick' ? 'header_li h_active' : 'header_li'
          "
          @click="changePayType('zfbQuick')"
        >
          <span v-if="presentRate.QUICK_ALIPAY" class="h_topTips">{{
            presentRate.QUICK_ALIPAY
          }}</span>
          <img class="h_imgTop" src="~/static/header_zfb.png" alt="" />
          <p>支付宝闪付</p>
          <img class="h_imgBottom" src="~/static/header_selected.png" alt="" />
        </li>
      </ul>

      <!-- 支付金额列表 -->
      <ul class="goldList">
        <!-- 银行卡支付列表+支付宝充值+支付宝闪付 -->
        <div
          v-if="
            selectHeader === 'bank' ||
            selectHeader === 'ALIPAY' ||
            selectHeader === 'zfbQuick'
          "
        >
          <div class="zfbTopTips" v-if="selectHeader === 'ALIPAY'">
            <img class="zfbImgLeft" src="~/static/zfbImg/tanhao.png" alt="" />
            <div>
              <h3>支付遇到问题？</h3>
              <p>无法唤起支付宝APP、点击支付无反应…</p>
            </div>
            <img
              class="zfbImgRight"
              src="~/static/zfbImg/jiantou.png"
              @click="ShowZfbModal()"
            />
          </div>
          <div class="zfbQuick_headerTips" v-if="selectHeader === 'zfbQuick'">
            <p>该支付为实时到帐，如充值3分钟仍未到帐</p>
            <p>请点击页面右上角24小时人工客服处理</p>
          </div>
          <li
            :class="
              selectPayData.chargeGoldCoin === item.chargeGoldCoin
                ? ' goldList_li payList_active'
                : ' goldList_li'
            "
            v-for="item in bank_zfb_List"
            :key="item.chargeGoldCoin"
            @click="selectedEvent(item)"
          >
            <img src="~/static/gold.png" alt="" />
            <span>{{ item.chargeGoldCoin }}金币</span>
            <span v-if="selectHeader === 'zfbQuick'" class="money"
              >￥{{ item.chargeAmount }}</span
            >
            <span v-else class="money">￥{{ item.chargeGoldCoin / 10 }}</span>
          </li>
        </div>

        <!-- vip支付列表 -->
        <div v-if="selectHeader === 'vip'">
          <div class="vipTopTips">
            <div class="vipBtn btnClass btnBgRed" @click="refreshVipUrl()">
              若充值通道无法充值请点此刷新
              <img src="~/static/refresh.png" alt="" />
            </div>
            <p>充值可能存在延时情况，充值后10分钟未到账</p>
            <p>请在<span>【我的】-【客服中心】</span>联系客服处理</p>
          </div>
          <div class="vipLi" v-for="item in vipList" :key="item.titl">
            <h3>{{ item.title }}</h3>
            <p class="pMark">{{ item.remark }}</p>
            <div
              :class="
                selectPayData.actived === item.title + item2
                  ? ' vipLiList payList_active'
                  : ' vipLiList'
              "
              v-for="(item2, index) in item.amount"
              :key="index"
              @click="selectedEvent_vip(item, item2)"
            >
              <p>
                <img src="~/static/gold.png" alt="" />
                <span>{{ item.gold[index] }}</span>
              </p>
              <p class="vipLiListMoney">{{ item2 }}元</p>
            </div>
          </div>
        </div>
      </ul>

      <div class="footerTips">已阅读并同意《用户充值协议》</div>
      <footer>
        <div
          :class="
            selectPayData.moneySave
              ? ' payBtn btnClass btnBg'
              : ' payBtn btnClass'
          "
          @click="rechargeHandle()"
        >
          <span class="payBtnMoney">￥{{ selectPayData.moneySave }}</span>
          立即充值
        </div>
      </footer>
    </div>
    <!-- 银行卡支付 -->
    <BankDetail ref="bankDetail"></BankDetail>
    <!-- 支付宝闪付弹窗 -->
    <div v-if="modal_zfbQuick" class="modal modalZfb">
      <div class="modalZfbContent">
        <img src="~/static/zfbQuick.png" alt="" />
        <h3>支付中如果出现此提示，请不用担心 放心支付</h3>
        <div class="btnClass btnBg" @click="zfbQuickRecharge">我知道了</div>
      </div>
    </div>
    <!-- 支付宝问题详情 -->
    <ZfbDetail v-if="modal_zfbDetail"></ZfbDetail>
    <!-- 黑色背景消息提示 -->
    <div v-if="msgTips" class="toolTips">{{ msgTips }}</div>
    <!-- 发起请求弹窗 -->
    <div v-if="loading" class="modal modalHttp">发起请求中...</div>
    <div v-if="loadingZFB" class="modal modalHttp">正在唤起支付宝...</div>
  </div>
</template>

<script>
import ZfbDetail from "./zfbDetail.vue";
import BankDetail from "./bankDetail.vue";
export default {
  components: {
    ZfbDetail,
    BankDetail,
  },
  async asyncData({ $axios, query }) {
    const timespace = new Date().getTime();
    const urlParams = {
      agent: query.agent,
      env: query.env,
      scene: query.scene,
      version: query.version,
      userlevel: query.userLevel,
      userId: query.userId,
    };
    const zfbQuickParams = {
      scene: query.scene,
      userLevel: query.userLevel,
    };
    let [
      { data: presentRate },
      { data: vipList },
      { data: h5v5Data },
      { data: zfbQuickList },
    ] = await Promise.all([
      $axios.get("pay/v6/presentRate"),
      $axios.get("trade/wg/v2/list?timespace=" + timespace),
      $axios.get("pay/v2/h5v5", { params: urlParams }),
      $axios.get("pay/v6/list", { params: zfbQuickParams }),
    ]);
    for (const key in presentRate) {
      presentRate[key] = "赠" + presentRate[key] * 100 + "%";
    }
    const bankList = h5v5Data.BANK_CARD || [];
    const ALIPAYList = h5v5Data.ALIPAY || [];
    let selectHeader = "bank";
    let bank_zfb_List = bankList;
    if (ALIPAYList.length > 0) {
      selectHeader = "ALIPAY";
      bank_zfb_List = ALIPAYList;
    } else if (vipList.length > 0) {
      selectHeader = "vip";
      bank_zfb_List = vipList;
    } else if (zfbQuickList.length > 0) {
      selectHeader = "zfbQuick";
      bank_zfb_List = zfbQuickList;
    }
    return {
      presentRate,
      vipList,
      bankList,
      ALIPAYList,
      zfbQuickList,
      bank_zfb_List,
      selectHeader,
      urlParams, // 获取的参数
    };
  },
  data() {
    return {
      selectPayData: {}, // 选中的金额数据
      msgTips: "", // 消息弹窗
      loading: false,
      modal_zfbDetail: false, // 支付宝详情
      loadingZFB: false,
      modal_zfbQuick: false, // 支付宝闪付弹窗
    };
  },
  computed: {},
  methods: {
    // 切换支付类型
    changePayType(type) {
      this.selectHeader = type;
      this.selectPayData = {}; // 充值选中值
      switch (type) {
        case "bank":
          this.bank_zfb_List = this.bankList;
          break;
        case "ALIPAY":
          this.bank_zfb_List = this.ALIPAYList;
          break;
        case "zfbQuick":
          this.bank_zfb_List = this.zfbQuickList;
          break;
      }
    },
    // 点击支付列表事件，缓存支付数据、改变立即充值按钮状态
    selectedEvent(val) {
      this.selectPayData = { ...val, moneySave: val.chargeGoldCoin / 10 }; // 银行卡
    },
    selectedEvent_vip(val1, val2) {
      this.selectPayData = {
        ...val1,
        actived: val1.title + val2,
        moneySave: val2,
      };
    },
    // 支付宝详情
    ShowZfbModal() {
      this.modal_zfbDetail = true;
    },
    // 重新请求vip充值列表
    refreshVipUrl() {
      const timespace = new Date().getTime();
      const that = this;
      this.loading = true;
      this.$axios.get("trade/wg/v2/list?timespace=" + timespace).then((res) => {
        that.loading = false;
        that.vipList = res.data || [];
      });
    },
    // 立即充值
    rechargeHandle() {
      // 未选中值
      if (!this.selectPayData.moneySave) {
        return;
      }
      switch (this.selectHeader) {
        case "bank":
          this.$refs.bankDetail.propsVal(this.selectPayData, this.urlParams);
          break;
        case "ALIPAY":
          this.zfbRecharge();
          break;
        case "vip":
          this.vipRecharge();
          break;
        case "zfbQuick":
          this.modal_zfbQuick = true;
          break;
      }
    },
    // 支付宝充值
    zfbRecharge() {
      const obj = {
        agent: this.urlParams.agent,
        version: this.urlParams.version,
        env: this.urlParams.env,
        userId: this.urlParams.userId,
        ip: "",
        os: this.urlParams.scene,
        fee: this.selectPayData.chargeGoldCoin * 10,
        product: `购买商品-${this.selectPayData.id}`,
        amountId: this.selectPayData.id,
        type: "ALIPAY",
      };
      this.loading = true;
      const that = this;
      this.$axios.post("pay/v2/h5/order", obj).then((res) => {
        that.loading = false;
        if (res.code === 0) {
          that.loadingZFB = true;
          setTimeout(() => {
            that.loadingZFB = false;
          }, 1000);
          window.location.href = res.data.ticket;
        } else {
          const errMsg = `${res.msg}(${res.code})`;
          this.toolTipsFunc(res.code, errMsg);
        }
      });
    },
    // vip立即充值
    vipRecharge() {
      const obj = {
        amount: this.selectPayData.moneySave,
        ip: "",
        payCode: this.selectPayData.payCode,
        userId: this.urlParams.userId,
      };
      this.loading = true;
      const that = this;
      this.$axios.post("trade/wg/v1/create", obj).then((res) => {
        that.loading = false;
        if (res.code === 0) {
          window.location.href = res.data.ticket;
        } else {
          const errMsg = `${res.msg}(${res.code})`;
          this.toolTipsFunc(res.code, errMsg);
        }
      });
    },
    // 支付宝闪付充值
    zfbQuickRecharge() {
      const obj = {
        agent: this.urlParams.agent,
        version: this.urlParams.version,
        env: this.urlParams.env,
        userId: this.urlParams.userId,
        os: this.urlParams.scene,
        ip: "",
        amount: this.selectPayData.moneySave,
      };
      this.loading = true;
      const that = this;
      this.$axios.post("pay/v6/quickpay", obj).then((res) => {
        that.loading = false;
        if (res.code === 0) {
          window.location.href = res.data;
        } else {
          const errMsg = `${res.msg}(${res.code})`;
          this.toolTipsFunc(res.code, errMsg);
        }
      });
    },

    // 消息弹窗提示
    toolTipsFunc(code, msg) {
      let errorCode = {
        // 自定义错误码
        202: "支付平台报错，支付下单失败（202）",
        203: "拉起原生支付失败，未检测到android配置（203）",
        204: "拉起原生支付失败，未检测到ios配置（204）",
        900: "请填写本人姓名",
        901: "复制成功",
        902: "暂无数据",
        // 网络错误
        0: "网络请求错误(0)",
        400: "错误请求(400)",
        401: "未授权(401)",
        403: "拒绝访问(403)",
        404: "当前资源不存在(404)",
        408: "请求超时(408)",
        500: "服务器忙，请重试!(500)",
        502: "网络错误(502)",
        503: "服务不可用(503)",
        504: "网络超时(504)",
        505: "HTTP版本不受支持(505)",
      };
      const errMsg = errorCode[code];
      this.msgTips = errMsg || msg;
      setTimeout(() => {
        this.msgTips = "";
      }, 3000);
    },
  },
  mounted() {
    const _width =
      document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName("html")[0];
    htmlDom.style.fontSize = _width / 25.5 + "px";
  },
};
</script>
