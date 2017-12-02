// JavaScript Document
	var index_form_load=0;
	
	//判断是否含有特殊自负
	function checkStr(str)
	{
		if(str.indexOf("'")>=0)
		{
			return false;	
		}
		else if(str.indexOf("@")>=0)
		{
			return false;	
		}
		else if(str.indexOf("$")>=0)
		{
			return false;	
		}
		else if(str.indexOf("#")>=0)
		{
			return false;	
		}
		else if(str.indexOf("&")>=0)
		{
			return false;	
		}
		else if(str.indexOf("^")>=0)
		{
			return false;	
		}
		else if(str.indexOf("*")>=0)
		{
			return false;	
		}
		else if(str.indexOf("(")>=0)
		{
			return false;	
		}
		else if(str.indexOf(")")>=0)
		{
			return false;	
		}	
		
		return true;
	}
	


	//尚有进程正在处理中
	function noOvers()
	{
		parent.layer.msg("抱歉：尚有其他程序进程处理中，请稍后再试！");		
	}

	var index_load="";

	function index_edit_passwd()
	{
	
		if(index_form_load==0)
		{
			var passwd_1=get_value("passwd_1");
			var passwd_2=get_value("passwd_2");
			var passwd_3=get_value("passwd_3");
			if(passwd_1=="")
			{
				parent.layer.msg("抱歉：请填写当前登录密码！");	
			}
			else if(passwd_1.length<6 || passwd_1.length>16)
			{
				parent.layer.msg("抱歉：当前登录密码不正确！");	
			}
			else if(passwd_2=="" || passwd_2.length<6 || passwd_2.length>16)
			{
				parent.layer.msg("抱歉：请填写新登录密码，长度为6-16位字符之间！");		
			}
			else if(passwd_2!=passwd_3)
			{
				parent.layer.msg("抱歉：两次新登录密码输入不一致！");		
			}
			else
			{
				//Ajaxs Submit
				$.ajax({url:$("#form1").attr("action"),
				type: 'POST',
				data:{passwd_1:passwd_1,passwd_2:passwd_2}, 
				dataType: 'html', 
				timeout: 10000, 
					error: function(){
						parent.layer.close(index_load);
						index_form_load=0;
						layer.msg("抱歉：网络连接失败，请稍后再试!");
					},
					beforeSend:function(){
						index_form_load=1;
						
						index_load = parent.layer.load(1, {
						  shade: [0.5,'#000000'] //0.1透明度的白色背景
						});
						
					},
					success:function(result){
						parent.layer.close(index_load);
						index_form_load=0;
						result=result.replace(/(^\s*)|(\s*$)/g,"");
						if(result.indexOf("|")>=0)
						{
							arr=result.split("|");
							if(arr[0]==100)
							{
								parent.layer.msg(arr[1]);
								setTimeout("parent.layer.closeAll()",1500);	
							}	
							else if(arr[0]==200)
							{
								parent.loginMissIt();	
							}
							else
							{
								parent.layer.msg(arr[1]);
							}
						}
						else
						{
							parent.layer.msg("抱歉：网络连接失败，请稍后再试!");
						}
						
					} 
				});			
			}
		}
		else
		{
			noOvers();
		}
	}