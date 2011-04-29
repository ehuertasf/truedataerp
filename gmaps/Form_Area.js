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

function registro_ered(flag){
		switch (flag){
		case 'area_nodo'	: 

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
			
		frmArea = new Ext.FormPanel({
			id				: 'IdfrmArea',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			//labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			style			: 'padding:5px 5px 5px 5px',
			buttonAlign 	: 'right',
			buttons 		: [	{	text		: 'Grabar',
									handler		: function(){
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
			/*													
																var arrayrespuesta = respuesta.split(',');
																txt_nropedido.setValue(arrayrespuesta[1]);
																Ext.MessageBox.alert('Grabado', arrayrespuesta[0]+arrayrespuesta[1]);
																limpiar();
																*/
															},
															failure: function(result, request){
																Ext.MessageBox.alert('Fallo', 'Error al Area');
															}
														});
													},
				                 	disabled	: false },
								{	text		: 'Limpiar',
									handler		: function(){
														Ext.getCmp("IdfrmArea").getForm().reset();
														}},
								{	text		: 'Areas',
									handler		: function(){
													   	//ds_AreaNodoTodos.proxy= new Ext.data.HttpProxy({url: "query_combos.php?n=6&query=****"});
													  	//ds_AreaNodoTodos.load();
														//alert (ds_AreaNodoTodos.getCount());
														if (polygon) map.removeOverlay(polygon);
														ds_AreaNodoTodos.each(function(record){
															var puntosArea = record.data.puntos.split('|');
															area(puntosArea,record.data.color_linea, record.data.ancho_linea, record.data.transparencia_linea, record.data.color_area, record.data.transparencia_area,null,record.data.desc_area_nodo)
															//alert (record.data.desc_area_nodo);
														})
														}}						],
			items		: [{	layout:'column',
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
											
											/*{	xtype:'checkbox',
																id:'IdchkEstado',
																boxLabel :'Estado',
																hideLabel: true,
																checked:true
															}*/
										}]	
            				},
							{
            		xtype:'fieldset',
            		title: 'Configuracion del area',
            		collapsible: true,
            		autoHeight:true,
					layout	: 'form',
					items:[{	layout:'column',
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
            				}]},{
            		xtype:'fieldset',
            		title: 'Configuracion de la linea',
            		collapsible: true,
            		autoHeight:true,
					items:[{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'top',
							                //defaults	: {height:18},
							                //defaultType	: 'textfield',
							                items		: [cpColorLinea]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'top',
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [txtColorLinea]
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
							                items		: [ slAnchoLinea]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false, 
							                labelAlign	: 'left',
											labelWidth	: 90,
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtAnchoLinea]
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
							                items		: [ slOpacoLinea]
										},{	columnWidth	: .50,
							                layout		: 'form',
											border		: false, 
							                labelAlign	: 'left',
											labelWidth	: 90,
											defaults	: {height:18},
							                defaultType	: 'textfield',
							                items		: [ txtOpacoLinea]
										}]	
            				}]}]
			});
			return frmArea ;break;
	case 'zona'	: 

		txtNomZona = new Ext.form.TextField({
				id				: 'IdtxtNomZona',
				emptyText 		: '',
				allowBlank		: true,
				fieldLabel		: 'Nombre de Zona',
				labelSeparator	: '',
				height			: 18,
				anchor			: '90%'
			});

		var alto=23;
		
		var check_estado_zona = new Ext.form.Checkbox({
			boxLabel :'Estado',
			hideLabel: true,
			checked:true,
			disabled:true
		});
//		check_estado.checked = true;
			
		frmZona = new Ext.FormPanel({
			id				: 'IdfrmZona',
			frame			: false,        
			autoWidth		: true,
			autoHeight		: true,
			//labelWidth		: 55,
			waitMsgTarget	: true,
			border			: false,
			style			: 'padding:5px 5px 5px 5px',
			buttonAlign 	: 'right',
			buttons 		: [	{	text		: 'Grabar',
									handler		: function(){
														var flag=0;
														if (check_estado_zona.getValue()==true) flag=1;
	
														if (puntos.length==0) {alert ('No ha seleccionado puntos de zona');return;}
														if (trim(txtNomZona.getValue())=='') {alert ('Ingrese nombre de zona');return;}
	
														Ext.Ajax.request({
															url: 'query_procesos.php',
															method: 'POST',
															params: {
																n			: 2,
																nom_zona	: trim(txtNomZona.getValue()),
																estado		: flag,
																puntos_zona	: puntos.join('|')
															},
															success: function(result, request){var respuesta=result.responseText;alert (respuesta);},
															failure: function(result, request){Ext.MessageBox.alert('Fallo', 'Error al grabar Zona');}
														});
													},
				                 	disabled	: false },
								{	text		: 'Limpiar',
									handler		: function(){
														Ext.getCmp("IdfrmZona").getForm().reset();
														}}],
			items		: [{	layout:'column',
				            	border:false,
								//height:alto,
				                items:[{	columnWidth	: .75,
							                layout		: 'form',
											border		: false,
											labelAlign	: 'left',
							                items		: [ txtNomZona]
										},{	columnWidth	: .20,
							                layout		: 'form',
											border		: false,
							                labelAlign	: 'left',
							                items		: [ check_estado_zona]
										}]	
            				}]
			});
			return frmZona ;break;
	}
}