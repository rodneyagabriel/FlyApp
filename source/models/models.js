enyo.ready(function () {
	enyo.kind({
		name: "notDetailedEntry",
		kind: "enyo.Model",
		attributes: {bookid: "", carrid: "", connid: "", fldate: "", uri: ""}
	});
	enyo.kind({
		name: "detailedEntry",
		kind: "enyo.Model"
	});
});
