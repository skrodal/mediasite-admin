/**
 * Information from the API at the logged on user's org-level.
 *
 * Feeds the orgAdmin js/view.
 */

var MEDIASITE_ORG = (function () {
	var storageRecordsThisYear = []; // Array with daily storage objects (org, storage_mib, timestamp)
	var invitationLink = false; // Invitation URL to Dataporten group MediasiteAdmin (to allow access as OrgAdmin)

	/**
	 * Org diskusage history (array) for the home org this current year
	 * @returns {*}
	 */
	function storageRecordsThisYearXHR() {
		if (storageRecordsThisYear.length == 0) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + "org/" + DATAPORTEN.user().org.shortname + "/diskusage/list/",
					datatype: 'json'
				})
				.pipe(function (response) {
					storageRecordsThisYear = response.data;
					return storageRecordsThisYear;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>org/" + DATAPORTEN.user().org.shortname + "/diskusage/list/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return storageRecordsThisYear;
	}

	function invitationLinkXHR(){
		if (!invitationLink) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "org/" + DATAPORTEN.user().org.shortname + "/orgadmin/invitationurl/",
				datatype: 'json'
			})
				.pipe(function (response) {
					invitationLink = response.data;
					return invitationLink;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>org/" + DATAPORTEN.user().org.shortname + "/orgadmin/invitationurl/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return invitationLink;
	}

	return {

		totalStorage: function(){
			var data = storageRecordsThisYear;
			return parseInt(data[data.length-1].storage_mib);
		},
		avgStorageThisYear: function () {
			var total = 0;
			$.each(storageRecordsThisYear, function(index, storageObj){
				total +=  parseInt(storageObj.storage_mib);
			});
			return total / storageRecordsThisYear.length;
		},
		storageRecordsThisYearXHR: function () {
			return storageRecordsThisYearXHR();
		},
		invitationLinkXHR: function(){
			return invitationLinkXHR();
		}

	}
})();


