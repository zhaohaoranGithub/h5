export default {
    data() {
        return {
            isVisible: false,
            timer: null,
        };
    },

    methods: {
        _visibilityChanged(isVisible) {
            if (isVisible) {
                this.isVisible = true;
                this.timer = setTimeout(() => {
                    this.isVisible = false;
                }, 1500);
            }
        }
    },
    destroyed() {
        clearTimeout(this.timer);
    }

};