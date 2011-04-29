Ext.BLANK_IMAGE_URL = "../librerias/ext-2.2/resources/images/default/s.gif"
Ext.onReady(function(){

	Ext.QuickTips.init();
	//var item5,item6;
	
	item1 = new Ext.Panel({
                	title		: 'Modem',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('modem'),
					tbar		: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesModem',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoModem,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarModem,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditModem,
												{	//text		: 'Grabar',
													id			: 'btnGrabarModem',
													handler		: function(){graba_modem(9);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarModem',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionModem=='nuevo') nuevoModem();
														if (swAccionModem=='editar') editarModem();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarModem',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('IdElPadreTap='+IdElPadreTap+'_NomElPadreTap='+ NomElPadreTap);}}	*/
												]})						
	});

	item2 = new Ext.Panel({
                	title		: 'Tap',
					//html		: '<a href="#" onclick="javascript:  document.getElementById(\'txtLongitud\').value=longitud_g;document.getElementById(\'txtLatitud\').value=latitud_g;">empty panel</a>',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('tap'),
					tbar		: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesTap',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoTap,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarTap,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditTap,
												{	//text		: 'Grabar',
													id			: 'btnGrabarTap',
													handler		: function(){graba_tap(8);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarTap',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionTap=='nuevo') nuevoTap();
														if (swAccionTap=='editar') editarTap();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarTap',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('IdElPadreTap='+IdElPadreTap+'_NomElPadreTap='+ NomElPadreTap);}}	*/
												]})						
            });

	item3 = new Ext.Panel({
	                title		: 'Amplificador',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('amplificador'),
					tbar		: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesAmplif',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoAmplif,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarAmplif,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditAmplif,
												{	//text		: 'Grabar',
													id			: 'btnGrabarAmplif',
													handler		: function(){graba_amplificador(7);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarAmplif',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionAmplif=='nuevo') nuevoAmplif();
														if (swAccionAmplif=='editar') editarAmplif();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarAmplif',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('IdElPadreAmplif='+IdElPadreAmplificador+'_NomElPadreAmplif='+ NomElPadreAmplificador);}}	*/
												]})						
            });

    item4 = new Ext.Panel({
	                title		: 'Nodo',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('nodo'),
					tbar		: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesNodo',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoNodo,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarNodo,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditNodo,
												{	//text		: 'Grabar',
													id			: 'btnGrabarNodo',
													handler		: function(){graba_nodo(6);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarNodo',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionNodo=='nuevo') nuevoNodo();
														if (swAccionNodo=='editar') editarNodo();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarNodo',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('IdElPadreNodo='+IdElPadreNodo+'_NomElPadreNodo='+ NomElPadreNodo);}}	*/
												]})						
	});

    item5 = new Ext.Panel({
	                title		: 'Hub',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('hub'),
					tbar			: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesHub',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoHub,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarHub,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditHub,
												{	//text		: 'Grabar',
													id			: 'btnGrabarHub',
													handler		: function(){graba_hub(10);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarHub',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionHub=='nuevo') nuevoHub();
														if (swAccionHub=='editar') editarHub();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarHub',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('IdElPadreHub2='+IdElPadreHub2+'_IdElPadreHub='+IdElPadreHub);}	*/
												]})					
            });




  	item6 = new Ext.Panel({
	                title		: 'Cabecera',
					autoScroll 	: true,
					collapsed	: true,
					items		: registro_ered('cabecera'),
					tbar			: new Ext.Toolbar({
									 	style : 'background:#F2F3EF',	
										items:[{xtype: 'tbsplit',
											   	id	:	'IdOpcionesCabecera',
												text: 'Opciones',
												width:100,
											   	menu: new Ext.menu.Menu({
											        items: [{text: 'Nuevo', handler: nuevoCabecera,iconCls : 'nuevo'},
													        {text: 'Editar', handler: editarCabecera,iconCls : 'editar'}]
											   	})},
												{xtype: 'tbfill'},
												cboEditCabecera,
												{	//text		: 'Grabar',
													id			: 'btnGrabarCabecera',
													handler		: function(){graba_cabecera(5);},
													hidden 		: true,
													tooltip 	: 'Grabar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/save.gif',
													disabled	: false },
												{	//text: 'Limpiar',
													id			: 'btnLimpiarCabecera',
													hidden 		: true,
													tooltip 	: 'Limpiar',
													tooltipType : 'title', 
													cls			: 'x-btn-icon',
													icon		: '../imagenes/limpiar.gif',
													handler		: function(){
														//limpiar_cabecera();
														if (swAccionCabecera=='nuevo') nuevoCabecera();
														if (swAccionCabecera=='editar') editarCabecera();
														}},
												{xtype: 'tbseparator'},
												{	//text: 'Eliminar',
													id			: 'btnEliminarCabecera',
													hidden 		: true,
													tooltip 	: 'Eliminar',
													tooltipType : 'title',
													cls			: 'x-btn-icon',
													icon		: '../imagenes/eliminar.gif',
													handler		: function(){alert('Eliminar');}}
												/*,{	text: 'aaa',
													hidden 	:false,
													handler: function(){alert('Accion='+swAccionCabecera+'Id='+IdEditCabecera);}}	*/
												]})
            });
	
	var item7 = new Ext.Panel({
	                id			: 'Ideditar',
					//title		: 'Editar',
					autoScroll 	: true,
					collapsed	: false,
					items		: registro_ered('editar')
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
         items		: [item1, item2, item3, item4, item5, item6]
	});


	var panel = new Ext.Panel({
		layout	:'border',
		defaults: {	collapsible: true,
				    split: true,
				    bodyStyle: 'padding:0px'},
		items: [/*{
		//    title: 'cabecera',
			id:'ee',
			collapsible:true,
			collapsed	: true,
			//frame:true,
		    region: 'north',
		     autoHeight: true,
		    //minSize: 50,
		    //maxSize: 60,    
			cmargins: '5 0 0 0'
			,items	:item7
		},*//*{
		    //title: 'Footer',
		    region: 'south',
		    height: 50,
		    minSize: 50,
		    maxSize: 60,
		    cmargins: '5 0 0 0'
		},*/accordion,{
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
			title		: 'Registro de Elementos de Red'
		});
    win.show();
	
});