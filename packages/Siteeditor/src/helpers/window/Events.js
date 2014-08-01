Ext.define('Siteeditor.helpers.window.Events', {
	mixins: {
		observable : 'Ext.util.Observable'
	},

	inject: ['bus'],
	
	config: {
		uxiframe : undefined,
		eventsDisabled: false
	},
	
	delayedTimers : [],

	constructor: function(config) {
		var me = this;
		
		me.callParent(arguments);

		me.mixins.observable.constructor.call(this, config);
		
		me.addEvents(
			'event',
			'setTimeout',
			'setInterval',
			'requestAnimationFrame'
		);
		
		me.addHooks();
		
		me.bus.on({
			scope: me,
			'cmf.images.imagebrowser.startdrag' : me.onImageStartDrag,
			'cmf.images.imagebrowser.enddrag' : me.onImageEndDrag
		});
	},
	
	onImageStartDrag : function(view) {
		this.setEventsDisabled(true);
	},
	onImageEndDrag : function(view) {
		this.setEventsDisabled(false);
	},
	
	
	checkTimerDisabled : function(callback, addToQueue) {
		var me = this, 
			oldCallback = callback;

		callback = function() {
			if(me.eventsDisabled === true) {
				if(addToQueue) {
					me.delayedTimers.push({
						callback: oldCallback,
						context : this,
						arguments : arguments
					});
				}
				return;
			}
			if(! typeof oldCallback === "function") {
				var f = new Function(oldCallback);
				f();
				return;
			}
			return oldCallback.apply(this, arguments);
		};
		return callback;
	},

	applyEventsDisabled: function(disabled) {
		var me = this, ln, timer, i=0;
		disabled = !!disabled;
		
		me.eventsDisabled = !!disabled;
		
		if(disabled === false) {
			ln = me.delayedTimers.length;
			for(; i < ln; i++) {
				timer = me.delayedTimers.shift();
				timer.callback.apply(timer.scope, timer.arguments);
			}
		}
	},

	addHooks: function() {
		var me = this,
			w = me.getUxiframe().getWin(),
			doc = me.getUxiframe().getDoc(),
			jQ = w.$,
			oldDispatch = jQ.event.dispatch, 
			oldSetTimeout = w.setTimeout,
			oldSetInterval = w.setInterval,
			oldRequestAnimationFrame = w.requestAnimationFrame;
		
		jQ.event.dispatch = function(event) {
			if(event.shiftKey === true) {
				if(event.type == "click" && event.currentTarget !== doc && jQ(event.currentTarget).is('a')) {
					event.preventDefault();
				}
				jQ(event.target).trigger("shift." + event.type);
				return false;
			}
			oldDispatch.apply(this, arguments);
		};

		w.requestAnimationFrame = function(callback) {
			if(me.fireEvent('requestAnimationFrame', me.getUxiframe(), arguments) === false) {
				return oldRequestAnimationFrame.apply(this, arguments);				
			};

			callback = me.checkTimerDisabled(callback, true);
			return oldRequestAnimationFrame.apply(this, arguments);
		}; 
		
		me.getUxiframe().addEvents('settimeout');
		if(oldSetTimeout.apply) {
			w.setTimeout = function(callback, timeout) {
				if(me.fireEvent('setTimeout', me.getUxiframe(), callback) === false){
					return oldSetTimeout.apply(this, arguments);	
				}
	
				callback = me.checkTimerDisabled(callback, true);
				return oldSetTimeout.apply(this, arguments);
			};
		} else {
			// IE...
			w.setTimeout = function(callback, timeout) {
				if(me.fireEvent('setTimeout', me.getUxiframe(), callback) === false){
					return oldSetTimeout(callback, timeout);	
				}
	
				callback = me.checkTimerDisabled(callback, true);
				return oldSetTimeout(callback, timeout);
			};
		}
		
		
		if(oldSetInterval.apply) {
			w.setInterval = function(callback) {
				if(me.fireEvent('setInterval', me.getUxiframe(), arguments) === false) {
					return oldSetInterval.apply(this, arguments);
				}
	
				callback = me.checkTimerDisabled(callback, true);
				return oldSetInterval.apply(this, arguments);
			};
		} else {
			// IE...
			w.setInterval = function(callback, timeout) {
				if(me.fireEvent('setInterval', me.getUxiframe(), arguments) === false) {
					return oldSetInterval(callback, timeout);
				}
	
				callback = me.checkTimerDisabled(callback, true);
				return oldSetInterval(callback, timeout);
			};
		}
		
	}
});
