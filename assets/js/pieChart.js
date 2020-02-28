// window.onload = function(){
//     var data1 = [
//         {"id":"item0","text":"这是第一行","num":10,"color":"#1e90ff","isdraw":1},
//         {"id":"item1","text":"这是第二行","num":20,"color":"#36cbcb","isdraw":1},
//         {"id":"item2","text":"这是第三行","num":30,"color":"#2fc25b","isdraw":1},
//         {"id":"item3","text":"这是第四行","num":40,"color":"#ffd700","isdraw":1},
//         {"id":"item4","text":"这是第五行","num":50,"color":"#ff3030","isdraw":1},
//         {"id":"item5","text":"这是第六行","num":60,"color":"#8a2be2","isdraw":1},
//     ];
//     var apie = new pieChart('这里是标题',data1,150,40);
//     apie.add_data();
//     apie.draw();
// }

function pieChart(float, title, data, radius, width, canvasId, circleId, pageSrc) {
    this.float = float; // 绘制区域div靠左还是靠右
    this.title = title; // 统计图的标题
    this.data = data; // 统计图的数据
    this.width = width; // 圆环宽度，单位为px，可理解为外层圆与内层圆半径的差值。
    this.radius = radius; // 外层圆的半径，单位为px
    this.canvasId = canvasId; // 绘制区域div
    this.circleId = circleId; // 圆环div
    this.pageSrc = pageSrc; // 查看详情要跳转的页面

    this.add_data = function () {
        var width = 2 * radius; //区域宽度即为直径的长度，画布区域(canvas)的宽高等于直径，下方每一个li的宽度也等于直径。
        var row = document.getElementById(canvasId);
        var col = document.createElement('div');
        col.setAttribute('class','canvasCss');
        col.setAttribute('style', 'float:'+float);
        /***div 'chart'，为整个页面的父div。***/
        // var chart = document.createElement('div');
        // chart.style.width = width+'px';
        /***canvas 'circle'，圆环区域***/
        var circle = document.createElement('canvas');
        circle.setAttribute('id', circleId);
        circle.setAttribute('width', width + "px");
        circle.setAttribute('height', width + "px");
        circle.setAttribute('style', 'vertical-align:middle;margin-top: 30px;');
        /***div 'bottom'，底部查看详情区域***/
        var bottom = document.createElement('div');
        bottom.setAttribute('style', 'text-align:right;font-weight:bold;font-size:22px;padding: 20px');
        var bottom_link = document.createElement('a');
        bottom_link.setAttribute('href',pageSrc);
        bottom_link.innerText = title;
        /***div 'list'，数据行区域***/
        var list = document.createElement('div');
        list.setAttribute('id', 'list');
        list.setAttribute('style', 'display:inline-block;text-align: left;margin-left: 40px;');
        var ul = document.createElement('ul');
        ul.setAttribute('style', 'font-family:Simsun;margin:0;padding:0;list-style:none;');
        /*每次循环添加data中的一条数据*/
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.setAttribute('id', data[i].id);
            li.setAttribute('style', 'width:' + width + 'px;margin: 10px 0;');
            li.style.color = data[i].color;
            li.innerHTML = "<div style='display: inline-block;vertical-align: middle;margin-right:10px;width: 30px;height: 30px;background:" + data[i].color + "'></div><span style='color:black;'>" + data[i].text + "</span><span style='color:gray;float:right'>" + data[i].num + "</span>";
            li.onclick = this.draw; //为每一行添加onclick事件
            ul.appendChild(li);
        }
        list.appendChild(ul);
        bottom.appendChild(bottom_link);
        col.appendChild(circle);
        col.appendChild(list);
        col.appendChild(bottom);
        row.appendChild(col);
    }
    this.draw = function () {
        var len = data.length;
        var id = this.id;
        for (var i = 0; i < len; i++) {
            if (data[i].id == id) {
                data[i].isdraw = data[i].isdraw ? 0 : 1;
                this.style.color = this.style.color == 'gray' ? data[i].color : 'gray';
                var span = this.children[2];
                span.style.display = span.style.display == 'none' ? 'inline' : 'none';
            }
        }
        var canvas = document.getElementById(circleId);
        canvas.height = canvas.height;
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            var PI = Math.PI;
            var start = PI * 1.5;
            var gap = 0.01;
            var pros = 100;
            var sum = 0;
            var zero = 0;
            for (var i = 0; i < len; i++) {
                if (data[i].isdraw == 0) {
                    zero++;
                    continue;
                }
                sum += data[i].num;
            }
            // if (zero < len - 1) {
            //     pros = 100 - len + zero;
            // } else {
            //     pros = 100;
            // }
            ctx.strokeStyle = 'white';
            for (var i = 0; i < len; i++) {
                var num = data[i].num;
                if (data[i].isdraw == 0) {
                    continue;
                }
                var a_color = data[i].color;
                // var end = start + 2 * PI * pros / 100 * num / sum;
                var end = sum == 0 || num == 0? start + 2 * PI * pros / 100 : start + 2 * PI * pros / 100 * num / sum;
                // console.log(end);
                ctx.beginPath();
                ctx.moveTo(radius, radius);
                ctx.arc(radius, radius, radius, start, end, false);
                ctx.stroke();
                // start = end + 2 * PI * gap;
                start = end + 2 * PI;
                ctx.fillStyle = a_color;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(radius, radius, radius - width, 0, PI * 2, false);
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = (radius / 5) + 'px Simsun';
            ctx.fillText('总计', (canvas.width - ctx.measureText('总计').width) / 2, canvas.height / 2 - radius / 10);
            ctx.fillText(sum, (canvas.width - ctx.measureText(sum).width) / 2, canvas.height / 2 + radius / 10);
        }
    };
}