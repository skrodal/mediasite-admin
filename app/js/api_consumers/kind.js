var KIND = (function() {
	var
		subscribersAll = [],            // Array with all data from Kind sorted by org
		subscriptionCount = {},      // Object counting the types of subscriptions
		subscribingOrgNames = [],    // Array with org names in alphabetical order
		subscriberDetails = {};      // Details about logged in user's org


	var XHR_KIND;

	(function () {
	    $.when(DATAPORTEN.readyUser()).done( function (){
			XHR_KIND = _getServiceSubscribers();
		});
	})();


	function _getServiceSubscribers() {
		return DATAPORTEN.jso().ajax({
			url: DATAPORTEN.config().api_endpoints.kind + "service/" + DATAPORTEN.config().kind.mediasiteID + '/subscribers/',
			// oauth: { scopes: { request: ["gk_ecampus-kind", "gk_ecampus-kind_admin"] } },
			dataType: 'json'
		})
			.then(function (subscribers, status, res) {
				// Check for and catch errors before done is fired
				// subscribers = JSON.parse(data);
				if (!subscribers.status || subscribers.data == null) {
					return $.Deferred().reject(res, status, "Henting av tjenestetilganger (KIND) feilet.").promise();
				}
				// All good - process a few things here before done is fired...
				//subscribers = JSON.parse(subscribers).data;

				subscriptionCount = _getSubscriptionCount(subscribers.data);

				if($.isEmptyObject(subscriberDetails)){
					return $.Deferred().reject(res, status, "Din org abonnerer ikke p&aring; tjenesten.").promise();
				}
				subscribersAll = subscribers.data;
				return $.Deferred().resolve(subscribers.data, status, res).promise();;
			})
			.done(function (subscribers) {
				UTILS.updateAuthProgress("Tjenestetilganger");
			})
			.fail(function (jqXHR, textStatus, error) {
				UTILS.showAuthError("Tjenestetilganger", error);
			});
	}

	/**
	 * 1. Get an a account for type/number of subscriptions/subscribers in KIND.
	 * 2. Get a sorted list of all subscribers
	 */
	function _getSubscriptionCount(subscribers) {
		subscribingOrgNames = [];
		var count = { 'total': 0, 'full': 0, 'trial': 0, 'other': 0 };
		$.each(subscribers, function (org, orgObj) {
			switch (orgObj.subscription_code) {
				case 20:
					count.full++;
					break;
				case 15:
					count.trial++;
					break;
				default:
					count.others++;
					break;
			}
			count.total++;
			// Extract details for logged in user's org
			if(org.toLowerCase() === DATAPORTEN.user().org.id.toLowerCase()) {
				subscriberDetails = {
					"support" : orgObj.contact_support,
					"contact" : orgObj.contact_person,
					"subscription_status" : orgObj.subscription_code,
					"service_url" : orgObj.service_uri
				};
			}
			// Simple array just with org names - used extensively elsewhere
			subscribingOrgNames.push(org.toLowerCase());
		});
		return count;
	}

	function isSuperAdmin(){
		return (DATAPORTEN.user().username.indexOf("@uninett.no") > -1);
	}

	function isOrgAdmin() {
		if($.isEmptyObject(subscriberDetails)){
			return false;
		} else {
			return (DATAPORTEN.user().email.indexOf(subscriberDetails.contact.e_post.toLowerCase()) > -1);
		}
	}

	function getRole() {
		if(isSuperAdmin()) return 'SuperAdmin';
		if(isOrgAdmin()) return 'OrgAdmin';
		return 'Bruker';
	}

	// Returns a number
	function getOrgSubscriptionStatusCode(requestedOrg){
		var status = 404; // Default code in case org is not found

		$.each(subscribersAll, function(org, orgObj){
			if(orgObj.org_id.toLowerCase().indexOf( requestedOrg.toLowerCase() ) > -1 ){
				status = orgObj.subscription_code;
				return false;
			}
		});
		return status;
	}

	return {
		ready: function() {
			return XHR_KIND;
		},
		subscribers: function() {
			return subscribersAll;
		},
		subscriptionCount: function() {
			return subscriptionCount;
		},
		subscribingOrgNames: function() {
			return subscribingOrgNames;
		},
		isSubscriber: function () {
			return !$.isEmptyObject(subscriberDetails);
		},
		subscriberDetails: function() {
			return subscriberDetails;
		},
		isSuperAdmin: function(){
			return isSuperAdmin();
		},
		isOrgAdmin: function(){
			return isOrgAdmin();
		},
		getRole: function() {
			return getRole();
		},
		getOrgSubscriptionStatusCode : function(requiredOrg){
			return getOrgSubscriptionStatusCode(requiredOrg);
		},


		subscriptionCodesToNames : function() {
			var codes =
			{
				x: ' --- ', 			// Mangler status
				10: 'Bestilt',		    // Bestilt
				15: 'Utprøving',	    // Demo
				20: 'Abonnent',         // Installert
				30: 'Avbestilt',		// Avbestilt
				40: 'Stengt',		    // Nedkoblet
				50: 'Utfasing',         // Fjernes
				404: 'Ukjent'           // Kind vil aldri sende denne, brukes dersom org ikke ble funnet
			};
			return codes;
		},
		subscriptionCodesToColors : function() {
			var codes =
			{
				x: 'red', 			// Mangler status
				10: 'blue',   		// Bestilt
				15: 'orange',       // Demo
				20: 'green',        // Installert
				30: 'red',	    	// Avbestilt
				40: 'red',    	    // Nedkoblet
				50: 'red', 	        // Fjernes
				404: 'red'          // Kind vil aldri sende denne, brukes dersom org ikke ble funnet
			};
			return codes;
		}
	}
})();






