enyo.kind({
	name: "Bootplate.Application",
	kind: "enyo.Application",
	controllers: [{
		name: "message",
		kind: "Bootplate.MessageController"
	}, {
		name: "messages",
		kind: "Bootplate.MessagesController"
	}, {
		name: "details",
		kind: "Bootplate.DetailsController"
	}],
	view: "Bootplate.MainView",
	first: true,
	constructor: function () {
		this.inherited(arguments);
	},
	fillRepeater: function (inSender, inEvent) {
		var details = this.controllers.details;
		//this.log(details);
		var requestBookings = new enyo.OData({uri: "https://sapes1.sapdevcenter.com/sap/opu/odata/IWFND/RMTSAMPLEFLIGHT/", query: "BookingCollection?$format=json&$orderby=bookid asc&$top=100&$select=carrid,connid,fldate,bookid"});
		requestBookings.response(
			this, 
			function(inSender, inData) {
				var messages = this.controllers.messages;
				var message = this.controllers.message;
				var first = true;
				messages.removeAll();
				enyo.forEach(
					inData.d.results,
					function (entry) {
						if (first) {
							first = false;
							//this.log(message);
							message.set("data", {uri: entry.__metadata.uri});
						}
						//messages.set("model", notDetailedEntry());
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
						messages.add(entry);
						/*messages.add({bookid: entry.bookid, carrid: entry.carrid, connid: entry.connid, fldate: date.toLocaleString(), uri: entry.__metadata.uri});*/
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
