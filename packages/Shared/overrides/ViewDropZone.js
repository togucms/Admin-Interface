Ext.define('Shared.view.ViewDropZone', {
    override: 'Ext.tree.ViewDropZone',

    isValidDropPoint: function(node, position, dragZone, e, data) {
    	var me = this;

        return me.callParent(arguments) && me.fireViewEvent('isvaliddroppoint', me.view, node, position, dragZone, e, data) !== false;       
    },	

    onContainerOver: function(source, e, data) {
        return this.dropNotAllowed;
    }
});
