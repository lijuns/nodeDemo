/*
 * 1、提交表单
 * 2、单独处理图像，多张图片处理
 * */
var data = {
    'school': $('#school').val(),
    'experience': $('#experience').val(),
    'howKnow': $('input[name=howKnow]').val()
};

$('#submit').on('click', function () {
    $.ajax({
        url: './applyForm',
        method: 'POST',
        data: JSON.stringify(data),
        success: function (data) {
            alert(data);
        }
    });
});


