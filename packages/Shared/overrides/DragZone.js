Ext.define('Shared.overrides.DragZone', {
	override: 'Ext.view.DragZone',
	
	onStartDrag : function(x,y) {
		var me = this;
		me.callParent(arguments);
		me.view.fireEvent('startdrag', me.view);
	},
	
	endDrag : function() {
		var me = this;
		me.callParent(arguments);
		me.view.fireEvent('enddrag', me.view);
	}
});
