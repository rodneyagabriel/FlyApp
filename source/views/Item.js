enyo.kind({
	name: "FlyApp.MenuItem",
	kind: "onyx.MenuItem",
	// we use a local variable to determine the state of the view
	// when driven from the state of the model
	selected: false,
	// we create a binding so we can be immediately notified when
	// the model's selected property is modified
	bindings: [
		{from: ".model.selected", to: ".selected", twoWay: true}
	],
	selectedChanged: function () {
		var $s = this.selected, $o = this.owner;
		this.addRemoveClass("enyo-selected", $s);
		if ($s && !($o.selectedRow == this)) {
			this.doSelect();
		}
	}
});
