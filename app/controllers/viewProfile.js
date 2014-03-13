var args  = arguments[0] || {};
id = args.video;
author = args.author;

var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.viewProfile,"Artists",false,$.vp,$.container,null,false);

Ti.Gesture.addEventListener("orientationchange", function(e){
	var orientation = Ti.Gesture.orientation;
	if(orientation!=0){
		if($.vp != null)
		{
			if(orientation === 3 || orientation === 4){
				$.vp.fullscreen = true;	
			}
			if(orientation === 1 || orientation === 2){
				$.vp.fullscreen = false;
			}
		}		
	}
});

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_PROFILE;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};
client.onload = function(){	
	var json = this.responseText;
	var responses = JSON.parse(json);
	var url ='';
	
	if(responses.type == '' || responses.type == null)
	{
		$.reportView.hide();
	    	var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_USER_DEFAULT;
			if(responses.avatar.length > 0)
			{
				imageLink = responses.avatar;
				if(imageLink.substring(0,4) != 'http')
				{
					imageLink = Alloy.Globals.DOMAIN + imageLink;
				}
			}

	    	$.cover.image = imageLink;

	} else {

		if(responses.type == 'vod' || responses.type == 'live')
		{
			$.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
			$.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;	
			if (Ti.Platform.osname == 'android'){
				$.vp.mediaControlMode = Titanium.Media.VIDEO_CONTROL_DEFAULT;		
			} else {
				$.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
			}	
			$.vp.url = responses.path;
		} else {
			url = getUrlYoutube(responses.video_id, $.vp);
		}		
		$.data.top = '66%';
		$.links.top = '88%';
	}
	
	var name1 = responses.name;
	if(name1.length > Alloy.Globals.TITLE_VIEW)
	{
		name1 = name1.substring(0,Alloy.Globals.TITLE_VIEW - 2) + '...';			
	}
	
	$.author.text = name1;
	$.videos.text = responses.num_videos + ' videos published.';
	$.views.text = responses.view + ' profile views';	
	$.activity.hide(); 
	
	$.event.addEventListener('click', function(e){
		var args = {       		
	        			author: author,
	        			authorname: responses.name,
	        			view: 'Events'
	      		};
	    $.vp.pause();					
		openWindows(args);		
	});
	
	$.video.addEventListener('click', function(e){
		var args = {       		
	        			author: author,
	        			authorname: responses.name,
	        			view: 'Videos'
	      		};						
		$.vp.pause();					
		openWindows(args);		
	});
	$.campaign.addEventListener('click', function(e){
		var args = {       		
	        			author: author,
	        			authorname: responses.name,
	        			view: 'Campaigns'
	      		};						
		$.vp.pause();					
		openWindows(args);		
	});
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
    author: author
};
client.send(params);

function getUrlYoutube(video_id, vp)
{
	vdldr = Ti.Network.createHTTPClient();
    vdldr.onload = function () {
	   x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
	   y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
	   vp.url = y;
    };
    if(Ti.Platform.osname != 'android')
    {
    	vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
        vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
    }
    vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
    if(Ti.Platform.osname == 'android')
    {
    	vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
    	vdldr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
    }
    vdldr.send();
}

	
function openWindows(arg)
{
	var win = Alloy.createController('viewListOfProfile', arg).getView();		
		win.fullscreen= false;	
		if(Ti.Platform.osname == 'android')
		{
			win.open({
			        activityEnterAnimation: Ti.Android.R.anim.fade_in,
		        activityExitAnimation: Ti.Android.R.anim.fade_out
			    });	
		} else {
			var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
			win.open({transition:t});
		}			
}

$.reportButtom.addEventListener('click', function(){
	var win = Alloy.createController("modalReport",id).getView();
             win.open({
                 modal: true,
                 navBarHidden: true,
                 modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                 modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
             });
});
	