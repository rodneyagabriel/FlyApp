enyo.kind({
	name: "FlyApp.MenuItem",
	kind: "onyx.MenuItem",
	// we no longer need special handling for the selection support
	// but we opt to use the optional property here to use a non-default
	// css class to denote selection (default is "selection" but we want
	// to use "enyo-selected" instead)
	selectionClass: "enyo-selected"
});
