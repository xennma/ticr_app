var red = '#900A05';
var brightred = '#B00C07';
var black = '#000000';
var gray = '#888888';
var width = (Ti.Platform.displayCaps.platformWidth-30)/2;
var height = (Ti.Platform.displayCaps.platformWidth-30)/4;
/**Ti.App.Properties.setString('user_id', null);
Ti.App.Properties.setString('username', null);
Ti.App.Properties.setString('timezone', null);
Ti.App.Properties.setString('name', null);*/

$.index.exitOnClose = true;

$.index.addEventListener('open', function() {
	
  var matrix = Ti.UI.create2DMatrix();
  matrix = matrix.scale(1.1, 1);
  var a = Ti.UI.createAnimation({
    transform : matrix,
    duration : 350,
    autoreverse : true,
    repeat : 0,
    delay: 450,
    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
  });
  var b = Ti.UI.createAnimation({
    transform : matrix,
    duration : 350,
    autoreverse : true,
    repeat : 0,
    delay: 450,
    curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
  });
 $.topButtons.animate(a);
 $.bottomButtons.animate(b);
 
$.banner.animate({
	  left: '0%',
	  top: '8%',
	  duration: 300,
	  delay: 100,
	  curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
	  opacity: 1.0
	});
	
	var top = '62%';
	var top1 = '0%';
	 if(Ti.Platform.osname == 'android')
	{
		top = '57%';
		top1 = '1%';
	}
	
$.Navigation.animate({
	  left: 0,
	  top: top1,
	  duration: 250,
	  delay: 750,
	  curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
	  opacity: 1.0
	});
	

$.buttoncontainer.animate({
	  left: 0,
	  top: top,
	  duration: 500,
	  curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
	  opacity: 1.0
	});
	
});

// Function to test if device is iOS 7 or later
var iOS7 = isIOS7Plus();
var theTop = iOS7 ? 20 : 0;
$.index.top = theTop;

function isIOS7Plus()
{
	// iOS-specific test
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		// Can only test this support on a 3.2+ device
		if (major >= 7)
		{
			$.index.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
			Ti.UI.setBackgroundColor('black');
			return true;
		}
	}
	return false;
}



// END STATUS BAR FIX

var actionBar;
$.index.addEventListener("open", function() {
    
        if (! $.index.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = $.index.activity.actionBar;
            if (actionBar) {
               actionBar.hide();
            }
        }
    
});

$.liveShows.addEventListener('click', function (e) { 
	var win = Alloy.createController('feed', 1).getView();
	
	win.open(); 
	});
	/*
$.Campaigns.addEventListener('click', function (e) { 
	var win = Alloy.createController('feed', 2).getView();
	win.open(); 
	});
	*/
$.upcomingEvents.addEventListener('click', function (e) { 

	if(Ti.App.Properties.getString('user_id') > 0)
	{
		var dialog = Ti.UI.createAlertDialog({
                 buttonNames: [ "Go to My Events", "Go Live Now" ],
                 message: "What do you want to do?",
                 title: "Go Live!"
             });
             dialog.show();
             dialog.addEventListener("click", function(e) {
                 if (1 == e.index) {
                     var win = Alloy.createController("modalViewVideoLive").getView();
                   win.open({
                        modal: true,
                         navBarHidden: true,
                         modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                         modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
                     });
                } else if (0 == e.index) {
                     var args = {
                         author: Ti.App.Properties.getString("user_id"),
                         authorname: Ti.App.Properties.getString("name"),
                         view: "Events"
                     };
                     var win = Alloy.createController("viewListEventsToLive", args).getView();
                     win.fullscreen = false;
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
             });
         } else {
             var win = Alloy.createController("login").getView();
             win.fullscreen = false;
                         
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

	});
/*
$.artists.addEventListener('click', function (e) { 
	var win = Alloy.createController('feed', 4).getView();
	win.open(); 
	});
	*/
$.overlay.setBackgroundGradient({
    
        type: 'linear',
        startPoint: { x: '50%', y: '0%' },
        endPoint: { x: '50%', y: '100%' },
        colors: [ { color: '#282139', offset: 0.25}, { color: '#534377', offset: 0.45 }, { color: '#745DA8', offset: 0.6 } ],
    
});	


$.index.open();