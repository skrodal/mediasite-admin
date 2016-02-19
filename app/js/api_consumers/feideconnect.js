var FEIDE_CONNECT = (function () {
	var USER = {};
	USER.org = {};

	var XHR_USER, XHR_GROUPS;

	(function () {
		XHR_USER = _getUserInfo();
		XHR_GROUPS = _getUserGroups();
	})();

	function _getUserInfo() {
		return jso.ajax({
			url: jso.config.get("endpoints").userinfo,
			oauth: { scopes: { request: ["userinfo userinfo-feide userinfo-mail userinfo-photo"] } },
			dataType: 'json'
		})
			.done(function (data, status, res) {
				console.log(data);
				var user = data.user;
				var username = user.userid_sec[0].split('feide:')[1];
				var org = username.split('@')[1];

				USER.id = user.userid;
				USER.username = username;
				USER.name = {
					full: user.name,
					first: user.name.split(' ')[0]
				};
				USER.email = user.email;
				USER.photo = jso.config.get("endpoints").photo + user.profilephoto;
				USER.org.id = org;
				USER.org.shortname = org.split('.')[0];
				UTILS.updateAuthProgress("Brukerinfo");
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.showAuthError("Brukerinfo", jqXHR);
			});

	}

	/**
	 * Populate USER object with group info, mostly interested in EduPersonAffiliation...
	 */
	function _getUserGroups() {
		return jso.ajax({
			url: jso.config.get("endpoints").groups,
			oauth: { scopes: { request: ["groups"] } },
			dataType: 'json'
		})
			.done(function (groups, status, res) {
				console.log(groups);
				// Defaults
				USER.affiliation = null;
				USER.org.name = null;

				if(groups.length === 0) {
					UTILS.showAuthError("Mangler rettigheter", "Du har dessverre ikke tilgang til denne tjenesten (fikk ikke tak i din tilh&oslash;righet)");
				} else {
					$.each(groups, function (index, group) {
						// orgType is only present for org-type group
						if (group.orgType !== undefined && group.type !== undefined) {
							// Access only for users belonging to an Organization pertaining to higher education.
							if (group.orgType.indexOf("higher_education") >= 0 && group.type.toUpperCase() === "FC:ORG") {
								// Beware - according to docs, should return a string, not array - reported and may change
								USER.affiliation = group.membership.primaryAffiliation; // https://www.feide.no/attribute/edupersonprimaryaffiliation
								if (USER.affiliation instanceof Array) {
									USER.affiliation = USER.affiliation[0];
								}
								USER.org.name = group.displayName;
								// Done!
								return false;
							}
						}
					});

					if (USER.affiliation.toLowerCase() !== 'employee') {
						UTILS.showAuthError("Tilh&oslash;righet", "Du mangler tilh&oslash;righet som <code>ansatt</code>!!!!");
					} else {
						UTILS.updateAuthProgress("Grupper");
					}
				}
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.showAuthError("Grupper", jqXHR);
			});
	}


	/*** Expose public functions ***/
	return {
		readyUser: function() {
			return XHR_USER;
		},
		readyGroups: function() {
			return XHR_GROUPS;
		},
		user: function() {
			return USER;
		},
		isEmployee: function () {
			return USER.affiliation.toLowerCase() === 'employee';
		}
	}
})();
