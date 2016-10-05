/**
 * Information from the API at the logged on user's org-level.
 *
 * Feeds the orgAdmin js/view.
 */

var MEDIASITE_ORG = (function () {
	var storageRecordsThisYearXHR; // Array with daily storage objects (org, storage_mib, timestamp)
	var invitationLinkXHR; // Invitation URL to Dataporten group MediasiteAdmin (to allow access as OrgAdmin)


	(function () {
		$.when(DATAPORTEN.readyUser(), DATAPORTEN.readyGroups()).done(function () {
			storageRecordsThisYearXHR = _storageRecordsThisYearXHR();
			invitationLinkXHR = _invitationLinkXHR();
		});
	})();


	/**
	 * Org diskusage history (array) for the home org this current year
	 * @returns {*}
	 */
	function _storageRecordsThisYearXHR() {
		return DP_AUTH.jso().ajax({
			url: DP_AUTH.config().api_endpoints.mediasite + "org/" + DATAPORTEN.user().org.shortname + "/diskusage/list/",
			datatype: 'json'
		})
			.pipe(function (response) {
				return response.data;
			})
			.fail(function (jqXHR, textStatus, error) {
				var title = "Mediasite API — <code>org/" + DATAPORTEN.user().org.shortname + "/diskusage/list/</code>";
				var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
				UTILS.alertError(title, message);
				UTILS.showAuthError(title, message);
			});

	}

	function _invitationLinkXHR() {
		return DP_AUTH.jso().ajax({
			url: DP_AUTH.config().api_endpoints.mediasite + "org/" + DATAPORTEN.user().org.shortname + "/orgadmin/invitationurl/",
			datatype: 'json'
		})
			.pipe(function (response) {
				return response.data;
			})
			.fail(function (jqXHR, textStatus, error) {
				var title = "Mediasite API — <code>org/" + DATAPORTEN.user().org.shortname + "/orgadmin/invitationurl/</code>";
				var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
				UTILS.alertError(title, message);
				UTILS.showAuthError(title, message);
			});
	}

	return {
		storageRecordsThisYearXHR: function () {
			return storageRecordsThisYearXHR;
		},
		invitationLinkXHR: function () {
			return invitationLinkXHR;
		}

	}
})();


