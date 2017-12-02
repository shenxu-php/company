// JavaScript Document
	function reg_show()
	{
		open_boxs(600,500);
	}
	
	function open_boxs(w,h)
	{
		$(".recson_bg").show(400);	
		$(".recson_box").show();	
		$(".recson_center").show();	
		$(".recson_box").width(parseInt(w)+20)
		$(".recson_box").height(parseInt(h)+20);
		$(".recson_center").width(w)
		$(".recson_center").height(h);
	}
	
	function close_boxs()
	{
		$(".recson_bg").hide(400);	
		$(".recson_box").hide();	
		$(".recson_center").hide();		
	}
	
	var agree_email_value=false;
	var agree_mobile_value=false;
	
	function agrees(type)
	{
		if(type==1)
		{
			//邮箱注册
			var class_name=$("#bingo_1").attr("class");
			if(class_name=="")
			{
				agree_email_value=true;
				$("#bingo_1").attr("class","hover");
			}
			else
			{
				agree_email_value=false;
				$("#bingo_1").attr("class","");
			}
		}
		else
		{
			//手机注册
			var class_name=$("#bingo_2").attr("class");
			if(class_name=="")
			{
				agree_mobile_value=true;
				$("#bingo_2").attr("class","hover");	
			}
			else
			{
				agree_mobile_value=false;
				$("#bingo_2").attr("class","");
			}	
		}
	}
	
	
	function show_reg(type)
	{
		if(type==1)
		{
			$("#email_form").attr("class","hover");
			$("#mobile_form").attr("class","");
			$("#reg_email_form").show();
			$("#reg_mobile_form").hide();
		}
		else
		{
			$("#email_form").attr("class","");
			$("#mobile_form").attr("class","hover");
			$("#reg_email_form").hide();
			$("#reg_mobile_form").show();	
		}
	}
	
	var username_check=/^[a-zA-z]\w{3,15}$/;
	var usernamea_cookie="";
	var usernamea_waiting=0;
	
	function check_reg_usernamea()
	{
		
		var reg_usernamea=$("#reg_usernamea").val().replace(/(^\s*)|(\s*$)/g,"");
		
		if(usernamea_cookie!="" && reg_usernamea!="" && reg_usernamea==usernamea_cookie && usernamea_waiting>2){}else{
			usernamea_cookie=reg_usernamea;
			$("#check_reg_usernamea_msg").hide();			
			if(reg_usernamea==""){usernamea_waiting=0;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html('请填写用户名');}		
			else if(!username_check.test(reg_usernamea)){usernamea_waiting=0;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html('用户名错误');}
			else if(reg_usernamea.length>12){usernamea_waiting=0;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html('用户名太长');}
			else{
				//ajax信息
				username_waiting=3;
				$.ajax({url:UserName_URL,
				type: 'POST', 
				data:{username:reg_usernamea}, 
				dataType: 'html',
				timeout: 10000, 
					error: function(){
						usernamea_waiting=0;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html('用户名检测失败');
					},
					beforeSend:function(){$("#check_reg_usernamea_msg").hide();},
					success:function(result){
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						if(result.indexOf("|")>=0)
						{
							arr=result.split("|");
							if(arr[0]==100)
							{
								username_waiting=100;
							}	
							else
							{
								usernamea_waiting=4;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html(arr[1]);	
							}
						}
						else
						{
							usernamea_waiting=0;$("#check_reg_usernamea_msg").attr("display","inline-block");$("#check_reg_usernamea_msg").show();$("#check_reg_usernamea_msg").html('用户名检测失败')	
						}
						
					} 
				});
			}
		}
	}
	
	
	var email_check=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var emaila_cookie="";
	var emaila_waiting=0;
	function check_reg_emaila()
	{
		
		var reg_emaila=$("#reg_emaila").val().replace(/(^\s*)|(\s*$)/g,"");
		
		if(emaila_cookie!="" && reg_emaila!="" && reg_emaila==emaila_cookie && emaila_waiting>2){}else{
			emaila_cookie=reg_emaila;
			$("#check_reg_emaila_msg").hide();
			if(reg_emaila==""){emaila_waiting=0;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html('请填写邮箱地址');}		
			else if(!email_check.test(reg_emaila)){emaila_waiting=0;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html('邮箱地址错误');}
			else if(reg_emaila.length>25){emaila_waiting=0;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html('邮箱地址太长');}
			else{
				//ajax信息
				emaila_waiting=3;
				$.ajax({url:Email_URL,
				type: 'POST', 
				data:{email:reg_emaila}, 
				dataType: 'html',
				timeout: 10000, 
					error: function(){
						emaila_waiting=0;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html('邮箱检测失败');
					},
					beforeSend:function(){$("#check_reg_emaila_msg").hide();},
					success:function(result){
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						if(result.indexOf("|")>=0)
						{
							arr=result.split("|");
							
							if(arr[0]==100)
							{
								emaila_waiting=100;
								//alert(AutoSendMailCaptcha);
								if(AutoSendMailCaptcha==2)
								{
									AutoSendMailCaptcha=1;
									sendEmailCaptchas();
								}
							}	
							else
							{
								emaila_waiting=4;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html(arr[1]);	
							}
						}
						else
						{
							emaila_waiting=0;$("#check_reg_emaila_msg").attr("display","inline-block");$("#check_reg_emaila_msg").show();$("#check_reg_emaila_msg").html('邮箱检测失败')	
						}
						
					} 
				});				
			}
		}
	}