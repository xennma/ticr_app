var timezone;
$.pickTimezone.setSelectedRow(0, 10, false);	
var zoneGps = 1;
var timezoneGpsUTC = '';
//$.timezoneGps.hide();
$.load.show(); 
$.pickTimezone.hide() ;
var user_id = 0;
var dialog = Ti.UI.createAlertDialog({
         buttonNames: [ "Go to My Events", "Go Live Now" ],
         message: "What do you want to do?",
         title: "Login successful!"
     });


      
     
     
var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.login,"Login",false,null,$.container,null,false);
$.username.autocorrect = false;
function checkdata(value)  
	{  
	    var testresults = false;  
	    var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;  
	    if (filter.test(value))  
	    {  
	        testresults = true;  
	    }  
	     
	    return (testresults);  
	};

$.buttonLogin.addEventListener('click',function(e) {
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_LOGIN;
	client.open('POST',url);
	client.ondatastream = function(e){
	     $.activity.show(); 
	};
	client.onload = function(){	
		var json = this.responseText;
		var response = JSON.parse(json);
		
		if (!(typeof response['user'] === "undefined"))  
	    {  
	        $.username.blur();  
        	$.password.blur();  
        	 
        	user_id = response['user'].id;      	
        	if(response['user'].accept == 1)
        	{
        		Ti.App.Properties.setString('user_id', response['user'].id);	  
	        	Ti.App.Properties.setString('username', response['user'].username);	
	        	Ti.App.Properties.setString('name', response['user'].name);	
	        	Ti.App.Properties.setString('timezone', timezone); 
	        	$.activity.hide();
        		dialog.show();	 
        	} else {
        		
        		var dialog1 = Ti.UI.createAlertDialog({
			         buttonNames: [ "No Accept", "Accept" ],
			         message: response['terms'].toString(),
			         title: "Terms of Service "
			     });

			dialog1.addEventListener("click", function(e) 
			{
		         if (0 == e.index) {    
		         	Ti.App.Properties.setString('user_id', null);
					Ti.App.Properties.setString('username', null);
					Ti.App.Properties.setString('timezone', null);
					Ti.App.Properties.setString('name', null);         
		             $.login.close();
		        } else {
		        	 if (1 == e.index) { 
		        	
		        	var client1 = Ti.Network.createHTTPClient();
					var url1 = Alloy.Globals.DOMAIN + Alloy.Globals.URL_REGISTER_ACCEPT;
					client1.open('POST',url1);
					client1.ondatastream = function(e){
					     $.activity.show(); 
					};
					client1.onload = function(){
						var json = this.responseText;
						var responses = JSON.parse(json);
					};
		        	client1.onerror = function(e){alert('Transmission error: ' + e.error);};
					var params = {
						user_id : user_id,
					    tc: Alloy.Globals.USER_MOBILE.toString(),
					};
					client1.send(params); 
					Ti.App.Properties.setString('user_id', response['user'].id);	  
		        	Ti.App.Properties.setString('username', response['user'].username);	
		        	Ti.App.Properties.setString('name', response['user'].name);	
		        	Ti.App.Properties.setString('timezone', timezone);   
		        	$.activity.hide();     	
		        	dialog.show();	
		        	}
		        }
		     });      
        	dialog1.show();	 
        	}       	        
	    }  
	    else  
	    {  
	        alert('Failed credentials');  
	        $.activity.hide();
		}; 
		 
	};
	client.onerror = function(e){alert('Transmission error: ' + e.error);};
		
	if ($.username.value != '' && $.password.value != '')  
    {  
    	if (!checkdata($.username.value))  
        {  
             alert("Please enter a valid username");  
        } 
        else  
        {  
	        if (!checkdata($.password.value))  
	        {  
	             alert("Please enter a valid password");  
	        } else
        	{
        		if(zoneGps == 1)
        		{
        			timezone = timezoneGpsUTC;
        		} else {
        			timezone = $.pickTimezone.getSelectedRow(0).value;
        		}        		
        		if(timezone != 'zone')
        		{      	
	        		var user1 = Ti.Utils.base64encode($.username.value + '-' + $.password.value) ;
	        		var params = {
					    tc: Alloy.Globals.USER_MOBILE.toString(),
					    u:  user1.toString()
					};
					client.send(params);    
        		} else {
        			alert("Please select Timezone");  
        		}
        		  
		    }
	    } 
    }  
    else  
    {  
        alert("Username/Password are required");  
    } 
		
});


function openWindowsLoginSussess()
{	
   var args = {       		
	    author: Ti.App.Properties.getString('user_id'),
	    authorname: Ti.App.Properties.getString('name'),
	    view: 'Events'
	};        	
    var win = Alloy.createController('viewListEventsToLive', args).getView();
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
	$.login.close();     	  
}


function getTimezone() {
        var utcTime = new Date();
        var other = utcTime.getTimezoneOffset() / 60;
        var i = parseInt(other);
        var m = other - i;
        var sign = '-';
        if(i < 0)
        {
         	i = i * -1 ;
         	sign = '+';
        } 
        
        if(i <10)
        {
        	i = '0' + i;
        }
        m = 60 * m ;
        if (m == 0)
        {
        	m = '00';
        }     
        other = sign + i + ":" +  m + ",0";
        return other;
    }



function NavRules(){
Ti.Geolocation.headingFilter = 10;
if(Ti.Platform.osname  ==  'android') {
   Ti.Geolocation.Android.manualMode = true;
   // modify only the gps
    var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
        name: Ti.Geolocation.PROVIDER_GPS,
        minUpdateDistance: 0.0,
    	minUpdateTime: 0
    });

    Ti.Geolocation.Android.addLocationProvider(gpsProvider);
    var networkProvider = Ti.Geolocation.Android.createLocationProvider({
	    name: Ti.Geolocation.PROVIDER_NETWORK,
	    minUpdateTime: 3, 
	    minUpdateDistance: 30
	});
	
	Ti.Geolocation.Android.addLocationProvider(networkProvider);
	var gpsRule = Ti.Geolocation.Android.createLocationRule({
	    provider: Ti.Geolocation.PROVIDER_GPS,
	    accuracy: 500,
		maxAge: 5000,
		minAge: 3000,
	});
	Ti.Geolocation.Android.addLocationRule(gpsRule);
	}else {

    Ti.Geolocation.distanceFilter    =    10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.accuracy    =    Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.purpose    =    Ti.Locale.getString('gps_purpose');
	}
}//END NavRules

var gpsApagado = Ti.UI.createAlertDialog({
	title: 'GPS Unavailable',
	message: 'Turn on the GPS to be able to use the map function',
    ok: 'OK'
});

var gpsLow = Ti.UI.createAlertDialog({
	title: 'Searching for GPS',
	message: 'Try going outside to get GPS signal',
    ok: 'OK'
});

var location_coords;
NavRules();


function getLocation(){	   

Titanium.Geolocation.getCurrentPosition(function(e){

	if (e.error || !e.success) {
        gpsLow.show();
        return; 
    }

    if (e.success){
	    location_coords = e.coords.timestamp;
	    var date1 = new Date(location_coords);	    
	    gpsLow.hide();
	   	timezoneGpsUTC = getTimezone(date1.getTimezoneOffset());	   	
	    $.timezoneLabelGps.text = 'Timezone: ' + getTimezoneByUTC(timezoneGpsUTC);
	    $.load.hide();
    }

});

}

function getTimezoneByUTC(value)
{
	var timezones = [
		{value:'-12:00,0' , title:'(-12:00) International Date Line West' },
		{value:'-11:00,0' , title:'(-11:00) Midway Island, Samoa' },
		{value:'-10:00,0' , title:'(-10:00) Hawaii' },
		{value:'-09:00,1' , title:'(-09:00) Alaska' },
		{value:'-08:00,1' , title:'(-08:00) Pacific Time (US &amp; Canada)' },
		{value:'-07:00,0' , title:'(-07:00) Arizona' },
		{value:'-07:00,1' , title:'(-07:00) Mountain Time (US &amp; Canada)' },
		{value:'-06:00,0' , title:'(-06:00) Central America, Saskatchewan' },
		{value:'-06:00,1' , title:'(-06:00) Central Time (US &amp; Canada), Guadalajara, Mexico city' },
		{value:'-05:00,0' , title:'(-05:00) Indiana, Bogota, Lima, Quito, Rio Branco' },
		{value:'-05:00,1' , title:'(-05:00) Eastern time (US &amp; Canada)'},
		{value:'-04:00,1' , title:'(-04:00) Atlantic time (Canada), Manaus, Santiago' },
		{value:'-04:30,0' , title:'(-04:30) Caracas' },
		{value:'-04:00,0' , title:'(-04:00) La Paz' },
		{value:'-03:30,1' , title:'(-03:30) Newfoundland' },
		{value:'-03:00,1' , title:'(-03:00) Greenland, Brasilia, Montevideo' },
		{value:'-03:00,0' , title:'(-03:00) Buenos Aires, Georgetown' },
		{value:'-02:00,1' , title:'(-02:00) Mid-Atlantic' },
		{value:'-01:00,1' , title:'(-01:00) Azores' },
		{value:'-01:00,0' , title:'(-01:00) Cape Verde Is.' },
		{value:'00:00,0' , title:'(00:00) Casablanca, Monrovia, Reykjavik' },
		{value:'00:00,1' , title:'(00:00) GMT: Dublin, Edinburgh, Lisbon, London' },
		{value:'+01:00,1' , title:'(+01:00) Amsterdam, Berlin, Rome, Vienna, Prague, Brussels' },
		{value:'+01:00,0' , title:'(+01:00) West Central Africa' },
		{value:'+02:00,1' , title:'(+02:00) Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem' },
		{value:'+02:00,0' , title:'(+02:00) Harare, Pretoria' },
		{value:'+03:00,1' , title:'(+03:00) Baghdad, Moscow, St. Petersburg, Volgograd' },
		{value:'+03:00,0' , title:'(+03:00) Kuwait, Riyadh, Nairobi, Tbilisi' },
		{value:'+03:30,0' , title:'(+03:30) Tehran' },
		{value:'+04:00,0' , title:'(+04:00) Abu Dhadi, Muscat' },
		{value:'+04:00,1' , title:'(+04:00) Baku, Yerevan' },
		{value:'+04:30,0' , title:'(+04:30) Kabul' },
		{value:'+05:00,1' , title:'(+05:00) Ekaterinburg' },
		{value:'+05:00,0' , title:'(+05:00) Islamabad, Karachi, Tashkent' },
		{value:'+05:30,0' , title:'(+05:30) Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura' },
		{value:'+05:45,0' , title:'(+05:45) Kathmandu' },
		{value:'+06:00,0' , title:'(+06:00) Astana, Dhaka' },
		{value:'+06:00,1' , title:'(+06:00) Almaty, Nonosibirsk' },
		{value:'+06:30,0' , title:'(+06:30) Yangon (Rangoon)' },
		{value:'+07:00,1' , title:'(+07:00) Krasnoyarsk' },
		{value:'+07:00,0' , title:'(+07:00) Bangkok, Hanoi, Jakarta' },
		{value:'+08:00,0' , title:'(+08:00) Beijing, Hong Kong, Singapore, Taipei' },
		{value:'+08:00,1' , title:'(+08:00) Irkutsk, Ulaan Bataar, Perth' },
		{value:'+09:00,1' , title:'(+09:00) Yakutsk' },
		{value:'+09:00,0' , title:'(+09:00) Seoul, Osaka, Sapporo, Tokyo' },
		{value:'+09:30,0' , title:'(+09:30) Darwin' },
		{value:'+09:30,1' , title:'(+09:30) Adelaide' },
		{value:'+10:00,0' , title:'(+10:00) Brisbane, Guam, Port Moresby' },
		{value:'+10:00,1' , title:'(+10:00) Canberra, Melbourne, Sydney, Hobart, Vladivostok' },
		{value:'+11:00,0' , title:'(+11:00) Magadan, Solomon Is., New Caledonia' },
		{value:'+12:00,1' , title:'(+12:00) Auckland, Wellington' },
		{value:'+12:00,0' , title:'(+12:00) Fiji, Kamchatka, Marshall Is.' },
		{value:'+13:00,0' , title:"(+13:00) Nuku'alof" }
	];
	var title = '';
	for(var i=0, ilen=timezones.length; i<ilen; i++){
		if (timezones[i]['value'] == value)
		{
			title = timezones[i]['title'];
		}
	}	
	return title;	
}

if (Ti.Platform.osname === 'android'){
	var locationAdded = false;
	var handleLocation = function(e) {
	    if (!e.error) {
	        Ti.API.info(e.coords);
	    }
	    
	    getLocation();
	    
	};	
	var addHandler = function() {
	    if (!locationAdded) {
	        Ti.Geolocation.addEventListener('location', handleLocation);
	        locationAdded = true;
	     //   alert('added');
	    }
	};	
	var removeHandler = function() {
	    if (locationAdded) {
	        Ti.Geolocation.removeEventListener('location', handleLocation);
	        locationAdded = false;
	      //  alert('removed');
	    }
	};
    addHandler();
    var activity = Ti.Android.currentActivity;
    activity.addEventListener('destroy', removeHandler);
    activity.addEventListener('pause', removeHandler);
} else{

	Ti.Geolocation.addEventListener('location', function(e){
	getLocation(); 
	});
}
if (!Ti.Geolocation.locationServicesEnabled) {
gpsApagado.show();
}

$.buttonTimezone.addEventListener('click',function(e) {
	$.messageTimezoneAsk.hide();
	$.timezoneGps.hide();
	zoneGps = 0;
	$.load.hide();
	if (Ti.Platform.osname === 'android'){
	removeHandler(); }
	$.pickTimezone.show();
});

dialog.addEventListener("click", function(e) {
         if (1 == e.index) {
             var win = Alloy.createController("modalViewVideoLive").getView();
             win.open({
                 modal: true,
                 navBarHidden: true,
                 modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                 modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
             });
             $.login.close();
        } else 0 == e.index && openWindowsLoginSussess();
     });

