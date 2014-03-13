var args = arguments[0] || {};
var text = args.title || '';
var type = args.type || 'vod';

$.live.hide();
$.live.visible = false;

if(type == 'live')
{	
	$.live.show();
	$.live.visible = true;
	$.live.link = args.link;
}

if(text.length > Alloy.Globals.TITLE_SIZE)
{
	text = text.substring(0,Alloy.Globals.TITLE_SIZE - 2) + '...';
}
$.title.text = text;
$.title.link = args.link;
$.author.text = args.name || '';
$.author.link = args.link;
$.footMessage.text = args.message || '';
$.footMessage.link = args.link;

var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
if(args.image != null)
{
	imageLink = args.image;
	if(imageLink.substring(0,4) != 'http')
	{
		imageLink = Alloy.Globals.DOMAIN + imageLink;
	}
}

$.image.image = imageLink;
$.image.link = args.link;

$.rowListItems.backgroundColor = args.isOdd ? '#f2f2f2' : '#ffffff';
$.rowListItems.link = args.link;