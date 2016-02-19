var MEDIASITE = (function () {
	var STORAGE_COST_PER_TB = 15000;

	var
		orgsStorage = {},                   // Complete dump from API
		orgsStorageThisYear = {},           // Dump of this year
		orgHomeStorage = [],                // Array with latest storage entries for logged on user's org (size_mib and date)
		orgsStorageTotals = {},             // org->storage per org
		globalStorageTodayMiB = 0,          // Size on disk as of last reading
		globalStorageMiBAvgThisYear = 0,    // Average disk usage this year (used for invoicing)
		XHR_DISKUSAGE,
		XHR_DISKUSAGE_THIS_YEAR;

	// Autorun once
/*
	(function () {
		XHR_DISKUSAGE_THIS_YEAR = _orgsStorageThisYear();
		XHR_DISKUSAGE =  _orgsStorage();
		//
		$.when(XHR_DISKUSAGE).done(function (resultObj) {
			orgsStorage = resultObj.data;
			orgHomeStorage = _getDiskusageByOrg(FEIDE_CONNECT.user().org.id);
			orgsStorageTotals = _getOrgsStorageTotals();
		});
		//
		$.when(XHR_DISKUSAGE_THIS_YEAR).done(function (data) {
			orgsStorageThisYear = data.data;
		});
	})();
*/

	function _getOrgsStorageTotals() {
		// Ensure we have data
		if (!$.isEmptyObject(orgsStorage) && $.isEmptyObject(orgsStorageTotals)) {
			globalStorageTodayMiB = 0;
			$.each(orgsStorage, function (index, value) {
				orgsStorageTotals[value.org] = value.storage[value.storage.length - 1].size_mib;
				globalStorageTodayMiB += orgsStorageTotals[value.org];
			});
		}
		return orgsStorageTotals;
	}

	function _getDiskusageByOrg(org) {
		// Populate only if needed/first time
		if (!$.isEmptyObject(orgsStorage)) {
			org = UTILS.mapFeideOrgToMediasiteFolder(org.split('.')[0]);
			var storage = false;
			$.each(orgsStorage, function (index, value) {
				if (value.org.toLowerCase() === org.toLowerCase()) {
					storage = value.storage;
					return false;
				}
			});
			if (storage) return storage;
		}
		UTILS.alertError('Fant ikke data for din organisasjon', 'Beklager! Fant ingen data for <code>' + org + '</code>. Dette betyr mest sannsynlig at org-navn i Mediasite folder ikke er det samme som det vi hentet fra Kind eller at din org benytter lokal lagring.');
		return [];
	}


	function _orgsStorage() {
		return jso.ajax({
			url: jso.config.get("endpoints").mediasite + "diskusage",
			// oauth: { scopes: {require: ["gk_mediasiteapi", "gk_mediasiteapi_admin"], request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"]} },
			oauth: { scopes: { request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"] } },
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
			oauth: { scopes: { request: ["gk_mediasiteapi", "gk_mediasiteapi_admin"] } },
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

		$.each(orgsStorageThisYear, function(index, orgObj){
			if(org === orgObj.org.toLowerCase()) {
				var totalStorage = 0;
				$.each(orgObj.storage, function(entry, storageObj){
					totalStorage += storageObj.size_mib;
				});
				avgStorage = totalStorage / orgObj.storage.length;
				// We got what we came for, break the loop
				return false;
			}
		});
		return avgStorage;
	}

	function avgStorageMiBThisYearAll(){
		if(globalStorageMiBAvgThisYear !== 0) return globalStorageMiBAvgThisYear;
		// Loop each org
		$.each(orgsStorageThisYear, function(index, orgObj){
				var totalStorage = 0;
				// Loop org's storage history
				$.each(orgObj.storage, function(entry, storageObj){
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
		// For single org
		orgHomeStorage: function () {
			return orgHomeStorage;
		},
		// Dump /diskusage
		orgsStorage: function () {
			return orgsStorage;
		},
		// /diskusage/year/{year}
		orgsStorageThisYear: function () {
			return orgsStorageThisYear;
		},
		avgStorageMiBThisYearAll: function(){
			return avgStorageMiBThisYearAll();
		},
		avgStorageMiBThisYearOrg: function(org){
			return avgStorageMiBThisYearOrg(org);
		},
		// { org: 000.00, ... }
		orgsStorageTotals: function () {
			return orgsStorageTotals;
		},
		globalStorageMiB: function () {
			return globalStorageTodayMiB;
		},
		storageCostTB : function(){
			return STORAGE_COST_PER_TB;
		},
		setStorageCost : function(cost) {
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






