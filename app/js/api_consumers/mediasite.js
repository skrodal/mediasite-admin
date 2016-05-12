var MEDIASITE = (function () {
	// CONSTANTS
	var STORAGE_COST_PER_TB = 12000;

	// FROM API
	var
		serviceDiskusageTotal = null,
		serviceDiskusageAvgThisYear = null,
		serviceDiskusageList = null,
		homeOrgDiskusageTotal = null;




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
					var title = "Mediasite API — <code>service/diskusage/total/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return homeOrgDiskusageTotal;
	}

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

	// Array of storage numbers per folder. No folder names are returned.
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

		homeOrgDiskusageTotalXHR: function(){
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
		}
	}
})();






