~(function () {

    /*--radio--*/
    if (document.getElementById('know')) {
        var oKnow = document.getElementById('know');
        var aList = oKnow.children;
        for (var i = 0; i < aList.length; i++) {
            aList[i].getElementsByTagName('input')[0].onclick = function () {
                for (var i = 0; i < aList.length; i++) {
                    if (aList[i].getElementsByTagName('input')[1]) {
                        aList[i].getElementsByTagName('input')[1].style.display = 'none';
                    }
                }
                if (this.parentNode.getElementsByTagName('input')[1]) {
                    this.checked ? this.parentNode.getElementsByTagName('input')[1].style.display = 'inline-block' : this.parentNode.getElementsByTagName('input')[1].style.display = 'none';
                }
            }
        }
    }

    /*--list--*/
    if (document.getElementById('list')) {
        var aTr = document.getElementById('list').getElementsByTagName('tr');
        for (var i = 0; i < aTr.length; i++) {
            aTr[i].onclick = function () {
                window.location.href = this.getAttribute('data-url');
            }
        }
    }

})();