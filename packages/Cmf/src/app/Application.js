Ext.define("Cmf.app.Application", {
	extend: 'Ext.app.Application',
	
	requires: [
	   "Cmf.loader.Api",
	   "Cmf.loader.Models",
       "Cmf.view.Viewport",
       
       "Cmf.app.App",
       "Siteeditor.app.App",
       "Images.app.App",
       "Entities.app.App",
       
       'Shared.service.Link',
       'Shared.service.Image',
       
       'Cmf.store.ApplicationGroups',
       'Cmf.service.Login'
    ],
    
    namespaces: [ 'Cmf.app' ],
	
	init: function() {
		Deft.Injector.configure({
			bus : 'Ext.util.Observable',
			'cmfApplicationsStore' : 'Cmf.store.ApplicationGroups',
			'cmfLoginService': {
				className: 'Cmf.service.Login',
				eager: true
			},
			'linkService': 'Shared.service.Link',
			'imageService': 'Shared.service.Image'
		});
		
		Ext.create("Cmf.view.Viewport");
	}
});
