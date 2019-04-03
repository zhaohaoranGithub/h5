export default {
    data() {
        return {
            slideHeight: window.innerHeight,
            opts: {
                start: 0,
                dir: 'v',
                duration: 500,
                der: 0.07,
                beforeChange: function (prev, next) {
                   
                },
                afterChange: function (prev, next) {}
            }

        };
    }
};