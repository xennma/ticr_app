function acctionLogin(currentWin, vp) {
    if (Ti.App.Properties.getString("user_id") > 0) {
        Ti.App.Properties.setString("user_id", null);
        Ti.App.Properties.setString("username", null);
        Ti.App.Properties.setString("timezone", null);
        Ti.App.Properties.setString("name", null);
        var win = Alloy.createController("feed", 1).getView();
    } else {
        var win = Alloy.createController("login").getView();
        if (vp) {
            vp.hide();
            vp.release();
            vp = null;
        }
    }
    currentWin.close();
    win.fullscreen = false;
    win.open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in,
        activityExitAnimation: Ti.Android.R.anim.fade_out
    });
}

exports.putActionBar = function(currentWindow, title, isFeed, vp, container, activity, reset) {
    var buttomText = "Login";
    Ti.App.Properties.getString("user_id") > 0 && (buttomText = "Logout");
    var actionBar;
    currentWindow.addEventListener("open", function() {
        if (currentWindow.activity) {
            actionBar = currentWindow.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = title;
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    if (vp) {
                        vp.hide();
                        vp.release();
                        vp = null;
                    }
                    currentWindow.close();
                    if (reset) {
                        var win = Alloy.createController("feed", 1).getView();
                        win.fullscreen = false;
                        win.open({
                            activityEnterAnimation: Ti.Android.R.anim.fade_in,
                            activityExitAnimation: Ti.Android.R.anim.fade_out
                        });
                    }
                };
                "Login" != title && (currentWindow.activity.onCreateOptionsMenu = function(e) {
                    var menu = e.menu;
                    var menuItem = menu.add({
                        title: buttomText,
                        showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
                    });
                    menuItem.addEventListener("click", function() {
                        acctionLogin(currentWindow, vp);
                    });
                });
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
};

exports.iosActionLogin = function(currentWin, vp) {
    acctionLogin(currentWin, vp);
};