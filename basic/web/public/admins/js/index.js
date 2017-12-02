// JavaScript Document
	var index_form_load=0;
	var load_do=1;
	
	$(document).ready(function(){
		layer.closeAll();
		//alert(100);
		showLoginHtmls();//读取会员加载信息
		search_input_change();
	});	

	var IndexProName="";
	var IndexCityName="";
	var IndexQuName="";
	
	var IndexProId="";
	var IndexCityId="";
	var IndexQuId="";
	
	var Index_Region_do=0;	
	
	//更改搜索框的默认值
	function search_input_change()
	{
		IndexProId=$("#s_pro").val();
		IndexCityId=$("#s_city").val();	
		IndexQuId=$("#s_qu").val();	
		//alert(IndexProId + "\n" + IndexCityId + "\n" + IndexQuId);
	}
	
	//登录状态时效
	function loginMissIt()
	{
		layer.msg("登录状态已经失效，请重新登录");
		setTimeout("location='/index.php/members/login.html?uri=" + window.location.href + "'",1500);		
	}
	
	//错误提示信息
	function MissIt($text)
	{
		layer.msg($text);	
	}
	
	//错误提示信息
	function MissIts($text)
	{
		layer.msg($text);	
		setTimeout("close_layer()",1500);
	}
	
	function close_layer()
	{
		layer.closeAll();	
	}
	
	//打开Iframe
	function openWindows(IndexTitle,IndexUrls,IndexWidth,IndexHeight)
	{
		layer.open({
		  type: 2,
		  title: IndexTitle,
		  shadeClose: true,
		  shade: 0.8,
		  area: [IndexWidth,IndexHeight],
		  content: IndexUrls //iframe的url
		}); 		
	}
	
	var Jr_timeouts;
	
	//提示兼容模式信息
	function JrShow()
	{
		//$(".toast").show();
		//$(".toast_bg").show();
		var web_height=document.body.clientHeight;//获取网页的当前高度
		var web_width1=screen.width;//获取网页的当前高度
		var web_height1=document.documentElement.clientHeight;//获取网页的当前高度1
		var web_width=document.documentElement.clientWidth;//获取网页的当前宽度
		//alert(web_height1 + "\n" + web_height);
		if(web_height1>web_height){//根据不同浏览器定位来判断当前浏览器的高度
			web_height=web_height1;
		}
		var top =  document.body.scrollHeight;
		var lefts=document.body.scrollLeft;
		var shows_height=web_height;
		var shows_width=web_width;
		if(top>shows_height)
		{
			shows_height=top;
		}
		if(lefts>shows_width)
		{
			shows_width=lefts;
		}
		document.getElementById("toast_bg").style.height=parseInt(shows_height) + "px";
		document.getElementById("toast_bg").style.width=shows_width + "px";		
		document.getElementById("toast_bg").style.display="block";
		$("#toast_bg").show();
		document.body.style.overflow="hidden";
		//获取中间盒子的高度和宽度
		var div_h=$("#toast").outerHeight();
		var div_w=$("#toast").outerWidth();
		//alert((web_width-div_w)/2);
		//获取中间盒子的高度和宽度
		//计算数据让悬浮盒子居中
		document.getElementById("toast").style.left=(web_width-div_w)/2 + "px";
		document.getElementById("toast").style.top=parseInt((web_height-div_h))/2 + "px";
		$("#toast").show();
		//Jr_timeouts=setTimeout("JrShow()",300);		
	}
	
	//默认读取会员信息
	function showLoginHtmls()
	{
		
		if(checkhHtml5())
		{
			$.ajax({url:"/index.php/panels/states/shows",
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					layer.closeAll();
					//layer.msg("抱歉：网络连接失败，请稍后再试!");
				},
				beforeSend:function(){
					var index = layer.load(1, {
					  shade: [0.5,'#000000'] //0.1透明度的白色背景
					});
				},
				success:function(result){
					layer.closeAll();
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					//alert(result);
					$("#reg_a_btn").html('<a href="' + Domains + 'members/register.html">立即注册</a>');
					$("#reg_b_btn").html('<a href="' + Domains + 'members/register.html"> 立 即 注 册 </a>');
					if(result.indexOf("我的资料")>=0 && result.indexOf("密码安全")>=0)
					{
						$("#reg_a_btn").html('<a href="javascript:IndexLogout();">安全退出</a>');	
						$("#reg_b_btn").html('<a href="javascript:IndexLogout();"> 安 全 退 出 </a>');
					}
					$("#HtmlInners").html(result);
					if(load_do==2)
					{
						//读取会员详情页面的评论列表
						readInfoCommentsPage(1);	
					}
				} 
			});			
		}		
		else
		{
			JrShow();
		}
	}
	
	//读取会员昵称，所在地区信息
	function readMemberInfos()
	{
		if(checkhHtml5())
		{
			$.ajax({url:"/index.php/panels/states/infos",
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					//layer.closeAll();
					//layer.msg("抱歉：网络连接失败，请稍后再试!");
				},
				beforeSend:function(){
					
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							$("#memberInfos").html(result);
						}	
						else if(arr[0]==200)
						{
							IndexLogout();	
						}
						else
						{
							layer.msg(arr[1]);
						}
					}
					else
					{
						$("#memberInfos").html(result);
					}					
					
				} 
			});			
		}		
		else
		{
			JrShow();
		}			
	}
	
	//退出登录
	function IndexLogout()
	{
		if(index_form_load==0)
		{
			$.ajax({url:Domains + "panels/infos/logout",
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					layer.closeAll();
					index_form_load=0;
					layer.msg("抱歉：网络连接失败，请稍后再试!");
				},
				beforeSend:function(){
					index_form_load=1;
					var index = layer.load(1, {
					  shade: [0.5,'#000000'] //0.1透明度的白色背景
					});
				},
				success:function(result){
					layer.closeAll();
					index_form_load=0;
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					location=Domains + "members/login.html";
					//showLoginHtmls();//读取会员加载信息
				} 
			});			
		}
		else
		{
			layer.msg('抱歉：尚有未完成进程处理，请稍后再试');	
		}
	}
	
	//首页登录
	function IndexLogin()
	{
		if(index_form_load==0)
		{
			var username=get_value("username");
			var passwd=get_value("passwd");
			var autologin="";
			
			var p_username=/^[a-zA-z]\w{3,15}$/;
			var p_mobile=/^(13[0-9]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|8|9|7]|17[0|1|2|3|4|5|6|8|9|7])\d{8}$/;
			var p_email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	
			
			if(username=="" || (!p_username.test(username) && !p_mobile.test(username) && !p_email.test(username)))
			{
				layer.msg("登录用户名/手机号/邮箱错误!");
			}
			else if(passwd=="" || strlen(passwd)<6 || strlen(passwd)>16)
			{
				layer.msg("登录密码错误!");	
			}
			else
			{			
				$.ajax({url:$("#formLogin").attr("action"),
				type: 'POST',
				data:{username:username,passwd:passwd,autologin:autologin}, 
				dataType: 'html', 
				timeout: 10000, 
					error: function(){
						layer.closeAll();
						index_form_load=0;
						layer.msg("抱歉：网络连接失败，请稍后再试!");
					},
					beforeSend:function(){
						index_form_load=1;
						var index = layer.load(1, {
						  shade: [0.5,'#000000'] //0.1透明度的白色背景
						});
					},
					success:function(result){
						layer.closeAll();
						index_form_load=0;
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						if(result.indexOf("|")>=0)
						{
							arr=result.split("|");
							if(arr[0]==100)
							{
								showLoginHtmls();						
							}	
							else
							{
								layer.msg(arr[1]);
							}
						}
						else
						{
							layer.msg("抱歉：网络连接失败，请稍后再试!");
						}
						
					} 
				});
			}
		}
		else
		{
			//layer.msg("");
			layer.msg('抱歉：尚有未完成进程处理，请稍后再试');
		}
	}
	
	function show_search_regionBox()
	{
		open_boxs(700,330);
		var htmls=$(".reg_contents").html().replace(/(^\s*)|(\s*$)/g, "");
		if(htmls.indexOf("正在卖力")>=0)
		{
			$.ajax({url:"/index.php/panels/states/indexregion",
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
	
				},
				beforeSend:function(){
					
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					$(".reg_contents").html(result);
				} 
			});				
		}
	}
	

	
	function show_Index_city(id,name)
	{
		if(Index_Region_do==0)
		{
			
			IndexProName=name;
			
			if(IndexProId!=id)
			{
				//不是同一个地区的时候才做点击处理
				
				$("#index_city_html").html("");
				$("#index_qu_html").html("");
				
				if(IndexProId!="")
				{
					$("#irg_" + IndexProId).attr("class","");
				}
				$("#irg_" + id).attr("class","hover");
				
				IndexProId=id;
				
				//重置二级和三级数据为空
				IndexCityName="";
				IndexQuName="";
				IndexCityId="";
				IndexQuId="";
				//重置二级和三级数据为空
				
				$.ajax({url:"/index.php/panels/states/indexregions",
				type: 'GET',
				data:{name:name,id:id,act:1},
				dataType: 'html', 
				timeout: 10000, 
					error: function(){
						Index_Region_do=0;
						layer.closeAll();
						//layer.msg("抱歉：网络连接失败，请稍后再试!");
					},
					beforeSend:function(){
						
						Index_Region_do=1;
						var index = layer.load(1, {
						  shade: [0.5,'#000000'] //0.1透明度的白色背景
						});
						
					},
					success:function(result){
						
						layer.closeAll();
						Index_Region_do=0;
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						$("#index_city_html").html(result);
						
					} 
				});
			}
		}
	}
	
	function show_Index_Qu(id,name)
	{
		if(Index_Region_do==0)
		{
			
			IndexCityName=name;
			
			if(IndexCityId!=id)
			{
				//不是同一个地区的时候才做点击处理

				$("#index_qu_html").html("");
				
				if(IndexCityId!="")
				{
					$("#irg_" + IndexCityId).attr("class","");
				}
				$("#irg_" + id).attr("class","hover");
				
				IndexCityId=id;
				
				//重置二级和三级数据为空
				IndexQuName="";
				
				IndexQuId="";
				//重置二级和三级数据为空
				
				$.ajax({url:"/index.php/panels/states/indexregions",
				type: 'GET',
				data:{name:name,id:id,act:2},
				dataType: 'html', 
				timeout: 10000, 
					error: function(){
						Index_Region_do=0;
						layer.closeAll();
						//layer.msg("抱歉：网络连接失败，请稍后再试!");
					},
					beforeSend:function(){
						
						Index_Region_do=1;
						var index = layer.load(1, {
						  shade: [0.5,'#000000'] //0.1透明度的白色背景
						});
						
					},
					success:function(result){
						
						layer.closeAll();
						Index_Region_do=0;
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						$("#index_qu_html").html(result);
						
					} 
				});
			}
		}			
	}
	
	function show_Index_RegionInputs(id,name)
	{
		if(Index_Region_do==0)
		{
			
			IndexQuName=name;
			
			if(IndexQuId!=id)
			{
				//不是同一个地区的时候才做点击处理

				if(IndexQuId!="")
				{
					$("#irg_" + IndexQuId).attr("class","");
				}
				$("#irg_" + id).attr("class","hover");
				
				IndexQuId=id;
				
				show_Write_Region_Input();
			}
		}			
	}
	
	function show_Write_Region_Input(act)
	{
		var Region_Str="";
		
		if(act==1)
		{
			IndexCityName="";	
			IndexCityId="";
			
			IndexQuName="";
			IndexQuId="";
		}
		else if(act==2)
		{
			
			IndexQuName="";
			IndexQuId="";
		}
		
		if(IndexProName!="")
		{
			Region_Str=IndexProName;
		}
		
		if(IndexCityName!="")
		{
			Region_Str=Region_Str + " " + IndexCityName;	
		}
		
		if(IndexQuName!="")
		{
			Region_Str=Region_Str + " " + IndexQuName;	
		}	
		
		close_boxs();
		
		//alert(Region_Str);
		
		$("#regionShows").val(Region_Str);
		
	}

	var look_state=0;
	
	function look_qq(id)
	{
		if(look_state==0)
		{
			$.ajax({url:"/index.php/panels/indexs/qq/" + id,
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					look_state=0;
					layer.closeAll();
					layer.msg("^_^:网络忙，请稍后再试！");	
					//layer.closeAll();
					//layer.msg("抱歉：网络连接失败，请稍后再试!");
				},
				beforeSend:function(){
					look_state=1;
					var index = layer.load(1, {
					  shade: [0.5,'#000000'] //0.1透明度的白色背景
					});
				},
				success:function(result){
					look_state=0;
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					layer.closeAll();
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							layer.alert('Ta的QQ号为：<strong style="color:#333333;"><a href="tencent://message/?uin=' + arr[1] + '&Site=danshenjiaoyouwang&Menu=yes" target="_blank" title="点击进行QQ会话">' + arr[1] + '</a></strong>', {
							skin: 'layui-layer-lan'
							,closeBtn: 0
							,anim: 4 //动画类型
							});						
						}	
						else if(arr[0]==200)
						{
							layer.msg("^_^，请先登录哦！");	
						}
						else
						{
							layer.msg(arr[1]);
						}
					}
					else
					{
						layer.msg("^_^:网络忙，请稍后再试！");	
					}					
					
				} 
			});			
		}	
		else
		{
			layer.msg("^_^:网络忙，请稍后再试！");	
		}
	}
	
	function look_weixin(id)
	{
		if(look_state==0)
		{
			$.ajax({url:"/index.php/panels/indexs/weixin/" + id,
			type: 'GET',
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					look_state=0;
					layer.closeAll();
					layer.msg("^_^:网络忙，请稍后再试！");	
					//layer.closeAll();
					//layer.msg("抱歉：网络连接失败，请稍后再试!");
				},
				beforeSend:function(){
					look_state=1;
					var index = layer.load(1, {
					  shade: [0.5,'#000000'] //0.1透明度的白色背景
					});
				},
				success:function(result){
					look_state=0;
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					layer.closeAll();
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							layer.alert('Ta的微信号为：<strong style="color:#333333;">' + arr[1] + '</strong>', {
							skin: 'layui-layer-lan'
							,closeBtn: 0
							,anim: 4 //动画类型
							});						
						}	
						else if(arr[0]==200)
						{
							layer.msg("^_^，请先登录哦！");	
						}
						else
						{
							layer.msg(arr[1]);
						}
					}
					else
					{
						layer.msg("^_^:网络忙，请稍后再试！");	
					}					
					
				} 
			});			
		}	
		else
		{
			layer.msg("^_^:网络忙，请稍后再试！");	
		}
	}	
	
	function no_contact()
	{
		layer.msg('^_^，Ta还没有留下此联系方式哦！');	
	}
	
	function search_members()
	{
		var s_gender=$("#s_gender").val();
		var s_start=$("#s_start").val();
		var s_end=$("#s_end").val();
		var s_pro=IndexProId;
		if(s_pro=="" || s_pro==0)
		{
			s_pro=0;
		}
		var s_pro=IndexProId;
		if(s_pro=="" || s_pro==0)
		{
			s_pro=0;
		}
		var s_city=IndexCityId;
		if(s_city=="" || s_city==0)
		{
			s_city=0;
		}
		var s_qu=IndexQuId;
		if(s_qu=="" || s_qu==0)
		{
			s_qu=0;
		}			
		var s_rz=$("#s_rz").val();	
		location=Domains + "home/search/1/" + s_rz + "_" + s_gender + "_" + s_start + "_" + s_end + "_" + s_pro + "_" + s_city + "_" + s_qu + ".html";	
	}