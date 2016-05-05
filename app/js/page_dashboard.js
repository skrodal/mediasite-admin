var DASHBOARD = (function() {
	// Pie chart
	var chartOrgsUsageDashboard = false;          // The Chart instance

	function init() {
		buildOrgsTableDashboard(KIND.subscribers(), DATAPORTEN.user());
//		$('.subscribersDiskusageTotal').html(UTILS.mib2tb(MEDIASITE.globalStorageMiB()).toFixed(2) + "TB");
//		$('.homeOrgDiskusage').text(UTILS.mib2tb(MEDIASITE.orgHomeStorage()[MEDIASITE.orgHomeStorage().length-1].size_mib).toFixed(2)+"TB");
	}

	function buildOrgsTableDashboard(subscribersArr, user){
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
	function buildOrgsDiskusagePieChart(data) {
		_destroyPieChart();
		var orgsDiskUsageChartData = [];
		$.each(data, function(index, orgObj){
			// Chart prefs and data
			orgsDiskUsageChartData.push({
				//value: (Math.floor(Math.random() * 100) + 1),
				value: +UTILS.mib2tb(orgObj.storage_mib).toFixed(2),
				color:'#'+(Math.random().toString(16) + '0000000').slice(2, 8),
				highlight: '#'+(Math.random().toString(16) + '0000000').slice(2, 8),
				label: ""
			});
		});
		var ctx = document.getElementById("chartOrgsDiskusageDashboard").getContext("2d");
		return new Chart(ctx).Pie(orgsDiskUsageChartData, {});
	}

	/**
	 * Draw/display things when page is finally visible (called by app_menu.js on show).
	 *
	 * Solves specific problem with Charts, as these will not draw on hidden DOM since
	 * size is then set to 0.
	 */
	function onShowListener() {
		$.when(MEDIASITE.orgsDiskUsageTodayXHR()).done(function (data){
			chartOrgsUsageDashboard = buildOrgsDiskusagePieChart(data);
			$.each(data, function(index, orgObj){
				if(orgObj.org == DATAPORTEN.user().org.shortname){
					$('.homeOrgDiskusage').text(UTILS.mib2tb(orgObj.storage_mib).toFixed(2)+"TB");
				}
			});
		});
	}

	/**
	 * Destroy elements that can't be redrawn when hidden
	 */
	function onHideListener() {
		_destroyPieChart();
	}

	function _destroyPieChart() {
		// PIE CHART, destroy if already present (to get the animation effect)
		if(chartOrgsUsageDashboard !== false) {
			chartOrgsUsageDashboard.destroy();
			chartOrgsUsageDashboard = false;
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
