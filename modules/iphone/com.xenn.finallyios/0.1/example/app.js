// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
win.add(label);
win.open();

// TODO: write your module tests here
var finallyIOS = require('com.xenn.finallyIOS');
Ti.API.info("module is => " + finallyIOS);

label.text = finallyIOS.example();

var foo = finallyIOS.createStreamingView({
  color:"red",
  width:'85%',
  height:"93%",
  top: '10dp',
  left:'10dp',
  streamingName: 'efaby',
  urlServer: 'rtmp://liveonstage.com:1935/live'
});

win.add(foo);

var val = foo.prender;
var btnStop = Ti.UI.createButton({
		title: 'Stop',
		top:'50dp',
		width:'60dp',
		height:'40dp',
		left: '88%'
	});

win.add(btnStop);
	
btnStop.addEventListener('click', function(e) {
	foo.cancelar;
	//alert("Termino streaming");
	//e.source.parent.remove(foo);
        //        foo = null;
		
	});

