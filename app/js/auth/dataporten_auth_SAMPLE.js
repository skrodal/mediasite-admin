/**
 * Dataporten JSO kickoff for this client.
 *
 * Auth and collection of user/group info, all combined in a USER object.
 *
 */

//
// var XHR_ORG_SUBSCRIBERS, XHR_USER_INFO, XHR_USER_GROUPS;

// Global vars
var DEV = !true;
//
JSO.enablejQuery($);

// Settings pertaining to this client.
var jso = new JSO({
	providerID: "DP-MediasiteAdmin",
	client_id: "",
	redirect_uri: "",
	authorization: "https://auth.dataporten.no/oauth/authorization",
	debug: false,
	scopes: {
		// request: ["groups", "userinfo", "userinfo-feide", "userinfo-mail", "userinfo-photo", "gk_mediasite", "gk_mediasite_org", "gk_mediasite_admin", "gk_ecampus-kind", "gk_ecampus-kind_admin"],
		// require: ["groups", "userinfo", "userinfo-feide", "userinfo-mail", "userinfo-photo", "gk_mediasite", "gk_mediasite_org", "gk_mediasite_admin", "gk_ecampus-kind", "gk_ecampus-kind_admin"]
	},
	endpoints: {
		groups: "https://groups-api.dataporten.no/groups/me/groups",
		photo: "https://auth.dataporten.no/user/media/",
		userinfo: "https://auth.dataporten.no/userinfo",
		kind: "https://ecampus-kind.dataporten-api.no/api/ecampus-kind/"
		// mediasite: "https://mediasiteapi.gk.feideconnect.no/api/v1/mediasite/"
	},
	kind: {
		mediasiteID: "123845"
	}
});


jso.callback();
// Catch response
jso.getToken(function (token) {
	// Run the essential API calls
	if (!DEV) {
		//XHR_USER_INFO = getUserInfo();
		//XHR_USER_GROUPS = getUserGroups();
		//XHR_ORG_SUBSCRIBERS = KIND.subscribers();
	}
	// console.log('Authorization: Bearer ' + token.access_token);
	// console.log(JSON.stringify(token, undefined, 2));
});


