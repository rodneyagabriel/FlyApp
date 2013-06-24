enyo.ready(function () {

	enyo.kind({
		name: "Bootplate.MainView",
		kind: "FittableRows",
		fit: true,
		bindings: [{
			from: ".selected",
			to: ".app.controllers.message.data",
			twoWay: true
		}],
		
		selected: "",

		selectedChanged: function() {
			this.log(this.selected);
		},
		
		components: [
			{kind: "onyx.Toolbar", components: [
				{
					kind: "onyx.Button",
					content: "Fill repeater",
					ontap: "fillRepeater"
				}
			]},
			{kind: "enyo.FittableColumns", fit: true, components: [
				{kind: "enyo.FittableRows", style: "width: 50%;", components: [
					{kind: "onyx.Toolbar", content: "Bookings"},
					{kind: "enyo.Scroller", fit: true, components: [{
						name: "main",
						kind: "enyo.DataRepeater",
						controller: ".app.controllers.messages",
						components: [
							{kind: "onyx.MenuItem", bindFrom: "uri", bindTo: ".uri", components: [
								{content: "bookid : "},
								{classes: "nice-padding", bindFrom: "bookid"},
								{content: "carrid : "},
								{classes: "nice-padding", bindFrom: "carrid"},
								{content: "connid : "},
								{classes: "nice-padding", bindFrom: "connid"},
								{content: "fldate : "},
								{classes: "nice-padding", bindFrom: "fldate"}
							]}
						],
						onSelect: "itemSelected"
					}]}
				]},
				{kind: "enyo.FittableRows", fit: true, components: [
					{kind: "onyx.Toolbar", content: "Booking detail"},
					{style: "width: 50%;", name: "detail"}
				]}
			]}
		],
		
		itemSelected: function (inSender, inEvent) {
			enyo.forEach(
				enyo.keys(this.$),
				function (key) {
					if (this.$[key].hasClass("enyo-selected") && this.$[key].name != inEvent.originator.name) {
						this.$[key].removeClass("enyo-selected");
					}
				},
				this
			);
			inEvent.originator.addClass("enyo-selected");
			this.set("selected", {uri: inEvent.originator.uri});
		},
		
		newAttribute: function (attribute) {
			this.createComponent(
				{
					kind: "enyo.FittableColumns",
					container: this.$.detail,
					components: [
						{content: attribute + " :  "},
						{name: attribute}
					]
				}
			);

			var bind = new enyo.Binding({from: ".app.controllers.details." + attribute, to: ".$." + attribute + ".content", owner: this, transform: "toReadable"});
			
			this.bindings.push(bind);
			bind.refresh();
			this.$.detail.render();
		},
		
		toReadable: function (value, direction, binding) {
			if (typeof(value) == "string" && ~value.indexOf('/Date')) {
				var date = new Date();
				try {
					var dateString = enyo.json.parse(value);
					date.setTime(dateString);
				} catch (error){
					var regexp = /\(([^)]+)\)/;
					var dateString = regexp.exec(value);
					date.setTime(dateString[1]);
				}
				return date;
			} else if (value == null || value == "" || !value) {
				return "Not disclosed";
			} else if (typeof(value) == "object" && value.__deferred) {
				return value.__deferred.uri;
			} else {
				return value;
			}
		}
	});
	
});
