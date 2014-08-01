Ext.define('Shared.view.Window', {
	
	extend: 'Ext.window.Window',
	
	xtype : 'shared-window',

    maximizable : true,
    constrainHeader : true,
	cmfWindow : true,
	
	renderTo: 'mainpanel',

    doClose : function ()  {
    	var me = this;
    	
        me.doClose = Ext.emptyFn;
        me.el.disableShadow();
        me.el.fadeOut({
            listeners: {
                afteranimate: function () {
                    me.destroy();
                }
            }
        });
    }
})
