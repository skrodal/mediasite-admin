/**
 * DATAPORTEN JSO kickoff for this client.
 *
 * Auth and collection of user/group info, all combined in a USER object.
 *
 */

JSO.enablejQuery($);

var DP_AUTH = (function () {
	//
	var DEBUG = !true;
	//
	var CONFIG =
	{
		dp_auth: {
			providerID: "DP-MediasiteAdmin",
			client_id: "DASHBOARD",
			redirect_uri: "DASHBOARD",
			authorization: "https://auth.dataporten.no/oauth/authorization",
		},
		dp_endpoints: {
			groups: "https://groups-api.dataporten.no/groups/",
			photo: "https://auth.dataporten.no/user/media/",
			userinfo: "https://auth.dataporten.no/userinfo/",
		},
		api_endpoints: {
			kind: "DASHBOARD",
			mediasite: "DASHBOARD"
		},
		kind: {
			mediasiteID: "KIND SERVICE ID"
		},
		access_group: {
			groupID: "DP AD-HOC GROUP ID"
		}
	};


	var jso = new JSO({
		providerID		: 	CONFIG.dp_auth.providerID,
		client_id		: 	CONFIG.dp_auth.client_id,
		redirect_uri	: 	CONFIG.dp_auth.redirect_uri,
		authorization	: 	CONFIG.dp_auth.authorization,
		debug: DEBUG
	});

	// Added debug flag to config and to JSO library. Below is mostly a reminder to myself :)
	if(!DEBUG){
		console.info("JSO debug/logging is turned off; turn on in JSO instantiation.")
	}


	jso.callback();

	return {
		jso: function () {
			return jso;
		},
		token: function () {
			return jso.getToken(function (token) {
				return token;
			});
		},
		// Dreper sesjonen, inkludert Feide-sesj.
		logout: function () {
			jso.wipeTokens();
			window.location.replace("https://auth.dataporten.no/logout");
		},
		// Slett sesjon - krever ny runde med godkjenning (men slipper Feide-auth på nytt)
		wipeTokens: function () {
			jso.wipeTokens();
		},
		config: function () {
			return CONFIG;
		}
	};

})();