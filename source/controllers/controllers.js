enyo.ready(function () {
	
	enyo.kind({
		name: "FlyApp.UriController",
		kind: "enyo.Controller",
		dataChanged: function () {
			if (this.data.uri) {
				var requestDetails = new enyo.OData({uri: this.data.uri});
				requestDetails.response(
					this, 
					function(inSender, inData) {
						var model = {};
						if (this.app.first){
							model = new detailedEntry();
							var clone = {};
							for(key in inData.d){
								if (key != "__metadata") {
									clone[key] = "";
								}
							}
							model.set("attributes", clone);
							this.app.controllers.details.set("model", model);
						} else {
							var modelController = this.app.controllers.details;
							model = modelController.model;
						}
						
						for(key in inData.d){
							model.set(key, inData.d[key]);
						}
						
						if (this.app.first){
							this.app.first = false;
							for (attribute in this.app.controllers.details.model.attributes) {
								this.app.view.newAttribute(attribute);
							}
						}
					}
				);
				requestDetails.error(
					this, 
					function(inSender, inError) {
						this.log(inError);
					}
				);
				requestDetails.go();
			}
		}
	});
	
	enyo.kind({
		name: "FlyApp.CollectionController",
		kind: "enyo.Collection",
		model: "notDetailedEntry"
	});
	
	enyo.kind({
		name: "FlyApp.DetailsController",
		kind: "enyo.ModelController"
	});
	
});
