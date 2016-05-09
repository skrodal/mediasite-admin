var ORG_ADMIN = (function () {
	// Cart
	var chartOrgUsageLine = false; // The Chart instance

	var mediasiteFolders,
		mediasiteUserProfiles,
		myMediasiteUsersDataTable,
		MEDIASITE_FOLDER,
		ORG_RECORDED_DATES_NUM = 0;

	function init() {
		MEDIASITE_FOLDER = UTILS.mapFeideOrgToMediasiteFolder(DATAPORTEN.user().org.shortname);
		_updateOrgAdminKindUI();
	}

	function onShowListener() {
		$.when(MEDIASITE_ORG.storageRecordsThisYearXHR()).done(function (storageArr){
			chartOrgUsageLine = _buildOrgDiskusageLineChart(storageArr);
			_updateUI();
		});

	}

	function onHideListener() {
		_destroyOrgDiskusageLineChart();
	}

	function _updateUI() {
		// Number of dates available in org's storage history (max 30 days)
		$('#pageOrgAdmin').find('.orgRecordedDatesNum').text(ORG_RECORDED_DATES_NUM);
		// Calculator
		$('#pageOrgAdmin').find('#inputCostTB').val(MEDIASITE.storageCostTB());
		// All fields referring to cost defined by calculator
		$('#pageOrgAdmin').find('.costPerTB').text("kr. " + MEDIASITE.storageCostTB());
		//
		$('#pageOrgAdmin').find('.orgSubscriptionStatus').html('<span class="label bg-' + KIND.subscriptionCodesToColors()[KIND.getOrgSubscriptionStatusCode(DATAPORTEN.user().org.id)] + '">' + KIND.subscriptionCodesToNames()[KIND.getOrgSubscriptionStatusCode(DATAPORTEN.user().org.id)] + '</span>');

		// QuickStats below line graph
		var orgTotalStorageMiB = MEDIASITE_ORG.totalStorage();
		var orgStoragePercentageGlobal = ( (orgTotalStorageMiB / MEDIASITE.serviceDiskusageTotalXHR()) * 100).toFixed(2);
		var orgAvgStorageMiB = MEDIASITE_ORG.avgStorageThisYear();
		var orgTotalStoragePercentageOfOrgAvg = (orgAvgStorageMiB / orgTotalStorageMiB) * 100;

		// -- QUICKSTATS
		// Usage percentage overall
		$('#pageOrgAdmin').find('.orgStoragePercentageGlobal').text(orgStoragePercentageGlobal);
		// On disk as of last reading (total)
		$('#pageOrgAdmin').find('.orgTotalStorage').text(UTILS.mib2tb(orgTotalStorageMiB).toFixed(2) + "TB");
		// The average usage this year
		$('#pageOrgAdmin').find('.orgAvgStorageThisYear').text(UTILS.mib2tb(orgAvgStorageMiB).toFixed(2) + "TB");
		// Total invoiceable amount, based on average storage consumption this year
		$('#pageOrgAdmin').find('.orgAvgStorageCostEstimate').text("kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed());


		// Avg storage is greater than today's storage use
		if (orgTotalStoragePercentageOfOrgAvg > 100) {
			$('#pageOrgAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
		} else {
			$('#pageOrgAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-red"><i class="fa fa-caret-down"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
		}

		$('#pageOrgAdmin').find('.orgInvoiceEstimateThisYear').text("kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed());

	}

	/**
	 * Update cost column when calc-button is pressed
	 */
	function _setInvoiceEstimate() {
		var cost_tb = $('#pageOrgAdmin').find('#inputCostTB').val();
		// Returns error if not a number
		if (MEDIASITE.setStorageCost(cost_tb)) {
			_updateUI();
		}
	}
	$('#pageOrgAdmin #btnInvoiceCalc').on('click', _setInvoiceEstimate);





	/** ----------------- LINE CHART ----------------- **/

	function _buildOrgDiskusageLineChart(storageArr) {
		var orgUsageChartData = [];

		// Sanity check
		if (!storageArr) {
			UTILS.alertError('Fant ikke data for <code>' + DATAPORTEN.user().org.name + '</code>', 'Fant ikke data for ditt l&aelig;rested. Dette betyr mest sannsynlig at org-navn i Mediasite folder ikke er det samme som det vi hentet fra Kind eller at abonnenten benytter lokal lagring.');
			return false;
		}
		_destroyOrgDiskusageLineChart();
		// "Clone" since we will be reversing and shit later on
		orgUsageChartData.storage = JSON.parse(JSON.stringify(storageArr));

		// Max 30 days
		var daysToShow = 30;
		var counter = daysToShow;
		var labels = [];
		var data = [];
		// Start from most recent date and count backwards in time
		orgUsageChartData.storage.reverse();
		//
		$.each(orgUsageChartData.storage, function (index, storage) {
			var date = new Date(storage.timestamp.replace(/-/g, "/"));   // replace hack seems to fix Safari issue...
			// Chart labels and data
			labels.push(date.getUTCDate() + '.' + date.getUTCMonth() + '.' + date.getUTCFullYear());    // Add label
			data.push(UTILS.mib2gb(storage.storage_mib).toFixed(2));                                       // And value
			counter--;
			if (counter == 0) return false;
		});
		// In case there exist less than 30 days worth of data
		ORG_RECORDED_DATES_NUM = daysToShow - counter;
		// Reverse back so we get most recent date last
		data.reverse();
		labels.reverse();
		// Build dataset
		var lineChartData = {
			labels: labels,
			datasets: [
				{
					label: "Diskforbruk siste " + data.length + ' dager',
					fillColor: '#' + (Math.random().toString(16) + '0000000').slice(2, 8),
					strokeColor: "#666",
					pointColor: "#fff",
					pointStrokeColor: "#666",
					pointHighlightFill: "#285C85",
					pointHighlightStroke: "rgba(60,141,188,1)",
					data: data
				}
			]
		};

		var ctx = document.getElementById("orgUsageLineChartOrgAdmin").getContext("2d");
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
	$("#orgUsageLineChartOrgAdmin").on('click', function(evt){
		chartOrgUsageLine.datasets[0].fillColor = '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
		chartOrgUsageLine.update();
	});

	/** ----------------- ./ LINE CHART ----------------- **/
















	/**
	 * TODO:
	 *
	 * - On click in user table, bring up modal with more information - primarily about presentations, which can be
	 * found in endpoint /Folders('folder_id')/Presentations
	 */

	$(document).ready(function () {
		var stop = false;
		if (stop) {
			$.when(getMediasiteVersion()).then(function (details) {
				$('#mediasiteVersion').html('<small>Mediasite v.' + details.data.SiteVersion + ', build ' + details.data.SiteBuildNumber + ' </small>');
			});

			// Need Folders AND Profiles before we can build the My Mediasite User Table
			$.when(
					getMediasiteFolders(),
					getMediasiteUserProfiles()
				).then(function (folders, profiles) {
					mediasiteFolders = folders[0];
					mediasiteUserProfiles = profiles[0];

					if (mediasiteFolders.status == true && mediasiteUserProfiles.status == true) {
						console.log(mediasiteUserProfiles);
						myMediasiteUsersDataTable = _buildMyMediasiteUsersTable();
					} else {
						UTILS.alertError('Feil!', 'En feil oppstod ved uthenting av data fra Mediasite.');
					}
				}, function () {
					// Fail - Show message from both XHR objects
					UTILS.alertError('Feil!', '<p>En feil oppstod ved uthenting av data fra Mediasite:</p><p><code>' + folders.message + '</code></p><p><code>' + profiles.message + '</p></code>');
				});
		}

	});


	/**
	 *
	 */
	function _buildMyMediasiteUsersTable() {
		var myMediasiteRootFolders = [];
		var myMediasiteUsers = [];
		var myMediasiteTableData = [];

		$.each(mediasiteFolders.data, function (x, folderObj) {
			// Check for correct folder type
			if (folderObj.Type.indexOf("MyMediasiteUserRoot") >= 0) {
				// Keep folder object
				myMediasiteRootFolders.push(folderObj);
				// Find folder owner's profile
				$.each(mediasiteUserProfiles.data, function (y, profileObj) {
					if (profileObj.UserName === folderObj.Owner) { // Try profileObj.HomeFolderId === folderObj.Id
						// Keep profile object
						myMediasiteUsers.push(profileObj);
						// Add entry for DataTable
						myMediasiteTableData.push(
							{
								'UserName': profileObj.UserName,
								'Name': profileObj.DisplayName,
								'Email': profileObj.Email,
								'UserId': profileObj.Id,
								'Validated': profileObj.Activated,
								'HomeFolderId': profileObj.HomeFolderId
							});
						// Exit this loop
						return;
					}
				});
			}
		});

		console.log(myMediasiteTableData);
		//
		$('.my_mediasite_users_count').html(myMediasiteTableData.length);

		var table = $('#pageOrgAdmin').find('#myMediasiteUsersTableOrgAdmin').DataTable({
			"language": dataTablesLanguage,
			"autoWidth": true,
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
								"sTitle": "MyMediasite_Brukere"
							},
							{
								"sExtends": "xls",
								"sButtonText": "Excel (.csv)",
								"sTitle": "MyMediasite_Brukere"
							}
						]
					}
				]
			},
			"data": myMediasiteTableData,
			"columns": [
				{
					"data": "Name",
					"render": function (data, type, full, meta) {
						return full.Name;
					}
				},
				{
					"data": "Email",
					"render": function (data, type, full, meta) {
						return '<a class="icon ion-ios-email" href="mailto:' + full.Email.toLowerCase() + '"> ' + full.Email.toLowerCase() + '</a>';
					}
				},
				{
					"data": "Mer...",
					"width": "5%",
					"bSortable": false,
					"render": function (data, type, full, meta) {
						return '<button type="button" data-toggle="modal" data-target="#userDetailsModal" ' +
							'data-user-id="' + full.UserId + '" data-home-folder-id="' + full.HomeFolderId + '" + data-user-full-name="' + full.Name + '" ' +
							'class="btn btn-sm btn-block btn-default icon ion-ios-list-outline"> Info...</button>';
					}
				}
			]
		});
		$('#myMediasiteUsersTableBoxOrgAdmin').find('.ajax').hide();
		return table;
	}

	$('#userDetailsModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);            // Table button that triggered the modal
		var userFullName = button.data('userFullName'); // Extract info from data-* attributes
		var homeFolderId = button.data('homeFolderId'); // Extract info from data-* attributes
		var userId = button.data('userId');
		// Update the modal's content.
		var modal = $(this);
		modal.find('#userName').text(userFullName);
		modal.find('.modal-body input').val(homeFolderId);
	})

	/**
	 *
	 * @returns XHR
	 */
	function getMediasiteVersion() {
		return $.getJSON('app/api/mediasite/', {
			request: 'Version',
			username: userInfo.username,
			token: mediasiteToken
		});
	}

	/**
	 *
	 * @returns XHR
	 */
	function getMediasiteFolders() {
		return $.getJSON('app/api/mediasite/', {
			request: 'Folders',
			username: userInfo.username,
			token: mediasiteToken
		});
	}

	/**
	 *
	 * @returns XHR
	 */
	function getMediasiteUserProfiles() {
		return $.getJSON('app/api/mediasite/', {
			request: 'UserProfiles',
			username: userInfo.username,
			token: mediasiteToken
		});
	}


	function _updateOrgAdminKindUI() {
		var tabs = '&nbsp;&nbsp;&nbsp;';
		var contactName = KIND.subscriberDetails().contact.navn !== "" ? KIND.subscriberDetails().contact.navn : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var contactEmail = KIND.subscriberDetails().contact.e_post !== "" ? KIND.subscriberDetails().contact.e_post : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var contactPhone = KIND.subscriberDetails().contact.direkte_telefon !== "" ? KIND.subscriberDetails().contact.direkte_telefon : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var contactMobile = KIND.subscriberDetails().contact.mobil_telefon !== "" ? KIND.subscriberDetails().contact.mobil_telefon : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var supportName = KIND.subscriberDetails().support.navn !== "" ? KIND.subscriberDetails().support.navn : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var supportEmail = KIND.subscriberDetails().support.e_post !== "" ? KIND.subscriberDetails().support.e_post : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var supportPhone = KIND.subscriberDetails().support.direkte_telefon !== "" ? KIND.subscriberDetails().support.direkte_telefon : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';
		var supportMobile = KIND.subscriberDetails().support.mobil_telefon !== "" ? KIND.subscriberDetails().support.mobil_telefon : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';

		//SUBSCRIBER_ORG_DETAILS_OBJ
		$('.serviceContact').html('<p>' +
			tabs + '<i class="icon ion-android-person text-muted"></i>&nbsp;&nbsp;' + contactName + '<br>' +
			tabs + '<i class="icon ion-ios-email text-muted"></i>&nbsp;&nbsp;' + contactEmail + '<br>' +
			tabs + '<i class="icon ion-ios-telephone text-muted"></i>&nbsp;&nbsp;' + contactPhone + '<br>' +
			tabs + '<i class="icon ion-android-phone-portrait text-muted"></i>&nbsp;&nbsp;' + contactMobile +
			'</p>'
		);
		$('.serviceSupport').html('<p>' +
			tabs + '<i class="icon ion-help-buoy text-muted"></i>&nbsp;&nbsp;' + supportName + '<br>' +
			tabs + '<i class="icon ion-ios-email text-muted"></i>&nbsp;&nbsp;' + supportEmail + '<br>' +
			tabs + '<i class="icon ion-ios-telephone text-muted"></i>&nbsp;&nbsp;' + supportPhone + '<br>' +
			tabs + '<i class="icon ion-android-phone-portrait text-muted"></i>&nbsp;&nbsp;' + supportMobile +
			'</p>'
		);
		$('.serviceUrl').html('<p>' +
			tabs + '<i class="icon ion-link text-muted"> </i> ' + KIND.subscriberDetails().service_url +
			'</p>'
		);
		$('.subscriptionStatus').html('<span class="label bg-' + KIND.subscriptionCodesToColors()[KIND.subscriberDetails().subscription_status] + '">' + KIND.subscriptionCodesToNames()[KIND.subscriberDetails().subscription_status] + '</span>');
	}

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





