enyo.kind({
	name: "FlyApp.BookingCollection",
	kind: "enyo.Collection",
	model: "FlyApp.BookingEntry",
	// setting the url of the collection is what allows the source to know
	// how to correctly build the request url
	url: "BookingCollection",
	// we use the filderData method to ensure the interpreted payload
	// will be in the correct format - here we need to return the nested
	// object
	filterData: function (data) {
		return data.d.results;
	},
	// we use the buildQueryParams method to adjust the request query
	// when the source attempts to fetch this collection
	buildQueryParams: function (model, options) {
		enyo.mixin(options.queryParams, {
			"$format": "json",
			"$orderby": "bookid asc",
			"$top": "100",
			"$select": "carrid,connid,fldate,bookid"
		});
	},
	didFetch: function () {
		this.inherited(arguments);
		// we have just interpreted our data payload and the original behavior
		// was to select the first entry - we don't have access directly to the
		// view but we can set the selected property of the model so the view
		// will have the chance to respond to the event
		this.at(0).set("selected", true);
	}
});
