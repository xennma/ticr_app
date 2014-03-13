var args = arguments[0] || {};
var text = args.name || '';

	if(text.length > Alloy.Globals.TITLE_SIZE)
	{
		text = text.substring(0,Alloy.Globals.TITLE_SIZE - 2) + '...';
	}

$.title.text = text;
$.title.link = args.link;
$.rowListProfile.backgroundColor = args.isOdd ? '#f2f2f2' : '#ffffff';
$.rowListProfile.link = args.link;