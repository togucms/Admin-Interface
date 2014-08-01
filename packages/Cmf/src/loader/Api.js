Ext.define('Cmf.loader.Api', {
    requires: ['Ext.direct.*']
}, function() {
    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;

    Loader.loadScriptFile('../../extjs/remoteapi.js', Ext.emptyFn, Ext.emptyFn, null, true);
    Loader.isLoading = wasLoading;
});