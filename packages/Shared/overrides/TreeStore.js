Ext.define('Shared.overrides.TreeStore', {
	override: 'Ext.data.TreeStore',
	
	onProxyLoad: function(operation) {
		var successful = operation.wasSuccessful(),
			loginError = operation.loginError === true;
		if(successful || ! loginError) {
			this.callOverridden(arguments);
		}
	}

})