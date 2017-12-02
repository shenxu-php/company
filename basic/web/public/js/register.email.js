// JavaScript Document
$(document).ready(function() {
	$("#agree_box").click(function(){
		agree_cs();
  	});
	$("#username").blur(function(){
		username_c();
  	});	
	$("#password_confirmation").blur(function(){
		passwd_c();
  	});	
	$("#password").blur(function(){
		passwd_c();
  	});
	$("#mobile").blur(function(){
		mobile_c();
  	});
	$("#code").blur(function(){
		validation_c();
  	});	


});

var agree="";
function agree_cs(){
	if(agree==""){
		show_inner("agree_box","√");
		agree="load";
	}else{
		show_inner("agree_box","");
		agree="";
	}
}

var error_inner_1='<div class="msg_html">';
var error_inner_2='</div>';
var username_waiting=0;
var username_cookie="";
function username_c(){
	var username=get_value("username");
	var username_check=/^[a-zA-z]\w{3,15}$/;	
	if(username_cookie!="" && username!="" && username==username_cookie && username_waiting>2){}else{
		username_cookie=username;
		show_inner("username_msg","");
		if(username==""){
			username_waiting=0;
			show_inner("username_msg",error_inner_1 + '用户名 不能为空' + error_inner_2);
		}else if(!username_check.test(username)){
			username_waiting=0;
			show_inner("username_msg",error_inner_1 + '用户名 必须为字母开头，长度为4-16位' + error_inner_2);
		}else{
			username_waiting=2;
			$.ajax({url:UserName_URL,
			type: 'POST', 
			data:{username:username}, 
			dataType: 'html',
			timeout: 10000, 
				error: function(){
					username_waiting=0;
					show_inner("username_msg",error_inner_1 + '用户名检测失败' + error_inner_2);
				},
				beforeSend:function(){},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					//alert(result);
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							username_waiting=100;	
							show_inner("username_msg","");	
						}	
						else
						{
							username_waiting=0;
							show_inner("username_msg",error_inner_1 + arr[1] + error_inner_2);	
						}
					}
					else
					{
						username_waiting=0;
						show_inner("username_msg",error_inner_1 + '用户名检测失败' + error_inner_2);	
					}
				} 
			});
		}
	}		
}

var password_waiting=0;

function passwd_c(){
	var password_confirmation=get_value("password_confirmation");
	var password=get_value("password");
	show_inner("pwd_msg","");
	show_inner("pwd_re_msg","");
	if(password==""){
		password_waiting=0;
		show_inner("pwd_msg",error_inner_1 + '注册密码 不能为空' + error_inner_2);
		show_block("pwd_msg");
		show_inner("pwd_re_msg",error_inner_1 + '注册密码 不正确' + error_inner_2);
		show_block("pwd_re_msg");
	}else if(password.indexOf(" ")>0){
		password_waiting=1;
		show_inner("pwd_msg",error_inner_1 + '注册密码 不能包含空格' + error_inner_2);
		show_block("pwd_msg");
		show_inner("pwd_re_msg",error_inner_1 + '注册密码 不正确' + error_inner_2);
		show_block("pwd_re_msg");
	}else if(password.indexOf("　")>0){
		password_waiting=1;
		show_inner("pwd_msg",error_inner_1 + '注册密码 不能包含空格' + error_inner_2);
		show_block("pwd_msg");
		show_inner("pwd_re_msg",error_inner_1 + '注册密码 不正确' + error_inner_2);
		show_block("pwd_re_msg");
	}else if(password.length<6 || password.length>16){
		password_waiting=1;
		show_inner("pwd_msg",error_inner_1 + '注册密码 长度应为6-16位字符' + error_inner_2);
		show_block("pwd_msg");
		show_inner("pwd_re_msg",error_inner_1 + '注册密码 不正确' + error_inner_2);
		show_block("pwd_re_msg");
	}else{
		show_none("pwd_msg");  	
		if(password_confirmation==""){
			password_waiting=1;
			show_inner("pwd_re_msg",error_inner_1 + '确认密码 不能为空' + error_inner_2);
			show_block("pwd_re_msg");				
		}else if(password_confirmation!=password){
			password_waiting=1;
			show_inner("pwd_re_msg",error_inner_1 + '确认密码 和注册密码输入不一致' + error_inner_2);
			show_block("pwd_re_msg");				
		}else{
			password_waiting=100;
			show_none("pwd_re_msg");	
		}
	}
}


var mobile_waiting=0;
var mobile_cookie="";
function mobile_c(){
	var mobile=get_value("mobile");	
	var mobile_check=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	
	if(mobile_cookie!="" && mobile!="" && mobile==mobile_cookie && mobile_waiting>2){}else{
		mobile_cookie=mobile;
		if(mobile==""){
			mobile_waiting=0;
			show_inner("mobile_msg",error_inner_1 + '注册邮箱 不能为空' + error_inner_2);
			show_block("mobile_msg");
		}else if(!mobile_check.test(mobile)){
			mobile_waiting=0;
			show_inner("mobile_msg",error_inner_1 + '注册邮箱 必须是一个有效的邮箱号码' + error_inner_2);	
			show_block("mobile_msg");
		}else{
			mobile_waiting=2;
			$.ajax({url:Mobile_Url, 
			type: 'POST', 
			data:{mail:mobile}, 
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					show_inner("mobile_msg",error_inner_1 + '邮箱地址 检测失败请您稍后再试' + error_inner_2);	
					show_block("mobile_msg");
				},
				beforeSend:function(){
					show_none("mobile_msg");
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					//alert(result);
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							mobile_waiting=100;	
							show_inner("mobile_msg","");
							var code=get_value("code");
							if(strlen(code)==6){
								validation_c();
							}								
						}	
						else
						{
							mobile_waiting=0;
							show_inner("mobile_msg",error_inner_1 + arr[1] + error_inner_2);
							$("#mobile_msg").show();	
						}
					}
					else
					{
						mobile_waiting=4;
						show_inner("mobile_msg",error_inner_1 + '邮箱地址 检测失败请您稍后再试' + error_inner_2);	
					}
				} 
			});
		}
	}
}

var code_waiting=0;
var code_cookie="";
function validation_c(){
	var code=get_value("code");
	code_cookie=code;
	if(code==""){
		code_waiting=0;
		show_inner("code_msg",error_inner_1 + '验证码 不能为空' + error_inner_2);
	}else if(strlen(code)!=6){
		code_waiting=0; 
		show_inner("code_msg",error_inner_1 + '验证码 不正确' + error_inner_2);
	}else{
		code_waiting=100;	
	}		
}


var timer=61;
var settime="";
//获取验证码
function time_over(){
	var mobile=get_value("mobile");
	var mobile_check=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	
	if(mobile==""){
		show_message("请输入邮箱地址!",8);
		get_focus("mobile");
		mobile_waiting=0;
		show_inner("mobile_msg",error_inner_1 + '邮箱地址 不能为空' + error_inner_2);
	}else if(!mobile_check.test(mobile)){
		show_message("邮箱地址不正确!",8);
		get_focus("mobile");
		mobile_waiting=0;
		show_inner("mobile_msg",error_inner_1 + '邮箱地址 必须是一个有效的邮箱号码' + error_inner_2);	
	}else{
		show_inner('validate_btn','<input type="submit" value="正在发送中..." disabled="disabled" style="width:130px;text-align:center; border:#CCCCCC 1px solid;background:#f4f4f4; height:40px; line-height:34px;font-size:12px;"/>');
		send_validation(mobile);
	}
}

//提交验证码信息
function send_validation(mobile){
	$.ajax({url:S_Url, 
	type: 'POST', 
	data:{mobile:mobile}, 
	dataType: 'html', 
	timeout: 15000, 
		error: function(){
			show_inner('validate_btn','<input type="submit" value="点击发送验证码" style="width:130px;text-align:center; border:#CCCCCC 1px solid;background:#f4f4f4; height:40px; line-height:34px;font-size:12px;" onclick="time_over();"/>');
			show_message("发送请求错误!",8);	
		},
		beforeSend:function(){
			
		},
		success:function(result){
			show_inner('validate_btn','<input type="submit" value="点击发送验证码" style="width:130px;text-align:center; border:#CCCCCC 1px solid;background:#f4f4f4; height:40px; line-height:34px;font-size:12px;" onclick="time_over();"/>');
			result=result.replace(/(^\s*)|(\s*$)/g,"");
			//alert(result);
			if(result.indexOf("|")>=0)
			{
				arr=result.split("|");
				if(arr[0]==100)
				{
					layer.msg("验证码发送成功");
					over_go();								
				}	
				else
				{
					show_message(arr[1],8);
				}
			}
			else
			{
				show_message("发送请求错误!",8);	
			}	
		} 
	});		
}


//发送验证码信息
function over_go(){
	timer=timer-1;
	if(timer>0){
		document.getElementById("validate_btn").innerHTML='<input type="submit" value="' + timer + '秒后再次获取" disabled="disabled" style="width:130px;text-align:center; border:#CCCCCC 1px solid;background:#f4f4f4; height:40px; line-height:34px;font-size:12px;"/>';
		settime=setTimeout("over_go()",1000);
	}else{
		document.getElementById("validate_btn").innerHTML='<input type="submit" value="点击发送验证码" style="width:130px;text-align:center; border:#CCCCCC 1px solid;background:#f4f4f4; height:40px; line-height:34px;font-size:12px;" onclick="time_over();"/>';
		timer=61;
		clearTimeout(settime);
	}
}

function ajax_mobile_reg(){
	//提交注册信息
	if(password_waiting==100 && mobile_waiting==100 && code_waiting==100 && username_waiting==100){
		if(agree=="load"){
			$.ajax({url:$("#form1").attr("action"), 
			type: 'POST', 
			data:{email:mobile_cookie,username:username_cookie,passwd:get_value("password"),code:code_cookie}, 
			dataType: 'html', 
			timeout: 15000, 
				error: function(){
					show_message("注册请求错误，请稍后再试!",8);
				},
				beforeSend:function(){
					show_loads();
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					//document.write(result);
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							location=Web_Url;						
						}	
						else
						{
							show_message(arr[1],8);
						}
					}
					else
					{
						show_message("注册请求错误，请稍后再试!",8);	
					}
				} 
			});		
		}else{
			show_message("请阅读并同意会员服务协议!",8);
		}
	}else{
		mobile_c();	validation_c();	username_c();	passwd_c();
	}
	return false;
}
