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
		// Use average storage data in table
		$.when(MEDIASITE_ADMIN.orgsDiskusageAvgListXHR()).done(function (storageData) {
			orgSubscribersTable = _buildOrgSubscribersTable(storageData);
		});

		SELECTED_ORG = DATAPORTEN.user().org.shortname;
		$('#orgToFolderMap').html(JSON.stringify(UTILS.orgToFolderMap(), null, 4));
	};

	// Refresh for each time
	function onShowListener() {
		// Use current storage data in pie
		$.when(MEDIASITE_ADMIN.orgsDiskusageListXHR()).done(function (storageData) {
			chartOrgsUsagePie = _buildOrgsDiskusagePieChart(storageData);
		});

		$.when(MEDIASITE_ADMIN.orgDiskusageListXHR(SELECTED_ORG)).done(function (storageData) {
			chartOrgUsageLine = _buildOrgDiskusageLineChart(SELECTED_ORG, storageData);
			_updateUI();
		});
	}

	function onHideListener() {
		_destroyOrgsDiskusagePieChart();
		_destroyOrgDiskusageLineChart();
	}


	function _updateUI() {
		$('ul#orgListSuperAdmin').html('');
		// Drop-down for Line Chart
		$.each(KIND.subscribingOrgNames(), function (index, org) {
			$('ul#orgListSuperAdmin').append('<li class="orgLineChartSelector" style="cursor: pointer;" data-org="' + org.split('.')[0] + '">' + org + '</li>');
		});
		//
		var feideOrgID = UTILS.mapMediasiteFolderToFeideOrg(SELECTED_ORG);
		// Selected from drop-down
		$('#pageSuperAdmin').find('.selectedOrg').text(feideOrgID);
		// Number of dates available in org's storage history (max 30 days)
		$('#pageSuperAdmin').find('.selectedOrgRecordedDatesNum').text(SELECTED_ORG_RECORDED_DATES_NUM);
		// Calculator
		$('#pageSuperAdmin').find('#inputCostTB').val(MEDIASITE.storageCostTB());
		// All fields referring to cost defined by calculator
		$('#pageSuperAdmin').find('.costPerTB').text("kr. " + MEDIASITE.storageCostTB());
		// Total average this year
		$.when(MEDIASITE.serviceDiskusageAvgThisYearXHR()).done(function (storage) {
			$('#pageSuperAdmin').find('.subscribersDiskusageAvgThisYear').html(UTILS.mib2tb(storage).toFixed(2) + "TB");
			$('#pageSuperAdmin').find('.totalAvgStorageCostEstimate').text("kr. " + (UTILS.mib2tb(storage) * MEDIASITE.storageCostTB()).toFixed());
		});


		// QuickStats below line graph
		$.when(MEDIASITE_ADMIN.orgDiskusageListXHR(SELECTED_ORG)).done(function (response) {
			// Total storage now
			var orgTotalStorageMiB = response[response.length - 1].storage_mib;
			$('#pageSuperAdmin').find('.orgTotalStorage').text(UTILS.mib2tb(orgTotalStorageMiB).toFixed(2) + " TB");
			// Percentage of entire service
			var orgStoragePercentageGlobal = (orgTotalStorageMiB / MEDIASITE.serviceDiskusageTotalXHR()) * 100;
			$('#pageSuperAdmin').find('.orgStoragePercentageGlobal').text(orgStoragePercentageGlobal.toFixed(2));
			// Average this year
			var orgAvgStorageMiB = 0;
			$.each(response, function (index, data) {
				orgAvgStorageMiB += data.storage_mib;
			});
			orgAvgStorageMiB = orgAvgStorageMiB / response.length;
			$('#pageSuperAdmin').find('.orgAvgStorageThisYear').text(UTILS.mib2tb(orgAvgStorageMiB).toFixed(2) + " TB");
			// Cost estimate based on average
			$('#pageSuperAdmin').find('.orgInvoiceEstimateThisYear').text("kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed());
			//
			var orgTotalStoragePercentageOfOrgAvg = (orgAvgStorageMiB / orgTotalStorageMiB) * 100;
			// Avg storage is greater than today's storage use
			if (orgTotalStoragePercentageOfOrgAvg > 100) {
				$('#pageSuperAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
			} else {
				$('#pageSuperAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-red"><i class="fa fa-caret-down"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
			}
		});

		$('#pageSuperAdmin').find('.orgSubscriptionStatus').html('<span class="label bg-' + KIND.subscriptionCodesToColors()[KIND.getOrgSubscriptionStatusCode(feideOrgID)] + '">' + KIND.subscriptionCodesToNames()[KIND.getOrgSubscriptionStatusCode(feideOrgID)] + '</span>');
	}


	/** ----------------- PIE CHART ----------------- **/

	function _buildOrgsDiskusagePieChart(data) {
		_destroyOrgsDiskusagePieChart();
		var orgsUsageChartData = [];

		$.each(data, function (index, orgObj) {
			// Chart prefs and data
			orgsUsageChartData.push({
				value: +UTILS.mib2tb(orgObj.storage_mib).toFixed(2),
				color: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
				highlight: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
				label: orgObj.org
			});
		});

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
	$("#chartOrgsUsagePieSuperAdmin").on('click', function (evt) {
		var activePoints = chartOrgsUsagePie.getSegmentsAtEvent(evt);
		//console.log(activePoints);
		var selected_org = activePoints[0].label;
		$.when(MEDIASITE_ADMIN.orgDiskusageListXHR(selected_org)).done(function (storageData) {
			$('#pageSuperAdmin').find('h2#org_details')[0].scrollIntoView(true);
			chartOrgUsageLine = _buildOrgDiskusageLineChart(selected_org, storageData, activePoints[0]._saved.fillColor); // Label is org name :-)
			_updateUI();
		});
	});


	/** ----------------- ./ PIE CHART ----------------- **/

	/** ----------------- LINE CHART ----------------- **/

	// Update line chart when selecting org from the list
	$('ul#orgListSuperAdmin').on('click', 'li.orgLineChartSelector', function () {
		var selected_org = $(this).data('org');
		$.when(MEDIASITE_ADMIN.orgDiskusageListXHR(selected_org)).done(function (storageData) {
			chartOrgUsageLine = _buildOrgDiskusageLineChart(selected_org, storageData);
			_updateUI();
		});
	});

	function _buildOrgDiskusageLineChart(org, storageData, fillColor) {
		var orgUsageChartData = [];
		//
		org = UTILS.mapFeideOrgToMediasiteFolder(org);
		// Sanity check
		if (!storageData) {
			UTILS.alertError('Fant ikke data for <code>' + org + '</code>', 'Fant ikke noe data for organisasjonen du valgte. Dette betyr mest sannsynlig at org-navn i Mediasite folder ikke er det samme som det vi hentet fra Kind eller at abonnenten benytter lokal lagring.');
			return false;
		}
		// Before we build a new one...
		_destroyOrgDiskusageLineChart();
		SELECTED_ORG = org;
		// Max 30 days
		var daysToShow = 30;
		var counter = daysToShow;
		var labels = [];
		var data = [];
		// "Clone" since we will be reversing and shit later on
		orgUsageChartData.storage = JSON.parse(JSON.stringify(storageData));
		// Start from most recent date and count backwards in time
		orgUsageChartData.storage.reverse();
		//
		$.each(orgUsageChartData.storage, function (index, storageObj) {
			var date = new Date(storageObj.timestamp.replace(/-/g, "/"));   // replace hack seems to fix Safari issue...
			// Chart labels and data
			labels.push(date.getUTCDate() + '.' + date.getUTCMonth() + '.' + date.getUTCFullYear());      // Add label
			data.push(UTILS.mib2gb(storageObj.storage_mib).toFixed(2));    // And value
			counter--;
			if (counter == 0) return false;
		});
		// In case there exist less than 30 days worth of data
		SELECTED_ORG_RECORDED_DATES_NUM = daysToShow - counter;
		// Reverse back so we get most recent date last
		data.reverse();
		labels.reverse();
		//
		fillColor = typeof fillColor !== 'undefined' ? fillColor : '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
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
	$("#orgUsageLineChartSuperAdmin").on('click', function (evt) {
		chartOrgUsageLine.datasets[0].fillColor = '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
		chartOrgUsageLine.update();
	});

	/** ----------------- ./ LINE CHART ----------------- **/

	/**
	 *
	 * @param subscribersArr
	 */
	function _buildOrgSubscribersTable(storageData) {
		// Clone the array so as to not modify passed original
		var orgs = JSON.parse(JSON.stringify(KIND.subscribers()));
		// Before passing dataset to table - add storage consumption per org
		var orgAvgMiB = 0;

		// Rename object keys from org.no to corresponding folder name
		// TODO: Some folders do not have a corresponding org in KIND - ask someone...
		$.each(orgs, function (org, orgObj) {
			orgs[UTILS.mapFeideOrgToMediasiteFolder(orgObj.org_id.split('.')[0])] = orgs[org];
			delete orgs[org];
		});

		$.each(storageData, function (org, storage) {
			// Some physical org folders (e.g. bibsys) are NOT found in Kind subscribers list
			if (orgs[org] === undefined) {
				orgs[org] = {};
				orgs[org].subscriber = false;
				orgs[org].org_id = UTILS.mapMediasiteFolderToFeideOrg(org);
				orgs[org].subscription_code = "404";

			}
			orgs[org].storage_mib = storage;
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
			"data": UTILS.convertDataTablesData(orgs), // Obj to Array,
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
					"data": "storage_mib",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return parseFloat(UTILS.mib2tb(full.storage_mib).toFixed(2));
					}
				},
				{
					"data": "cost",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return parseInt(parseFloat(UTILS.mib2tb(full.storage_mib)) * MEDIASITE.storageCostTB());
					}
				},
				{
					"data": "subscription_code",
					"width": "5%",
					"render": function (data, type, full, meta) {
						return "<span class='label bg-" + KIND.subscriptionCodesToColors()[full.subscription_code] + "'>" + KIND.subscriptionCodesToNames()[full.subscription_code] + "</span>";
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
			$.when(MEDIASITE_ADMIN.orgsDiskusageAvgListXHR()).done(function (storageData) {
				orgSubscribersTable = _buildOrgSubscribersTable(storageData);
			});
		}
	}

	//
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











