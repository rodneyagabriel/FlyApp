enyo.kind({
	name: "FlyApp.Application",
	kind: "enyo.Application",
	controllers: [{
		name: "uriController",
		kind: "FlyApp.UriController"
	}, {
		name: "collection",
		kind: "FlyApp.CollectionController"
	}, {
		name: "details",
		kind: "FlyApp.DetailsController"
	}],
	view: "FlyApp.MainView",
	first: true,
	constructor: function () {
		this.inherited(arguments);
	},
	fillRepeater: function (inSender, inEvent) {
		var details = this.controllers.details;
		var requestBookings = new enyo.OData({
			uri: "https://sapes1.sapdevcenter.com/sap/opu/odata/IWFND/RMTSAMPLEFLIGHT/", 
			query: "BookingCollection?$format=json&$orderby=bookid asc&$top=100&$select=carrid,connid,fldate,bookid"
		});
		requestBookings.response(
			this, 
			function(inSender, inData) {
				var collection = this.controllers.collection;
				var uriController = this.controllers.uriController;
				var first = true;
				collection.removeAll();
				enyo.forEach(
					inData.d.results,
					function (entry) {
						if (first) {
							first = false;
							uriController.set("data", {uri: entry.__metadata.uri});
						}
						var date = new Date();
						try {
							var dateString = enyo.json.parse(entry.fldate);
							date.setTime(dateString);
						} catch (error){
							var regexp = /\(([^)]+)\)/;
							var dateString = regexp.exec(entry.fldate);
							date.setTime(dateString[1]);
						}
						entry.fldate = date.toLocaleString();
						entry.uri = entry.__metadata.uri;
						collection.add(entry);
						this.view.$.menuItem.addClass("enyo-selected");
					},
					this
				);
			}
		);
		requestBookings.error(
			this, 
			function(inSender, inError) {
				this.log(inError);
			}
		);
		requestBookings.go();
	}
});
