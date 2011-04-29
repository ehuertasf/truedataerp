Ext.onReady(function(){

	Ext.QuickTips.init();
	
	var item1 = new Ext.Panel({
                	title		: 'Area de Nodo',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('area_nodo')
	});

	var item2 = new Ext.Panel({
                	title		: 'Zonas',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('zona')
	});
	
	var panelZona = new Ext.Panel({
		                //title		: 'Zona',
						autoScroll 	: false,
						//width		: 80,
						collapsible	: false,
						collapsed	: false,
						renderTo	: 'map_zonas',
						items		: zona()
	            });
	
	var accordion = new Ext.Panel({
		region		: 'west',
        margins		: '5 0 5 5',
        split		: true,
        width		: 340,
        layout		: 'accordion',
		layoutConfig: {	animate			: false,
						titleCollapse 	: true
						},
		collapsible	: true,
        items		: [item1,item2]
	});
	
	var panel = new Ext.Panel({
		layout	:'border',
		defaults: {	collapsible: true,
				    split: true,
				    bodyStyle: 'padding:0px'},
		items: [accordion,{
		    //title		: 'Georeferencia',
		    collapsible	: true,
		    region		: 'center',
			contentEl	: 'win_ered',
		    margins		: '5 0 0 0'
		},{
		    title		: 'prueba',
		    collapsible	: true,
			collapsed	: true,
		    region		: 'east',
			width		: 200,
			height		: 50,
		    margins		: '5 0 0 0'
		}]
	});

	var win = new Ext.Window({
			layout		: 'fit',
			width		: 950,
			height		: 400,
			closeAction	: 'hide',
			plain		: true,
			items		: panel,
			y			: 165,
			title		: 'Registro de Areas de Nodos'
		});
    win.show();
	item1.expand(true);

});