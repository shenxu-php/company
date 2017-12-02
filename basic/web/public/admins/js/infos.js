// JavaScript Document
	function get_photo_count()
	{
		var i=0;
		
		$(".photo_move li").each(function(){
			i=parseInt(i)+1;
		});	
		
		return i;	
	}
	

	var pageindex=1;
	
	function go_left()
	{
		var c=get_photo_count();
		var a=Math.ceil(c/6);
		if(a>1 && pageindex<a)
		{
			//可以操作
			$("#photo_move").scrollLeft(408);
			pageindex=parseInt(pageindex+1);
			//alert(pageindex);
		}
	}
	
	function go_right()
	{
		var c=get_photo_count();
		var a=Math.ceil(c/6);
		if(pageindex>1)
		{
			//可以操作
			$("#photo_move").scrollLeft(-408);
			pageindex=parseInt(pageindex-1);
			//alert(pageindex);
		}
	}
	
	var start_id=0;
	function show_zoom(id,src)
	{
		if(id!=start_id)
		{
			$("#zm_" + start_id).attr("class","");
			$("#zm_" + id).attr("class","hover");
			$(".zooms_it").html('<img src="/' + src + '">');
			start_id=id;	
		}
	}	
	
	function inserttag(topen,tclose){
	var themess = document.getElementById('comment_text');//编辑对象
	themess.focus();
	if (document.selection) {//如果是否ie浏览器
	   var theSelection = document.selection.createRange().text;//获取选区文字
	   //alert(theSelection);
	   if(theSelection){
		document.selection.createRange().text = theSelection = topen+theSelection+tclose;//替换
	   }else{
		document.selection.createRange().text = topen+tclose;
	   }
	   theSelection='';
	
	}else{//其他浏览器
	
	   var scrollPos = themess.scrollTop;
	   var selLength = themess.textLength;
	   var selStart = themess.selectionStart;//选区起始点索引，未选择为0
	   var selEnd = themess.selectionEnd;//选区终点点索引
	   if (selEnd <= 2)
	   selEnd = selLength;
	
	   var s1 = (themess.value).substring(0,selStart);//截取起始点前部分字符
	   var s2 = (themess.value).substring(selStart, selEnd)//截取选择部分字符
	   var s3 = (themess.value).substring(selEnd, selLength);//截取终点后部分字符
	
	   themess.value = s1 + topen + s2 + tclose + s3;//替换
	
	   themess.focus();
	   themess.selectionStart = newStart;
	   themess.selectionEnd = newStart;
	   themess.scrollTop = scrollPos;
	   return;
	}
	}
	
	function inserttag_re(topen,tclose,id){
	var themess = document.getElementById('content_' + id);//编辑对象
	themess.focus();
	if (document.selection) {//如果是否ie浏览器
	   var theSelection = document.selection.createRange().text;//获取选区文字
	   //alert(theSelection);
	   if(theSelection){
		document.selection.createRange().text = theSelection = topen+theSelection+tclose;//替换
	   }else{
		document.selection.createRange().text = topen+tclose;
	   }
	   theSelection='';
	
	}else{//其他浏览器
	
	   var scrollPos = themess.scrollTop;
	   var selLength = themess.textLength;
	   var selStart = themess.selectionStart;//选区起始点索引，未选择为0
	   var selEnd = themess.selectionEnd;//选区终点点索引
	   if (selEnd <= 2)
	   selEnd = selLength;
	
	   var s1 = (themess.value).substring(0,selStart);//截取起始点前部分字符
	   var s2 = (themess.value).substring(selStart, selEnd)//截取选择部分字符
	   var s3 = (themess.value).substring(selEnd, selLength);//截取终点后部分字符
	
	   themess.value = s1 + topen + s2 + tclose + s3;//替换
	
	   themess.focus();
	   themess.selectionStart = newStart;
	   themess.selectionEnd = newStart;
	   themess.scrollTop = scrollPos;
	   return;
	}
	}
	

	function insert_comments()
	{
		if(info_load==0)
		{
			var comment_text=get_value("comment_text");
			if(comment_text=="")
			{
				layer.msg("抱歉：请输入评论内容");	
			}	
			else if(strlen(comment_text)>240)
			{
				layer.msg("抱歉：评论内容不能大于120字");		
			}
			else
			{
				$.ajax({url:"/index.php/panels/comments/subs",
				type: 'POST',
				data:{member_id:member_id,contents:comment_text}, 
				dataType: 'html',
				timeout: 15000, 
					error: function(){
						info_load=0;
						layer.msg("抱歉：网络连接失败，请稍后再试...");
					},
					beforeSend:function(){
						info_load=1;
						layer.closeAll();
						var index = layer.load(1, {
						  shade: [0.5,'#000000'] //0.1透明度的白色背景
						});
				
					},
					success:function(result){
						layer.closeAll();
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						info_load=0;
						if(result.indexOf("|")>=0)
						{
							arr=result.split("|");
							if(arr[0]==100)
							{
								layer.msg(arr[1]);		
								$("#comment_text").val("");
								var comments_counts=parseInt(document.getElementById("comments_counts").innerHTML)+1;
								document.getElementById("comments_counts").innerHTML=comments_counts;
								if(show_do==1)
								{
									setTimeout("readInfoCommentsPage(" + pageindex_a + ")",2000);	
								}
								else{
									setTimeout("readInfoCommentsPage_b(" + pageindex_a + ")",2000);	
								}
							}	
							else
							{
								if(arr[0]==200)
								{
									layer.msg("您尚未登录，请登录后再来操作！");
									setTimeout("location='/index.php/members/login.html?uri=/index.php/infos/index/' + member_id + '.html'",1500);		
								}
								else if(arr[0]==300)
								{
									layer.msg(arr[1]);			
								}
								else if(arr[0]==400)
								{
									layer.msg(arr[1]);
									setTimeout("openWindows('我的资料',/index.php/panels/infos/index','840px','600px')",1500);	
								}
								else
								{
									layer.msg("抱歉：网络连接失败，请稍后再试...");	
								}
							}
						}
						else
						{
							layer.msg("抱歉：网络连接失败，请稍后再试...");
						}
					} 
				});						
			}
		}
		else
		{
			layer.msg("抱歉：当前尚有其他数据处理中，请稍等...");		
		}
	}
	
	var gray_all="";//设置不断加载背景颜色变量
	var gray_all1="";//设置不断加载背景颜色变量
	
	function show_boxs()
	{
		var web_height=document.body.clientHeight;//获取网页的当前高度
		var web_width1=screen.width;//获取网页的当前高度
		var web_height1=document.documentElement.clientHeight;//获取网页的当前高度1
		var web_width=document.documentElement.clientWidth;//获取网页的当前宽度
		if(web_height1>web_height){//根据不同浏览器定位来判断当前浏览器的高度
			web_height=web_height1;
		}	
		//if(web_width1>web_width){//根据不同浏览器定位来判断当前浏览器的高度
			//web_width=web_width1;
		//}		
		//设置网页的宽度和高度
		document.getElementById("web_bg").style.height=web_height + "px";
		document.getElementById("web_bg").style.width=web_width + "px";		
		document.getElementById("web_bg").style.display="block";
		document.getElementById("web_box").style.display="block";
		document.body.style.overflow="hidden";
		//获取中间盒子的高度和宽度
		var div_h=document.getElementById("web_box").offsetHeight;
		var div_w=document.getElementById("web_box").offsetWidth;
		//获取中间盒子的高度和宽度
		//计算数据让悬浮盒子居中
		document.getElementById("web_box").style.left=(web_width-div_w)/2 + "px";
		document.getElementById("web_box").style.top=parseInt((web_height1-div_h))/2 + "px";
		gray_all=setTimeout("show_boxs()",100);			
	}
	
	function close_box()
	{
		clearTimeout(gray_all);	
		document.getElementById("web_bg").style.display="none";
		document.getElementById("web_box").style.display="none";
		document.body.style.overflow="auto";
	}
	
	function close_boxs1()
	{
		clearTimeout(gray_all1);	
		document.getElementById("web_bg").style.display="none";
		document.getElementById("web_box1").style.display="none";
		document.body.style.overflow="auto";			
	}