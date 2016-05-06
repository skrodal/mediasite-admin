var APP = (function () {


	//
	$(document).ready(function () {
		// User/groups first, then Kind (depends on readyUser)
		$.when(DATAPORTEN.readyUser(), DATAPORTEN.readyGroups()).done(function () {
			$.when(KIND.ready()).done(function () {
				DASHBOARD.init();
				MENU.init();
				updateUserUI();
			});
		});
	});


	/**
	 * Update UI here and there...
	 */
	function updateUserUI() {
		// Populate public Mediasite
		updateMediasiteData();

		if (KIND.isOrgAdmin()) {
			$('.dashInfoForAdmins').html('<p>' + DATAPORTEN.user().name.first + ', du er <b>Org</b>Admin for <code>' + DATAPORTEN.user().org.name + '</code>!</p><p> Bruk menyen til venstre for å hente mer informasjon.</p>');
		}
		if (KIND.isSuperAdmin()) {
			$('.dashInfoForAdmins').html('<p>' + DATAPORTEN.user().name.first + ', du er <b>Super</b>Admin for hele skiten <i class="icon ion-beer"></i></p><p>Bruk menyen til venstre for å hente mer detaljert informasjon.</p>');
		}

		// User-specific
		$('.userFirstName').html(' ' + DATAPORTEN.user().name.first);
		$('.userFullName').html(' ' + DATAPORTEN.user().name.full);
		$('.userRole').html(' ' + KIND.getRole());
		$('.feideOrg').html(' ' + DATAPORTEN.user().org.name);
		var affiliation = DATAPORTEN.user().affiliation == "employee" ? "Ansatt" : "Student";
		$('.feideAffiliation').html(' ' + affiliation);
		$('.userImage').attr('src', DATAPORTEN.user().photo);
		// Org/subscription=specific
		$('.subscribersCount').html(KIND.subscriptionCount().full);
		$('.subscribersTrialCount').html(KIND.subscriptionCount().trial);
		$('.subscribersOtherCount').html(KIND.subscriptionCount().other);
		$('.subscribersTotalCount').html(KIND.subscriptionCount().total);
		// Invoicing
		$('.storageCostPerTB').html(MEDIASITE.storageCostTB());
		// Dev
		$('#dataportenSessionInfo').text(JSON.stringify(DATAPORTEN.user(), undefined, 2));
		// Show top logout dropdown
		$('#userMenu').fadeIn().removeClass('hidden');
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


/*
 // SUPER ADMIN
 if (is_super_admin) {
 org_active_subscribers = getActiveSubscribersCount(SUBSCRIBERS_KIND_ARR);
 buildSubscribersTable(SUBSCRIBERS_KIND_ARR);
 populateSubscribersDropdown(SUBSCRIBERS_KIND_ARR);
 }
 */