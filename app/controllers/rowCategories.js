var args = arguments[0] || {};
$.title.text = args.name || '';
$.title.link = args.link;
$.rowCategories.backgroundColor = args.isOdd ? '#f2f2f2' : '#ffffff';
var name = args.name || '';
name = name.toLowerCase();

$.imageCat.link = args.link;
$.imageCat.text = args.name || '';