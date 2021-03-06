var UTILS = (function () {
	// Constants
	var GB_to_TB = 0.001; // Used in MiB_to_GB to GB_to_TB conversion
	var MiB_to_GB = 0.001048576; // From MiB to MiB_to_GB
	var MiB_to_MB = 1.048576; // From Mib to MiB_to_MB

	/**** AUTH CYCLE ****/
	function updateAuthProgress(msg) {
		var w = parseInt($('#authProgressBar')[0].style.width.slice(0, -1));
		$('#authProgressBar').width(w + 34 + '%');
		$('#authProgressBar').text(msg);

		if ($('#authProgressBar')[0].style.width.slice(0, -1) > 100) {
			$('#pageLoading').fadeOut();
			//$('#pageDashboard').fadeIn().removeClass('hidden');
		}
	}

	function showAuthError(funcname, msg) {
		$('#authError').fadeIn().removeClass('hidden');
		$('#authErrorMsg').append("<p><code>" + funcname + ": " + JSON.stringify(msg, undefined, 2) + "</code></p>");
	}

	function alertError(title, message) {
		$('#error_modal').find('#title').html(title);
		$('#error_modal').find('#message').html(message);
		$('#error_modal').modal('show');
	}

	function mapFeideOrgToMediasiteFolder(org) {
		org = org.toLowerCase();
		return CONFIG.orgToFolderMap()[org] || org;
	}

	function mapMediasiteFolderToFeideOrg(folder) {
		folder = folder.toLowerCase();
		return CONFIG.folderToOrgMap()[folder] || folder;
	}

	function randomRGBA(transparency) {
		transparency = transparency ? transparency : 0.2;
		return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + transparency + ')';
	}

	/**
	 * Make the users JSON object more palatable for DataTables
	 * @param dataObject
	 * @returns {Array}
	 */
	function convertDataTablesData(dataObject) {
		var dataArray = [];
		$.each(dataObject, function (idx, obj) {
			dataArray.push($.extend(obj, {name: idx}));
		});
		return dataArray;
	}

	/*** Expose public functions ***/
	return {
		updateAuthProgress: function (msg) {
			updateAuthProgress(msg);
		},
		showAuthError: function (funcname, msg) {
			showAuthError(funcname, msg);
		},
		alertError: function (title, message) {
			alertError(title, message);
		},
		mapFeideOrgToMediasiteFolder: function (org) {
			return mapFeideOrgToMediasiteFolder(org);
		},
		mapMediasiteFolderToFeideOrg: function (folder) {
			return mapMediasiteFolderToFeideOrg(folder);
		},
		mib2mb: function (mib) {
			return mib * MiB_to_MB;
		},
		mib2gb: function (mib) {
			return mib * MiB_to_GB;
		},
		mib2tb: function (mib) {
			return (mib * MiB_to_GB) * GB_to_TB;
		},
		convertDataTablesData: function (dataObject) {
			return convertDataTablesData(dataObject);
		},
		randomRGBA: function (transparency) {
			return randomRGBA(transparency);
		}
	}
})();

