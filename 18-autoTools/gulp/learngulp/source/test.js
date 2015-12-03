window.onload = function () {
    console.log('test gulp');
    function getStyle(obj, name) {
        return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj, false)[name];
    }
};

(function () {
    console.log('hello i was being watching');
})();

