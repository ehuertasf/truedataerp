
/**
 * @author Bedwer
 */

ds_AreaNodoTodos = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=6&query=****'}),
        reader: new Ext.data.JsonReader({
            root			: 'area_nodo',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'id_area_nodo', mapping: 'id_area_nodo'},
				{name: 'desc_area_nodo', mapping: 'desc_area_nodo'},
				{name: 'color_area', mapping: 'color_area'},
				{name: 'transparencia_area', mapping: 'transparencia_area'},
				{name: 'color_linea', mapping: 'color_linea'},
				{name: 'transparencia_linea', mapping: 'transparencia_linea'},
				{name: 'ancho_linea', mapping: 'ancho_linea'},
				{name: 'puntos', mapping: 'puntos'}
        ]),
		autoLoad:true
});
/*
ds_BuscaCabecera = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'query_combos.php?n=6&query=****'}),
        reader: new Ext.data.JsonReader({
            root			: 'area_nodo',
            totalProperty	: 'totalCount',
            id				: 'id'
        }, [	{name: 'id', mapping: 'id'},
            	{name: 'id_area_nodo', mapping: 'id_area_nodo'},
				{name: 'desc_area_nodo', mapping: 'desc_area_nodo'},
				{name: 'color_area', mapping: 'color_area'},
				{name: 'transparencia_area', mapping: 'transparencia_area'},
				{name: 'color_linea', mapping: 'color_linea'},
				{name: 'transparencia_linea', mapping: 'transparencia_linea'},
				{name: 'ancho_linea', mapping: 'ancho_linea'},
				{name: 'puntos', mapping: 'puntos'}
        ]),
		autoLoad:true
});
*/

var ds_Nodo=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=8&ered=4"}),
			reader		: new Ext.data.JsonReader({root: 'results'}, [
		        {name: 'id', mapping: 'id'},
				{name: 'descripcion', mapping: 'descripcion'},
				{name: 'elemento', mapping: 'elemento'}
			    ]),
			autoLoad	:true
});

var ds_Amplificador=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=8&ered=3"}),
			reader		: new Ext.data.JsonReader({root: 'results'}, [
		        {name: 'id', mapping: 'id'},
				{name: 'descripcion', mapping: 'descripcion'},
				{name: 'elemento', mapping: 'elemento'}
			    ]),
			autoLoad	:false
});

var ds_Tap=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=8&ered=2"}),
			reader		: new Ext.data.JsonReader({root: 'results'}, [
		        {name: 'id', mapping: 'id'},
				{name: 'descripcion', mapping: 'descripcion'},
				{name: 'elemento', mapping: 'elemento'}
			    ]),
			autoLoad	:false
});

var ds_Modem=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query_combos.php?n=8&ered=1"}),
			reader		: new Ext.data.JsonReader({root: 'results'}, [
		        {name: 'id', mapping: 'id'},
				{name: 'descripcion', mapping: 'descripcion'},
				{name: 'elemento', mapping: 'elemento'}
			    ]),
			autoLoad	:false
});

function registro_ered(flag){
		switch (flag){
		case 'area_nodo'	: 
/*
			cbo_FiltroNodo = new Ext.ux.Andrie.Select(Ext.applyIf({
				id				: 'Idcbo_FiltroNodo',
			    fieldLabel		: 'Nodo',
				store			: ds_Nodo,
				multiSelect		: false,
			    displayField	:'descripcion',
				valueField		: 'id',
			    typeAhead		: true,
			    mode			: 'remote',
			    triggerAction	: 'all',
				anchor			: '99%',
			    emptyText		:'Filtro Nodo...'
				//minLength		:1,
				//editable 		: true,
				//forceSelection : true,
				//hideTrigger 	: false, 
				//lazyRender 	: true, 
			    //selectOnFocus	:true
			}));
	*/		
			 cbo_FiltroNodo = new Ext.form.ComboBox({//Ext.ux.Andrie.Select(Ext.applyIf({ 
				id				: 'Idcbo_FiltroNodo',
		        fieldLabel		: 'Nodo',
				store			: ds_Nodo,
				//allowBlank		: false,
				multiSelect		: false,
		        displayField	: 'descripcion',
				valueField		: 'id',
		        typeAhead		: true,
		        mode			: 'local',
		        triggerAction	: 'all',
		        emptyText		: 'Filtro Nodo...',
				anchor			: '99%',
		        editable 		: true,
				forceSelection 	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				listeners: {
					/*change: function(){
						ds_Amplificador.removeAll();
						ds_Tap.removeAll();},*/
					select: function(obj,record,index){
/*						cbo_FiltroAmplificador.reset;
						cbo_FiltroTap.reset;
*/						
						ds_Amplificador.reset;
						ds_Tap.reset;
						cbo_FiltroAmplificador.setValue('');
						cbo_FiltroTap.setValue('');
						xIdNodo = record.data.id //cbo_FiltroNodo.value;
						xelemento = record.data.elemento
						ds_Amplificador.proxy = new Ext.data.HttpProxy({url: 'query_combos.php?n=8&ered=3&ered_padre='+xelemento+'&query=' + xIdNodo});
						ds_Amplificador.load();
						ds_Tap.proxy = new Ext.data.HttpProxy({url: 'query_combos.php?n=8&ered=2&ered_padre='+xelemento+'&query=' + xIdNodo});
						ds_Tap.load();
					}
				}
		    });
			/*
			cbo_FiltroNodo.on('blur',
				function(obj){if(obj.getValue()==''){
						alert('fsfs');
						ds_Amplificador.removeAll();
						ds_Tap.removeAll();
						cbo_FiltroAmplificador.setValue('');
						cbo_FiltroTap.setValue('');
						
					} }
			);
			
			cbo_FiltroNodo.on('valid',
				function(obj){if(obj.getValue()==''){
						alert('VALIDO');
					} }
			);
*/

			 cbo_FiltroAmplificador = new Ext.form.ComboBox({//Ext.ux.Andrie.Select(Ext.applyIf({ //Ext.form.ComboBox({
				id				: 'Idcbo_FiltroAmplificador',
		        fieldLabel		: 'Amplificador',
				store			: ds_Amplificador,
				multiSelect		: false,
		        displayField	: 'descripcion',
				valueField		: 'id',
		        typeAhead		: true,
		        mode			: 'local',
		        triggerAction	: 'all',
		        emptyText		: 'Filtro Amplificador...',
				anchor			: '99%',
		        editable 		: true,
				forceSelection 	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true,
				listeners: {
					select: function(obj,record,index){
						ds_Tap.reset;
						cbo_FiltroTap.setValue('');
						
						xIdAmplificador = record.data.id //cbo_FiltroNodo.value;
						xelemento = record.data.elemento
						ds_Tap.proxy = new Ext.data.HttpProxy({url: 'query_combos.php?n=8&ered=2&ered_padre='+xelemento+'&query=' + xIdAmplificador});
						ds_Tap.load();
					}
				}
		    });
/*
		
			cbo_FiltroAmplificador = new Ext.ux.Andrie.Select(Ext.applyIf({
				id				: 'Idcbo_FiltroAmplificador',
			    fieldLabel		: 'Amplificador',
				store			: ds_Amplificador,
				multiSelect		:true,
			    displayField	:'descripcion',
				valueField		: 'id',
			    typeAhead		: true,
			    mode			: 'remote',
			    triggerAction	: 'all',
				anchor			: '99%',
			    emptyText		:'Filtro Amplificador...'
				//minLength		:1,
				//editable 		: true,
				//forceSelection : true,
				//hideTrigger 	: false, 
				//lazyRender 	: true, 
			    //selectOnFocus	:true
			}));
	*/		
		/*
			cbo_FiltroTap = new Ext.ux.Andrie.Select(Ext.applyIf({
				id				: 'Idcbo_FiltroTap',
			    fieldLabel		: 'Tap',
				store			: ds_Tap,
				multiSelect		: false,
			    displayField	:'descripcion',
				valueField		: 'id',
			    typeAhead		: true,
			    mode			: 'remote',
			    triggerAction	: 'all',
				anchor			: '99%',
			    emptyText		:'Filtro Tap...'
				//minLength		:1,
				//editable 		: true,
				//forceSelection : true,
				//hideTrigger 	: false, 
				//lazyRender 	: true, 
			    //selectOnFocus	:true
			}));
			*/
			cbo_FiltroTap = new Ext.form.ComboBox({//Ext.ux.Andrie.Select(Ext.applyIf({ 
				id				: 'Idcbo_FiltroTap',
		        fieldLabel		: 'Tap',
				store			: ds_Tap,
				multiSelect		: false,
		        displayField	: 'descripcion',
				valueField		: 'id',
		        typeAhead		: true,
		        mode			: 'local',
		        triggerAction	: 'all',
		        emptyText		: 'Filtro Tap...',
				anchor			: '99%',
		        editable 		: true,
				forceSelection 	: true,
				hideTrigger 	: false, 
				lazyRender 		: true,
		        selectOnFocus	: true
				/*listeners: {
					select: function(obj,record,index){
						cbo_FiltroTap.reset;
						xIdAmplificador = record.data.id //cbo_FiltroNodo.value;
						xelemento = record.data.elemento
						ds_Tap.proxy = new Ext.data.HttpProxy({url: 'query_combos.php?n=8&ered=2&ered_padre='+xelemento+'&query=' + xIdAmplificador});
						ds_Tap.load();
					}
				}*/
		    });
			
			
			cbo_FiltroModem = new Ext.ux.Andrie.Select(Ext.applyIf({
				id				: 'Idcbo_FiltroModem',
			    fieldLabel		: 'Modem',
				store			: ds_Modem,
				multiSelect		:true,
			    displayField	:'descripcion',
				valueField		: 'id',
			    typeAhead		: true,
			    mode			: 'remote',
			    triggerAction	: 'all',
				anchor			: '99%',
			    emptyText		:'Filtro Modem...'
				//minLength		:1,
				//editable 		: true,
				//forceSelection : true,
				//hideTrigger 	: false, 
				//lazyRender 	: true, 
			    //selectOnFocus	:true
			}));
			
/*
			txtNomArea = new Ext.form.TextField({
				id				: 'IdtxtNomArea',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre del Area',
				labelSeparator	: '',
				height			: 18,
				anchor			: '90%'
			});

			//var chkEstadoArea = new Ext.form.CheckBox();
			
			txtColorLinea = new Ext.form.TextField({
				id				: 'IdtxtColorLinea',
				readOnly		: true,
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Color de Linea',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});

			txtColorArea = new Ext.form.TextField({
				id				: 'IdtxtColorArea',
				readOnly		: true,
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Color de Area',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});
			
			txtAnchoLinea = new Ext.form.TextField({
				id				: 'IdtxtAnchoLinea',
				readOnly		: true,
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Ancho de Linea',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});

			txtOpacoLinea = new Ext.form.TextField({
				id				: 'IdtxtOpacoLinea ',
				readOnly		: true,
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Transp. Linea',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});

			txtOpacoArea = new Ext.form.TextField({
				id				: 'IdtxtOpacoArea',
				readOnly		: true,
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Transp. Area',
				labelSeparator	: '',
				height			: 18,
				anchor			: '99%'
			});
					
			cpColorLinea = new Ext.ColorPalette({value:'#FF0000'});  // initial selected color
			cpColorArea  = new Ext.ColorPalette({value:'#FFFF00'});  // initial selected color

			cpColorLinea.on('select', function(palette, selColor){
				colorLinea='#'+selColor;
				txtColorLinea.setValue(colorLinea);
			});
			
			cpColorArea.on('select', function(palette, selColor){
				colorArea='#'+selColor;
				txtColorArea.setValue(colorArea);
			});

			
			slAnchoLinea = new Ext.Slider({
				value: 5,
			    increment: 1,
			    minValue: 0,
			    maxValue: 50,
				anchor: '94%'
			});	

			slAnchoLinea.on('change', function(obj, value){
				AnchoLinea=value;
				txtAnchoLinea.setValue(AnchoLinea);
				//	Ext.getDom('txtSliderValue').value=value/10;
			});
			
			slOpacoLinea = new Ext.Slider({
			    value: 5,
			    increment: 1,
			    minValue: 0,
			    maxValue: 10,
				anchor: '94%'
			});	

			slOpacoLinea.on('change', function(obj, value){
				OpacoLinea=value/10;
			 	txtOpacoLinea.setValue(OpacoLinea);
			});
		
			slOpacoArea = new Ext.Slider({
			    value: 5,
			    increment: 1,
			    minValue: 0,
			    maxValue: 10,
				anchor: '94%'
			});	

			slOpacoArea.on('change', function(obj, value){
				OpacoArea=value/10;
			 	txtOpacoArea.setValue(OpacoArea);
			});
		
		
		txtAnchoLinea.setValue(slAnchoLinea.getValue());
		txtOpacoLinea.setValue(slOpacoLinea.getValue()/10);
		txtOpacoArea.setValue(slOpacoArea.getValue()/10);
		
			
		var alto=23;
		var check_estado = new Ext.form.Checkbox({
			boxLabel :'Estado',
			hideLabel: true,
			checked:true,
			disabled:true
		});
//		check_estado.checked = true;
*/			
		frmFiltro	= new Ext.FormPanel({
			id				: 'IdfrmFiltro',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			//labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			style			: 'padding:5px 5px 5px 5px',
/*			buttonAlign 	: 'right',
			buttons 		: [	{	text		: 'Buscar',
									handler		: function(){
														alert('Buscar')

														var flag=0;
														if (check_estado.getValue()==true) flag=1;
	
														if (puntos.length==0) {alert ('No ha seleccionado puntos del area');return;}
														if (trim(txtNomArea.getValue())=='') {alert ('Ingrese nombre del area');return;}
	
														Ext.Ajax.request({
															url: 'query_procesos.php',
															method: 'POST',
															params: {
																n			: 1,
																nom_area	: trim(txtNomArea.getValue()),
																estado		: flag,
																color_area	: trim(txtColorArea.getValue()),
																transp_area	: trim(txtOpacoArea.getValue()),
																color_linea	: trim(txtColorLinea.getValue()),
																transp_linea: trim(txtOpacoLinea.getValue()),
																ancho_linea	: trim(txtAnchoLinea.getValue()),
																puntos_area	: puntos.join('|')
															},
															
															success: function(result, request){
																var respuesta=result.responseText;
																alert (respuesta);
															},
															failure: function(result, request){
																Ext.MessageBox.alert('Fallo', 'Error al Area');
															}
														});

													},
				                 	disabled	: false },
								{	text		: 'Limpiar',
									handler		: function(){ 
														Ext.getCmp("IdfrmFiltro").getForm().reset();
														}
								}],
						*/		
			items		: [/*{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .75,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [ txtNomArea ]
										},{	columnWidth	: .20,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
											//defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [check_estado]
										}]	
            				},*/
							{
            		xtype:'fieldset',
            		title: 'Filtro',
            		collapsible: true,
            		autoHeight:true,
					layout	: 'form',
					anchor	: '99%',
					items:[/*{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [ cpColorArea]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'top',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtColorArea]
										}]	
            				},{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [ slOpacoArea]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false, 
							                labelAlign	: 'left',
											labelWidth	: 90,
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtOpacoArea]
										}]	
            				}*/
							{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [ cbo_FiltroNodo]
										}]	
            				},{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'top',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cbo_FiltroAmplificador]
										}]	
            				},{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'top',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ cbo_FiltroTap]
										}]	
            				},{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
											buttonAlign 	: 'right',
											buttons 		: [	{	text		: 'Buscar',
																	handler		: function(){
																						//load(idNodo, idAmplif, idTap);
																						//alert('NODO='+ cbo_FiltroNodo.getValue()+'_AMPLIF='+ cbo_FiltroAmplificador.getValue()+'_TAP='+ cbo_FiltroTap.getValue());
																						if (cbo_FiltroTap.getValue()!='')
																							load(cbo_FiltroNodo.getValue(), cbo_FiltroAmplificador.getValue(), cbo_FiltroTap.getValue());
																						else 
																							alert('Seleccione Tap');
																						
																					},
						                 							disabled	: false },
																{	text		: 'Limpiar',
																	handler		: function(){ 
																						alert('limpiar');
																						}
																}]
										}]	
            				}]},{
            		xtype:'fieldset',
            		title: 'Modem',
            		collapsible: true,
            		autoHeight:true,
					anchor	: '99%',
					items:[{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [cbo_FiltroModem]
										}]	
            				},{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .99,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
											buttonAlign 	: 'right',
											buttons 		: [	{	text		: 'Buscar',
																	handler		: function(){
																						alert('Buscar Modem');
																					},
						                 							disabled	: false },
																{	text		: 'Limpiar',
																	handler		: function(){ 
																						alert('Limpiar Modem');
																						}
																}]
										}]	
            				}]}]
			});
			return frmFiltro;break;
	}
}