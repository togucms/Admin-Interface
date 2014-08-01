Ext.define('Images.view.ImageUploaderDetails', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.cmf_images_imageuploaderdetails',

    width: 220,
    autoScroll: true,
	
	title : 'Details',
	
	detailsTpl : [
		'<tpl for=".">',
            '<div class="cmf-imageuploaderdetails-details">',
                '<b>File name:</b>',
                '<span>{name}</span>',
                '<b>Dimentions:</b>',
                '<span>{width}x{height}</span>',
                '<b>Size:</b>',
                '<span>{size}</span>',
                '<b>Type:</b>',
                '<span>{type}</span>',
                '<b>Modified:</b>',
                '<span>{lastModifiedDate}</span>',
            '</div>',
        '</tpl>'
	],

    loadRecord: function(record) {
    	var me = this,
    		file = record.get('file');
    	
    	if(me.record && me.record.id == record.id) {
    		return;
    	}
    	me.record = record;
    	
        me.body.hide();
        
        me.removeAll();
        
        me.add([{
			xtype : 'image',
			src : record.get('preview'),
			width: 180,
			margin : '10 0 10 10'
		},{
			margin: '10',
			xtype : 'form',
			border: false,
	        fieldDefaults: {
	            labelAlign: 'top',
	            flex : 1
	        },
	        defaults: {
	            border: false
	        },
	        layout: 'anchor',
		    defaultType: 'textfield',
			items: [{
				fieldLabel : 'Label',
				name : 'label',
				allowBlank : false
			}, {
				name : 'alt',
				fieldLabel : 'Alt'
			}]
		}, {
			xtype : 'component',
			tpl : me.detailsTpl,
			margin: '10',
			data : [{
				name : file.name,
				width : record.get('width'),
				height: record.get('height'),
				size : Ext.util.Format.fileSize(file.size),
				type : record.get('type'),
				lastModifiedDate : Ext.util.Format.date(file.lastModifiedDate, 'D d M Y H:i')
			}]
		}]);
        
        me.down('form').loadRecord(record);
        
        me.body.slideIn('l', {
            duration: 250
        });
    }
});