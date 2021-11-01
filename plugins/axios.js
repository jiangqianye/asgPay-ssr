

export default function ({ $axios, redirect }) {

    $axios.onRequest(config => {
        // console.log('/=/请求天：' + config.url)
    })
    $axios.onResponse(res => {
        // 不能返回null
        if (res.data.code !== 0&&res.data.code !== 200) {
            console.log('/=/错误拦截err:',res);
        }
        return res.data; 
    })
    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        console.log('/=/url:code:错误:：',code, error);
    })
}


