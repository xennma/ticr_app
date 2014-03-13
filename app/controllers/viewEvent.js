var id = arguments[0] || {};
var user_id = 0;

var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.viewEvent,"Upcoming Events",false,$.vp,$.scroll,null,false);

var data = require('dataExport');
var categoryId = 0;

var client = Ti.Network.createHTTPClient();
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_EVENT;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	var height = Ti.Platform.displayCaps.platformHeight - 210;
	$.container.height = height ;
	$.viewTable.top = height + 1;	
	var json = this.responseText;
	var responses = JSON.parse(json);
	$.title.text = responses.title;	
	var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
	if(responses.thumb != null)
	{
		imageLink = responses.thumb;
		if(imageLink.substring(0,4) != 'http')
		{
			imageLink = Alloy.Globals.DOMAIN + imageLink;
		}
	}
	$.image.image = imageLink;
	$.author.text = responses.name;
	$.date.text = responses.message;
	$.views.text = responses.confirmed;
	$.description.text = responses.description;	
	

	data.getListItems($.activity, $.table,0,0,categoryId,responses.creator,responses.id,'Events', true);
	//$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 15) / 100);
	$.activity.hide(); 
	user_id = responses.creator;
	
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString()
};
client.send(params);


$.table.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			$.viewEvent.close();
			var win = Alloy.createController('viewEvent', e.source.link).getView();			
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
		} else {
			var index = $.table.getIndexByName('rowMore');
			if(index > 0)
			{
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;	
				data.getListItems($.activity, $.table,offset,pageHome,categoryId,user_id,id,'Events',true);
				$.viewTable.height = $.viewTable.height + (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 18) / 100);
			}
		}		
	});
	    
setTimeout(function(){
	$.viewTable.height = (Alloy.Globals.LIMIT ) * ((Ti.Platform.displayCaps.platformHeight * 18) / 100);
    $.scroll.scrollTo(0,0);
}, 2000);
$.table.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});


