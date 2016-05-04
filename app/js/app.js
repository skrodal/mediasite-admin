var APP = (function() {


	//
	$(document).ready(function () {
		// User/groups first, then Kind (depends on readyUser)
		$.when(DATAPORTEN.readyUser(), DATAPORTEN.readyGroups()).done( function (){
			$.when(KIND.ready()).done(function () {
				// Wait for Mediasite calls to complete...

				MEDIASITE.test();

//				$.when(MEDIASITE.ready()).done(function (){
					// Populate dashboard with Mediasite ajax data and Feide/Kind info
					DASHBOARD.init();
					//
					MENU.init();
//				});
				//
				updateUserUI();
			});
		});
	});


	/**
	 * Update UI here and there...
	 */
	function updateUserUI() {
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
//		$('.storageCostPerTB').html(MEDIASITE.storageCostTB());
		// Dev
		$('#dataportenSessionInfo').text(JSON.stringify(DATAPORTEN.user(), undefined, 2));
		// Show top logout dropdown
		$('#userMenu').fadeIn().removeClass('hidden');
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