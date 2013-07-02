// unfortunately the way the data is returned does not allow for a single type of
// Booking model so we create the one that is returned in the collection and who's
// uri will be used later when retrieving the detailed record model
enyo.kind({
	name: "FlyApp.BookingEntry",
	kind: "enyo.Model",
	selected: false,
	attributes: {
		bookid: null,
		carrid: null,
		connid: null,
		fldate: {
			formatter: FlyApp.DateConverter,
		},
		uri: {
			formatter: "uriConverter"
		}
	},
	// remember that formatters can be strings representing a method
	// on the model or a function (inlined definition or reference)
	uriConverter: function (key, value, action, payload) {
		if (action == "fetch") {
			return payload.__metadata.uri;
		}
	}
});
