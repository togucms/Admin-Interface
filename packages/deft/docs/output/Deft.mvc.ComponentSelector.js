Ext.data.JsonP.Deft_mvc_ComponentSelector({"tagname":"class","name":"Deft.mvc.ComponentSelector","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"ComponentSelector.js","href":"ComponentSelector.html#Deft-mvc-ComponentSelector"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["Deft.log.Logger","Deft.mvc.ComponentSelectorListener","Deft.util.Function","Ext.ComponentQuery"],"uses":[],"members":[{"name":"constructor","tagname":"method","owner":"Deft.mvc.ComponentSelector","id":"method-constructor","meta":{}},{"name":"addListener","tagname":"method","owner":"Deft.mvc.ComponentSelector","id":"method-addListener","meta":{}},{"name":"destroy","tagname":"method","owner":"Deft.mvc.ComponentSelector","id":"method-destroy","meta":{"private":true}},{"name":"findListener","tagname":"method","owner":"Deft.mvc.ComponentSelector","id":"method-findListener","meta":{"private":true}},{"name":"removeListener","tagname":"method","owner":"Deft.mvc.ComponentSelector","id":"method-removeListener","meta":{}}],"code_type":"ext_define","id":"class-Deft.mvc.ComponentSelector","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Deft.mvc.ComponentSelector</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/Deft.log.Logger' rel='Deft.log.Logger' class='docClass'>Deft.log.Logger</a></div><div class='dependency'><a href='#!/api/Deft.mvc.ComponentSelectorListener' rel='Deft.mvc.ComponentSelectorListener' class='docClass'>Deft.mvc.ComponentSelectorListener</a></div><div class='dependency'><a href='#!/api/Deft.util.Function' rel='Deft.util.Function' class='docClass'>Deft.util.Function</a></div><div class='dependency'>Ext.ComponentQuery</div><h4>Files</h4><div class='dependency'><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector' target='_blank'>ComponentSelector.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>Models a component selector used by <a href=\"#!/api/Deft.mvc.ViewController\" rel=\"Deft.mvc.ViewController\" class=\"docClass\">Deft.mvc.ViewController</a> to locate view components and attach event listeners.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.mvc.ComponentSelector'>Deft.mvc.ComponentSelector</span><br/><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Deft.mvc.ComponentSelector-method-constructor' class='name expandable'>Deft.mvc.ComponentSelector</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Deft.mvc.ComponentSelector\" rel=\"Deft.mvc.ComponentSelector\" class=\"docClass\">Deft.mvc.ComponentSelector</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Deft.mvc.ComponentSelector\" rel=\"Deft.mvc.ComponentSelector\" class=\"docClass\">Deft.mvc.ComponentSelector</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.mvc.ComponentSelector'>Deft.mvc.ComponentSelector</span><br/><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector-method-addListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.mvc.ComponentSelector-method-addListener' class='name expandable'>addListener</a>( <span class='pre'>eventName, fn, scope, options</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add an event listener to this component selector. ...</div><div class='long'><p>Add an event listener to this component selector.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>options</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-destroy' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.mvc.ComponentSelector'>Deft.mvc.ComponentSelector</span><br/><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.mvc.ComponentSelector-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-findListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.mvc.ComponentSelector'>Deft.mvc.ComponentSelector</span><br/><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector-method-findListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.mvc.ComponentSelector-method-findListener' class='name expandable'>findListener</a>( <span class='pre'>eventName, fn, scope</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-removeListener' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Deft.mvc.ComponentSelector'>Deft.mvc.ComponentSelector</span><br/><a href='source/ComponentSelector.html#Deft-mvc-ComponentSelector-method-removeListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Deft.mvc.ComponentSelector-method-removeListener' class='name expandable'>removeListener</a>( <span class='pre'>eventName, fn, scope</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Remove an event listener from this component selector. ...</div><div class='long'><p>Remove an event listener from this component selector.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fn</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});