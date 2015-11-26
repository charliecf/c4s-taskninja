/*jslint node: true */
/*global angular*/
/*global app*/
/*global Firebase*/
'use strict';

app.factory('Offer', function(FURL, $firebase, $q, Auth, Task) {

	var ref= new Firebase(FURL);
	var user = Auth.user;

	var Offer = {
		offers: function(taskId) {
			return $firebase(ref.child('offer').child(taskId)).$asArray();
		},

		makeOffer: function(taskId, offer) {
			var task_offers = this.offers(taskId);

			if (task_offers) {
				return task_offers.$add(offer);
			}
		},

		isOfferred: function(taskId) {
			if(user && user.provider) {
				var d = $q.defer();

				$firebase(ref.child('offers').child(taskId).orderByChild("uid")
					.equalTo(user.uid))
					.$asArray()
					.$loaded().then(function(data) {
						d.resolve(data.length > 0);
					}, function() {
						d.reject(false);
					});

				return d.promise;
			}
		},

		isMaker: function(offer) {
			return (user && user.provider && user.provider.uid === offer.uid);
		},

		getOffer: function(taskId, offerId) {
			return $firebase(ref.child('offers').child(taskId).child(offerId));
		},

		cancelOffer: function(taskId, offerId) {
			return this.getOffer(taskId, offerId).$remove();
		},

		acceptOffer: function(taskId, offerId, runnerId) {
			var o = this.getOffer(taskId, offerId);
			return o.$update({accepted: true})
			.then(function() {

				var t = Task.getTask(taskId);
				return t.$update({status: "assigned", runner: runnerId});	
			})
			.then(function() {
				return Task.createUserTasks(taskId);
			});
		}

	};

	return Offer;

});