/*
 * @name 天气预报接口
 * @para {str} http://op.juhe.cn/onebox/weather/query?cityname=昆明key=234524e4de2def35d25e28688fea5981
 * @time 2015-11-09
 * @todo 根据IP获取天气预报
 * */

function json2url(json) {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + json[name]);
    }
    return arr.join('&');
}

function getWeather(city, ele) {
    var cityName = '', date = '', week = '', temper = '', infox = '';
    var weeks = ['日', '一', '二', '三', '四', '五', '六'];
    $.ajax({
        'url': 'http://op.juhe.cn/onebox/weather/query',
        'type': 'POST',
        'async': false,
        'data': json2url({
            cityname: city,
            key: '234524e4de2def35d25e28688fea5981'
        }),
        dataType: 'jsonp',
        success: function (data) {
            var datas = data.result.data;
            var info = datas.realtime.weather.info;
            switch (info) {
                case '晴':
                    info = '&#xe633;';
                    break;
                case "多云":
                    info = '&#xe62d;';
                    break;
                case "阴":
                    info = "&#xe61b;";
                    break;
                case "小雨":
                    info = "&#xe621;";
                    break;
                case "多云转晴":
                    info = "&#xe61c;";
                    break;
                case "阵雨":
                    info = "&#xe62a; ";
                    break;
                default :
                    info = '';
                    break;
            }
            cityName = datas.realtime.city_name;
            date = datas.realtime.date;
            week = datas.realtime.week;
            temper = datas.realtime.weather.temperature;
            infox = info;

            ele.innerHTML = date + ' 星期' + weeks[week] + ' ' + cityName + ' ' + '<span class="iconfont">' + infox + '</span> ' + datas.realtime.weather.info + ' ' + temper + '℃';
        }
    });
}

getWeather('昆明', document.getElementById('weather'));