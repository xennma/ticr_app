exports.getCampaigns=function(activity, table,offsetHome, pageHome, category)
{
	
	
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var posicion = table.getContentOffset();
		var item = table.children.length;
		var band = true;
		var more = false;
		for (var i=0; i < responses.length; i++) {	
			if(responses[i].title != 'more')
			{
				var link = responses[i].id;
				var image_campaign = responses[i].image_video;
				
				if(image_campaign == null)
				{
					var image_campaign = responses[i].image_campaign;	
				}				
				
		        var args = {
	        			name: responses[i].title,	        			
	        			link: link,
	        			image: image_campaign,
	        			id: responses[i].campaign,
	        			received:  responses[i].received,
	        			row: i + item,
	        			isOdd: i%2,
	        			percent: responses[i].percent,
	        			days: responses[i].days,
	        			shortdesc: responses[i].short_description
	        		
	      		};
		        var row = Alloy.createController('tileCampaigns',args).getView(); 
		       band = false;
			} else {
				var args = {       		
	        			row: i + item,
	        			text: 'Load More',
	        			item: 1
	      		};
		        var row = Alloy.createController('viewMore',args).getView(); 
		        more = true;
			} 	        
				table.add(row);	 	
			 }
	     if(band)
	     	{
	     		var args = {       		
	        			row: i,
	        			text: 'No Campaigns Found Here',
	        			item: 0
	      		};
		        var row = Alloy.createController('viewMore',args).getView(); 
		        table.add(row);	 
	     	}
	        activity.hide(); 
	        if(more)
			{
				row.addEventListener('click', function(e){
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;	
				table.remove(row);
				exports.getCampaigns(activity, table,offset,pageHome,category);
				});
			}  
			
			if(posicion != null && posicion.y > 0)
			{
				var plus = (Ti.Platform.displayCaps.platformHeight * 60) / 100; 
				table.scrollTo(0, posicion.y + plus);
			}
		};

	client.onerror = function(e){alert(Alloy.Globals.CONNECTION_ERROR);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: 'Campaigns',
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category       
    };

	client.send(params);
};


exports.getListItems=function(activity, table,offsetHome, pageHome, category, author, item_id, name, scroll)
{
	var index = table.getIndexByName('rowMore');
	if(index > 0)
	{
		table.deleteRow(index);
	}	
	var tableData = table.getData();
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};
	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var more = false;
		for (var i=0; i < responses.length; i++) {	
			//alert(responses[i]);
		        if(responses[i].title != 'more')
		        {
		        	 var args = {
	        			name: responses[i].name,	        			
	        			link: responses[i].id,
	        			isOdd: i%2,
	        			page: name,
	        			title: responses[i].title,	        			
	        			message: responses[i].message,
	        			image: responses[i].image,
	        			type: responses[i].type	        			
		      		};
			        var row = Alloy.createController('rowListItems',args).getView(); 	
		        } else {
		        	var row = Alloy.createController('rowMore').getView();
		        	more = true;
		        }		        
				tableData.push(row);		 	
			 }
			 if(tableData.length == 0)
			 {
			 	var row = Alloy.createController('rowEmpty').getView();	
			 	tableData.push(row);
			 }
	        table.setData(tableData);
	        activity.hide(); 
	      	if(more && !scroll)
			{
				row.addEventListener('click', function(){
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;		
				exports.getListItems(activity, table,offset,pageHome,category,author, item_id,name);
				});
			}  
		};

	client.onerror = function(e){alert(Alloy.Globals.CONNECTION_ERROR);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category,
        author: author,
        item_id: item_id       
    };
	client.send(params);  
};

exports.getArtists=function(activity, table,offsetHome, pageHome, category)
{
	
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var item = table.children.length;
		var posicion = table.getContentOffset();
		var band = true;
		var more = false;
		for (var i=0; i < responses.length; i++) {	
			if(responses[i].title != 'more')
			{
				var link = responses[i].video_id;
		        var args = {
	        			name: responses[i].title,	        			
	        			link: link,
	        			image: responses[i].avatar,
	        			id: responses[i].campaign,
	        			received:  responses[i].received,
	        			days: responses[i].days,
	        			fans: responses[i].fans,
	        			campaing: responses[i].campaing_title,
	        			percent: responses[i].percent,
	        			videos: responses[i].num_videos,
	        			row: i + item,
	        			isOdd: i%2,
	        			views: responses[i].view,
	        			status: responses[i].status,
	        			about: responses[i].about,
	        			id: responses[i].id
	      		};
		        var row = Alloy.createController('viewArtists',args).getView(); 
		        band = false;
			} else {
				var args = {       		
	        			row: i + item,
	        			text: 'Load More',
	        			item: 1
	      		};
		        var row = Alloy.createController('viewMore',args).getView(); 
		        more = true;
			}		        	        	        
				table.add(row);	 	
			 }
	     	if(band)
	     	{
	     		var args = {       		
	        			row: i,
	        			text: 'No Artists Found Here',
	        			item: 0
	      		};
		        var row = Alloy.createController('viewMore',args).getView(); 
		        table.add(row);	 
	     	}
	        activity.hide(); 
	        if(more)
			{
				row.addEventListener('click', function(){
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;
				table.remove(row);
				exports.getArtists(activity, table,offset,pageHome,category);
				});
			}  
			if(posicion != null && posicion.y > 0)
			{
				var plus = (Ti.Platform.displayCaps.platformHeight * 60) / 100; 
				table.scrollTo(0, posicion.y + plus);
			}
		};

	client.onerror = function(e){alert(Alloy.Globals.CONNECTION_ERROR);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: 'Artists',
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category       
    };
	client.send(params);
};

exports.getCategories=function(activity, table)
{
	var tableData = [];
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CATEGORIES;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};

	client.onload = function(){

		var responses = JSON.parse(this.responseText);

		var band = true;
		for (var i=0; i < responses.length; i++) {	
				var link = responses[i].id;

		        var args = {
	        			name: responses[i].name,	        			
	        			link: link,	        			
	      		};
		        var row = Alloy.createController('rowCategories',args).getView(); 	
		        
				tableData.push(row);		 	
			 }
	        table.setData(tableData);
	        activity.hide(); 
		};

	client.onerror = function(e){alert(Alloy.Globals.CONNECTION_ERROR);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString()       
    };
	client.send(params);
};

exports.getListOfProfile=function(activity, table,offsetHome, pageHome, author, name, timezoneBand,utmUser)
{
	var index = table.getIndexByName('rowMore');
	if(index > 0)
	{
		table.deleteRow(index);
	}	
	var tableData = table.getData();
	var client = Ti.Network.createHTTPClient();
	var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
	client.open('POST',url);
	client.ondatastream = function(e){
     	activity.show(); 
	};
	client.onload = function(){
		var responses = JSON.parse(this.responseText);
		var more = false;
		for (var i=0; i < responses.length; i++) {	
		        if(responses[i].title != 'more')
		        {       	
		        	 var args = {
	        			name: responses[i].title,	        			
	        			link: responses[i].id	,
	        			isOdd: i%2        			
	      				};
		        	var row = Alloy.createController('rowListProfile',args).getView(); 	

		        	if(timezoneBand == 1)
		        	{	
		        		if(responses[i].liveActive == 1)
		        		{
		        			var event_id = responses[i].id;
		        			var buttonLive = Titanium.UI.createView({
							   font: {
								   	fontSize:'12dp',
								   	fontWeight:'bold'
									},		
								width: '15%',
								borderRadius: 4,
								backgroundColor:'#745DA8',
								color: 'white',
								height: '25dp',
								textAlign: 'center',
								title: 'Live',
								right: '5%'
							});
							var labelBtnLive = Ti.UI.createLabel({
								  font: {
									   	fontSize:'12dp',
									   	fontWeight:'bold'
										},
									height:'90%',
									bottom:'8%',
									width: '98%',
									borderRadius: 4,
									backgroundColor:'#745DA8',
									color: 'white',
									textAlign: 'center',
									text: 'Live'
								});
							buttonLive.add(labelBtnLive);
							var osname = Ti.Platform.osname;
							if(osname === 'ipad')
							{
								labelBtnLive.font = { fontSize: '24dp' };
								buttonLive.height = '37dp';
							}
							
							buttonLive.addEventListener('click',function(e)
							{
							    var clientLive = Ti.Network.createHTTPClient();
								var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VALIDATE_STREAMING;
								clientLive.open('POST',url);
								clientLive.ondatastream = function(e){
								     
								};						
								
								clientLive.onload = function(){	
									var json = this.responseText;
									var responseLive = JSON.parse(json);
								
									if(responseLive.validate > 0)
									{			
										//var win = Alloy.createController('camera',event_id).getView();
										 var args = {
		                                     event_id: event_id,
		                                     live_video: 0,
		                                     title: ""
		                                 };
		                                 var win = Alloy.createController("camera", args).getView();	
										if(Ti.Platform.osname == 'android')
										{
											win.fullscreen= true;
											win.open({
											        activityEnterAnimation: Ti.Android.R.anim.fade_in,
											        activityExitAnimation: Ti.Android.R.anim.fade_out
											    });	
										} else {
											win.orientationModes = [ Titanium.UI.LANDSCAPE_RIGHT ];
											var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
											win.open({transition:t});
										}
																	
									} else {
										if(responseLive.validate == -1)
										{
											alert('The video has already been created');
										} else {
											if(responseLive.validate == 0)
											{
												alert('The event does not exist');
											} else {
												alert('The start date is not in the allowed range');
											}
										}
										buttonLive.hide(); 
									}		    
									
								};
								clientLive.onerror = function(e){alert('Transmission error: ' + e.error);};
								
								var paramsLive = {
									tc: Alloy.Globals.USER_MOBILE.toString(),
									user_id: author,
									event_id: event_id,
									time_user: utmUser
								};
						
								clientLive.send(paramsLive); 						   
							   
							});
							row.add(buttonLive);
		        		}
		        		
		        	}
		        	
		        } else {
		        	var row = Alloy.createController('rowMore').getView();
		        	more = true;
		        }		        
				tableData.push(row);		 	
			 }
			 if(tableData.length == 0)
			 {
			 	var row = Alloy.createController('rowEmpty').getView();	
			 	tableData.push(row);
			 }
	        table.setData(tableData);
	        activity.hide(); 
	      	if(more)
			{
				row.addEventListener('click', function(){
				pageHome = pageHome + 1;
				var offset = pageHome * Alloy.Globals.LIMIT;		
				exports.getListOfProfile(activity, table,offset,pageHome,author, name, timezoneBand, utmUser);
				});
			}  
		};

	client.onerror = function(e){alert(Alloy.Globals.CONNECTION_ERROR);};
	var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset : offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: 0,
        author: author,
        item_id: 0 ,
        all: 1,
        timezone: timezoneBand,
        time_user: utmUser
    };
	client.send(params);  
};