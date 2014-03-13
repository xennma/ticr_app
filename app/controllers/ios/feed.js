
var activeTab = arguments[0] || {};
var categoryId = 0;
var data = require('dataExport');
var categories = Ti.UI.createTableView();
var live = Ti.UI.createTableView();
var campaigns = Ti.UI.createScrollView({
			width:"100%",
			height:"100%",
			contentWidth:"auto",
			contentHeight:"auto",
			top:0,
			left:0
	});
var upcomming = Ti.UI.createTableView();
var artists = Ti.UI.createScrollView({
			width:"100%",
			height:"100%",
			contentWidth:"auto",
			contentHeight:"auto",
			top:0,
			left:0,
			backgroundColor: '#f2f2f2'
		});

var backArrow = Ti.UI.createLabel({
  color:'Gray',
  text: '\u25c3',
});

// Function to test if device is iOS 7 or later
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
			$.feedWin.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
		//	Ti.UI.setBackgroundColor('#4D024A');
			return true;
		}
	}
	return false;
}

var iOS7 = isIOS7Plus();
var theTop = iOS7 ? 20 : 0;
$.feedWin.top = theTop;
// END STATUS BAR FIX

$.current.text = 'LiveOnStage';


$.backArrow.add(backArrow);

$.actionIos.addEventListener("click",function(e){
   // var back = Alloy.createController('index').getView();
  //	back.open();
	$.feedWin.close();
});


if (activeTab == 1){
	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
}

if (activeTab == 2){
	campaigns.removeAllChildren();
	data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
if (activeTab == 3){
		data.getListItems($.activity, upcomming,0,0,categoryId,0,0,'Events');
	}
if (activeTab == 4){
	artists.removeAllChildren();
		data.getArtists($.activity, artists,0,0,categoryId);
	}
	
	

$.videosScreen.add(live);
$.categoriesScreen.add(categories);
$.campaignsScreen.add(campaigns);
$.upcomingScreen.add(upcomming);
$.artistsScreen.add(artists);



$.feedWin.open();


$.scrollableView.currentPage = activeTab;
var osname = Ti.Platform.osname,
     height = Ti.Platform.displayCaps.platformHeight,
     width = Ti.Platform.displayCaps.platformWidth;     
     scrollunit = width/5;     

    var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
   
    if (isTablet) {
       $.NavContainer.width = width;
       $.barContainer.width = '100%';
       $.topNav.setScrollingEnabled = false;       
    } else {    	
    	$.topNav.scrollTo(60 , 0);	
    };
    
    var cualquiera = $.NavContainer.width - width;
    scrollunit = scrollunit + (cualquiera/5);   
    $.menuBar.scrollTo(-scrollunit * activeTab, 0);
    
 var topScroll = 0;
	if (!isTablet) {	
		if (activeTab == 1){
			topScroll = 60;
		};
		if (activeTab == 2){
			topScroll = 160;
		};
		if (activeTab == 3 || activeTab == 4){
			topScroll = 180;
		};
		
			$.topNav.scrollTo(topScroll , 0);
		
	} 
	//$.menuBar.scrollTo(-scrollunit * $.scrollableView.currentPage , 0);  
    


$.categories.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(0);
  	
  	
});
$.videos.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(1);
  	
});
$.campaigns.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(2);
  	
});
$.upcoming.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(3);
  	
});
$.artists.addEventListener("click",function(e){
   // aqui habririas la otra ventana 
  	$.scrollableView.scrollToView(4);
});


$.scrollableView.addEventListener("scroll", function(e){
	var topScroll = 0;
	if (!isTablet) {	
		if ($.scrollableView.currentPage == 1){
			topScroll = 60;
		};
		if ($.scrollableView.currentPage == 2){
			topScroll = 160;
		};
		if ($.scrollableView.currentPage == 3){
			topScroll = 180;
		};
		if ($.scrollableView.currentPage != 4){
			$.topNav.scrollTo(topScroll , 0);
		};
	} 
	$.menuBar.scrollTo(-scrollunit * $.scrollableView.currentPage , 0);
});


$.scrollableView.addEventListener("scrollend", function(e){
	
	if(($.scrollableView.currentPage == 0) && (categories.data.length == 0))
	{
		data.getCategories($.activity, categories);
	}
	
	if(($.scrollableView.currentPage == 1) && (live.data.length == 0))
	{
		data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
	}
    
   if(($.scrollableView.currentPage == 2) && (campaigns.children.length == 0) )
	{
		data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
    
    if(($.scrollableView.currentPage == 3) && (upcomming.data.length == 0))
	{
		data.getListItems($.activity, upcomming,0,0,categoryId,0,0,'Events');
	}

	if(($.scrollableView.currentPage == 4) && (artists.children.length == 0) )
	{
		data.getArtists($.activity, artists,0,0,categoryId);
	}
});

categories.addEventListener('click', function(e){
		
		var title = 'Live On Stage';
		if(e.source.link > 0)
		{
			title = e.source.text;
		}		
		resetInitPage(e.source.link, title);
	});

function resetInitPage(catId, title)
{
	categoryId = catId;
	$.current.text = title;
	live.setData([]);
	//campaigns.setData([]);
	campaigns.removeAllChildren();
	upcomming.setData([]);
	artists.removeAllChildren();
	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
	$.scrollableView.scrollToView(1);	
}

live.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var win = Alloy.createController('viewVideo', e.source.link).getView();
		    win.open(
		    	//ANIMAR????????
		    );			
		}		
	});

upcomming.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var win = Alloy.createController('viewEvent', e.source.link).getView();			
			//$.feedWin.add(win);
			win.open(
				//ANIMAR????????
			);									
		}		
	});
	
upcomming.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

live.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

$.textBottom.text = 'Login';
	if(Ti.App.Properties.getString('user_id') > 0)
	{
		$.textBottom.text = 'Logout';
	}

$.bottomLogin.addEventListener('click', function(e){
	var actionBar = require('actionBarButtoms');
	actionBar.iosActionLogin($.feedWin,null);	
});



