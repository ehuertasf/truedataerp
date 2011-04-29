Ext.onReady(function(){

	Ext.QuickTips.init();


	var panel = new Ext.Panel({
		layout	:'border',
		defaults: {	collapsible: true,
				    split: true,
				    bodyStyle: 'padding:0px'},
		items: [
            {
		    collapsible	: true,
		    region		: 'center',
			contentEl	: 'win_ered',
		    margins		: '0 0 0 0'
		}]
	});

	var win = new Ext.Window({
			layout		: 'fit',
			width		: 950,
			height		: 400,
			closeAction	: 'hide',
			plain		: true,
			items		: panel,
			//y			: 165,
			title		: 'Registro de Georeferencia'
		});
    win.show();


});


