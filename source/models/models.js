(function (enyo) {
	
	// this is a reused formatter for various models so we allow it to be shared
	// instead of instantiating it multiple times between them
	FlyApp.DateConverter = function (key, value, action, payload) {
		if (action == "fetch") {
			return new Date(parseInt(/[0-9]+/.exec(value)[0])).toLocaleString();
		}
	};
	
})(enyo);