var ORG_ADMIN = (function () {
	// Cart
	var lineOrgDiskusage = false; // The Chart instance

	var MEDIASITE_FOLDER,
		ORG_RECORDED_DATES_NUM = 0;

	function init() {
		MEDIASITE_FOLDER = UTILS.mapFeideOrgToMediasiteFolder(DATAPORTEN.user().org.shortname);
		_updateOrgAdminKindUI();
	}

	function onShowListener() {
		$.when(MEDIASITE_ORG.storageRecordsThisYearXHR()).done(function (storageArr){
			lineOrgDiskusage = _buildLineOrgDiskusage(storageArr);
			_updateUI();
		});

	}

	function onHideListener() {
		_destroyLineOrgDiskusage();
	}

	function _updateUI() {
		// Number of dates available in org's storage history (max 30 days)
		$('#pageOrgAdmin').find('.orgRecordedDatesNum').text(ORG_RECORDED_DATES_NUM);
		//
		$('#pageOrgAdmin').find('.orgSubscriptionStatus').html('<span class="label bg-' + KIND.subscriptionCodesToColors()[KIND.getOrgSubscriptionStatusCode(DATAPORTEN.user().org.id)] + '">' + KIND.subscriptionCodesToNames()[KIND.getOrgSubscriptionStatusCode(DATAPORTEN.user().org.id)] + '</span>');
		// Calculator
		$('#pageOrgAdmin').find('.inputCostTB').val(MEDIASITE.storageCostTB());
		// All fields referring to cost defined by calculator
		$('#pageOrgAdmin').find('.storageCostPerTB').html("<kbd>kr. " + MEDIASITE.storageCostTB() + "</kbd>");
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
		$('#pageOrgAdmin').find('.orgAvgStorageCostEstimate').html("<kbd>kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed() + "</kbd>");


		// Avg storage is greater than today's storage use
		if (orgTotalStoragePercentageOfOrgAvg > 100) {
			$('#pageOrgAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-green"><i class="fa fa-caret-up"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
		} else {
			$('#pageOrgAdmin').find('.orgTotalStoragePercentageOfOrgAvg').html('<span class="description-percentage text-red"><i class="fa fa-caret-down"></i> ' + (orgTotalStoragePercentageOfOrgAvg - 100).toFixed(2) + '%</span>');
		}
		//
		$('#pageOrgAdmin').find('.orgInvoiceEstimateThisYear').html("<kbd>kr. " + (UTILS.mib2tb(orgAvgStorageMiB) * MEDIASITE.storageCostTB()).toFixed() + "</kbd>");
		//
		$.when(MEDIASITE_ORG.invitationLinkXHR()).done(function (link){
			$('#pageOrgAdmin').find('.orgAdminGroupLink').text(link);
		});
	}

	/**
	 * Update cost column when calc-button is pressed
	 */
	function _setInvoiceEstimate() {
		var cost_tb = $('#pageOrgAdmin').find('.inputCostTB').val();
		// Returns error if not a number
		if (MEDIASITE.setStorageCost(cost_tb)) {
			_updateUI();
		}
	}
	$('#pageOrgAdmin #btnInvoiceCalc').on('click', _setInvoiceEstimate);



	/** ----------------- LINE CHART ----------------- **/

	function _buildLineOrgDiskusage(storageArr) {
		var orgUsageChartData = [];

		// Sanity check
		if (!storageArr) {
			UTILS.alertError('Fant ikke data for <code>' + DATAPORTEN.user().org.name + '</code>', 'Fant ikke data for ditt l&aelig;rested. Dette betyr mest sannsynlig at org-navn i Mediasite folder ikke er det samme som det vi hentet fra Kind eller at abonnenten benytter lokal lagring.');
			return false;
		}
		_destroyLineOrgDiskusage();
		// "Clone" since we will be reversing and shit later on
		orgUsageChartData.storage = JSON.parse(JSON.stringify(storageArr));

		// Max 30 days
		var daysToShow = 30;
		var counter = daysToShow;
		var labels = [];
		var data = [];
		// Pointers for chart increments
		var curMib = 0; // Pointer
		// Start from most recent date and count backwards in time
		orgUsageChartData.storage.reverse();
		//
		$.each(orgUsageChartData.storage, function (index, storageObj) {
			var date = new Date(storageObj.timestamp.replace(/-/g, "/"));   // replace hack seems to fix Safari issue...
			// Find diff between previous and current read
			var diff = Math.abs(curMib - storageObj.storage_mib);
			if (CONFIG.minDiffStorageThreshold() >= diff) {
				// Skip if differrence from previous is not more/less than {minDiff}
				return true;
			}
			//
			curMib = storageObj.storage_mib;
			// Chart labels and data
			labels.push(date.getDate() + '.' + (date.getUTCMonth()+1) + '.' + date.getUTCFullYear());    // Add label
			data.push(UTILS.mib2gb(storageObj.storage_mib).toFixed(2));                                  // And value
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
					label: "Diskforbruk i GB ",
					fill: true,
					lineTension: 0.1,
					backgroundColor: UTILS.randomRGBA(0.3),
					borderColor: "#999",
					borderCapStyle: 'butt',
					borderJoinStyle: 'miter',
					borderWidth: 2,
					pointBorderColor: "rgba(111,111,111,0.4)",
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointBackgroundColor: "#666",
					pointHoverBackgroundColor: UTILS.randomRGBA(0.5),
					pointHoverBorderColor: UTILS.randomRGBA(0.5),
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 14,
					spanGaps: false,
					data: data
				}
			]
		};

		var ctx = $('#orgUsageLineChartOrgAdmin');
		return new Chart(ctx, {
				type: 'line',
				data: lineChartData,
				options: {
					maintainAspectRatio: false
				}
			}
		);
	}

	function _destroyLineOrgDiskusage() {
		if (lineOrgDiskusage !== false) {
			lineOrgDiskusage.destroy();
			lineOrgDiskusage = false;
		}
	}

	// Update chart color
	$("#orgUsageLineChartOrgAdmin").on('click', function(evt){
		lineOrgDiskusage.config.data.datasets[0].backgroundColor = UTILS.randomRGBA(0.3);
		lineOrgDiskusage.update();
	});

	/** ----------------- ./ LINE CHART ----------------- **/

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
		var serviceURL = KIND.subscriberDetails().service_url !== "" ? KIND.subscriberDetails().service_url : '<span class="label label-warning icon ion-android-warning"> Mangler</span>';

		//SUBSCRIBER_ORG_DETAILS_OBJ
		$('.serviceContact').html('<p>' +
			tabs + '<i class="icon ion-android-person text-muted"></i>'         + tabs + contactName + '<br>' +
			tabs + '<i class="icon ion-ios-email text-muted"></i>'              + tabs + contactEmail + '<br>' +
			tabs + '<i class="icon ion-ios-telephone text-muted"></i>'          + tabs + contactPhone + '<br>' +
			tabs + '<i class="icon ion-android-phone-portrait text-muted"></i>' + tabs + contactMobile +
			'</p>'
		);
		$('.serviceSupport').html('<p>' +
			tabs + '<i class="icon ion-help-buoy text-muted"></i>'              + tabs + supportName + '<br>' +
			tabs + '<i class="icon ion-ios-email text-muted"></i>'              + tabs + supportEmail + '<br>' +
			tabs + '<i class="icon ion-ios-telephone text-muted"></i>'          + tabs + supportPhone + '<br>' +
			tabs + '<i class="icon ion-android-phone-portrait text-muted"></i>' + tabs + supportMobile +
			'</p>'
		);
		$('.serviceUrl').html('<p>' +
			tabs + '<i class="icon ion-link text-muted"> </i> <a href="' + serviceURL + '" target="_blank">' + serviceURL + '</a>' +
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





