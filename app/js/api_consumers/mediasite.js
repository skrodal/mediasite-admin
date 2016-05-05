var MEDIASITE = (function () {
	var STORAGE_COST_PER_TB = 15000;

	var
		totalDiskUsageToday = -1,
		totalAvgDiskusageThisYear = -1,
		orgsDiskUsageToday = -1,


		

		orgsStorage = {},                   // Complete dump from API
		orgsStorageRecordsThisYear = {},    // Dump of this year

		orgsStorageTotals = {},             // org->storage per org
		globalStorageTodayMiB = 0,          // Size on disk as of last reading
		globalStorageMiBAvgThisYear = 0,    // Average disk usage this year (used for invoicing)
		XHR_DISKUSAGE,
		XHR_DISKUSAGE_THIS_YEAR;


	// Total storage used as per last read
	function totalDiskUsageTodayXHR() {
		if (totalDiskUsageToday == -1) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + "service/diskusage/",
					datatype: 'json'
				})
				.pipe(function (response) {
					totalDiskUsageToday = response.data;
					return totalDiskUsageToday;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>service/diskusage/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return totalDiskUsageToday;
	}

	// Average total diskusage throughout the current year
	function totalAvgDiskUsageThisYearXHR() {
		if (totalAvgDiskusageThisYear == -1) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + "service/diskusage/avg/",
					datatype: 'json'
				})
				.pipe(function (response) {
					totalAvgDiskusageThisYear = response.data;
					return totalAvgDiskusageThisYear;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>service/diskusage/avg/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return totalAvgDiskusageThisYear;
	}

	// Storage used per org as per last read
	function orgsDiskUsageTodayXHR() {
		if(orgsDiskUsageToday == -1) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + "admin/orgs/diskusage/",
					datatype: 'json'
				})
				.pipe(function (response) {
					orgsDiskUsageToday = response.data;
					return orgsDiskUsageToday;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>admin/orgs/diskusage/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return orgsDiskUsageToday;
	}




	// Autorun once
	/*
	 (function () {
	 XHR_DISKUSAGE_THIS_YEAR = _orgsStorageThisYear();
	 XHR_DISKUSAGE =  _orgsStorage();
	 //
	 $.when(XHR_DISKUSAGE).done(function (resultObj) {
	 orgsStorage = resultObj.data;
	 homeOrgStorageRecordsThisYear = _getDiskusageByOrg(DATAPORTEN.user().org.id);
	 orgsStorageTotals = _getOrgsStorageTotals();
	 });
	 //
	 $.when(XHR_DISKUSAGE_THIS_YEAR).done(function (data) {
	 orgsStorageRecordsThisYear = data.data;
	 });
	 })();
	 */





	function _orgsStorage() {
		return jso.ajax({
				url: jso.config.get("endpoints").mediasite + "diskusage",
				// oauth: { scopes: {require: ["gk_mediasiteapi", "gk_mediasiteapi_admin"], request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"]} },
				oauth: {scopes: {request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"]}},
				dataType: 'json'
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.alertError("Mediasite API (diskusage):", "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?");
				UTILS.showAuthError("Mediasite API (diskusage)", "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?.");
			});
	}

	/**
	 * Get orgs storage for current year.
	 */
	function _orgsStorageThisYear() {
		return jso.ajax({
				url: jso.config.get("endpoints").mediasite + "diskusage/year/" + new Date().getUTCFullYear(),
				// oauth: { scopes: {require: ["gk_mediasiteapi", "gk_mediasiteapi_admin"], request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"]} },
				oauth: {scopes: {request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"]}},
				dataType: 'json'
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.alertError("Mediasite API (year):", "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?.");
				UTILS.showAuthError("Mediasite API (year)", "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?.");
			});
	}

	function avgStorageMiBThisYearOrg(org) {
		org = UTILS.mapFeideOrgToMediasiteFolder(org);
		var avgStorage = 0;

		$.each(orgsStorageRecordsThisYear, function (index, orgObj) {
			if (org === orgObj.org.toLowerCase()) {
				var totalStorage = 0;
				$.each(orgObj.storage, function (entry, storageObj) {
					totalStorage += storageObj.size_mib;
				});
				avgStorage = totalStorage / orgObj.storage.length;
				// We got what we came for, break the loop
				return false;
			}
		});
		return avgStorage;
	}

	function avgStorageMiBThisYearAll() {
		if (globalStorageMiBAvgThisYear !== 0) return globalStorageMiBAvgThisYear;
		// Loop each org
		$.each(orgsStorageRecordsThisYear, function (index, orgObj) {
			var totalStorage = 0;
			// Loop org's storage history
			$.each(orgObj.storage, function (entry, storageObj) {
				// Add up
				totalStorage += storageObj.size_mib;
			});
			// Get org's average
			globalStorageMiBAvgThisYear += totalStorage / orgObj.storage.length;
		});
		return globalStorageMiBAvgThisYear;
	}


	return {
		init: function () {
			init();
		},
		ready: function () {
			return XHR_DISKUSAGE;
		},

		totalDiskUsageXHR: function () {
			return totalDiskUsageTodayXHR();
		},

		totalAvgDiskUsageXHR: function () {
			return totalAvgDiskUsageThisYearXHR();
		},

		orgsDiskUsageTodayXHR: function () {
			return orgsDiskUsageTodayXHR();
		},

		homeOrgStorageRecordsThisYearXHR: function () {
			return homeOrgStorageRecordsThisYearXHR();
		},

		// Dump /diskusage
		orgsStorage: function () {
			return orgsStorage;
		},
		// /diskusage/year/{year}
		orgsStorageThisYear: function () {
			return orgsStorageRecordsThisYear;
		},
		avgStorageMiBThisYearAll: function () {
			return avgStorageMiBThisYearAll();
		},
		avgStorageMiBThisYearOrg: function (org) {
			return avgStorageMiBThisYearOrg(org);
		},
		// { org: 000.00, ... }
		orgsStorageTotals: function () {
			return orgsStorageTotals;
		},
		globalStorageMiB: function () {
			return globalStorageTodayMiB;
		},
		storageCostTB: function () {
			return STORAGE_COST_PER_TB;
		},
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






