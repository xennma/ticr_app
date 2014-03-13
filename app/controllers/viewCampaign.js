var id = arguments[0] || {};
var id_video = 0;

var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.viewCampaign,"Campaigns",false,$.vp,$.scroll,null,false);

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
var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CAMPAIGN;
client.open('POST',url);
client.ondatastream = function(e){
     $.activity.show(); 
};

client.onload = function(){	
	
	var fixed = Ti.Platform.displayCaps.platformHeight - 50;
	
	var json = this.responseText;
	var responses = JSON.parse(json);
	var url ='';
	
	if(responses.campaign[0].type != null)
	{
		if(responses.campaign[0].type == 'vod' || responses.campaign[0].type == 'live')
		{
			$.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
			$.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;	
			if (Ti.Platform.osname == 'android'){
				$.vp.mediaControlMode = Titanium.Media.VIDEO_CONTROL_DEFAULT;		
			} else {
				$.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
			}	
			$.vp.url = responses.campaign[0].path;			
			
		} else {
		    	url = getUrlYoutube(responses.campaign[0].video_id, $.vp);	   
		}
		$.data.top = '57%';
		$.data.height = '43%';
		fixed = fixed + (fixed * 0.1);
		id_video = responses.campaign[0].id_video;
		
		$.reportButtom.addEventListener('click', function(){
			var win = Alloy.createController("modalReport",id_video).getView();
		             win.open({
		                 modal: true,
		                 navBarHidden: true,
		                 modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		                 modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
		             });
		});
		
	} else {
		$.reportView.hide();
		var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_USER_DEFAULT;
		if(responses.campaign[0].image.length > 0)
		{
			imageLink = responses.campaign[0].image;
			if(imageLink.substring(0,4) != 'http')
			{
				imageLink = Alloy.Globals.DOMAIN + imageLink;
			}
		}
	
		$.cover.image = imageLink;
	}
	var name1 = responses.campaign[0].title;
	if(name1.length > Alloy.Globals.TITLE_VIEW)
	{
		name1 = name1.substring(0,Alloy.Globals.TITLE_VIEW - 2) + '...';			
	}
	
	$.fixed.height = fixed;
	$.givebacks.top = fixed+1;
	$.author.text = responses.campaign[0].name;
	$.title.text = name1; 
	var text = responses.campaign[0].long_description;
	if(text.length > Alloy.Globals.DESCRIPTION_SIZE)
	{
		text = text.substring(0,Alloy.Globals.DESCRIPTION_SIZE - 2) + '...';
	}
	
	$.description.text = text;
	$.categoryName.text = responses.campaign[0].category_name;
	$.accomplished.text = '$' + responses.campaign[0].received;
	$.percentage.text = responses.campaign[0].percent + '%';
	$.porcentaje.width = responses.campaign[0].percent+'%';
	$.days.text = responses.campaign[0].days;
	$.total.text = '$' + responses.campaign[0].goal_amount;
	var band = true;
	for (var i=0; i < responses.givebacks.length; i++) {
		var moreperks = 80 * i;
		var row = Ti.UI.createView({
				 height: '75dp',
				 top: moreperks +'dp',
				 backgroundColor: '#e5f8e9',
				 borderRadius: 5,
				 borderWidth: 1,
				 borderColor: '#c6c6c6'			 
		});	
		var insideLabel1 = Ti.UI.createLabel({
			text: responses.givebacks[i].amount + ' USD',
			left: '5%',
			height: '25%',
			top: '10%',
			font: {
			   	fontSize:'14dp',
			   	fontWeight:'bold'
			},
			width: '90%'
		});	
		var insideLabel2 = Ti.UI.createLabel({
			text: responses.givebacks[i].description,
			left: '5%',
			height: '65%',
			top: '35%',
			font: {
			   	fontSize:'12dp',
			   	fontWeight:'bold'
			},
			width: '70%',
			color: 'gray'
		});
		var osname = Ti.Platform.osname;
		if(osname === 'ipad')
		{
			insideLabel1.font = { fontSize:'26dp' };
			insideLabel2.font = { fontSize:'24dp' };
		}
		row.add(insideLabel1);
		row.add(insideLabel2);
		$.perks.add(row);	
		var increase = 42 * i;
		
		//$.viewScroll.height = 	$.viewScroll.height + increase;
		$.givebacks.height = 120 + moreperks + 'dp';
		band = false;
	}

	if(band)
	{
		var row = Ti.UI.createView({
				 height: '40dp'	,		 		 
		});
		var insideLabel = Ti.UI.createLabel({
			text: 'There are no giveback available yet'
		});
		row.add(insideLabel);
		$.perks.add(row);	
	//	$.viewScroll.height = 	$.viewScroll.height + increase;
	}
	
	$.activity.hide(); 
};
client.onerror = function(e){alert('Transmission error: ' + e.error);};
var params = {
	item_id : id,
    tc: Alloy.Globals.USER_MOBILE.toString(),
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

// Paypal
/*
var Paypal = require('ti.paypal');


var button;
function addButtonToWindow() {
    if (button) {
        donate.remove(button);
        button = null;
    }
 button = Paypal.createPaypalButton({
        // NOTE: height/width only determine the size of the view that the button is embedded in - the actual button size
        // is determined by the buttonStyle property!
        width: '194dp',
        height: '37dp',
        buttonStyle: Paypal.BUTTON_194x37, // The style & size of the button

        language: 'en_US',
        textStyle: Paypal.PAYPAL_TEXT_DONATE, // Causes the button's text to change from "Pay" to "Donate"

        appID: 'APP-80W284485P519543T', // The appID issued by Paypal for your application; for testing, feel free to delete this property entirely.
        paypalEnvironment: Paypal.PAYPAL_ENV_SANDBOX, // Sandbox, None or Live

        feePaidByReceiver: false,
        enableShipping: false, // Whether or not to select/send shipping information

        payment: { // The payment itself
            paymentType: Paypal.PAYMENT_TYPE_SERVICE, // The type of payment
            subtotal: 10, // The total cost of the order, excluding tax and shipping
            tax: 0,
            shipping: 0,
            currency: 'USD',
            recipient: 'efaby10@hotmail.com',
            customID: 'anythingYouWant',
            invoiceItems: [
                { name: 'Shoes', totalPrice: 8, itemPrice: 2, itemCount: 4 },
                { name: 'Hats', totalPrice: 2, itemPrice: 0.5, itemCount: 4 }
            ],
            ipnUrl: 'http://www.appcelerator.com/',
            merchantName: 'Dev Tools',
            memo: 'For the orphans and widows in the world!'
        }
    });

 // Events available
    button.addEventListener('paymentCancelled', function (e) {
       // status.text = 'Payment Cancelled.';
        // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
        addButtonToWindow();
    });
    button.addEventListener('paymentSuccess', function (e) {
      //  status.text = 'Payment Success.  TransactionID: ' + e.transactionID + ', Reloading...';
        // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
        addButtonToWindow();
    });
    button.addEventListener('paymentError', function (e) {
        //status.text = 'Payment Error,  errorCode: ' + e.errorCode + ', errorMessage: ' + e.errorMessage;
        // The button should only be used once; so after a payment is cancelled, succeeds, or errors, we must redisplay it.
        addButtonToWindow();
    });

    button.addEventListener('buttonDisplayed', function () {
       // status.text = 'The button was displayed!';
    });
    button.addEventListener('buttonError', function () {
       // status.text = 'The button failed to display!';
    });
    $.donate.add(button);
}

addButtonToWindow();

*/


	


