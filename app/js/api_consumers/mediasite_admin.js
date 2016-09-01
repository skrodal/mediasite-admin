/**
 * Information from the API at the super level.
 *
 * Feeds the superAdmin js/view.
 */

var MEDIASITE_ADMIN = (function () {
	var orgsDiskusageList = null
		orgsDiskusageAvgList = null,
		orgDiskusageList = [];

	/**
	 * Latest storage record per org, in MiB.
	 * @returns {*}
	 */
	function orgsDiskusageListXHR() {
		var endpoint = "admin/orgs/diskusage/list/";

		if (!orgsDiskusageList) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
					datatype: 'json'
				})
				.pipe(function (response) {
					orgsDiskusageList = response.data;
					return orgsDiskusageList;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>"+endpoint+"</code>";
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
		var endpoint = "admin/orgs/diskusage/avg/list/";

		if (!orgsDiskusageAvgList) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
					datatype: 'json'
				})
				.pipe(function (response) {
					orgsDiskusageAvgList = response.data;
					return orgsDiskusageAvgList;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>"+endpoint+"</code>";
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
	function orgDiskusageListXHR(org){
		org = UTILS.mapFeideOrgToMediasiteFolder(org.split('.')[0]);
		var endpoint = "org/"+org+"/diskusage/list/";
		
		if(!orgDiskusageList[org]) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + endpoint,
					datatype: 'json'
				})
				.pipe(function (response) {
					orgDiskusageList[org] = response.data;
					return orgDiskusageList[org];
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>"+endpoint+"</code>";
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
