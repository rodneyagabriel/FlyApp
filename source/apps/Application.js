enyo.kind({
	name: "FlyApp.Application",
	kind: "enyo.Application",
	view: "FlyApp.MainView",
	controllers: [
		// allowing the store to be instantiated here will automatically
		// allow the application instance to receive events from its models
		{name: "store", kind: "enyo.Store", source: "FlyApp.Source"},
		{name: "collection", kind: "FlyApp.BookingCollection"},
		{name: "details", kind: "enyo.ModelController"}
	],
	handlers: {
		// when models are updated they emit this generic event so
		// we check to make sure the property that changed is the one
		// we're interested in
		onChange: "modelDidChange"
	},
	// this now responds to model state changes instead of user-events
	// so it is occurring from a single-source of change
	bookingSelected: function (model) {
		var $m = model, $c = this.controllers.details, $n;
		$n = new FlyApp.Booking();
		$n.url = $m.uri;
		$n.fetch({success: function () {
			$c.set("model", $n);
		}});
	},
	modelDidChange: function (sender, event) {
		// as long as one of the properties was "selected" and it
		// is true we now select it for our details controller selected model
		if (event.changed.selected) {
			this.bookingSelected(event.model);
		}
		return true;
	}
});
