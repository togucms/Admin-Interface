Ext.define('Cmf.service.Login', {
	
	requires: [
       'Ext.window.MessageBox',
       'Cmf.view.LoginWindow'
	],
	
	inject: ['bus'],
	
	config: {
		bus: null
	},

	
	constructor: function(config) {
		var me = this;
		
		config = config || {};
		me.initConfig(config);

		me.requestQueue = [];
		
		Ext.Ajax.on('requestexception', me.handleException, me);
		me.getBus().on('cmf.loginsuccess', me.processPendingRequests, me);
		me.getBus().on('cmf.logout', me.showLoginForm, me);
	},
	
	handleException: function(conn, response, options) {
		if(response.status != 403) {
			return;
		}
		var me = this,
			decoded,
			reason;
			
		try {
			decoded = Ext.JSON.decode(response.responseText);
		} catch(e) {
			return;
		}
		
		reason = decoded.reason;
		if(! reason) {
			return;
		}
		
		if(reason == "Must retry") {
			return me.processRequestDelayed(options);
		}
		
		me.addRequest(options);
		if(reason == "User Not Authenticated") {
			return me.showLoginForm();
		}
		if(reason == "User Not Allowed") {
			return me.changeLogin();
		}
	},
	
	addRequest : function(request) {
		request.operation.loginError = true;
		this.requestQueue.push(request);
	},
	
	processPendingRequests : function() {
		var me = this,
			queue = me.requestQueue,
			i = 0,
			ln = queue.length;
		
		for(; i < ln; i++) {
			me.processRequest(queue[i])
		}
		
		me.requestQueue = [];
	},
	
	processRequest : function(request) {
		delete(request.operation.loginError);
		Ext.Ajax.request(request);
	},
	
	processRequestDelayed: function(request) {
		request.operation.loginError = true;
		Ext.defer(this.processRequest, 100, this, [request]);
	},

	changeLogin : function() {
		Ext.Msg.show({
		     title:'Error',
		     msg: "You don't have enough privileges to do this operation. Do you want to change user?",
		     buttons: Ext.Msg.YESNO,
		     icon: Ext.Msg.ERROR,
		     scope : this,
		     fn: function(buttonId) {
				if(buttonId == "yes") { 
					this.showLoginForm(true);
		     	}
			 }
		});
	},

	showLoginForm : function(closable) {
		var me = this, form;
		
		if(! me.loginForm || me.loginForm.isDestroyed ) {
			me.loginForm = Ext.create('Cmf.view.LoginWindow',{
				closable: !!closable
			});
		}
			
		me.loginForm.show();
	}	
})