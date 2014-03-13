var args = arguments[0] || {};
var event_id = args.event_id;
var live_video = args.live_video;
var title = args.title;
var description = args.description;
    
$.textBottomStop.backgroundColor = '#D6CAC3';
$.textBottomStop.color = "#EDE2DD";

var band = 0;
var timeout = 13;
var timeup;
	
var layover = Titanium.UI.createView ({
		width: '85%',
		height: '92%',
		top: '10dp',
		left: '10dp',
		backgroundColor: 'red',
		opacity: '0.5',
});
var layoverText = Titanium.UI.createLabel ({
	font: {
		fontSize: '18dp',
		fontWeight: 'bold',
	},
	color: 'white',
	text: 'Hold on tight!.. your streaming starts in:',
	top: '25%'
});
var layoverTime = Titanium.UI.createLabel ({
	font: {
			fontSize: '26dp',
			fontWeight: 'bold'
	},
	color: 'white',
	
});



var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.camera,"Camera",false,null,$.container,null,false);
var type = 0;
if (Ti.Platform.osname == 'android'){
var liveStreaming = require('com.xenn.liveStreaming');
	var proxy = liveStreaming.createStreaming({
		message: "Creating an example Proxy",		
		width: '85%',
		height: '92%',
		top: '10dp',
		left: '10dp'
	});
	
proxy.setUserRtsp(Alloy.Globals.USER_RTSP.toString());
proxy.setPasswordRtsp(Alloy.Globals.USER_PASSWORD_RTSP.toString());
	

$.camera.add(proxy);
} else {	
var streamingLiveIOS = require('com.xenn.finallyIOS');
type = 1;
}

var video_id = 0;

$.btnStart.addEventListener('click', function(e) {
	//Apagamos boton start
	if (band == 0){
		
		band = 1;
		$.textBottomStart.backgroundColor = '#D6CAC3';
		$.textBottomStart.color = "#EDE2DD";	
		$.textBottomStop.backgroundColor = '#745DA8';
		$.textBottomStop.color = "white";	
	
		// empezamos el streaming
		var client1 = Ti.Network.createHTTPClient();
		var url1 = Alloy.Globals.DOMAIN + Alloy.Globals.GET_URL_START_STREAMING;
		client1.open('POST',url1);
		client1.ondatastream = function(e){
		     $.activity.show(); 
		};
		client1.onload = function(){	
			var json = this.responseText;
			var response = JSON.parse(json);
			if(response.video_id > 0)
			{				
				if (Ti.Platform.osname === 'android') {
						proxy.setUrlRtsp(response.url);
						proxy.setUsernameRtsp(Ti.App.Properties.getString('username').toString());
						proxy.setQualityRtsp(Alloy.Globals.RESOLUTION_RTSP.toString());
						proxy.startStreaming();
				} else {
						foo = streamingLiveIOS.createStreamingView({
							  		color:"grey",
									  width:'85%',
									  height:"93%",
									  top: '10dp',
									  left:'10dp',
									  streamingName: Ti.App.Properties.getString('username'),
									  urlServer: response.url		  
						});		
						e.source.parent.parent.add(foo);
				}			
			
			} else {
				if(response.video_id == -1)
				{
					alert('The video has already been created');
				} else {
					if(response.video_id == 0)
					{
						alert('The event does not exist');
					} else {
						alert('The start date is not in the allowed range');
					}
				}
				
				$.textBottomStart.backgroundColor = '#745DA8';
				$.textBottomStart.color = "white";	
				$.textBottomStop.backgroundColor = '#D6CAC3';
				$.textBottomStop.color = "#EDE2DD";	
				
				$.camera.close();
			}		    
			$.activity.hide(); 
		};
		client1.onerror = function(e){alert('Transmission error: ' + e.error);};
		
		var params = {
			tc: Alloy.Globals.USER_MOBILE.toString(),
			live: live_video,
            type: type,
            event_id: event_id,
            user_id: Ti.App.Properties.getString('user_id'),
		};
		client1.send(params);  		
	
	layover.add(layoverText);
	layover.add(layoverTime);
	$.camera.add(layover);
	// empeiza el contador 	
	countdown = setInterval(function(){
		timeout = (timeout-1);
		timeup = timeout.toString();
		layoverTime.text = timeup;
		if (timeup == '-1'){
			layoverTime.color = '#745DA8';
			layoverTime.fontSize = '36dp';
			layoverTime.text = "Let's rock!";
		};
		if (timeup == '-2'){
			clearInterval(countdown);
			layover.remove(layoverTime);
			$.camera.remove(layover);
			
			// creamos el ideo en la base de datos		
		var client = Ti.Network.createHTTPClient();
		var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_START_STREAMING;
		client.open('POST',url);
		client.ondatastream = function(e){
		     $.activity.show(); 
		};
		client.onload = function(){	
			var json = this.responseText;
			var response = JSON.parse(json);
			if(response.video_id > 0)
			{	
				video_id = response.video_id;		
			
			} 
			$.activity.hide(); 
		};
		client.onerror = function(e){alert('Transmission error: ' + e.error);};
		
		var params = {
			tc: Alloy.Globals.USER_MOBILE.toString(),
			user_id: Ti.App.Properties.getString('user_id'),
			event_id: event_id,
			time_user: Ti.App.Properties.getString("timezone"),
            live: live_video,
            title: title,
            description: description
		};
		client.send(params);  
	
	}	

		
	}, 1000);

	
	}
	
	
	
	});
	
$.btnStop.addEventListener('click', function(e) {
	// cambiar tipo al video y abrir el evento
	if(band == 1)
	{	
		$.textBottomStop.backgroundColor = '#D6CAC3';
		$.textBottomStop.color = "#EDE2DD";	
		var client = Ti.Network.createHTTPClient();
		var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_STOP_STREAMING;
		client.open('POST',url);
		client.ondatastream = function(e){
		     $.activity.show(); 
		};
		client.onload = function(){	
			var json = this.responseText;
			var response = JSON.parse(json);
			if (response.stop_video)  
		    {  
		        alert('Video saved');
		        
		        if (Ti.Platform.osname === 'android') 
		        {        
		        	proxy.stopStreaming();	
		        } else {
		        	e.source.parent.remove(foo);
					foo.cancelar;
		        }
		       // $.btnStop.enabled =  false;	
		    }  
			$.activity.hide();
	        if (1 == live_video) {
                     var args = {
                         author: Ti.App.Properties.getString("user_id"),
                         authorname: Ti.App.Properties.getString("name"),
                         view: "Events"
                     };
                     var win = Alloy.createController("viewListEventsToLive", args).getView();
                } else { var win = Alloy.createController("viewEvent", event_id).getView(); }
 	
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
		    $.camera.close(); 
		};
		client.onerror = function(e){alert('Transmission error: ' + e.error);};	
		var params = {
			tc: Alloy.Globals.USER_MOBILE.toString(),
			video_id: video_id
		};
		client.send(params);  	
	}	 
});

