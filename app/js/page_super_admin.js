/**
 * SUPER_ADMIN has all data available upon init() - loaded by app_menu.js.
 */

var SUPER_ADMIN = (function () {
	// CHART
	var chartOrgsUsagePie = false; // The Chart instance
	var chartOrgUsageLine = false; // The Chart instance
	// SUBSCRIBERS TABLE
	var orgSubscribersTable;        // The DataTable instance
	// Selected org for stats/chart
	var SELECTED_ORG = "";
	var SELECTED_ORG_RECORDED_DATES_NUM = 0;

	function init() {

		orgSubscribersTable = _buildOrgSubscribersTable(KIND.subscribers());
		SELECTED_ORG = FEIDE_CONNECT.user().org.shortname
		$('#orgToFolderMap').html(JSON.stringify(UTILS.orgToFolderMap(), null, 4));
	};

	function _updateUI() {
		$('ul#orgListSuperAdmin').html('');
		// Drop-down for Line Chart
		$.each(KIND.subscribingOrgNames(), function (index, org) {
			$('ul#orgListSuperAdmin').append('<li class="orgLineChartSelector" style="cursor: pointer;" data-org="' + org.split('.')[0] + '">' + org + '</li>');
		});

		var feideOrgID = UTILS.mapMediasiteFolderToFeideOrg(SELECTED_ORG);

		// Selected from drop-down
		$('#pageSuperAdmin').find('.selectedOrg').text(feideOrgID);
		// Number of dates available in org's storage history (max 30 days)
		$('#pageSuperAdmin').find('.selectedOrgRecordedDatesNum').text(SELECTED_ORG_RECORDED_DATES_NUM);
		// Calculator
//		$('#pageSuperAdmin').find('#inputCostTB').val(MEDIASITE.storageCostTB());
		// All fields referring to cost defined by calculator
//		$('#pageSuperAdmin').find('.costTB').text("kr. " + MEDIASITE.storageCostTB());
		// On disk as of last reading (total)
//		$('#pageSuperAdmin').find('.subscribersDiskusageTotal').text(UTILS.mib2tb(MEDIASITE.globalStorageMiB()).toFixed(2) + "TB");
		// The average usage this year
//		$('#pageSuperAdmin').find('.subscribersDiskusageAvgThisYear').text(UTILS.mib2tb(MEDIASITE.avgStorageMiBThisYearAll()).toFixed(2) + "TB");
		// Total invoiceable amount, based on average storage consumption this year
//		$('#pageSuperAdmin').find('.totalAvgStorageCostEstimate').text("kr. " + (UTILS.mib2tb(MEDIASITE.avgStorageMiBThisYearAll()) * MEDIASITE.storageCostTB()).toFixed());

		// QuickStats below line graph
//		var orgTotalStorageMiB = MEDIASITE.orgsStorageTotals()[SELECTED_ORG];
//		var orgStoragePercentageGlobal = (orgTotalStorageMiB / MEDIASITE.globalStorageMiB()) * 100;
//		var orgAvgStorageMiB = MEDIASITE.avgStorageMiBThisYearOrg(SELECTED_ORG);
//		var orgTotalStoragePercentageOfOrgAvg = (orgAvgStorageMiB / orgTotalStorageMiB) * 100;

//		$('#pageSuperAdmin').find('.orgTotalStorage').text(UTILS.mib2tb(orgTotalStorageMiB).toFixed(2) + " TB");
//		$('#pageSuperAdmin').find('.orgStoragePercentageGlobal').text(orgStoragePercentageGlobal.toFixed(2));
//		$('#pageSuperAdmin').find('.orgAvgStorageThisYear').text(UTILS.mib2tb(orgAvgStorageMiB).toFixed(2) + " TB");
		// Avg storage is greater than today's storage use
//		if (orgTotalStoragePercentageOfOrgAvg > 100) {
//			$('#pageSuperAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
//		} else {
//			$('#pageSuperAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-red"><i class="fa fa-caret-down"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
//		}

		$('#pageSuperAdmin').find('.orgSubscriptionStatus').html('<span class="label bg-' + KIND.subscriptionCodesToColors()[KIND.getOrgSubscriptionStatusCode(feideOrgID)] + '">' + KIND.subscriptionCodesToNames()[KIND.getOrgSubscriptionStatusCode(feideOrgID)] + '</span>');

//		$('#pageSuperAdmin').find('.orgInvoiceEstimateThisYear').text("kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed());
	}

	function onShowListener() {
		chartOrgsUsagePie = _buildOrgsDiskusagePieChart();
		chartOrgUsageLine = _buildOrgDiskusageLineChart(SELECTED_ORG);
		_updateUI();
	}

	function onHideListener() {
		_destroyOrgsDiskusagePieChart();
		_destroyOrgDiskusageLineChart();
	}


	/** ----------------- PIE CHART ----------------- **/

	function _buildOrgsDiskusagePieChart() {
		_destroyOrgsDiskusagePieChart();
		var orgsUsageChartData = [];

		//$.each(MEDIASITE.orgsStorageTotals(), function (org, storage) {
		//	// Chart prefs and data
		//	orgsUsageChartData.push({
		//		value: +UTILS.mib2tb(storage).toFixed(2),
		//		color: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
		//		highlight: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
		//		label: org
		//	});
		//});

		var ctx = document.getElementById("chartOrgsUsagePieSuperAdmin").getContext("2d");
		return new Chart(ctx).Pie(orgsUsageChartData, {
			legendTemplate: "<% for (var i=0; i<segments.length; i++){%>" +
				"<tr>" +
				"<td style='background-color:<%=segments[i].fillColor%>'></td>" +
				//"<td><%if(segments[i].label){%> <%=segments[i].label%> <%}%></td>" +
				//"<td><%if(segments[i].value){%> <%=segments[i].value%> <%}%></td>" +
				"<td><%=segments[i].label%></td>" +
				"<td><%=segments[i].value%></td>" +
				"<% i = i+1; %> <%if(i<segments.length){%>" +
				"<td style='background-color:<%=segments[i].fillColor%>'></td>" +
				"<td><%=segments[i].label%></td>" +
				"<td><%=segments[i].value%></td>" +
				"<%}%>" +
				"</tr>" +
				"<%}%>"
		});
	}

	function _destroyOrgsDiskusagePieChart() {
		if (chartOrgsUsagePie !== false) {
			chartOrgsUsagePie.destroy();
			chartOrgsUsagePie = false;
		}
	}

	// Update line chart on click on pie
	$("#chartOrgsUsagePieSuperAdmin").on('click', function(evt){
		var activePoints = chartOrgsUsagePie.getSegmentsAtEvent(evt);
		//console.log(activePoints);
		chartOrgUsageLine = _buildOrgDiskusageLineChart(activePoints[0].label, activePoints[0]._saved.fillColor); // Label is org name :-)
		_updateUI();
	});


	/** ----------------- ./ PIE CHART ----------------- **/

	/** ----------------- LINE CHART ----------------- **/

	$('ul#orgListSuperAdmin').on('click', 'li.orgLineChartSelector', function () {
		chartOrgUsageLine = _buildOrgDiskusageLineChart($(this).data('org'));
		_updateUI();
	});

	function _buildOrgDiskusageLineChart(org, fillColor) {
		var orgUsageChartData = [];
		var selectedOrg = false;

		fillColor = typeof fillColor !== 'undefined' ? fillColor : '#' + (Math.random().toString(16) + '0000000').slice(2, 8);

		org = UTILS.mapFeideOrgToMediasiteFolder(org);

		// Find selected org's data
		//$.each(MEDIASITE.orgsStorage(), function (index, data) {
		//	if (data.org.toLowerCase() === org.toLowerCase()) {
		//		selectedOrg = data.org;
		//		// "Clone" since we will be reversing and shit later on
		//		orgUsageChartData.storage = JSON.parse(JSON.stringify(data.storage));
		//		return false;
		//	}
		//});
		// Sanity check
		if (!selectedOrg) {
			UTILS.alertError('Fant ikke data for <code>' + org + '</code>', 'Fant ikke noe data for organisasjonen du valgte. Dette betyr mest sannsynlig at org-navn i Mediasite folder ikke er det samme som det vi hentet fra Kind eller at abonnenten benytter lokal lagring.');
			return false;
		}
		_destroyOrgDiskusageLineChart();
		SELECTED_ORG = selectedOrg;

		// Max 30 days
		var daysToShow = 30;
		var counter = daysToShow;
		var labels = [];
		var data = [];
		// Start from most recent date and count backwards in time
		orgUsageChartData.storage.reverse();
		//
		$.each(orgUsageChartData.storage, function (index, storage) {
			var date = new Date(storage.date.replace(/-/g, "/"));   // replace hack seems to fix Safari issue...
			// Chart labels and data
			labels.push(date.getUTCDate() + '.' + date.getUTCMonth() + '.' + date.getUTCFullYear());      // Add label
			data.push(UTILS.mib2gb(storage.size_mib).toFixed(2));    // And value
			counter--;
			if (counter == 0) return false;
		});
		// In case there exist less than 30 days worth of data
		SELECTED_ORG_RECORDED_DATES_NUM = daysToShow - counter;
		// Reverse back so we get most recent date last
		data.reverse();
		labels.reverse();
		// Build dataset
		var lineChartData = {
			labels: labels,
			datasets: [
				{
					label: "Diskforbruk siste " + data.length + ' dager',
					fillColor: fillColor,
					strokeColor: "#666",
					pointColor: "#fff",
					pointStrokeColor: "#666",
					pointHighlightFill: "#285C85",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: data
				}
			]
		};



		var ctx = document.getElementById("orgUsageLineChartSuperAdmin").getContext("2d");
		return new Chart(ctx).Line(lineChartData,
			{
				showScale: true,
				scaleShowGridLines: false,
				scaleShowHorizontalLines: true,
				scaleShowVerticalLines: true,
				bezierCurve: true,
				bezierCurveTension: 0.3,
				pointDot: true,
				pointDotRadius: 4,
				pointDotStrokeWidth: 1,
				pointHitDetectionRadius: 5,
				datasetStroke: true,
				datasetStrokeWidth: 2,
				datasetFill: true,
				maintainAspectRatio: false
			}
		);
	}

	function _destroyOrgDiskusageLineChart() {
		if (chartOrgUsageLine !== false) {
			chartOrgUsageLine.destroy();
			chartOrgUsageLine = false;
		}
	}

	// Update chart color
	$("#orgUsageLineChartSuperAdmin").on('click', function(evt){
		chartOrgUsageLine.datasets[0].fillColor = '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
		chartOrgUsageLine.update();
	});

	/** ----------------- ./ LINE CHART ----------------- **/

	/**
	 *
	 * @param subscribersArr
	 */
	function _buildOrgSubscribersTable(subscribers) {
		// Clone the array so as to not modify passed original
		subscribers = JSON.parse(JSON.stringify(subscribers));

		// Before passing dataset to table - add storage consumption per org
		var orgAvgMiB = 0;
		$.each(subscribers, function (org, orgObj) {
			// Get avg storage for org this year
//			orgAvgMiB = MEDIASITE.avgStorageMiBThisYearOrg(UTILS.mapFeideOrgToMediasiteFolder(orgData[0].org.split('.')[0]));

			// Get org from Kind array, map to corresponding Mediasite org and add storage to the end of the Kind array
			//orgObj[orgObj.length] =
			//{
			//	storage: {
			//		mib: MEDIASITE.orgsStorageTotals()[UTILS.mapFeideOrgToMediasiteFolder(orgObj[0].org.split('.')[0])],
			//		tb: (UTILS.mib2tb(MEDIASITE.orgsStorageTotals()[UTILS.mapFeideOrgToMediasiteFolder(orgObj[0].org.split('.')[0])])).toFixed(2),
			//		percentage: ( (MEDIASITE.orgsStorageTotals()[UTILS.mapFeideOrgToMediasiteFolder(orgObj[0].org.split('.')[0])] / MEDIASITE.globalStorageMiB()) * 100 ).toFixed(),
			//		cost: (UTILS.mib2tb(orgAvgMiB) * MEDIASITE.storageCostTB()).toFixed()
			//	}
			//};
		});

		var table = $('#pageSuperAdmin').find('#subscribersTableSuperAdmin').DataTable({
			"language": dataTablesLanguage,
			"bAutoWidth": true,
			"sDom": 'T<"clear">lfrtip',
			"oTableTools": {
				"sSwfPath": "dist/plugins/datatables/tabletools/swf/copy_csv_xls_pdf.swf",
				"aButtons": [
					{
						"sExtends": "copy",
						"sButtonText": "Kopier"
					},
					// Drop-down
					{
						"sExtends": "collection",
						"sButtonText": "Lagre",
						"aButtons": [
							{
								"sExtends": "pdf",
								"sPdfOrientation": "landscape",
								"sTitle": "Mediasite_Abonnenter"
							},
							{
								"sExtends": "xls",
								"sButtonText": "Excel (.csv)",
								"sTitle": "Mediasite_Abonnenter"
							}
						]
					}
				]
			},
			"data": subscribers,
			"columns": [
				{
					"data": "org_id",
					"render": function (data, type, full, meta) {
						return full.org_id;
					}
				},
				{
					"data": "contact_person",
					"render": function (data, type, full, meta) {
						var contact;
						try {
							// TODO: POPUP WITH DETAILS
							contact = '<a class="icon ion-ios-email" href="mailto:' + (full.contact_person.e_post).toLowerCase() + '"> ' + full.contact_person.navn + '</a>';
						} catch (e) {
							contact = "<span class='label bg-red'>MANGLER!</span>";
						}
						return contact;
					}
				},
				{
					"data": "contact_support",
					"render": function (data, type, full, meta) {
						var support;
						try {
							if ((full.contact_support.e_post).indexOf('http') == -1) {
								support = '<a class="icon ion-ios-email" href="mailto:' + (full.contact_support.e_post).toLowerCase() + '"> ' + full.contact_support.navn + '</a>';
							} else {
								support = '<a class="icon ion-android-open" href="' + (full.contact_support.e_post).toLowerCase() + '" target="_blank"> ' + full.contact_support.navn + '</a>';
							}
						} catch (e) {
							support = "<span class='label bg-red'>MANGLER!</span>";
						}
						return support;
					}
				},
				{
					"data": "storage",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return '<div class="progress no-margin">' +
							'<div class="progress-bar bg-gray tablePercentage" style="width: ' + 'N/A' + '%">' + 'N/A' + '</div>' +
							'</div>';
						// return full[0].org;
					}
				},
				{
					"data": "storage",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return '<span class="text-muted">' + 'N/A' + 'kr</span>';
					}
				},
				{
					"data": "subscription_code",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return "<span class='label bg-" + KIND.subscriptionCodesToColors()[full.subscription_code] + "'>" + KIND.subscriptionCodesToNames()[full[1].abbstatus] + "</span>";
					}
				}
			]
		});
		$('#subscribersTableBoxSuperAdmin').find('.ajax').hide();
		return table;
	}

	/**
	 * Email export modal, displaying either contacts or supports depending on which button was clicked
	 */
	function _showEmailExportModal(btn) {
		var $btnClicked = btn;
		// Add group name to modal title
		$('#emailExportModal').find('#emailExportTargetGroup').html($btnClicked.data("exportGroup"));
		var emailList = [];
		var tmpContact = "";
		var nonEmailList = {'count': 0, 'orgs': ''};
		var contactObj;

		$.each(KIND.subscribers(), function (org, orgObj) {
			// Teknisk ansvarlig or support?
			contactObj = $btnClicked.data("exportGroup") == 'kontaktpersoner' ? orgObj.contact_person : orgObj.contact_support;
			//
			if (contactObj !== null && (orgObj.subscription_code == 20 || orgObj.subscription_code == 15)) {
				if (contactObj.e_post !== null && contactObj.e_post.indexOf('http') == -1) {
					tmpContact = '<' + contactObj.e_post.trim() + '>';
					if (contactObj.navn !== null) {
						tmpContact = contactObj.navn.trim() + ' ' + tmpContact;
					}
					emailList.push(tmpContact);

				} else {
					nonEmailList.count++;
					nonEmailList.orgs += "<span class='label bg-red'>" + orgObj.org_id + "</span> ";
				}
			} else {
				nonEmailList.count++;
				nonEmailList.orgs += "<span class='label bg-red'>" + orgObj.org_id + "</span> ";
			}
		});
		// Badge number in modal title
		$('#emailExportModal').find('#emailExportCount').html(emailList.length);
		// TextArea
		$('#emailExportModal').find('#emailExportList').html(emailList.toString());
		// Missing contact email adress
		if (nonEmailList.count > 0) {
			$('#emailExportModal').find('#emailMissing').html("<span class='badge bg-red'>" + nonEmailList.count + "</span> mangler kontaktadresse: " + nonEmailList.orgs);
		}
	}

	// Trigger modal
	$('.email_export').on('click', function () {
		_showEmailExportModal($(this));
	});


	/**
	 * Update cost column when calc-button is pressed
	 */
	function _setInvoiceEstimate() {
		var cost_tb = $('#pageSuperAdmin').find('#inputCostTB').val();
		// Returns error if not a number
		if (MEDIASITE.setStorageCost(cost_tb)) {
			_updateUI();
			// Rebuild the table
			orgSubscribersTable.destroy();
			orgSubscribersTable = _buildOrgSubscribersTable(KIND.subscribers());
		}
	}

	$('#pageSuperAdmin #btnInvoiceCalc').on('click', _setInvoiceEstimate);


	return {
		init: function () {
			return init();
		},
		hide: function () {
			onHideListener();
		},
		show: function () {
			onShowListener();
		}
	}

})();











