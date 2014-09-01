Ext.define('Entities.service.EntityModelManager', {
	
    requires: [
        'Entities.proxy.Entity',
        'Ext.data.Model'
    ],
    
    inject: {
		contentTypes: 'entities_contentTypes',
		bus: 'bus'
	},

    constructor: function() {
		this.entities = {};
	},

	get: function(entityName) {
		return this.contentTypes.getById(entityName);
	},

	getModel: function(entityName) {
		return Ext.ModelManager.getModel(this.getName(entityName));
	},
	
	getName: function(entityName) {
		return this.contentTypes.getById(entityName).get('model');
	},

	wrap: function(model, options) {
		if(this.entities[model.type] && this.entities[model.type][model.id]) {
			Ext.callback(options.success, options.scope, [this.entities[model.type][model.id]]);
		}
		
		var entity = this.getModel(model.type), instance;
		
		entity.locked = true;
		if(model.id[0] == '_') {
			instance = new entity(model.getData());
			instance.setDirty(true);
			return this.onWrapped(instance, model, options);
		}
		
		entity.load(model.id, {
			success: function(record, operation) {
				this.onWrapped(record, model, options);
			},
			scope: this
		});
	},
	
	onWrapped: function(record, model, options) {
		this.entities[model.type] = this.entities[model.type] || {};
		this.entities[model.type][model.id] = record; 
		Ext.callback(options.success, options.scope, [record]);
	},

	load: function(entityName, id, options) {
		if(id[0] == '_') {
			console.error('Attempting to load a temporary entity: ' + entityName + ' with id: ' + id );
			return;
		}
		this.wrap({
			type: entityName,
			id: id
		}, options);
	},
	
	save: function() {
		var me = this,
			changeSet = me.computeChangeSet(me.newRecordsComparator);
		
		if(changeSet.length > 0) {
			return me.saveNewRecords(changeSet);
		}
		me.saveModifiedRecords();
	},
	
	saveNewRecords: function(records) {
		var me = this;
		
		me.doSave(records).then({
		    success: function(records) {
				me.saveModifiedRecords();
			},
		    failure: function(error) {
		    	console.error(error);
		    }
		}).done();
	},
	
	saveModifiedRecords: function() {
		var me = this,
			changeSet = me.computeChangeSet(me.dirtyRecordsComparator);
		
		me.doSave(changeSet).then({
		    success: function(records) {
				me.bus.fireEvent('entities.saved');
			},
		    failure: function(error) {
		    	console.error(error);
		    }
		}).done();
	},
	
	newRecordsComparator: function(record) {
		return ! record.get('id');
	},

	dirtyRecordsComparator: function(record) {
		return record.dirty;
	},
	
	doSave: function(changeSet) {
		var i = 0, ln = changeSet.length, promises = [];
		
		for(; i < ln; i++) {
			promises.push(this.saveEntity(changeSet[i]));
		}
		
		return Deft.Promise.all(promises);
	},
	
	saveEntity: function(record) {
		var deferred = Ext.create('Deft.Deferred');
		record.save({
			callback: function(records, operation, success) {
				if(success) {
					deferred.resolve();	
				} else {
					deferred.reject("Error saving entity " + record.get('id'));
				}
			}
		});
		
		return deferred.promise;
	},
	
	computeChangeSet: function(comparator) {
		var name, id, record, changed = [];
		
		for(name in this.entities) {
			for(id in this.entities[name]) {
				record = this.entities[name][id];
				comparator(record) && changed.push(record);
			}
		}
		return changed;
	}
});