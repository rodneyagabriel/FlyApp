enyo.ready(function () {
	
	// an enyo.Store is a singleton object that isn't required
	// to use enyo.Model but it is requred when using enyo.Source
	// so we create one with our overloaded source kind
	new enyo.Store({source: "FlyApp.Source"});
	new FlyApp.Application({name: "app"});
	
	// make sure to test out the synchronization between the view-state and
	// model-state by changing both
	
	// to drive the view from a model use
	// app.controllers.collection.at(0).set("selected", true)
	// assuming the index is something other than the currently selected
	// index is
	
	// to drive the model-layer from the view click on a row and see it
	// become selected and use
	// app.controllers.collection.filter(function (m) {return m.selected})
	// and it should return an array with only 1 record which matches the
	// currently selected row in the repeater
});
