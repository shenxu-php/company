// JavaScript Document
//找回密码，第一步

var first_status=0;

function resetpasswd_first(){
	var username=get_value("username");
	var code=get_value("code");
	var p_username=/^[a-zA-z]\w{3,15}$/;
	var p_mobile=/^(13[0-9]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|8|9|7]|17[0|1|2|3|4|5|6|8|9|7])\d{8}$/;
	var p_email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(first_status==0){
		first_status=1;
		if(username=="" || (!p_username.test(username) && !p_mobile.test(username) && !p_email.test(username))){
			first_status=0;
			show_message("用户名/手机号/邮箱不正确!",8);	
		}else if(strlen(code)!=4 || code==""){
			first_status=0;
			show_message("验证码不正确!",8);	
		}else{
			$.ajax({url:Re_Url, 
			type: 'POST',
			data:{username:username,code:code}, 
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					change_other();	
					show_message("数据请求错误，请您稍后再试!",8);
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
							arrs=arr[1].split("----");
							location=Reset_Return_Url + "?id=" + arrs[1] + "&Token=" + arrs[0];
						}	
						else
						{
							first_status=0;
							change_other();	
							show_message(arr[1],8);
						}
					}
					else
					{
						first_status=0;
						change_other();	
						show_message("数据请求错误，请您稍后再试!",8);
					}					
				
				} 
			});				
		}
	}
	return false;
}

function update_passwd(){
	var code=get_value("code");
	var act=get_value("act");
	var passwd=get_value("passwd");
	var passwd_re=get_value("passwd_re");
	var token=get_value("token");
	var uid=get_value("uid");	
	if(first_status==0)
	{	
		if(code==""){
			show_message("验证码不能为空!",8);
		}else if(code.length!=6){
			show_message("验证码不正确!",8);
		}else if(passwd==""){
			show_message("新密码不能为空!",8);
		}else if(strlen(passwd)<6 || strlen(passwd)>16){
			show_message("密码为6-16位!",8);
		}else if(passwd!=passwd_re){
			show_message("两次密码不一致!",8);	
		}else{
			$.ajax({url:Reset_Return_Url, 
			type: 'POST',
			data:{token:token,passwd:passwd,passwd_re:passwd_re,act:act,code:code,uid:uid}, 
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					first_status=0;
					show_message("修改密码过程出错，请您稍后再试!",8);	
				},
				beforeSend:function(){
					show_loads();
					first_status=1;
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					first_status=0;
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							first_status=1;
							layer.msg("密码修改成功");
							setTimeout("location='" + Login_Return_Url + "'",1500);	
						}	
						else
						{
							show_message(arr[1],8);
						}
					}
					else
					{
						show_message("修改密码过程出错，请您稍后再试!",8);
					}	
	
				} 
			});			
		}
	}
}



function send_captcha(){
	var act=get_value("act");
	$.ajax({url:Re_Send_Url, 
	type: 'POST',
	data:{act:act,token:get_value("token"),uid:get_value("uid")}, 
	dataType: 'html', 
	timeout: 10000, 
		error: function(){
			document.getElementById("validate_btn").innerHTML='<input type="button" name="button2" id="button2" value=" 发送验证码 " onclick="send_captcha();" />';
			show_message("发送请求失败，请稍后再试!",8);
		},
		beforeSend:function(){
			show_inner('validate_btn','<input type="button" name="button2" id="button2" value=" 正在发送中... " disabled="disabled" />');
		},
		success:function(result){
			result=result.replace(/(^\s*)|(\s*$)/g,"");
			//alert(result);
			
			if(result.indexOf("|")>=0)
			{
				arr=result.split("|");
				if(arr[0]==100)
				{
					layer.msg(arr[1]);
					over_go();
				}	
				else
				{
					show_message(arr[1],8);
					document.getElementById("validate_btn").innerHTML='<input type="button" name="button2" id="button2" value=" 发送验证码 " onclick="send_captcha();" />';
				}
			}
			else
			{
				document.getElementById("validate_btn").innerHTML='<input type="button" name="button2" id="button2" value=" 发送验证码 " onclick="send_captcha();" />';
				show_message("发送请求失败，请稍后再试!",8);	
			}			
		
		} 
	});		
}

var timer=61;
var settime="";

//发送验证码信息
function over_go(){
	timer=timer-1;
	if(timer>0){
		document.getElementById("validate_btn").innerHTML='<input type="button" name="button2" id="button2" value=" ' + timer + '秒后再次获取 " disabled="disabled" />';
		settime=setTimeout("over_go()",1000);
	}else{
		document.getElementById("validate_btn").innerHTML='<input type="button" name="button2" id="button2" value=" 发送验证码 " onclick="send_captcha();" />';
		timer=61;
		clearTimeout(settime);
	}
}


