enyo.kind({
	name: "FlyApp.MainView",
	kind: "enyo.FittableRows",
	fit: true,
	controller: ".app.controllers.collection",
	components: [
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Fill Repeater", ontap: "fetch"}
		]},
		{kind: "enyo.FittableColumns", fit: true, components: [
			{kind: "enyo.FittableRows", style: "width: 50%;", components: [
				{kind: "onyx.Toolbar", content: "Bookings"},
				{kind: "enyo.Scroller", fit: true, components: [
					{name: "main", kind: "enyo.DataRepeater", controller: ".app.controllers.collection", components: [
						{kind: "FlyApp.MenuItem", onSelect: "bookingSelected", components: [
							{content: "bookid : "},
							{classes: "nice-padding", bindFrom: ".bookid"},
							{content: "carrid : "},
							{classes: "nice-padding", bindFrom: ".carrid"},
							{content: "connid : "},
							{classes: "nice-padding", bindFrom: ".connid"},
							{content: "fldate : "},
							{classes: "nice-padding", bindFrom: ".fldate"}
						]}
					]}
				]}
			]},
			{kind: "enyo.FittableRows", fit: true, components: [
				{kind: "onyx.Toolbar", content: "Booking Detail"},
				// note what we do here, we include the AutoBindingSupport mixin for convenience
				// and tell it which property to use as the source for the AutoBindings then
				// create the views with the bindFrom AutoBinding API - we could have programatically
				// created the elements from the attributes of the model like before but this is far
				// more efficient by reusing controls, of course if you don't know the schema ahead
				// of time then you would have to do it the other way
				{name: "detail", mixins: ["enyo.AutoBindingSupport"], bindSource: ".controller", components: [
					{bindFrom: ".AGENCYNUM"},
					{bindFrom: ".CANCELLED"},
					{bindFrom: ".CLASS"},
					{bindFrom: ".COUNTER"},
					{bindFrom: ".CUSTOMID"},
					{bindFrom: ".CUSTTYPE"},
					{bindFrom: ".FORCURAM"},
					{bindFrom: ".FORCURKEY"},
					{bindFrom: ".INVOICE"},
					{bindFrom: ".LOCCURAM"},
					{bindFrom: ".LOCCURKEY"},
					{bindFrom: ".LUGGWEIGHT"},
					{bindFrom: ".ORDER_DATE"},
					{bindFrom: ".PASSBIRTH"},
					{bindFrom: ".PASSFORM"},
					{bindFrom: ".PASSNAME"},
					{bindFrom: ".RESERVED"},
					{bindFrom: ".SMOKER"},
					{bindFrom: ".WUNIT"},
					{bindFrom: ".bookedFlight"},
					{bindFrom: ".bookid"},
					{bindFrom: ".carrid"},
					{bindFrom: ".connid"},
					{bindFrom: ".fldate"}
				], controller: ".app.controllers.details"}
			]}
		]}
	],
	bookingSelected: function (sender, event) {
		// the DataRepeater ensures that our events propagating from our children
		// will have the model and child properties for convenience
		var $r = event.child;
		if (this.selectedRow && this.selectedRow !== $r) {
			this.selectedRow.set("selected", false);
		}
		this.selectedRow = $r;
		$r.set("selected", true);
	}
});

