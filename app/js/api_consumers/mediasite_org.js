var MEDIASITE_ORG = (function () {
	var
		storageRecordsThisYear = []; // Array with daily storage objects (org, storage_mib, timestamp)


	// Storage array for home org
	function storageRecordsThisYearXHR() {
		if (storageRecordsThisYear.length == 0) {
			return DP_AUTH.jso().ajax({
					url: DP_AUTH.config().api_endpoints.mediasite + "org/" + DATAPORTEN.user().org.shortname + "/diskusage/",
					datatype: 'json'
				})
				.pipe(function (response) {
					storageRecordsThisYear = response.data;
					return storageRecordsThisYear;
				})
				.fail(function (jqXHR, textStatus, error) {
					var title = "Mediasite API — <code>org/" + DATAPORTEN.user().org.shortname + "/diskusage/</code>";
					var message = "Mediasite API avslo foresp&oslash;rselen - manglende rettigheter?."
					UTILS.alertError(title, message);
					UTILS.showAuthError(title, message);
				});
		}
		return storageRecordsThisYear;
	}




	return {

		totalStorage: function(){
			var data = storageRecordsThisYearXHR();
			return parseInt(data[data.length-1].storage_mib);
		},
		avgStorageThisYear: function () {
			var total = 0;
			$.each(storageRecordsThisYearXHR(), function(index, storageObj){
				total +=  parseInt(storageObj.storage_mib);
			});
			return total / storageRecordsThisYearXHR().length;
		},
		storageRecordsThisYearXHR: function () {
			return storageRecordsThisYearXHR();
		},

	}
})();


