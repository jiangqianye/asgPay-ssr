export const strict = false; // 开启非严格模式
/**
 *
 * @returns
 * 1、有哪几种支付方式
 * 2、QUICK_ALIPAY是支付宝闪付吗
 */

export const state = () => ({
  loading: false, // 状态
  vipList:[]
});

export const mutations = {
  mutLoading(state, data) {
    state.loading = data;
  },
  mutVipList(state, data) {
    state.presentRate = data;
  },
};
export const actions = {
  // 获取vip列表
  getVipListUrl(context, data) {
    context.commit("mutLoading", true);
    const options = data.payload;
    const timespace = new Date().getTime();
    this.$axios.get("trade/wg/v2/list?timespace="+timespace).then((res) => {
      context.commit("mutLoading", false);
      for (const key in res.data) {
        res.data[key] = "赠" + res.data[key] * 100 + "%";
      }
    });
  },
};

export const getters = {
  getLoading(state) {
    return state.loading;
  },
  getvipList(state) {
    return state.vipList;
  },
};
