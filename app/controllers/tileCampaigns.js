var args = arguments[0] || {};

$.title.link = args.link;

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


var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
if(args.image != null)
{
	imageLink = args.image;
	if(imageLink.substring(0,4) != 'http')
	{
		imageLink = Alloy.Globals.DOMAIN + imageLink;
	}
};

$.cover.image = imageLink;
$.cover.touchEnabled = false;

$.porcentaje.width = args.percent+'%';

var textInfo = args.shortdesc;
if(textInfo.length > Alloy.Globals.ABOUT)
		{
			textInfo = textInfo.substring(0,Alloy.Globals.ABOUT - 2) + '...';			
		}
		$.about.text = textInfo;

$.accomplished.text = '$' + args.received + ' Pledged';
$.days.text = args.days + ' Days to go';
$.percentage.text = args.percent + ' % Funded';
//The cover view
	var shadowTop="0%";
	if(Ti.Platform=='android'){shadowTop="7dp";}
	var theImageShadow=Ti.UI.createImageView({
		image:"/videoCover.png",
		top:shadowTop,
		left: 0,
		touchEnabled:false,
		width:'100%',
		height: '100%',
		zIndex: 5
	});
	
		$.videocover.add(theImageShadow);
	
$.videocover.addEventListener('click', function(e){
	var win = Alloy.createController('viewCampaign', args.link).getView();	
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