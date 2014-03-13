var video_id = arguments[0] || {};

$.bottomModal.addEventListener('click',function(){
	
	var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
	var band = 0;	    
	if($.description.value!= '')
	{
		if (filter.test($.description.value))  
		{ 
			band = band + 1;  
		} else {
				alert("Please enter a valid video description");  
			}
	} else {  
        alert("Video description is required");  
    } 
   
    if ($.pickReport.getSelectedRow(0).value == '0')  
    {  		
		alert("Please select the type of report");  
		
	} else {  
        band = band + 1;  
    } 
    
    if(band == 2)
    {
    	var client1 = Ti.Network.createHTTPClient();
		var url1 = Alloy.Globals.DOMAIN + Alloy.Globals.URL_REPORT_VIDEO;
		client1.open('POST',url1);
		client1.ondatastream = function(e){
		     $.activity.show(); 
		};
		client1.onload = function(){
			var json = this.responseText;
			var responses = JSON.parse(json);
			alert('Thank you for submitting a report. An administrator will review this report shortly.');
		};
		var user_id = 0;
		if(Ti.App.Properties.getString('user_id'))
		{
			user_id = Ti.App.Properties.getString('user_id').toString();
		}
		client1.onerror = function(e){alert('Transmission error: ' + e.error);};
		var params = {
			user_id : user_id,
			tc: Alloy.Globals.USER_MOBILE.toString(),
			video_id: video_id,
			message: $.description.value
		};
		client1.send(params); 
		
		$.modal.close();
    }
	
});

$.bottomModalCancel.addEventListener('click',function(){
	$.modal.close();
});



$.description._hintText = $.description.value;

$.description.addEventListener('focus',function(e){
    if(e.source.value == e.source._hintText){
        e.source.value = "";
        e.source.color = "#336699";
    }
});
$.description.addEventListener('blur',function(e){
    if(e.source.value==""){
    	e.source.color = "#c1c1c1";
        e.source.value = e.source._hintText;
    }
});

$.pickReport.addEventListener('change',function(e){
  
   if (e.source.getSelectedRow(0).value != '0')  
    {
    	$.description.value =  e.source.getSelectedRow(0).value; 
    } else {
    	$.description.value = '';
    }
});
