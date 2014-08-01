Ext.define('Cmf.view.Viewport', {
    extend: 'Ext.container.Viewport',
    
    requires:[
        'Ext.layout.container.Fit',
        'Cmf.view.Main'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'cmf-main'
    }]
});
