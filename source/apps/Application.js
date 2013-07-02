enyo.kind({
	name: "FlyApp.Application",
	kind: "enyo.Application",
	view: "FlyApp.MainView",
	controllers: [
		{name: "collection", kind: "FlyApp.BookingCollection"},
		{name: "details", kind: "enyo.ModelController"}
	],
	// the event from tapping a row in the repeater will propagate to
	// this handler not just the view's handler, it would have been nice
	// to have a relationship between the models to automatically fetch
	// the correct one but that wasn't possible at this time
	bookingSelected: function (sender, event) {
		var $m = event.model, $c = this.controllers.details, $n;
		$n = new FlyApp.Booking();
		$n.url = $m.uri;
		$n.fetch({success: function () {
			$c.set("model", $n);
		}});
	}
});
