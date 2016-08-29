
var MENU = (function() {

	function init() {
		_showMenuItems();
	}

	function _showMenuItems() {
		// Always
		$('li#menuDashboard').removeClass('hidden').fadeIn();
		$('li#menuDashboard').trigger('click');

		if(MEDIASITE.userRole().isSuperAdmin) {
			$('li#menuOrgAdmin').removeClass('hidden').fadeIn();
			$('li#menuSuperAdmin').removeClass('hidden').fadeIn();
			ORG_ADMIN.init();
			SUPER_ADMIN.init();
			return;
		}
		if (MEDIASITE.userRole().isOrgAdmin){
			ORG_ADMIN.init();
			$('li#menuOrgAdmin').removeClass('hidden').fadeIn();
		}
	}

	// The menu
	var $sidebarMenu = $('#sidebar-menu');
	// Handle menu actions
	$sidebarMenu.on('click', 'li', function(){
		// Make clicked li style active
		$(this).addClass('active').siblings().removeClass("active");
		// Hide all pages
		$('section.app_page').addClass('hidden');
		// Show selected page
		$('section#' + $(this).data('page')).removeClass('hidden').hide().fadeIn();
		//
		switch($(this).data('page')) {
			case 'pageDashboard':
				// Show
				DASHBOARD.show();
				// Hide
				SUPER_ADMIN.hide();
				ORG_ADMIN.hide();
				break;
			case 'pageSuperAdmin':
				// Show
				SUPER_ADMIN.show();
				// Hide
				ORG_ADMIN.hide();
				DASHBOARD.hide();
				break;
			case 'pageOrgAdmin':
				// Show
				ORG_ADMIN.show();
				// Hide
				DASHBOARD.hide();
				SUPER_ADMIN.hide();
				break;
		}
	});

	return {
		init: function() {
			init();
		}
	}
})();
