Ext.define('Images.view.DraggableImageView', {
    extend: 'Images.view.ImageView',
    alias : 'widget.cmf_images_draggableimageview',

    mixins: {
        dragSelector: 'Ext.ux.DataView.DragSelector',
        draggable   : 'Ext.ux.DataView.Draggable'
    },

    requires : [
        'Images.controller.DraggableImageView',
        
        'Images.controller.DraggableImageView'
	],
    controller: 'Images.controller.DraggableImageView',
  	
    initComponent: function() {
    	var me = this;

    	me.mixins.dragSelector.init(me);
        me.mixins.draggable.init(me, {
            ddConfig: {
                ddGroup: 'imageViewDD',
                onStartDrag: function(x, y) {
                	me.fireEvent('startdrag', me);
                },
                endDrag : function() {
                	me.fireEvent('enddrag', me);
                }
            },
            ghostTpl: [
                '<tpl for=".">',
                    '<img width="76" src="{src}" />',
                    '<tpl if="xindex % 4 == 0"><br /></tpl>',
                '</tpl>',
                '<div class="count">',
                    '{[values.length]} images selected',
                '<div>'
            ]
        });
        
        me.callParent();
    }
});
