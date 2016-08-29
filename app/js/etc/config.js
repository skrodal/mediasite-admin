
var CONFIG = (function () {

	var STORAGE_COST_PER_TB = 12000;        // Default on app load
	var MIN_DIFF_STORAGE_THRESHOLD = 100;   // Min. variation in storage for adding a new plot on graphs

	// When Org ID is not the same as folder name
	var orgToFolderMap =
	{
		"oslo-universitetssykehus": "medinfo",
		"c-k": "ck",
		//"???": "kth",
		//"kristiania": "???",

	};

	// Reverse the above
	var folderToOrgMap =
	{
		"medinfo": "oslo-universitetssykehus",
		"ck": "c-k",
		//"kth": "???"
		//"???": "kristiania"
	};


	return {
		minDiffStorageThreshold: function(){
			return MIN_DIFF_STORAGE_THRESHOLD;
		},
		defaultStorageCostPerTB: function(){
			return STORAGE_COST_PER_TB;
		},
		folderToOrgMap: function(){
			return folderToOrgMap;
		},
		orgToFolderMap: function(){
			return orgToFolderMap;
		},
	}
})();