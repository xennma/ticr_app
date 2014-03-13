
var args = arguments[0] || {};

function closeView (){
	if(args.vp){
	args.vp.hide();
	args.vp.release();
	args.vp = null;
	}
	if(args.reset)
	{
		var win = Alloy.createController('feed', 1).getView();
		var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
		win.open({transition:t});
	} //else {		
		args.ventana.close();	
	//}
}
var backArrow = Ti.UI.createLabel({
  color:'Gray',
  text: '\u25c3',
});
$.current.text = args.title;
$.backArrow.add(backArrow);

if(args.title == 'Login')
{
	$.bottomLogin.hide();
};

$.textBottom.text = 'Login';
	if(Ti.App.Properties.getString('user_id') > 0)
	{
		$.textBottom.text = 'Logout';
	}

$.bottomLogin.addEventListener('click', function(e){
	var actionBar = require('actionBarButtoms');
	actionBar.iosActionLogin(args.ventana,args.vp);	
});


if(args.title == 'Camera')
{
	$.iconSmall.width = '5%';
	$.bottomLogin.width = '15%';	
	$.current.left = '12%';
}

