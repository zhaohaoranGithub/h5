export default {
    data() {
        return {


        };
    },
    methods: {
        onCopy() {
            this.$copyText(this.host).then( (e)=> {
                this.$toast.success('复制成功');

            }, (e)=> {
                  this.$toast.fail('复制成功');
                console.log(e);
            });
        },
        _androidCope() {
            window.slifeJsAgent.invoke_native("getUserInfo", this.copyMessage, "jsGetUserInfoCallBack");
        },

    }
};