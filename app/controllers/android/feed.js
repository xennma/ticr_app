/*var win = Alloy.createController('tabs').getView();
$.feedWin.add(win);*/
var activeTab = arguments[0] || {};
var module = require('net.bajawa.pager');
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
			left:0,
			backgroundColor: '#f2f2f2'
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

	
var pagerDataScrolling = [
		{ title: "Categories",	view: categories },
		{ title: "Live Shows",	view: live },
		{ title: "Campaigns",	view: campaigns },
		{ title: "Upcoming",	view: upcomming },
		{ title: "Artists",		view: artists }		
	];
	
var viewPager = module.createViewPager(
 {
	data: pagerDataScrolling,
	initialPage: activeTab,
	tabs: {
		style: module.SCROLLING,
		backgroundColor: "#ffffff",
		backgroundColorSelected: "#f2f2f2",
		lineColor: "#e4473e",
		lineColorSelected: "#e4473e",
		lineHeight: 2,
		lineHeightSelected: 7,
		font: {
			size: 16,
			color: "#000000",
			colorSelected: "#000000"
			},
		padding: {
			left: 20,
			top: 12,
			right: 20,
			bottom: 12
			},
		}
	}		
);


var actionBar = require('actionBarButtoms'); 
actionBar.putActionBar($.feedWin,Alloy.Globals.NAME_PAGE,true,null,null,$.activity,false);
	
viewPager.height = '95%';
viewPager.top = '0';
$.feedWin.add(viewPager);
$.feedWin.open();

viewPager.addEventListener("pageChange", function (e) 
{
	if((e.to == 0) && (categories.data.length == 0))
	{
		data.getCategories($.activity, categories);
	}
    if((e.to == 1) && (live.data.length == 0))
	{
    	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
    }
   if((e.to == 2)&&(campaigns.children.length == 0))
	{
		data.getCampaigns($.activity, campaigns,0,0,categoryId);
	}
    
    if((e.to == 3) && (upcomming.data.length == 0))
	{
		data.getListItems($.activity, upcomming,0,0,categoryId,0,0,'Events');
	}

	if((e.to == 4)&&(artists.children.length == 0) )
	{
		data.getArtists($.activity, artists,0,0,categoryId);
	}
});


categories.addEventListener('click', function(e){
		
		var title = 'LiveOnStage';
		if(e.source.link > 0)
		{
			title = e.source.text;
		}		
		resetInitPage(e.source.link, title);
	});



live.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
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
		}		
	});

upcomming.addEventListener('click', function(e){
		if(e.source.link > 0)
		{
			var win = Alloy.createController('viewEvent', e.source.link).getView();		
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
	});
	
function resetInitPage(catId, title)
{
	categoryId = catId;
	$.feedWin.activity.actionBar.title = title;
	live.setData([]);
	campaigns.removeAllChildren();
	upcomming.setData([]);
	artists.removeAllChildren();
	data.getListItems($.activity, live,0,0,categoryId,0,0,'Videos');
	viewPager.scrollTo(1);	
}





