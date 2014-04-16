// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});

var btnStartLive = Ti.UI.createButton({
	title: 'Live Camera',
	top:'20dp',
	width:'60dp',
	height:'40dp',
});

win.add(btnStartLive);
win.open();

btnStartLive.addEventListener('click', function() {	
	
	var win1 = Ti.UI.createWindow({
		backgroundColor:'white'
	});	
	
	var btnStart = Ti.UI.createButton({
		title: 'Start',
		top:'10dp',
		width:'60dp',
		height:'40dp',
		left: '88%'
	});

	win1.add(btnStart);

	var btnStop = Ti.UI.createButton({
		title: 'Stop',
		top:'50dp',
		width:'60dp',
		height:'40dp',
		left: '88%'
	});

	win1.add(btnStop);

	var btnCamera = Ti.UI.createButton({
		title: 'Camera',
		top:'90dp',
		width:'60dp',
		height:'40dp',
		left: '88%'
	});

	win1.add(btnCamera);
	
	// TODO: write your module tests here
	var liveStreaming = require('com.xenn.liveStreaming');
	var proxy = liveStreaming.createStreaming({
		message: "Creating an example Proxy",		
		width: '85%',
		height: '92%',
		top: '10dp',
		left: '10dp'
	});
	
	proxy.setUserRtsp("liveon");
	proxy.setPasswordRtsp("NewLive1M!*")
	proxy.setUrlRtsp("rtsp://liveonstage.com:1935/videowhisper/");	
	proxy.setUsernameRtsp("lucheins");
	proxy.setQualityRtsp("LOW");
	
	
	win1.add(proxy);
	btnStart.addEventListener('click', function() {
		proxy.startStreaming();
	});
	btnCamera.addEventListener('click', function() {
		proxy.switchCamera();
	});	
	btnStop.addEventListener('click', function() {
		proxy.stopStreaming();			
		win1.close();
	});
	win1.open();
});


