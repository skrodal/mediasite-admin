var APP = (function() {


	//
	$(document).ready(function () {
		// User/groups first, then Kind (depends on readyUser)
		$.when(FEIDE_CONNECT.readyUser(), FEIDE_CONNECT.readyGroups()).done( function (){
			$.when(KIND.ready()).done(function () {
				// Wait for Mediasite calls to complete...
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
		$('.userFirstName').html(' ' + FEIDE_CONNECT.user().name.first);
		$('.userFullName').html(' ' + FEIDE_CONNECT.user().name.full);
		$('.userRole').html(' ' + KIND.getRole());
		$('.feideOrg').html(' ' + FEIDE_CONNECT.user().org.name);
		var affiliation = FEIDE_CONNECT.user().affiliation == "employee" ? "Ansatt" : "Student";
		$('.feideAffiliation').html(' ' + affiliation);
		$('.userImage').attr('src', FEIDE_CONNECT.user().photo);
		// Org/subscription=specific
		$('.subscribersCount').html(KIND.subscriptionCount().full);
		$('.subscribersTrialCount').html(KIND.subscriptionCount().trial);
		$('.subscribersOtherCount').html(KIND.subscriptionCount().other);
		$('.subscribersTotalCount').html(KIND.subscriptionCount().total);
		// Invoicing
//		$('.storageCostPerTB').html(MEDIASITE.storageCostTB());
		// Dev
		$('#connectSessionInfo').text(JSON.stringify(FEIDE_CONNECT.user(), undefined, 2));
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