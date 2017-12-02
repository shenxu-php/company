// JavaScript Document
// JavaScript Document
//+---------------------------------------------------
//|	js时间整除
layer.config({
	extend:'skin/espresso/style.css'
});

function checkhHtml5() {   
	if(typeof(Worker) !== "undefined")
	{
		return true;	
	}
	else
	{
		return false;	
	} 
	//return true; 
}

function show_loads(){
	layer.closeAll();
	var index = layer.load(3,{
		shade: [0.2,'#333333'] //0.1透明度的白色背景
	});		
}
    
function show_message(text,id){
	layer.closeAll();
	layer.alert(text, {
		icon: id,
		skin: 'layer-ext-espresso'
	})	
}                

function get_rewrite(){
	var rewrite=get_value("rewrite");
	return rewrite;
}

function get_value(inner){
	return 	document.getElementById(inner).value.replace(/(^\s*)|(\s*$)/g, "");	
}

function Dsn(){
	return get_value("token");	
}

function get_focus(inner){
 	document.getElementById(inner).focus();	
}

function change_value(inner,v){
	document.getElementById(inner).value=v;	
}

function show_inner(id,text){
	document.getElementById(id).innerHTML=text;
}

function show_block(id){
	document.getElementById(id).style.display="block";	
}

function show_none(id){
	document.getElementById(id).style.display="none";	
}

function hiddenallselect(){
	var selects = document.getElementsByTagName("SELECT");
	for(var i = 0 ; i<selects.length;i++){
		selects[i].style.display = "none";
	}
}
	
function showallselect(){
	var selects = document.getElementsByTagName("SELECT");
	for(var i = 0 ; i<selects.length;i++){
		selects[i].style.display = "";
	}
}

function get_ie6(){
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=b_version.split(";"); 
	var trim_Version=version[1].replace(/[ ]/g,""); 
	if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
		return "IE6";	
	}else{
		return "Other";	
	}
}

function get_r(str){
	var s_group = document.getElementsByName(str);
	var s_group_value="";
	for(var i = 0; i< s_group.length; i++){
		if(s_group[i].checked==true){
			//alert(group[i].value);
			s_group_value=s_group[i].value;
		}
	}
	//alert(s_group_value);
	if(s_group_value!=""){
		return "full";
	}else{
		return "null";
	}
}

function get_radio(str){
	var s_group = document.getElementsByName(str);
	var s_group_value="";
	for(var i = 0; i< s_group.length; i++){
		if(s_group[i].checked==true){
			//alert(group[i].value);
			s_group_value=s_group[i].value;
		}
	}
	//alert(s_group_value);
	if(s_group_value!=""){
		return s_group_value;
	}else{
		return "null";
	}
}

function clean_input(id){
	document.getElementById(id).value="";	
}

function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) { 
     var c = str.charCodeAt(i); 
    //单字节加1 
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
       len++; 
     } 
     else { 
      len+=2; 
     } 
    } 
    return len;
}

function SubstringDemo(s,start,end){ 
	var ss; // 声明变量。 
	ss = s.substring(start, end); // 取子字符串。 
	return(ss); // 返回子字符串。 
} 

//+---------------------------------------------------
//|	操作cookie的方法
//@Author: Sum403298702
//+---------------------------------------------------

function readCookie(name){   
	var cookieValue = "";   
	var search = name + "=";   
	if(document.cookie.length > 0){    
		offset = document.cookie.indexOf(search);   
		if (offset != -1){    
		  offset += search.length;   
		  end = document.cookie.indexOf(";", offset);   
		  if (end == -1) end = document.cookie.length;   
		  cookieValue = unescape(document.cookie.substring(offset, end))   
		}   
	}   
	return cookieValue;   
}

function setCookie(name,value) {
	var Days = 30; //此 cookie 将被保存 30 天
	var exp  = new Date();    //new Date("December 31, 9998");
	exp.setTime(exp.getTime() + Days*24*60*60*1000);

	//document.cookie = name + "="+value+ ";path=/;expires=" + exp.toGMTString();
	document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();

}

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null){
		if (unescape(arr[2]) == null){
			return ;
		}else{
			return unescape(arr[2]);
		}

	}else{
		return ;
	}
}

function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
}

//cookie end

function get_index(){
	var index=document.URL;
	return encodeURIComponent(index);
}

function window_height(){
	if(document.compatMode == "BackCompat"){ 
		var cWidth = document.body.clientWidth; 
		var cHeight = document.body.clientHeight; 
		var sWidth = document.body.scrollWidth; 
		var sHeight = document.body.scrollHeight; 
		var sLeft = document.body.scrollLeft; 
		var sTop = document.body.scrollTop; 
	}else{ //document.compatMode == \"CSS1Compat\" 
		var cWidth = document.documentElement.clientWidth; 
		var cHeight = document.documentElement.clientHeight; 
		var sWidth = document.documentElement.scrollWidth; 
		var sHeight = document.documentElement.scrollHeight; 
		var sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft; 
		var sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop; 
	}
	return sHeight;
}

var For;
function open_box(w,h){
	var ier="";
	if(window.ActiveXObject){
		ier=get_ie6();
		if(ier=="IE6"){
			hiddenallselect();	
		}
	}
	var div_h=h;
	var div_w=w;
	document.getElementById("box").style.height=div_h + "px";
	document.getElementById("box").style.width=div_w + "px";
	document.getElementById("box_center").style.height=div_h-20 + "px";
	document.getElementById("box_center").style.width=div_w-20 + "px";
	var scro=getScrollTop();
	var web_height=window_height();//求浏览器高度
	var web_height1=document.documentElement.clientHeight;//求浏览器可见高度
	var web_width=document.body.clientWidth;//求浏览器宽度
	if(web_height>=web_height1){
		document.getElementById("bg").style.height=parseInt(web_height) + "px";	
	}else{
		document.getElementById("bg").style.height=parseInt(web_height1)  + "px";	
	}
	document.getElementById("bg").style.width=web_width + "px";
	document.getElementById("bg").style.display="";	
	document.getElementById("box").style.display="";
	document.getElementById("box_center").style.display="";
	if(ier=="IE6"){
		document.getElementById("box").style.top=parseInt((web_height1-div_h)/2)+parseInt(scro) + "px";	
		document.getElementById("box_center").style.top=parseInt((web_height1-div_h)/2)+10+parseInt(scro) + "px";		
	}else{
		document.getElementById("box").style.top=(web_height1-div_h)/2 + "px";	
		document.getElementById("box_center").style.top=parseInt((web_height1-div_h)/2)+10 + "px";
	}
	document.getElementById("box").style.left=(web_width-div_w)/2 + "px";
	document.getElementById("box_center").style.left=parseInt((web_width-div_w)/2)+10 + "px";
	open_box_for(w,h);
}

function open_box_for(w,h){
	var ier="";
	if(window.ActiveXObject){
		ier=get_ie6();
		if(ier=="IE6"){
			hiddenallselect();	
		}
	}
	var div_h=h;
	var div_w=w;
	var scro=getScrollTop();
	var web_height=window_height();//求浏览器高度
	var web_height1=document.documentElement.clientHeight;//求浏览器可见高度
	var web_width=document.body.clientWidth;//求浏览器宽度
	if(web_height>=web_height1){
		document.getElementById("bg").style.height=parseInt(web_height) + "px";	
	}else{
		document.getElementById("bg").style.height=parseInt(web_height1)  + "px";	
	}
	document.getElementById("bg").style.width=web_width + "px";
	if(ier=="IE6"){
		document.getElementById("box").style.top=parseInt((web_height1-div_h)/2)+parseInt(scro) + "px";	
		document.getElementById("box_center").style.top=parseInt((web_height1-div_h)/2)+10+parseInt(scro) + "px";		
	}else{
		document.getElementById("box").style.top=(web_height1-div_h)/2 + "px";	
		document.getElementById("box_center").style.top=parseInt((web_height1-div_h)/2)+10 + "px";
	}
	document.getElementById("box").style.left=(web_width-div_w)/2 + "px";
	document.getElementById("box_center").style.left=parseInt((web_width-div_w)/2)+10 + "px";
	For=setTimeout("open_box_for('" + w + "','" + h + "')",50);		
}

function getScrollTop(){//return scroll
	var scrollTop=0;
	if(document.documentElement && document.documentElement.scrollTop){
		scrollTop=document.documentElement.scrollTop;
	}else if(document.body){
		scrollTop=document.body.scrollTop;
	}
	return scrollTop;
}

function close_box(id){
	clearTimeout(For);
	show_none("box");
	show_none("bg");
	if(id!=1){
		show_none("box_center");
		show_inner("box_center","");
	}
	if(window.ActiveXObject){
		var ier=get_ie6();
		if(ier=="IE6"){
			showallselect();	
		}
	}		
}

function ImageAutoZoom(Img,FitWidth,FitHeight)

{

  var image=new Image();

  image.src=Img.src;

  if(image.width>0 && image.height>0) 

  {

    if(image.width/image.height>= FitWidth/FitHeight)

    {

     if(image.width>FitWidth) 

     {

       Img.width=FitWidth;

       Img.height=(image.height*FitWidth)/image.width; 

     }

     else if(image.hight>FitHeight)

     {

       Img.height=FitHeight;

       Img.width=(image.width*FitHeight)/image.height; 

     }

     else

     {

      Img.width=FitWidth;

      Img.height=FitHeight;

     }

    }

  }

} 