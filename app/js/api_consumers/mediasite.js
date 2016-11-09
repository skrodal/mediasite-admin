/**
 * Controls public-level info (from API) and keeps track of client constants.
 */

var MEDIASITE = (function () {
	// Initialise with default cost
	var STORAGE_COST_PER_TB = CONFIG.defaultStorageCostPerTB();
	//
	var XHR_MEDIASITE;

	// FROM API
	var userRole = false;
	var homeOrgDiskusageTotal = false;
	var serviceDiskusageTotal = false;
	var serviceDiskusageAvgThisYear = false;
	var serviceDiskusageList = false;

	(function () {
		XHR_MEDIASITE = userRoleXHR();
	})();

	/**
	 * The API provides role determined by affiliation (uninett==superadmin)
	 * and Dataporten MediasiteAdmin group membership (true==orgadmin).
	 *
	 * API returns a string: "SuperAdmin" | "OrgAdmin" | "Basic"
	 * @returns {*}
	 */
	function userRoleXHR() {
		if (!userRole) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "me/role/",
				datatype: 'json'
			})
				.pipe(function (response) {
					userRole = {};
					userRole.title = response.data;
					userRole.isSuperAdmin = false;
					userRole.isOrgAdmin = false;
					//
					switch (response.data.toLowerCase()) {
						case "superadmin":
							userRole.isSuperAdmin = true;
							break;
						case "orgadmin":
							userRole.isOrgAdmin = true;
							break;
					}
					return userRole;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>me/role/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return userRole;

	}

	/**
	 * Latest diskusage reading for home org.
	 * @returns {*}
	 */
	function homeOrgDiskusageTotalXHR() {
		if (!homeOrgDiskusageTotal) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "me/diskusage/total/",
				datatype: 'json'
			})
				.pipe(function (response) {
					homeOrgDiskusageTotal = response.data;
					return homeOrgDiskusageTotal;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>me/diskusage/total/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return homeOrgDiskusageTotal;
	}

	/**
	 * Latest diskusage read for every org, summarised.
	 * @returns {*}
	 */
	function serviceDiskusageTotalXHR() {
		if (!serviceDiskusageTotal) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "service/diskusage/total/",
				datatype: 'json'
			})
				.pipe(function (response) {
					serviceDiskusageTotal = response.data;
					return serviceDiskusageTotal;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>service/diskusage/total/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return serviceDiskusageTotal;
	}

	/**
	 * All record entries this year for all orgs summed up and average returned.
	 * @returns {*}
	 */
	function serviceDiskusageAvgThisYearXHR() {
		if (!serviceDiskusageAvgThisYear) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "service/diskusage/avg/",
				datatype: 'json'
			})
				.pipe(function (response) {
					serviceDiskusageAvgThisYear = response.data;
					return serviceDiskusageAvgThisYear;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>service/diskusage/avg/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return serviceDiskusageAvgThisYear;
	}

	/**
	 * List of latest folder storage records. No folder names, values only.
	 * @returns {*}
	 */
	function serviceDiskusageListXHR() {
		if (!serviceDiskusageList) {
			return DP_AUTH.jso().ajax({
				url: DP_AUTH.config().api_endpoints.mediasite + "service/diskusage/list/",
				datatype: 'json'
			})
				.pipe(function (response) {
					serviceDiskusageList = response.data;
					return serviceDiskusageList;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>service/diskusage/list/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return serviceDiskusageList;


	}


	return {
		ready: function () {
			return XHR_MEDIASITE;
		},
		homeOrgDiskusageTotalXHR: function () {
			return homeOrgDiskusageTotalXHR();
		},
		// Total MiB on disk as of last read
		serviceDiskusageTotalXHR: function () {
			return serviceDiskusageTotalXHR();
		},
		// Average MiB on disk as of records from this year
		serviceDiskusageAvgThisYearXHR: function () {
			return serviceDiskusageAvgThisYearXHR();
		},
		// List of latest storage records. Values only, no folder/org names (basic scope).
		serviceDiskusageListXHR: function () {
			return serviceDiskusageListXHR();
		},
		//
		storageCostTB: function () {
			return STORAGE_COST_PER_TB;
		},
		// UI can update TB storage
		setStorageCost: function (cost) {
			cost = Number(cost);
			if (isNaN(cost)) {
				UTILS.alertError('Ugyldig verdi', 'Kostnaden du fors&oslash;ker &aring; legge inn er ikke et tall.')
				return false;
			}
			STORAGE_COST_PER_TB = cost;
			return true;
		},
		userRole: function () {
			return userRole;
		}
	}
})();






