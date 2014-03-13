var args = arguments[0] || {};
var height = 360;
$.container.height = '45dp';
$.container.top = (height * args.row)+'dp';
if(args.item == 1)
{
	$.text.text = args.text;
	$.message.hide();
} else {
	$.message.text = args.text;
	$.buttonMore.hide();
	$.text.hide();
	$.text.backgroundColor = '#f2f2f2';
}
