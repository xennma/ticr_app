var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.NAME_PAGE = "LiveOnStage";

Alloy.Globals.DOMAIN = "http://www.liveonstage.com/";

Alloy.Globals.URL_BASE = "index.php?option=com_mobile";

Alloy.Globals.URL_VIDEO = "index.php?option=com_mobile&task=video";

Alloy.Globals.URL_PROFILE = "index.php?option=com_mobile&task=profile";

Alloy.Globals.URL_EVENT = "index.php?option=com_mobile&task=event";

Alloy.Globals.URL_CAMPAIGN = "index.php?option=com_mobile&task=campaign";

Alloy.Globals.URL_CATEGORIES = "index.php?option=com_mobile&task=categories";

Alloy.Globals.URL_LOGIN = "index.php?option=com_mobile&task=startSessionUser";

Alloy.Globals.URL_START_STREAMING = "index.php?option=com_mobile&task=startLiveStreaming";

Alloy.Globals.URL_STOP_STREAMING = "index.php?option=com_mobile&task=stopLiveStreaming";

Alloy.Globals.URL_VALIDATE_STREAMING = "index.php?option=com_mobile&task=validateToStartLive";

Alloy.Globals.LIMIT = 5;

Alloy.Globals.TOP_LIMIT = 50;

Alloy.Globals.IMAGE_EVENT_DEFAULT = "components/com_community/assets/event.png";

Alloy.Globals.IMAGE_USER_DEFAULT = "images/crowd-small.jpg";

Alloy.Globals.USER = "mobile";

Alloy.Globals.PASS = "LiveXenn2013!@coNNectApp";

Alloy.Globals.USER_MOBILE = Ti.Utils.base64encode(Alloy.Globals.USER + "-" + Alloy.Globals.PASS);

Alloy.Globals.URL_LIVE = "http://liveonstage.com:1935/videowhisper/";

Alloy.Globals.URL_LIVE_IOS = "http://liveonstage.com:1935/videowhisper/";

Alloy.Globals.URL_VOD = "http://liveonstage.com:1935/vod/_definst_/mp4:";

Alloy.Globals.URL_VIDEO_END = "/playlist.m3u8";

Alloy.Globals.URL_VOD_END = ".mp4";

Alloy.Globals.RESOLUCION_VIDEO = "240p";

Alloy.Globals.TITLE_SIZE = 30;

Alloy.Globals.DESCRIPTION_SIZE = 160;

Alloy.Globals.ABOUT = 100;

Alloy.Globals.CONNECTION_ERROR = "You must be connected to the internet to be able to see this. Please connect and try again!";

Alloy.Globals.USER_RTSP = "liveon";

Alloy.Globals.USER_PASSWORD_RTSP = "NewLive1M!*";

Alloy.Globals.URL_RTSP = "rtsp://liveonstage.com:1935/videowhisper/";

Alloy.Globals.RESOLUTION_RTSP = "LOW";

Alloy.Globals.URL_RTMP = "rtmp://liveonstage.com:1935/ios";

Alloy.createController("index");