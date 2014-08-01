Ext.define('Siteeditor.model.Controllers', {
    extend: 'Ext.data.Model',
    requires : [
    	"Siteeditor.model.ControllerChilds"
    ],
    
    inject : { componentsStore: 'siteeditor.componentsStore' },
    
	fields: [
		{ name : "className", type : 'string' },
		{ name : "defaultComponent", type : 'string' },
		{ name : "defaultLabel", type : 'string' },
		{ name : "controller", type : 'string' },
		{ name : "orderPrefix", type : 'string' },
		{ name : "iconCls", type : "string" },
		{ name : "changeHandler", type : 'string', defaultValue: 'Siteeditor.sitecontroller.changehandler.Base' },
		{ name : "isPage", type : 'boolean', defaultValue: false },
		{ name : "isGroup", type : 'boolean', defaultValue: false },
		{ name : "canBeRemoved", type : 'boolean', defaultValue: true },
		{ name : "pageType", type : 'string', defaultValue : 'default' },
		{ name : "defaultPage", type : 'boolean', defaultValue: false },
		{ name : "ordered", type : 'boolean', defaultValue: false }
	],
	hasMany: [
		{ name : "globalFields", associationKey : "fields", model: "Siteeditor.model.ComponentField" },
		{ name : "childControllers", associationKey : "childControllers", model : 'Siteeditor.model.ControllerChilds' }
	],
	
	inheritableStatics : {
		defaultId : {
			id : 0
		}
	},
	createStructure : function() {
		var me = this;
		return {
			type : me.get('id'),
			id : '_controller_' + (me.self.defaultId.id++),
			initialized : false,
			component : null,
			globalConfig : {
				data : {}
			}
		};
	},
	
	createController: function(objects) {
		var me = this,
			data = me.createStructure(),
			fields = me.globalFields(),
			componentModel = me.componentsStore.getById(me.get('defaultComponent'));
		
		objects[data.id] = data;

		if(me.get('isGroup') === true) {
			return { id : data.id };
		}
		
		data.component = componentModel.createComponent(objects);
		
		fields.each(function(field) {
			field.get('fieldModel').onFieldCreated(data.globalConfig);
		});
		
		return { id : data.id };
	}
});
