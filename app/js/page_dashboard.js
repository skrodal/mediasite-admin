var DASHBOARD = (function() {
	// Pie chart
	var pieOrgsDiskusageDashboard = false;          // The Chart instance

	function init() {
		_buildOrgsTableDashboard(KIND.subscribers(), DATAPORTEN.user());
	}

	/**
	 * Draw/display things when page is finally visible (called by app_menu.js on show).
	 *
	 * Solves specific problem with Charts, as these will not draw on hidden DOM since
	 * size is then set to 0.
	 */
	function onShowListener() {
		$.when(MEDIASITE.serviceDiskusageListXHR()).done(function (data){
			pieOrgsDiskusageDashboard = _buildPieOrgsDiskusageDashboard(data);
		});
	}
	/**
	 * Destroy elements that can't be redrawn when hidden
	 */
	function onHideListener() {
		_destroyPieOrgsDiskusageDashboard();
	}


	// Build simple subscribers table from KIND data
	function _buildOrgsTableDashboard(subscribersArr, user){
		$('#subscriber_table_body').empty();
		var labelText = '---', labelColor = 'red';
		var rowClass;
		// Loop all subscribers
		$.each(subscribersArr, function (org, orgObj){
			rowClass = '';
			// Text/color for subscription status
			labelText = KIND.subscriptionCodesToNames()[orgObj.subscription_code];
			labelColor = KIND.subscriptionCodesToColors()[orgObj.subscription_code];
			// To highlight home org
			if(orgObj.org_id.toLowerCase() == user.org.id.toLowerCase()){ rowClass = 'active'; }
			// New row
			$('#subscriber_table_body').append(
				"<tr class='" + rowClass + "'>" +
					"<td>" + orgObj.org_id + "</td>" +
					"<td style='text-align: center;'><span class='label bg-" + labelColor + "'>" + labelText + "</span></td>" +
					"</tr>"
			);
		});
		//
		$('#subscribersTableBoxDashboard').find('.ajax').hide();
	}


	/**
	 * Simple pie chart with anonymous values. SuperAdmin gets the same,
	 * but with legend.
	 * @returns {*}
	 */
	function _buildPieOrgsDiskusageDashboard(data) {
		_destroyPieOrgsDiskusageDashboard();
		var orgNum = 0;
		var pieOrgsDiskusageDashboardData = {};
		pieOrgsDiskusageDashboardData.labels = [];
		pieOrgsDiskusageDashboardData.datasets = [];
		pieOrgsDiskusageDashboardData.datasets[0] = {};
		pieOrgsDiskusageDashboardData.datasets[0].data = [];
		pieOrgsDiskusageDashboardData.datasets[0].backgroundColor= [];
		pieOrgsDiskusageDashboardData.datasets[0].hoverBackgroundColor= [];
		//
		$.each(data, function(index, orgObj){
			// Chart prefs and data
			pieOrgsDiskusageDashboardData.labels.push('Org #' + orgNum++ + ' TB');
			pieOrgsDiskusageDashboardData.datasets[0].data.push(UTILS.mib2tb(orgObj).toFixed(2));
			pieOrgsDiskusageDashboardData.datasets[0].backgroundColor.push(UTILS.randomRGBA(0.6));
			pieOrgsDiskusageDashboardData.datasets[0].hoverBackgroundColor.push(UTILS.randomRGBA(1));
		});
		var ctx = $('#pieOrgsDiskusageDashboard');
		return new Chart(ctx,{
			type: 'pie',
			data: pieOrgsDiskusageDashboardData
		});
	}

	function _destroyPieOrgsDiskusageDashboard() {
		// PIE CHART, destroy if already present (to get the animation effect)
		if(pieOrgsDiskusageDashboard !== false) {
			pieOrgsDiskusageDashboard.destroy();
			pieOrgsDiskusageDashboard = false;
		}
	}

	return {
		init: function() {
			return init();
		},
		hide: function() {
			onHideListener();
		},
		show: function() {
			onShowListener();
		}
	}

})();
