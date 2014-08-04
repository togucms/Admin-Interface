Ext.data.JsonP.Deft_promise_Deferred({"tagname":"class","name":"Deft.promise.Deferred","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Deferred.js","href":"Deferred.html#Deft-promise-Deferred"}],"aliases":{},"alternateClassNames":["Deft.Deferred"],"extends":"Ext.Base","mixins":[],"requires":["Deft.promise.Resolver"],"uses":[],"members":[{"name":"promise","tagname":"property","owner":"Deft.promise.Deferred","id":"property-promise","meta":{}},{"name":"constructor","tagname":"method","owner":"Deft.promise.Deferred","id":"method-constructor","meta":{}},{"name":"getPromise","tagname":"method","owner":"Deft.promise.Deferred","id":"method-getPromise","meta":{}},{"name":"reject","tagname":"method","owner":"Deft.promise.Deferred","id":"method-reject","meta":{}},{"name":"resolve","tagname":"method","owner":"Deft.promise.Deferred","id":"method-resolve","meta":{}},{"name":"update","tagname":"method","owner":"Deft.promise.Deferred","id":"method-update","meta":{}},{"name":"reject","tagname":"method","owner":"Deft.promise.Deferred","id":"static-method-reject","meta":{"static":true}},{"name":"resolve","tagname":"method","owner":"Deft.promise.Deferred","id":"static-method-resolve","meta":{"static":true}}],"code_type":"ext_define","id":"class-Deft.promise.Deferred","short_doc":"A Deferred is typically used within the body of a function that performs an\nasynchronous operation. ...","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Alternate names</h4><div class='alternate-class-name'>Deft.Deferred</div><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Deft.promise.Deferred</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Deft.promise.Resolver' rel='Deft.promise.Resolver' class='docClass'>Deft.promise.Resolver</a></div><h4>Files</h4><div class='dependency'><a href='source/Deferred.html#Deft-promise-Deferred' target='_blank'>Deferred.js</a></div></pre><div class='doc-contents'><p>A Deferred is typically used within the body of a function that performs an\nasynchronous operation. When that operation succeeds, the Deferred should be\nresolved; if that operation fails, the Deferred should be rejected.</p>\n\n<p>Once a Deferred has been resolved or rejected, it is considered to be complete\nand subsequent calls to resolve() or reject() are ignored.</p>\n\n<p>Deferreds are the mechanism used to create new Promises. A Deferred has a\nsingle associated Promise that can be safely returned to external consumers\nto ensure they do not interfere with the resolution or rejection of the deferred\noperation.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-promise' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-property-promise' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-property-promise' class='name expandable'>promise</a> : <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>The <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a> of a future value associated with this Deferred.</p>\n</div><div class='long'><p>The <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a> of a future value associated with this Deferred.</p>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Deft.promise.Deferred-method-constructor' class='name expandable'>Deft.promise.Deferred</a>( <span class='pre'></span> ) : <a href=\"#!/api/Deft.promise.Deferred\" rel=\"Deft.promise.Deferred\" class=\"docClass\">Deft.promise.Deferred</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.promise.Deferred\" rel=\"Deft.promise.Deferred\" class=\"docClass\">Deft.promise.Deferred</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getPromise' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-method-getPromise' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-method-getPromise' class='name expandable'>getPromise</a>( <span class='pre'></span> ) : <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Returns the Promise of a future value associated with this Deferred. ...</div><div class='long'><p>Returns the <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a> of a future value associated with this Deferred.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a></span><div class='sub-desc'><p>The Promise of the associated future value.</p>\n</div></li></ul></div></div></div><div id='method-reject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-method-reject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-method-reject' class='name expandable'>reject</a>( <span class='pre'>reason</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Rejects this Deferred's Promise with the specified reason. ...</div><div class='long'><p>Rejects this Deferred's <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a> with the specified reason.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>reason</span> : Error<div class='sub-desc'><p>The rejection reason.</p>\n</div></li></ul></div></div></div><div id='method-resolve' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-method-resolve' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-method-resolve' class='name expandable'>resolve</a>( <span class='pre'>value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Resolves this Deferred's Promise with the specified value. ...</div><div class='long'><p>Resolves this Deferred's <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a> with the specified value.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The resolved future value.</p>\n</div></li></ul></div></div></div><div id='method-update' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-method-update' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-method-update' class='name expandable'>update</a>( <span class='pre'>progress</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Updates progress for this Deferred's Promise, if it is still pending. ...</div><div class='long'><p>Updates progress for this Deferred's <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Promise</a>, if it is still pending.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>progress</span> : Mixed<div class='sub-desc'><p>The progress value.</p>\n</div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-reject' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-static-method-reject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-static-method-reject' class='name expandable'>reject</a>( <span class='pre'>reason</span> ) : <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a><span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Returns a new Deft.promise.Promise that rejects immediately with the specified reason. ...</div><div class='long'><p>Returns a new <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a> that rejects immediately with the specified reason.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>reason</span> : Error<div class='sub-desc'><p>The rejection reason.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a></span><div class='sub-desc'><p>Promise rejected with the specified reason.</p>\n</div></li></ul></div></div></div><div id='static-method-resolve' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.promise.Deferred'>Deft.promise.Deferred</span><br/><a href='source/Deferred.html#Deft-promise-Deferred-static-method-resolve' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.promise.Deferred-static-method-resolve' class='name expandable'>resolve</a>( <span class='pre'>value</span> ) : <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a><span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>Returns a new Deft.promise.Promise that resolves immediately with the specified value. ...</div><div class='long'><p>Returns a new <a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a> that resolves immediately with the specified value.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The resolved future value.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.promise.Promise\" rel=\"Deft.promise.Promise\" class=\"docClass\">Deft.promise.Promise</a></span><div class='sub-desc'><p>Promise resolved with the specified value.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});