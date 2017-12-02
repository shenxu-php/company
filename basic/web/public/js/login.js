// JavaScript Document
$(document).ready(function() {
	$("#username").focus(function(){
		username_focus();
  	});
	$("#username").blur(function(){
		username_blur();
  	});

});

function username_focus(){
	var username=get_value("username");
	if(username=="用户名/邮箱/手机号码"){
		change_value("username","");
		document.getElementById("username").style.color='#333333';
	}
}

function username_blur(){
	var username=get_value("username");
	if(username==""){
		change_value("username","用户名/邮箱/手机号码");
		document.getElementById("username").style.color='#999999';
	}	
}

var login_status=0;

function ajax_login(){
	var username=get_value("username");
	var passwd=get_value("passwd");
	var autologin=get_radio("autologin");
	var p_username=/^[a-zA-z]\w{3,15}$/;
	var p_mobile=/^(13[0-9]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|8|9|7]|17[0|1|2|3|4|5|6|8|9|7])\d{8}$/;
	var p_email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(login_status==0){
		login_status=1;
		if(username=="" || (!p_username.test(username) && !p_mobile.test(username) && !p_email.test(username))){
			login_status=0;
			show_message("登录用户名/手机号/邮箱错误!",8);
		}else if(passwd=="" || strlen(passwd)<6 || strlen(passwd)>16){
			login_status=0;
			show_message("登录密码错误!",8);	
		}else{
			$.ajax({url:$("#form1").attr("action"),
			type: 'POST',
			data:{username:username,passwd:passwd,autologin:autologin}, 
			dataType: 'html', 
			timeout: 10000, 
				error: function(){
					login_status=0;
					show_inner('login_innerHTML','<input type="submit" value="  登     录 " class="login_btn"  />');
					show_message("登录请求失败，请稍后再试!",8);
				},
				beforeSend:function(){
					show_inner('login_innerHTML','<input name="按钮" type="button" class="login_btn" value="  登     录     中... " disabled="disabled"  />');
				},
				success:function(result){
					result=result.replace(/(^\s*)|(\s*$)/g,"");
					
					if(result.indexOf("|")>=0)
					{
						arr=result.split("|");
						if(arr[0]==100)
						{
							location=Login_Return_Url;						
						}	
						else
						{
							login_status=0;
							show_inner('login_innerHTML','<input type="submit" value="  登     录 " class="login_btn"  />');
							show_message(arr[1],8);
						}
					}
					else
					{
						login_status=0;
						show_inner('login_innerHTML','<input type="submit" value="  登     录 " class="login_btn"  />');
						show_message("登录请求出错，请稍后再试!",8);	
					}
					
				} 
			});			
		}
	}
	return false;
}