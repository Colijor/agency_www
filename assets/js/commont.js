var serverIp_ = localStorage.setItem('serverIp', "https://h5.hdiandian.com");

// 模态框页面居中
function ModalDialog(id) {
    $('#' + id).on('show.bs.modal', function () {
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        $this.css('display', 'block');
        $modal_dialog.css({
            'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)
        });
    });
}

// 所有下拉菜单下拉选项,0:部门，1：角色，2：会员等级，3：代理商等级，4：通道,5:地区,6:分类
function findAllList(code) {
    var data = [];
    $.ajax({
        url: serverIp + "/select/list?code=" + code,
        type: "get",
        data: '',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        async: false,
        success: function (res) {
            console.log("下拉选项: " + code);
            console.log(res);
            data = res;
        }
    });
    return data;
}

// 表单验证
function formValidation(data) {
    for (let key in data) {
        if (data[key] == '' && key == 'Staffnumber') {
            $('.tipText').text("工号不能为空");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'Staffname') {
            $('.tipText').text("用户名不能为空");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'pwd1') {
            $('.tipText').text("密码不能为空");
            $('#wangModal').modal('show');
        } else if (key == 'pwd2' && data[key] != data['pwd1']) {
            $('.tipText').text("密码不一致");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'Roleclassify') {
            $('.tipText').text("职务不能为空");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'Dptlassify') {
            $('.tipText').text("部门不能为空");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'phoneNumber') {
            $('.tipText').text("电话不能为空");
            $('#wangModal').modal('show');
        } else if (data[key] == '' && key == 'Areaclassify') {
            $('.tipText').text("地区不能为空");
            $('#wangModal').modal('show');
        }
    }
}

/**-----------------------------------------查询下拉选项的值----------------------------------------------- */
function findOptions(type, id) {
    var name = '';
    $.ajax({
        type: "get",
        url: serverIp + "/" + type + "/get/" + id,
        data: "",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        async: false,
        success: function (res) {
            if (res.code === 0) {
                name = res.data.name;
            }
        }
    });
    return name;
}

function urlParam() {
    var str = location.search.slice(1); //获得当前页面URL参数
    console.log(str);
    var arr = str.split("&"); //把一个字符串分割成字符串数组
    var urlParamInfo = new Object();
    for (var i = 0; i < arr.length; i++) {
        var num = arr[i].indexOf("=");
        if (num > 0) {
            var name = arr[i].substring(0, num);
            var value = arr[i].substr(num + 1);
            urlParamInfo[name] = decodeURI(value);
        }
    };
    console.log(urlParamInfo);
    return urlParamInfo;
}

//主要防止出现0233这种数
//type==1：0~100的正数、最多带两位的小数
//type==2：大于等于0的正整数
function checkNumb(type, id) {
    let value = Number($('#' + id).val());
    if (type == 1) {
        if (value >= 0 && value <= 100) {
            $('#' + id).val(value);
        } else {
            $('#' + id).val('0');
        }
    } else {
        $('#' + id).val(value);
    }
};

//输入框校验
function checkInput(key,value) {
    var reg = key;
    if (value == '') {
        return '0';
    } else if (!(value.match(reg))) {
        return '1';
    }
}

function getOptions(){
    return `<option value="">选择行业</option>
    <option value="高新科技">高新科技</option>
    <option value="互联网">&nbsp;&nbsp;&nbsp;互联网</option>
    <option value="电子商务">&nbsp;&nbsp;&nbsp;电子商务</option>
    <option value="电子游戏">&nbsp;&nbsp;&nbsp;电子游戏</option>
    <option value="计算机软件">&nbsp;&nbsp;&nbsp;计算机软件</option>
    <option value="计算机硬件">&nbsp;&nbsp;&nbsp;计算机硬件</option>
    <option value="信息传媒">信息传媒</option>
    <option value="出版业">&nbsp;&nbsp;&nbsp;出版业</option>
    <option value="电影录音">&nbsp;&nbsp;&nbsp;电影录音</option>
    <option value="广播电视">&nbsp;&nbsp;&nbsp;广播电视</option>
    <option value="通信">&nbsp;&nbsp;&nbsp;通信</option>
    <option value="金融">金融</option>
    <option value="银行">&nbsp;&nbsp;&nbsp;银行</option>
    <option value="资本投资">&nbsp;&nbsp;&nbsp;资本投资</option>
    <option value="证券投资">&nbsp;&nbsp;&nbsp;证券投资</option>
    <option value="保险">&nbsp;&nbsp;&nbsp;保险</option>
    <option value="信贷">&nbsp;&nbsp;&nbsp;信贷</option>
    <option value="财务">&nbsp;&nbsp;&nbsp;财务</option>
    <option value="审计">&nbsp;&nbsp;&nbsp;审计</option>
    <option value="服务业">服务业</option>
    <option value="法律">&nbsp;&nbsp;&nbsp;法律</option>
    <option value="餐饮">&nbsp;&nbsp;&nbsp;餐饮</option>
    <option value="酒店">&nbsp;&nbsp;&nbsp;酒店</option>
    <option value="旅游">&nbsp;&nbsp;&nbsp;旅游</option>
    <option value="广告">&nbsp;&nbsp;&nbsp;广告</option>
    <option value="公关">&nbsp;&nbsp;&nbsp;公关</option>
    <option value="景观">&nbsp;&nbsp;&nbsp;景观</option>
    <option value="咨询分析">&nbsp;&nbsp;&nbsp;咨询分析</option>
    <option value="市场推广">&nbsp;&nbsp;&nbsp;市场推广</option>
    <option value="人力资源">&nbsp;&nbsp;&nbsp;人力资源</option>
    <option value="社工服务">&nbsp;&nbsp;&nbsp;社工服务</option>
    <option value="养老服务">&nbsp;&nbsp;&nbsp;养老服务</option>
    <option value="教育">教育</option>
    <option value="高等教育">&nbsp;&nbsp;&nbsp;高等教育</option>
    <option value="基础教育">&nbsp;&nbsp;&nbsp;基础教育</option>
    <option value="职业教育">&nbsp;&nbsp;&nbsp;职业教育</option>
    <option value="幼儿教育">&nbsp;&nbsp;&nbsp;幼儿教育</option>
    <option value="特殊教育">&nbsp;&nbsp;&nbsp;特殊教育</option>
    <option value="培训">&nbsp;&nbsp;&nbsp;培训</option>
    <option value="医疗服务">医疗服务</option>
    <option value="临床医疗">&nbsp;&nbsp;&nbsp;临床医疗</option>
    <option value="制药">&nbsp;&nbsp;&nbsp;制药</option>
    <option value="保健">&nbsp;&nbsp;&nbsp;保健</option>
    <option value="美容">&nbsp;&nbsp;&nbsp;美容</option>
    <option value="医疗器材">&nbsp;&nbsp;&nbsp;医疗器材</option>
    <option value="生物工程">&nbsp;&nbsp;&nbsp;生物工程</option>
    <option value="疗养服务">&nbsp;&nbsp;&nbsp;疗养服务</option>
    <option value="护理服务">&nbsp;&nbsp;&nbsp;护理服务</option>
    <option value="艺术娱乐">艺术娱乐</option>
    <option value="创意艺术">&nbsp;&nbsp;&nbsp;创意艺术</option>
    <option value="体育健身">&nbsp;&nbsp;&nbsp;体育健身</option>
    <option value="娱乐休闲">&nbsp;&nbsp;&nbsp;娱乐休闲</option>
    <option value="图书馆">&nbsp;&nbsp;&nbsp;图书馆</option>
    <option value="博物馆">&nbsp;&nbsp;&nbsp;博物馆</option>
    <option value="策展">&nbsp;&nbsp;&nbsp;策展</option>
    <option value="博彩">&nbsp;&nbsp;&nbsp;博彩</option>
    <option value="制造加工">制造加工</option>
    <option value="食品饮料业">&nbsp;&nbsp;&nbsp;食品饮料业</option>
    <option value="纺织皮革业">&nbsp;&nbsp;&nbsp;纺织皮革业</option>
    <option value="服装业">&nbsp;&nbsp;&nbsp;服装业</option>
    <option value="烟草业">&nbsp;&nbsp;&nbsp;烟草业</option>
    <option value="造纸业">&nbsp;&nbsp;&nbsp;造纸业</option>
    <option value="印刷业">&nbsp;&nbsp;&nbsp;印刷业</option>
    <option value="化工业">&nbsp;&nbsp;&nbsp;化工业</option>
    <option value="汽车">&nbsp;&nbsp;&nbsp;汽车</option>
    <option value="家具">&nbsp;&nbsp;&nbsp;家具</option>
    <option value="电子电器">&nbsp;&nbsp;&nbsp;电子电器</option>
    <option value="机械设备">&nbsp;&nbsp;&nbsp;机械设备</option>
    <option value="塑料工业">&nbsp;&nbsp;&nbsp;塑料工业</option>
    <option value="金属加工">&nbsp;&nbsp;&nbsp;金属加工</option>
    <option value="军火">&nbsp;&nbsp;&nbsp;军火</option>
    <option value="地产建筑">地产建筑</option>
    <option value="房地产">&nbsp;&nbsp;&nbsp;房地产</option>
    <option value="装饰装潢">&nbsp;&nbsp;&nbsp;装饰装潢</option>
    <option value="物业服务">&nbsp;&nbsp;&nbsp;物业服务</option>
    <option value="特殊建造">&nbsp;&nbsp;&nbsp;特殊建造</option>
    <option value="建筑设备">&nbsp;&nbsp;&nbsp;建筑设备</option>
    <option value="贸易零售">贸易零售</option>
    <option value="零售">&nbsp;&nbsp;&nbsp;零售</option>
    <option value="大宗交易">&nbsp;&nbsp;&nbsp;大宗交易</option>
    <option value="进出口贸易">&nbsp;&nbsp;&nbsp;进出口贸易</option>
    <option value="公共服务">公共服务</option>
    <option value="政府">&nbsp;&nbsp;&nbsp;政府</option>
    <option value="国防军事">&nbsp;&nbsp;&nbsp;国防军事</option>
    <option value="航天">&nbsp;&nbsp;&nbsp;航天</option>
    <option value="科研">&nbsp;&nbsp;&nbsp;科研</option>
    <option value="给排水">&nbsp;&nbsp;&nbsp;给排水</option>
    <option value="水利能源">&nbsp;&nbsp;&nbsp;水利能源</option>
    <option value="电力电网">&nbsp;&nbsp;&nbsp;电力电网</option>
    <option value="公共管理">&nbsp;&nbsp;&nbsp;公共管理</option>
    <option value="环境保护">&nbsp;&nbsp;&nbsp;环境保护</option>
    <option value="非盈利组织">&nbsp;&nbsp;&nbsp;非盈利组织</option>
    <option value="开采冶金">开采冶金</option>
    <option value="煤炭工业">&nbsp;&nbsp;&nbsp;煤炭工业</option>
    <option value="石油工业">&nbsp;&nbsp;&nbsp;石油工业</option>
    <option value="黑色金属">&nbsp;&nbsp;&nbsp;黑色金属</option>
    <option value="有色金属">&nbsp;&nbsp;&nbsp;有色金属</option>
    <option value="土砂石开采">&nbsp;&nbsp;&nbsp;土砂石开采</option>
    <option value="地热开采">&nbsp;&nbsp;&nbsp;地热开采</option>
    <option value="交通仓储">交通仓储</option>
    <option value="邮政">&nbsp;&nbsp;&nbsp;邮政</option>
    <option value="物流递送">&nbsp;&nbsp;&nbsp;物流递送</option>
    <option value="地面运输">&nbsp;&nbsp;&nbsp;地面运输</option>
    <option value="铁路运输">&nbsp;&nbsp;&nbsp;铁路运输</option>
    <option value="管线运输">&nbsp;&nbsp;&nbsp;管线运输</option>
    <option value="航运业">&nbsp;&nbsp;&nbsp;航运业</option>
    <option value="民用航空业">&nbsp;&nbsp;&nbsp;民用航空业</option>
    <option value="农林牧渔">农林牧渔</option>
    <option value="种植业">&nbsp;&nbsp;&nbsp;种植业</option>
    <option value="畜牧养殖业">&nbsp;&nbsp;&nbsp;畜牧养殖业</option>
    <option value="林业">&nbsp;&nbsp;&nbsp;林业</option>
    <option value="渔业">&nbsp;&nbsp;&nbsp;渔业</option>`;
}