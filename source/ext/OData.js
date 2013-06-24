enyo.kind({
	name: 'enyo.OData',
	kind: 'enyo.Ajax',
	published:{
		method: 'GET',
		uri: '',
		query: '',
		data: '',
		results: ''
	},
	statics: {
		proxyUrl: ""
	},

	constructor: function() {
		this.inherited(arguments);
		
		var header = {"DataServiceVersion": "1.0", 'MaxDataServiceVersion':'2.0', 'Accept': 'application/json', "Content-Type": 'application/json'};
		
		var url = this.uri + this.query;
		if (url.indexOf('$format') == -1) {
			if (url.indexOf('?') == -1) {
				url += '?';
			}
			if (url.lastIndexOf('&') != url.length-1 && url.lastIndexOf('?') != url.length-1) {
				url += '&$format=json';
			} else {
				url += '$format=json';
			}
		}
		
		if (enyo.OData.proxyUrl != "") {
			this.url = enyo.OData.proxyUrl + '/op/executeQuery';
			if (this.method == 'PUT' || this.method == 'MERGE'|| this.method == 'DELETE') {
				header['X-HTTP-Method'] = this.method;
				this.method = 'POST';
			}
			this.postBody = "url="+encodeURIComponent(url)+"&method="+this.method+"&data="+enyo.json.stringify(this.data)+"&header="+enyo.json.stringify(header);
			this.method = 'POST';
		} else {
			var that = this;
			
			if (this.method == 'PUT' || this.method == 'MERGE'|| this.method == 'DELETE') {
				var ajaxPreRequest = new enyo.Ajax({
					url: url,
					method: 'GET',
					handleAs: "json",
					headers: header,
					contentType: 'application/json'
				});
				ajaxPreRequest.go();
				var ifMatch = ajaxPreRequest.response(
					function(inAsync, inValue){
						if (inValue.d.results) {
							if (inValue.d.results[0].__metadata.etag) {
								return true;
							}
						} else if (inValue.d.__metadata.etag) {
							return true;
						}
					}
				);
				if(ifMatch) {
					header['If-Match'] = '*';
				}
				ajaxPreRequest.error(
					function(inAsync, inValue){
						this.log(inAsync, inValue);
					}
				);
				header['X-HTTP-Method'] = this.method;
				var method = 'POST';
				var postBody = this.data;
			} else {
				var method = this.method;
				if (this.method == 'POST') {
					var postBody = this.data;
				}
			}
			
			this.url = url;
			while (this.url.indexOf('$') != -1) {
				this.url = this.url.replace('$','%24');
			}
			
			this.method = method;
			this.handleAs = "json";
			this.headers = header;
			this.contentType = 'application/json';
			this.postBody = postBody;
			this.xhrFields = {"withCredentials": true}
		}
	}
});
