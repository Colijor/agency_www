$(function(){
	
	$(window).on('load',function(){
		cframeInit();
		//后台首页的全屏功能的bug，如果不得不取出Iframe的大小变化后的监听事件。
		$(window).resize(function(){
            console.log("resize");
			cframeInit();
		});
	});
})

//初始化页面
function cframeInit(){
	var win_h = $(window).height();
	var conheight;
	try{
        conheight = $('#iframeContent',parent.document).parents("#wrapper").height();
	}catch(e){
        conheight = win_h;
	}
	
	var fullScreenTAG = sessionStorage.getItem("fullScreenTAG");
	if(fullScreenTAG == 1){
        conheight = $(parent.document).height();
	}
	
	// //计算Iframe的高度与父元素相同
	$('#iframeContent',parent.document).css("height",conheight - 64 -7);
	//计算Iframe内cBody的高度，使其固定
	$("#page-wrapper").height(conheight - 64 - 7);
}