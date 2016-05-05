var MEDIASITE_ADMIN = (function () {


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
	
})();
