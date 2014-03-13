var id = arguments[0] || {};
var pageHome = 0;

var user_id = 0;

var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.viewVideo,"Live Shows",false,$.vp,$.scroll,null,false);


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

var data = require('dataExport');
var categoryId = 0;
var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	
	var height = Ti.Platform.displayCaps.platformHeight - 140;

	$.container.height = height ;
	$.viewTable.top = height + 1;	
	var json = this.responseText;
	var responses = JSON.parse(json);
	var url ='';
	
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
	$.author.text = responses.name;
	$.title.text = responses.title;
	$.views.text = responses.views;	
	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Videos',true);
	//$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 15) / 100);	
	$.activity.hide(); 
	user_id = responses.creator;
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
};
client.send(params);


$.table.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			$.viewVideo.close();
			var win = Alloy.createController('viewVideo', e.source.link).getView();		
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
		} else {
			var index = $.table.getIndexByName('rowMore');
			if(index > 0)
			{
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;	
				data.getListItems($.activity, $.table,offset,pageHome,categoryId,user_id,id,'Videos',true);
				$.viewTable.height = $.viewTable.height + (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 19) / 100);
			}
		}
	});
	

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

	    
setTimeout(function(){
		$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 19) / 100);
    	$.table.top = 0;
    	$.table.scrollable =  false;
    	$.scroll.scrollTo(0,0);
}, 3000);

$.table.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});


$.reportButtom.addEventListener('click', function(){
	var win = Alloy.createController("modalReport",id).getView();
             win.open({
                 modal: true,
                 navBarHidden: true,
                 modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                 modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
             });
});