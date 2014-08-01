Ext.define('Images.view.ImageView', {
    extend: 'Ext.view.View',
    alias : 'widget.cmf_images_imageview',
    requires: ['Images.store.Images'],

    inject: {
        store: 'imageQuery'
    },
    
	emptyText : 'No images found',

    tpl: [
        '<tpl for=".">',
        	'<tpl if="this.showFolderName(queryType)" >',
	        	'<div class="folder-name">',
	        		'{[this.highlightName(values.query, values.folderName, values.queryType)]}',
	        	'</div>',
        	'</tpl>',
	        '<tpl for="images">',
	            '<div class="thumb-wrap">',
	                '<div class="thumb">',
	                    '<img src="{small.src}" />', 
	                '</div>',
	                '<div class="name">{[this.highlightName(parent.query, values.reference.name, parent.queryType, values.small.src)]}</div>',
	            '</div>',
	        '</tpl>',
        '</tpl>',
        {
        	highlightName: function(query, string, queryType, test) {
        		if(! this.showFolderName(queryType)) {
        			return string;
        		}
        		
        		var regexp = new RegExp(query, "i");
        		
        		return string.replace(regexp, '<span class="highlight" >$&</span>');
        	},
        	showFolderName : function(queryType) {
        		return queryType == "query";
        	}
        }
    ],
    
    collectData : function(records, startIndex){
        var me = this,
        	data = [],
            i = 0;

		me.store.each(function(record) {
			data[i] = me.prepareData(record.data, startIndex + i, record);
			i++;
		});
		
        return data;
    },    
	getRecord: function(node) {
		var me = this,
			viewRecordId = Ext.getDom(node).viewRecordId,
			targetRecord;
		
		me.store.each(function(record) {
			var r = record.images().data.getByKey(viewRecordId);
			if(r) {
				targetRecord = r;
				return false;
			}
		});
		return targetRecord;
	},
    
    onRender: function() {
    	var me = this;
    	
    	me.callParent(arguments);
    	
    	if(me.store) {
    		me.setMaskBind(me.store);
    	}
    },
    
    itemSelector: 'div.thumb-wrap',
    multiSelect: false,
    singleSelect: true,
    cls: 'x-image-view'
});
