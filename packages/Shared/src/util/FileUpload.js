Ext.define('Shared.util.FileUpload', {
	extend: 'Ext.data.Connection',
	
	singleton : true,
	
	newRequest : function(options) {
		var me = this,
			xhr = me.callParent(arguments),
			fileUpload = xhr.upload;
		
		fileUpload.onprogress = Ext.Function.bind(me.onProgress, me, [options], true);
				
		return xhr;
	},
	setOptions: function(options, scope) {
		options.method = 'POST';
		options.rawData = options.data;
//		options.binary = true;

		return this.callParent(arguments);
	},
    setupHeaders: function(xhr, options, data, params) {
        var me = this,
            headers = Ext.apply({}, options.headers || {}, me.defaultHeaders || {}),
            contentType = me.defaultPostHeader,
            jsonData = options.jsonData,
            xmlData = options.xmlData,
            key,
            header;

        if (me.useDefaultXhrHeader && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = me.defaultXhrHeader;
        }
        // set up all the request headers on the xhr object
        try {
            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    header = headers[key];
                    xhr.setRequestHeader(key, header);
                }
            }
        } catch(e) {
            me.fireEvent('exception', key, header);
        }
        return headers;
    },
	
	setupMethod: function(options, method) {
		return 'POST';
    },
    onProgress: function(event, options) {
    	Ext.callback(options.progress, options.scope, [event]);
    }
})
