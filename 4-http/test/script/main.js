window.onload = function () {
    var aBtn = document.getElementsByTagName('a');
    for (var i = 0; i < aBtn.length; i++) {
        aBtn[i].onclick = function () {
            this.className = 'on';
        };
    }
};