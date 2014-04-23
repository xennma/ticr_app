package com.liveonstage.ticr;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class TicrAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";

	public TicrAppInfo(TiApplication app) {
	}

	public String getDeployType() {
		return "development";
	}

	public String getId() {
		return "com.liveonstage.ticr";
	}

	public String getName() {
		return "Ticr";
	}

	public String getVersion() {
		return "1.0.2";
	}

	public String getPublisher() {
		return "Xenn Marketing";
	}

	public String getUrl() {
		return "http://xenn.com";
	}

	public String getCopyright() {
		return "2013 by Xenn Marketing";
	}

	public String getDescription() {
		return "Ticr.com - The place where artists can fund their projects.";
	}

	public String getIcon() {
		return "icon.png";
	}

	public boolean isAnalyticsEnabled() {
		return true;
	}

	public String getGUID() {
		return "ceec9269-f866-4fe1-b28c-178b4b1b507f";
	}

	public boolean isFullscreen() {
		return false;
	}

	public boolean isNavBarHidden() {
		return true;
	}
}
