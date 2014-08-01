Ext.define('Cmf.loader.Models', {
    requires: ['Ext.data.Model']
}, function() {
    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;

    Loader.loadScriptFile('../../extjs/generateModel.js', Ext.emptyFn, Ext.emptyFn, null, true);
    Loader.isLoading = wasLoading;
});