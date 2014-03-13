var args = arguments[0] || {};

var name1 = args.name || '';
if(name1.length > Alloy.Globals.TITLE_LIST)
{
	name1 = name1.substring(0,Alloy.Globals.TITLE_LIST - 2) + '...';			
}

$.title.text = name1;



var isTablet = (width > 899 || height > 899);
var deviceHeight = Ti.Platform.displayCaps.platformHeight;
var deviceWidth = Ti.Platform.displayCaps.platformWidth;

var height = 360;
var osname = Ti.Platform.osname;
if(osname === 'ipad')
{
	height = 800;
}
$.container.height = height+'dp';
$.container.top = (height * args.row)+'dp';


var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_USER_DEFAULT;
if(args.image.length > 0)
{
	imageLink = args.image;
	if(imageLink.substring(0,4) != 'http')
	{
		imageLink = Alloy.Globals.DOMAIN + imageLink;
	}
};

$.cover.image = imageLink;

var textInfo = '';  
	if(args.status){
		textInfo = args.status;
	}	
	if((args.about) && (textInfo ==''))
	{
		textInfo =  args.about;	
	} 
	var top = 5;
	var topPlus = 15;
	if(textInfo != '')
	{
		if(textInfo.length > Alloy.Globals.ABOUT)
		{
			textInfo = textInfo.substring(0,Alloy.Globals.ABOUT - 2) + '...';			
		}
		$.about.text = textInfo;
		$.about.top = 0;
		top = 45;
	}
	var osname = Ti.Platform.osname;
if(osname === 'ipad')
{
	top = top + 25;	
	topPlus = topPlus + 15;	
}

if (args.campaing != null)
{
	$.porcentaje.width = args.percent+'%';
	$.accomplished.text = '$' + args.received + ' Pledged';
	$.days.text = args.days + ' Days to go';
	$.percentage.text = args.percent + ' % Funded';
	
} else {
	
	$.videoinfo.remove($.progressBar);
	$.videos.text = args.videos + ' videos published.';	
	$.views.text = args.views + ' profile views';
	
}


$.videocover.addEventListener('click', function(e){
	var args1 = {
	       video: args.link,	        			
	       author: args.id
	 };
	
	var win = Alloy.createController('viewProfile', args1).getView();	
	if(Ti.Platform.osname == 'android')
	{
		win.fullscreen= false;
		win.open({
		        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
		    });	
	} else {
		var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
		win.open({transition:t});
	}
});		