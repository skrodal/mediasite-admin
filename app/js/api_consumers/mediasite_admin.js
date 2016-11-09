/**
 * Information from the API at the super level.
 *
 * Feeds the superAdmin js/view.
 */

var MEDIASITE_ADMIN = (function () {

	var orgsDiskusageList = false;
	var orgsDiskusageAvgList = false;
	var orgDiskusageList = [];


	/**
	 * Latest storage record per org, in MiB.
	 * @returns {*}
	 */
	function orgsDiskusageListXHR() {
		if (!orgsDiskusageList) {
			var endpoint = "admin/orgs/diskusage/list/";
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
				datatype: 'json'
			})
				.pipe(function (response) {
					orgsDiskusageList = response.data;
					return response.data;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>" + endpoint + "</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return orgsDiskusageList;
	}

	/**
	 * Average storage per org (folder) for current year.
	 *
	 * @returns {*}
	 */
	function orgsDiskusageAvgListXHR() {
		if (!orgsDiskusageAvgList) {
			var endpoint = "admin/orgs/diskusage/avg/list/";
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
				datatype: 'json'
			})
				.pipe(function (response) {
					orgsDiskusageAvgList = response.data;
					return response.data;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>" + endpoint + "</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return orgsDiskusageAvgList;

	}

	/**
	 * Org diskusage history for the current year for selected org.
	 * @param org
	 * @returns {*}
	 */
	function orgDiskusageListXHR(org) {
		org = UTILS.mapFeideOrgToMediasiteFolder(org.split('.')[0]);

		if(!orgDiskusageList[org]){
			var endpoint = "org/" + org + "/diskusage/list/";

			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
				datatype: 'json'
			})
				.pipe(function (response) {
					orgDiskusageList[org] = response.data;
					return response.data;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>" + endpoint + "</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}

		return orgDiskusageList[org];

	}


	return {
		// Usage as of latest records
		orgsDiskusageListXHR: function () {
			return orgsDiskusageListXHR();
		},
		// Usage average this year
		orgsDiskusageAvgListXHR: function () {
			return orgsDiskusageAvgListXHR();
		},
		// List of storage records for selected org for current year
		orgDiskusageListXHR: function (org) {
			return orgDiskusageListXHR(org);
		}
	}

})();
