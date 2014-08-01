Ext.define('Siteeditor.helpers.window.History', {
	mixins: {
		observable : 'Ext.util.Observable'
	},
	
	config: {
		uxiframe : undefined
	},
	
	constructor: function(config) {
		var me = this;
		
		me.callParent(arguments);

		me.mixins.observable.constructor.call(this, config);
		
		me.addEvents(
			'beforeReady',
			'ready',
			'beforeChange',
			'change'
		);
		
		me.addHooks();
	},
	
	addHooks: function() {
		var me = this,
			w = me.getUxiframe().getWin(),
			originalHistoryAdd = w.History.add,
			originalHistoryInit = w.History.init,
			readyFunction;
		
		w.History.add = function(url) {
			if(url == "/404") {
				return;
			}
			originalHistoryAdd.apply(this, arguments);
		}
		
			
		w.History.init = function(onReady, onChange) {
			if(onReady !== readyFunction) {
				var originalReady = onReady, originalChange = onChange;
				
				readyFunction = onReady = function() {
					var url = w.History.getToken();
					
					me.fireEvent('beforeReady', url);
					me.fireEvent('beforeChange', url);
					
					originalReady.apply(this, arguments);
	
					me.fireEvent('ready', url);
//					me.fireEvent('change', me.getUxiframe(), url);
				};
				onChange = function(url) {
					if(me.fireEvent('beforeChange', url) !== false) {
						originalChange.apply(this, arguments);
					}
				};
				
				w.History.historyChanged = function(url, pageInfo) {
					me.fireEvent('change', url, pageInfo);
				}
			}
			originalHistoryInit.apply(this, arguments);
		};
	}
})
