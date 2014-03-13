function Controller() {
    function checkdata(value) {
        var testresults = false;
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        filter.test(value) && (testresults = true);
        return testresults;
    }
    function openWindowsLoginSussess() {
        var args = {
            author: Ti.App.Properties.getString("user_id"),
            authorname: Ti.App.Properties.getString("name"),
            view: "Events"
        };
        var win = Alloy.createController("viewListEventsToLive", args).getView();
        win.fullscreen = false;
        if ("android" == Ti.Platform.osname) win.open({
            activityEnterAnimation: Ti.Android.R.anim.fade_in,
            activityExitAnimation: Ti.Android.R.anim.fade_out
        }); else {
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
        }
        $.login.close();
    }
    function getTimezone() {
        var utcTime = new Date();
        var other = utcTime.getTimezoneOffset() / 60;
        var i = parseInt(other);
        var m = other - i;
        var sign = "-";
        if (0 > i) {
            i = -1 * i;
            sign = "+";
        }
        10 > i && (i = "0" + i);
        m = 60 * m;
        0 == m && (m = "00");
        other = sign + i + ":" + m + ",0";
        return other;
    }
    function NavRules() {
        Ti.Geolocation.headingFilter = 10;
        if ("android" == Ti.Platform.osname) {
            Ti.Geolocation.Android.manualMode = true;
            var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
                name: Ti.Geolocation.PROVIDER_GPS,
                minUpdateDistance: 0,
                minUpdateTime: 0
            });
            Ti.Geolocation.Android.addLocationProvider(gpsProvider);
            var networkProvider = Ti.Geolocation.Android.createLocationProvider({
                name: Ti.Geolocation.PROVIDER_NETWORK,
                minUpdateTime: 3,
                minUpdateDistance: 30
            });
            Ti.Geolocation.Android.addLocationProvider(networkProvider);
            var gpsRule = Ti.Geolocation.Android.createLocationRule({
                provider: Ti.Geolocation.PROVIDER_GPS,
                accuracy: 500,
                maxAge: 5e3,
                minAge: 3e3
            });
            Ti.Geolocation.Android.addLocationRule(gpsRule);
        } else {
            Ti.Geolocation.distanceFilter = 10;
            Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
            Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
            Ti.Geolocation.purpose = Ti.Locale.getString("gps_purpose");
        }
    }
    function getLocation() {
        Titanium.Geolocation.getCurrentPosition(function(e) {
            if (e.error || !e.success) {
                gpsLow.show();
                return;
            }
            if (e.success) {
                location_coords = e.coords.timestamp;
                var date1 = new Date(location_coords);
                gpsLow.hide();
                timezoneGpsUTC = getTimezone(date1.getTimezoneOffset());
                $.timezoneLabelGps.text = "Timezone: " + getTimezoneByUTC(timezoneGpsUTC);
                $.load.hide();
            }
        });
    }
    function getTimezoneByUTC(value) {
        var timezones = [ {
            value: "-12:00,0",
            title: "(-12:00) International Date Line West"
        }, {
            value: "-11:00,0",
            title: "(-11:00) Midway Island, Samoa"
        }, {
            value: "-10:00,0",
            title: "(-10:00) Hawaii"
        }, {
            value: "-09:00,1",
            title: "(-09:00) Alaska"
        }, {
            value: "-08:00,1",
            title: "(-08:00) Pacific Time (US &amp; Canada)"
        }, {
            value: "-07:00,0",
            title: "(-07:00) Arizona"
        }, {
            value: "-07:00,1",
            title: "(-07:00) Mountain Time (US &amp; Canada)"
        }, {
            value: "-06:00,0",
            title: "(-06:00) Central America, Saskatchewan"
        }, {
            value: "-06:00,1",
            title: "(-06:00) Central Time (US &amp; Canada), Guadalajara, Mexico city"
        }, {
            value: "-05:00,0",
            title: "(-05:00) Indiana, Bogota, Lima, Quito, Rio Branco"
        }, {
            value: "-05:00,1",
            title: "(-05:00) Eastern time (US &amp; Canada)"
        }, {
            value: "-04:00,1",
            title: "(-04:00) Atlantic time (Canada), Manaus, Santiago"
        }, {
            value: "-04:30,0",
            title: "(-04:30) Caracas"
        }, {
            value: "-04:00,0",
            title: "(-04:00) La Paz"
        }, {
            value: "-03:30,1",
            title: "(-03:30) Newfoundland"
        }, {
            value: "-03:00,1",
            title: "(-03:00) Greenland, Brasilia, Montevideo"
        }, {
            value: "-03:00,0",
            title: "(-03:00) Buenos Aires, Georgetown"
        }, {
            value: "-02:00,1",
            title: "(-02:00) Mid-Atlantic"
        }, {
            value: "-01:00,1",
            title: "(-01:00) Azores"
        }, {
            value: "-01:00,0",
            title: "(-01:00) Cape Verde Is."
        }, {
            value: "00:00,0",
            title: "(00:00) Casablanca, Monrovia, Reykjavik"
        }, {
            value: "00:00,1",
            title: "(00:00) GMT: Dublin, Edinburgh, Lisbon, London"
        }, {
            value: "+01:00,1",
            title: "(+01:00) Amsterdam, Berlin, Rome, Vienna, Prague, Brussels"
        }, {
            value: "+01:00,0",
            title: "(+01:00) West Central Africa"
        }, {
            value: "+02:00,1",
            title: "(+02:00) Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem"
        }, {
            value: "+02:00,0",
            title: "(+02:00) Harare, Pretoria"
        }, {
            value: "+03:00,1",
            title: "(+03:00) Baghdad, Moscow, St. Petersburg, Volgograd"
        }, {
            value: "+03:00,0",
            title: "(+03:00) Kuwait, Riyadh, Nairobi, Tbilisi"
        }, {
            value: "+03:30,0",
            title: "(+03:30) Tehran"
        }, {
            value: "+04:00,0",
            title: "(+04:00) Abu Dhadi, Muscat"
        }, {
            value: "+04:00,1",
            title: "(+04:00) Baku, Yerevan"
        }, {
            value: "+04:30,0",
            title: "(+04:30) Kabul"
        }, {
            value: "+05:00,1",
            title: "(+05:00) Ekaterinburg"
        }, {
            value: "+05:00,0",
            title: "(+05:00) Islamabad, Karachi, Tashkent"
        }, {
            value: "+05:30,0",
            title: "(+05:30) Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura"
        }, {
            value: "+05:45,0",
            title: "(+05:45) Kathmandu"
        }, {
            value: "+06:00,0",
            title: "(+06:00) Astana, Dhaka"
        }, {
            value: "+06:00,1",
            title: "(+06:00) Almaty, Nonosibirsk"
        }, {
            value: "+06:30,0",
            title: "(+06:30) Yangon (Rangoon)"
        }, {
            value: "+07:00,1",
            title: "(+07:00) Krasnoyarsk"
        }, {
            value: "+07:00,0",
            title: "(+07:00) Bangkok, Hanoi, Jakarta"
        }, {
            value: "+08:00,0",
            title: "(+08:00) Beijing, Hong Kong, Singapore, Taipei"
        }, {
            value: "+08:00,1",
            title: "(+08:00) Irkutsk, Ulaan Bataar, Perth"
        }, {
            value: "+09:00,1",
            title: "(+09:00) Yakutsk"
        }, {
            value: "+09:00,0",
            title: "(+09:00) Seoul, Osaka, Sapporo, Tokyo"
        }, {
            value: "+09:30,0",
            title: "(+09:30) Darwin"
        }, {
            value: "+09:30,1",
            title: "(+09:30) Adelaide"
        }, {
            value: "+10:00,0",
            title: "(+10:00) Brisbane, Guam, Port Moresby"
        }, {
            value: "+10:00,1",
            title: "(+10:00) Canberra, Melbourne, Sydney, Hobart, Vladivostok"
        }, {
            value: "+11:00,0",
            title: "(+11:00) Magadan, Solomon Is., New Caledonia"
        }, {
            value: "+12:00,1",
            title: "(+12:00) Auckland, Wellington"
        }, {
            value: "+12:00,0",
            title: "(+12:00) Fiji, Kamchatka, Marshall Is."
        }, {
            value: "+13:00,0",
            title: "(+13:00) Nuku'alof"
        } ];
        var title = "";
        for (var i = 0, ilen = timezones.length; ilen > i; i++) timezones[i]["value"] == value && (title = timezones[i]["title"]);
        return title;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 100,
        id: "activity"
    });
    $.__views.login.add($.__views.activity);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.login.add($.__views.container);
    $.__views.username = Ti.UI.createTextField(function() {
        var o = {};
        _.extend(o, {
            borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
            keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
            returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
            color: "#336699",
            hintText: "Username",
            top: "2%",
            width: "80%",
            height: "10%",
            left: "10%",
            border: 1,
            borderColor: "#c1c1c1",
            paddingLeft: 5
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "username"
        });
        return o;
    }());
    $.__views.container.add($.__views.username);
    $.__views.password = Ti.UI.createTextField(function() {
        var o = {};
        _.extend(o, {
            borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
            keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
            returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
            color: "#336699",
            hintText: "Password",
            passwordMask: "true",
            top: "14%",
            width: "80%",
            height: "10%",
            left: "10%",
            border: 1,
            borderColor: "#c1c1c1",
            paddingLeft: 5
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "password"
        });
        return o;
    }());
    $.__views.container.add($.__views.password);
    $.__views.TimezoneLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "28%",
            font: {
                fontSize: "15dp",
                fontWeight: "bold"
            },
            color: "#c9c9c9",
            left: "10%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: "22dp"
            }
        });
        _.extend(o, {
            text: "Select your current timezone",
            id: "TimezoneLabel"
        });
        return o;
    }());
    $.__views.container.add($.__views.TimezoneLabel);
    $.__views.pickTimezone = Ti.UI.createPicker({
        top: "36%",
        width: "80%",
        left: "10%",
        font: {
            fontSize: "10dp"
        },
        id: "pickTimezone"
    });
    $.__views.container.add($.__views.pickTimezone);
    var __alloyId12 = [];
    $.__views.__alloyId13 = Ti.UI.createPickerRow({
        value: "-12:00,0",
        title: "(-12:00) International Date Line West",
        id: "__alloyId13"
    });
    __alloyId12.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createPickerRow({
        value: "-11:00,0",
        title: "(-11:00) Midway Island, Samoa",
        id: "__alloyId14"
    });
    __alloyId12.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createPickerRow({
        value: "-10:00,0",
        title: "(-10:00) Hawaii",
        id: "__alloyId15"
    });
    __alloyId12.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createPickerRow({
        value: "-09:00,1",
        title: "(-09:00) Alaska",
        id: "__alloyId16"
    });
    __alloyId12.push($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createPickerRow({
        value: "-08:00,1",
        title: "(-08:00) Pacific Time (US & Canada)",
        id: "__alloyId17"
    });
    __alloyId12.push($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createPickerRow({
        value: "-07:00,0",
        title: "(-07:00) Arizona",
        id: "__alloyId18"
    });
    __alloyId12.push($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createPickerRow({
        value: "-07:00,1",
        title: "(-07:00) Mountain Time (US & Canada)",
        id: "__alloyId19"
    });
    __alloyId12.push($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createPickerRow({
        value: "-06:00,0",
        title: "(-06:00) Central America, Saskatchewan",
        id: "__alloyId20"
    });
    __alloyId12.push($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createPickerRow({
        value: "-06:00,1",
        title: "(-06:00) Central Time (US & Canada), Guadalajara, Mexico city",
        id: "__alloyId21"
    });
    __alloyId12.push($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createPickerRow({
        value: "-05:00,0",
        title: "(-05:00) Indiana, Bogota, Lima, Quito, Rio Branco",
        id: "__alloyId22"
    });
    __alloyId12.push($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createPickerRow({
        value: "-05:00,1",
        title: "(-05:00) Eastern time (US & Canada)",
        selected: "true",
        id: "__alloyId23"
    });
    __alloyId12.push($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createPickerRow({
        value: "-04:00,1",
        title: "(-04:00) Atlantic time (Canada), Manaus, Santiago",
        id: "__alloyId24"
    });
    __alloyId12.push($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createPickerRow({
        value: "-04:30,0",
        title: "(-04:30) Caracas",
        id: "__alloyId25"
    });
    __alloyId12.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createPickerRow({
        value: "-04:00,0",
        title: "(-04:00) La Paz",
        id: "__alloyId26"
    });
    __alloyId12.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createPickerRow({
        value: "-03:30,1",
        title: "(-03:30) Newfoundland",
        id: "__alloyId27"
    });
    __alloyId12.push($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createPickerRow({
        value: "-03:00,1",
        title: "(-03:00) Greenland, Brasilia, Montevideo",
        id: "__alloyId28"
    });
    __alloyId12.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createPickerRow({
        value: "-03:00,0",
        title: "(-03:00) Buenos Aires, Georgetown",
        id: "__alloyId29"
    });
    __alloyId12.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createPickerRow({
        value: "-02:00,1",
        title: "(-02:00) Mid-Atlantic",
        id: "__alloyId30"
    });
    __alloyId12.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createPickerRow({
        value: "-01:00,1",
        title: "(-01:00) Azores",
        id: "__alloyId31"
    });
    __alloyId12.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createPickerRow({
        value: "-01:00,0",
        title: "(-01:00) Cape Verde Is.",
        id: "__alloyId32"
    });
    __alloyId12.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createPickerRow({
        value: "00:00,0",
        title: "(00:00) Casablanca, Monrovia, Reykjavik",
        id: "__alloyId33"
    });
    __alloyId12.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createPickerRow({
        value: "00:00,1",
        title: "(00:00) GMT: Dublin, Edinburgh, Lisbon, London",
        id: "__alloyId34"
    });
    __alloyId12.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createPickerRow({
        value: "+01:00,1",
        title: "(+01:00) Amsterdam, Berlin, Rome, Vienna, Prague, Brussels",
        id: "__alloyId35"
    });
    __alloyId12.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createPickerRow({
        value: "+01:00,0",
        title: "(+01:00) West Central Africa",
        id: "__alloyId36"
    });
    __alloyId12.push($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createPickerRow({
        value: "+02:00,1",
        title: "(+02:00) Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem",
        id: "__alloyId37"
    });
    __alloyId12.push($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createPickerRow({
        value: "+02:00,0",
        title: "(+02:00) Harare, Pretoria",
        id: "__alloyId38"
    });
    __alloyId12.push($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createPickerRow({
        value: "+03:00,1",
        title: "(+03:00) Baghdad, Moscow, St. Petersburg, Volgograd",
        id: "__alloyId39"
    });
    __alloyId12.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createPickerRow({
        value: "+03:00,0",
        title: "(+03:00) Kuwait, Riyadh, Nairobi, Tbilisi",
        id: "__alloyId40"
    });
    __alloyId12.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createPickerRow({
        value: "+03:30,0",
        title: "(+03:30) Tehran",
        id: "__alloyId41"
    });
    __alloyId12.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createPickerRow({
        value: "+04:00,0",
        title: "(+04:00) Abu Dhadi, Muscat",
        id: "__alloyId42"
    });
    __alloyId12.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createPickerRow({
        value: "+04:00,1",
        title: "(+04:00) Baku, Yerevan",
        id: "__alloyId43"
    });
    __alloyId12.push($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createPickerRow({
        value: "+04:30,0",
        title: "(+04:30) Kabul",
        id: "__alloyId44"
    });
    __alloyId12.push($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createPickerRow({
        value: "+05:00,1",
        title: "(+05:00) Ekaterinburg",
        id: "__alloyId45"
    });
    __alloyId12.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createPickerRow({
        value: "+05:00,0",
        title: "(+05:00) Islamabad, Karachi, Tashkent",
        id: "__alloyId46"
    });
    __alloyId12.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createPickerRow({
        value: "+05:30,0",
        title: "(+05:30) Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura",
        id: "__alloyId47"
    });
    __alloyId12.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createPickerRow({
        value: "+05:45,0",
        title: "(+05:45) Kathmandu",
        id: "__alloyId48"
    });
    __alloyId12.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createPickerRow({
        value: "+06:00,0",
        title: "(+06:00) Astana, Dhaka",
        id: "__alloyId49"
    });
    __alloyId12.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        value: "+06:00,1",
        title: "(+06:00) Almaty, Nonosibirsk",
        id: "__alloyId50"
    });
    __alloyId12.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createPickerRow({
        value: "+06:30,0",
        title: "(+06:30) Yangon (Rangoon)",
        id: "__alloyId51"
    });
    __alloyId12.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createPickerRow({
        value: "+07:00,1",
        title: "(+07:00) Krasnoyarsk",
        id: "__alloyId52"
    });
    __alloyId12.push($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createPickerRow({
        value: "+07:00,0",
        title: "(+07:00) Bangkok, Hanoi, Jakarta",
        id: "__alloyId53"
    });
    __alloyId12.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createPickerRow({
        value: "+08:00,0",
        title: "(+08:00) Beijing, Hong Kong, Singapore, Taipei",
        id: "__alloyId54"
    });
    __alloyId12.push($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createPickerRow({
        value: "+08:00,1",
        title: "(+08:00) Irkutsk, Ulaan Bataar, Perth",
        id: "__alloyId55"
    });
    __alloyId12.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createPickerRow({
        value: "+09:00,1",
        title: "(+09:00) Yakutsk",
        id: "__alloyId56"
    });
    __alloyId12.push($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createPickerRow({
        value: "+09:00,0",
        title: "(+09:00) Seoul, Osaka, Sapporo, Tokyo",
        id: "__alloyId57"
    });
    __alloyId12.push($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createPickerRow({
        value: "+09:30,0",
        title: "(+09:30) Darwin",
        id: "__alloyId58"
    });
    __alloyId12.push($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createPickerRow({
        value: "+09:30,1",
        title: "(+09:30) Adelaide",
        id: "__alloyId59"
    });
    __alloyId12.push($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createPickerRow({
        value: "+10:00,0",
        title: "(+10:00) Brisbane, Guam, Port Moresby",
        id: "__alloyId60"
    });
    __alloyId12.push($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createPickerRow({
        value: "+10:00,1",
        title: "(+10:00) Canberra, Melbourne, Sydney, Hobart, Vladivostok",
        id: "__alloyId61"
    });
    __alloyId12.push($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createPickerRow({
        value: "+11:00,0",
        title: "(+11:00) Magadan, Solomon Is., New Caledonia",
        id: "__alloyId62"
    });
    __alloyId12.push($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createPickerRow({
        value: "+12:00,1",
        title: "(+12:00) Auckland, Wellington",
        id: "__alloyId63"
    });
    __alloyId12.push($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createPickerRow({
        value: "+12:00,0",
        title: "(+12:00) Fiji, Kamchatka, Marshall Is.",
        id: "__alloyId64"
    });
    __alloyId12.push($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createPickerRow({
        value: "+13:00,0",
        title: "(+13:00) Nuku'alof",
        id: "__alloyId65"
    });
    __alloyId12.push($.__views.__alloyId65);
    $.__views.pickTimezone.add(__alloyId12);
    $.__views.messageTimezoneAsk = Ti.UI.createView({
        top: "47%",
        width: "80%",
        left: "10%",
        height: "17%",
        id: "messageTimezoneAsk"
    });
    $.__views.container.add($.__views.messageTimezoneAsk);
    $.__views.messageTimezoneAskLabel = Ti.UI.createLabel({
        top: "10%",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        color: "#c9c9c9",
        text: "Did the GPS not retrieve your timezone? (Choose Timezone Manually)",
        id: "messageTimezoneAskLabel"
    });
    $.__views.messageTimezoneAsk.add($.__views.messageTimezoneAskLabel);
    $.__views.buttonTimezone = Ti.UI.createView({
        width: "25%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        bottom: "5%",
        height: "30%",
        textAlign: "center",
        left: "0%",
        id: "buttonTimezone"
    });
    $.__views.messageTimezoneAsk.add($.__views.buttonTimezone);
    $.__views.textBottom = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp",
                fontWeight: "bold"
            },
            height: "90%",
            bottom: "8%",
            width: "98%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Choose",
            id: "textBottom"
        });
        return o;
    }());
    $.__views.buttonTimezone.add($.__views.textBottom);
    $.__views.timezoneGps = Ti.UI.createView({
        top: "35%",
        width: "80%",
        left: "10%",
        height: "12%",
        backgroundColor: "white",
        id: "timezoneGps"
    });
    $.__views.container.add($.__views.timezoneGps);
    $.__views.load = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "12dp",
            fontWeight: "bold"
        },
        message: " Searching your GPS Timezone",
        height: "100%",
        width: "80%",
        id: "load"
    });
    $.__views.timezoneGps.add($.__views.load);
    $.__views.timezoneLabelGps = Ti.UI.createLabel({
        top: "10%",
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        id: "timezoneLabelGps"
    });
    $.__views.timezoneGps.add($.__views.timezoneLabelGps);
    $.__views.buttonLogin = Ti.UI.createView({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        width: "45%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        bottom: "5%",
        height: "10%",
        textAlign: "center",
        id: "buttonLogin"
    });
    $.__views.container.add($.__views.buttonLogin);
    $.__views.textBottom = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp",
                fontWeight: "bold"
            },
            height: "90%",
            bottom: "8%",
            width: "98%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontWeight: "bold",
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Login",
            id: "textBottom"
        });
        return o;
    }());
    $.__views.buttonLogin.add($.__views.textBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var timezone;
    $.pickTimezone.setSelectedRow(0, 10, false);
    var zoneGps = 1;
    var timezoneGpsUTC = "";
    $.load.show();
    $.pickTimezone.hide();
    var user_id = 0;
    var dialog = Ti.UI.createAlertDialog({
        buttonNames: [ "Go to My Events", "Go Live Now" ],
        message: "What do you want to do?",
        title: "Login successful!"
    });
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.login, "Login", false, null, $.container, null, false);
    $.username.autocorrect = false;
    $.buttonLogin.addEventListener("click", function() {
        var client = Ti.Network.createHTTPClient();
        var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_LOGIN;
        client.open("POST", url);
        client.ondatastream = function() {
            $.activity.show();
        };
        client.onload = function() {
            var json = this.responseText;
            var response = JSON.parse(json);
            if ("undefined" == typeof response["user"]) {
                alert("Failed credentials");
                $.activity.hide();
            } else {
                $.username.blur();
                $.password.blur();
                user_id = response["user"].id;
                if (1 == response["user"].accept) {
                    Ti.App.Properties.setString("user_id", response["user"].id);
                    Ti.App.Properties.setString("username", response["user"].username);
                    Ti.App.Properties.setString("name", response["user"].name);
                    Ti.App.Properties.setString("timezone", timezone);
                    $.activity.hide();
                    dialog.show();
                } else {
                    var dialog1 = Ti.UI.createAlertDialog({
                        buttonNames: [ "No Accept", "Accept" ],
                        message: response["terms"].toString(),
                        title: "Terms of Service "
                    });
                    dialog1.addEventListener("click", function(e) {
                        if (0 == e.index) {
                            Ti.App.Properties.setString("user_id", null);
                            Ti.App.Properties.setString("username", null);
                            Ti.App.Properties.setString("timezone", null);
                            Ti.App.Properties.setString("name", null);
                            $.login.close();
                        } else if (1 == e.index) {
                            var client1 = Ti.Network.createHTTPClient();
                            var url1 = Alloy.Globals.DOMAIN + Alloy.Globals.URL_REGISTER_ACCEPT;
                            client1.open("POST", url1);
                            client1.ondatastream = function() {
                                $.activity.show();
                            };
                            client1.onload = function() {
                                var json = this.responseText;
                                JSON.parse(json);
                            };
                            client1.onerror = function(e) {
                                alert("Transmission error: " + e.error);
                            };
                            var params = {
                                user_id: user_id,
                                tc: Alloy.Globals.USER_MOBILE.toString()
                            };
                            client1.send(params);
                            Ti.App.Properties.setString("user_id", response["user"].id);
                            Ti.App.Properties.setString("username", response["user"].username);
                            Ti.App.Properties.setString("name", response["user"].name);
                            Ti.App.Properties.setString("timezone", timezone);
                            $.activity.hide();
                            dialog.show();
                        }
                    });
                    dialog1.show();
                }
            }
        };
        client.onerror = function(e) {
            alert("Transmission error: " + e.error);
        };
        if ("" != $.username.value && "" != $.password.value) if (checkdata($.username.value)) if (checkdata($.password.value)) {
            timezone = 1 == zoneGps ? timezoneGpsUTC : $.pickTimezone.getSelectedRow(0).value;
            if ("zone" != timezone) {
                var user1 = Ti.Utils.base64encode($.username.value + "-" + $.password.value);
                var params = {
                    tc: Alloy.Globals.USER_MOBILE.toString(),
                    u: user1.toString()
                };
                client.send(params);
            } else alert("Please select Timezone");
        } else alert("Please enter a valid password"); else alert("Please enter a valid username"); else alert("Username/Password are required");
    });
    var gpsApagado = Ti.UI.createAlertDialog({
        title: "GPS Unavailable",
        message: "Turn on the GPS to be able to use the map function",
        ok: "OK"
    });
    var gpsLow = Ti.UI.createAlertDialog({
        title: "Searching for GPS",
        message: "Try going outside to get GPS signal",
        ok: "OK"
    });
    var location_coords;
    NavRules();
    if ("android" === Ti.Platform.osname) {
        var locationAdded = false;
        var handleLocation = function(e) {
            e.error || Ti.API.info(e.coords);
            getLocation();
        };
        var addHandler = function() {
            if (!locationAdded) {
                Ti.Geolocation.addEventListener("location", handleLocation);
                locationAdded = true;
            }
        };
        var removeHandler = function() {
            if (locationAdded) {
                Ti.Geolocation.removeEventListener("location", handleLocation);
                locationAdded = false;
            }
        };
        addHandler();
        var activity = Ti.Android.currentActivity;
        activity.addEventListener("destroy", removeHandler);
        activity.addEventListener("pause", removeHandler);
    } else Ti.Geolocation.addEventListener("location", function() {
        getLocation();
    });
    Ti.Geolocation.locationServicesEnabled || gpsApagado.show();
    $.buttonTimezone.addEventListener("click", function() {
        $.messageTimezoneAsk.hide();
        $.timezoneGps.hide();
        zoneGps = 0;
        $.load.hide();
        "android" === Ti.Platform.osname && removeHandler();
        $.pickTimezone.show();
    });
    dialog.addEventListener("click", function(e) {
        if (1 == e.index) {
            var win = Alloy.createController("modalViewVideoLive").getView();
            win.open({
                modal: true,
                navBarHidden: true,
                modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
            });
            $.login.close();
        } else 0 == e.index && openWindowsLoginSussess();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;