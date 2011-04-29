Ext.onReady(function(){

	Ext.QuickTips.init();
	/*
	var item1 = new Ext.Panel({
                	title		: 'Modem',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('modem')
	});

	var item2 = new Ext.Panel({
                	title		: 'Tap',
					//html		: '<a href="#" onclick="javascript:  document.getElementById(\'txtLongitud\').value=longitud_g;document.getElementById(\'txtLatitud\').value=latitud_g;">empty panel</a>',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('tap')
            });

	var item3 = new Ext.Panel({
	                title		: 'Amplificador',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('amplificador')
            });

    var item4 = new Ext.Panel({
	                title		: 'Nodo',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('nodo')
	});

    var item5 = new Ext.Panel({
	                title		: 'Cabecera',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('cabecera')
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
        width		: 400,
        layout		: 'accordion',
		layoutConfig: {	animate			: false,
					    //activeOnTop		: true,
						titleCollapse 	: true
						},
		collapsible	: true,
        items		: [item1, item2, item3, item4, item5]
	});
    */

	var panel = new Ext.Panel({
		layout	:'border',
		defaults: {	collapsible: true,
				    split: true,
				    bodyStyle: 'padding:0px'},
		items: [/*{
		//    title: 'cabecera',
			collapsible:false,
			frame:true,
		    region: 'north',
		    height: 50,
		    minSize: 50,
		    maxSize: 60,    
			cmargins: '5 0 0 0'
		},{
		    //title: 'Footer',
		    region: 'south',
		    height: 50,
		    minSize: 50,
		    maxSize: 60,
		    cmargins: '5 0 0 0'
		},accordion,*/
            {
		    //title		: 'Georeferencia',
		    collapsible	: true,
		    region		: 'center',
			contentEl	: 'win_ered',
		    margins		: '5 0 0 0'
		}/*,{
		    title		: 'prueba',
		    collapsible	: true,
			collapsed	: true,
		    region		: 'east',
			width		: 200,
			height		: 50,
		    margins		: '5 0 0 0'
		}*/]
	});

	var win = new Ext.Window({
			layout		: 'fit',
			width		: 950,
			height		: 400,
			closeAction	: 'hide',
			plain		: true,
			items		: panel,
			y			: 165,
			title		: 'Registro de Georeferencia'
		});
    win.show();


});