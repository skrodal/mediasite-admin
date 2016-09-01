var APP = (function () {

	/**
	 * Entry point after loading is done and dusted.
	 *
	 * Run once only.
	 */
	$(document).ready(function () {
		// User/groups first, then Kind (depends on readyUser)
		$.when(DATAPORTEN.readyUser(), DATAPORTEN.readyGroups()).done(function () {
			$.when(KIND.ready()).done(function () {
				DASHBOARD.init();
				// MS is ready when user role is fetched from the API
				$.when(MEDIASITE.ready()).done(function () {
					MENU.init();
					updateUserUI();
				});
			});
		});
	});


	/**
	 * Update UI here and there...
	 */
	function updateUserUI() {
		// Populate public Mediasite
		updateMediasiteData();

		if (MEDIASITE.userRole().isOrgAdmin) {
			$('.dashInfoForAdmins').html('<h4>Hey ' + DATAPORTEN.user().name.first + ', du er <b>Org</b>Admin for <code>' + DATAPORTEN.user().org.name + '</code></h4><p> Bruk menyen til venstre for å hente mer informasjon.</p>');
		}
		if (MEDIASITE.userRole().isSuperAdmin) {
			$('.dashInfoForAdmins').html('<h4>Hey ' + DATAPORTEN.user().name.first + ', du er <b>Super</b>Admin</h4><p>Bruk menyen til venstre for å hente mer detaljert informasjon.</p>');
		}
		$('.defaultStorageCostPerTB').text(CONFIG.defaultStorageCostPerTB());
		// User-specific
		$('.userFirstName').html(' ' + DATAPORTEN.user().name.first);
		$('.userFullName').html(' ' + DATAPORTEN.user().name.full);
		$('.userRole').html(' ' + MEDIASITE.userRole().title);
		$('.feideOrg').html(' ' + DATAPORTEN.user().org.name);
		var affiliation = DATAPORTEN.user().affiliation == "employee" ? "Ansatt" : "Student";
		$('.feideAffiliation').html(' ' + affiliation);
		$('.userImage').attr('src', DATAPORTEN.user().photo);
		// Org/subscription=specific
		$('.subscribersCount').html(KIND.subscriptionCount().full);
		$('.subscribersTrialCount').html(KIND.subscriptionCount().trial);
		$('.subscribersOtherCount').html(KIND.subscriptionCount().other);
		$('.subscribersTotalCount').html(KIND.subscriptionCount().total);
		$.when(MEDIASITE.serviceDiskusageListXHR()).done(function (list) {
			$('.foldersWithNoKindSubscriptionTotalCount').html(list.length - KIND.subscriptionCount().full);
		});

		// Dev
		$('#dataportenSessionInfo').text(JSON.stringify(DATAPORTEN.user(), undefined, 2));
		// Show top logout dropdown
		$('#userMenu').fadeIn().removeClass('hidden');
		// Update references to threshold used for making a new plot on diskusage charts
		$('.minDiffStorageThreshold').html(CONFIG.minDiffStorageThreshold());
	}

	function updateMediasiteData() {

		$.when(MEDIASITE.homeOrgDiskusageTotalXHR()).done(function (storage_mib) {
			$('.homeOrgDiskusage').text(UTILS.mib2tb(storage_mib).toFixed(2) + "TB");
		});
		//
		$.when(MEDIASITE.serviceDiskusageTotalXHR()).done(function (storage) {
			$('.subscribersDiskusageTotal').html(UTILS.mib2tb(storage).toFixed(2) + "TB");
		});

	}
})();