(function (n) {
    function rem() {
        var width = window.innerWidth;
        if (width > n) {
            width = n;
        }
        document.documentElement.style.fontSize = width / (n / 100) + 'px';
    }
    rem();

    var timer = null;
    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            rem();
        }, 100);
    }, false);
})(375);
