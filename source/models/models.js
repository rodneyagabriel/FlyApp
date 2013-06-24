enyo.ready(function () {
	enyo.kind({
		name: "notDetailedEntry",
		kind: "enyo.Model",
		attributes: {bookid: "", carrid: "", connid: "", fldate: "", uri: ""}
	});
	enyo.kind({
		name: "detailEntry",
		kind: "enyo.Model",
		attributesChanged: function() {
			enyo.log("attributesChanged", this.attributesChanged);
		}/*,
		attributes: {AGENCYNUM: "", CANCELLED: "", CLASS: "", COUNTER: "", CUSTOMID: "", CUSTTYPE: "", FORCURAM: "", FORCURKEY: "", INVOICE: "", LOCCURAM: "", LOCCURKEY: "", LUGGWEIGHT: "", ORDER_DATE: "", PASSBIRTH: null, PASSFORM: "", PASSNAME: "", RESERVED: "", SMOKER: "", WUNIT: "", bookid: "", carrid: "", connid: "", fldate: ""}*/
	});
});
