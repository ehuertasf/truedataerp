Ext.BLANK_IMAGE_URL = "librerias/extjs/resources/images/default/s.gif"

Ext.onReady(function(){
var win;	
var usuario=Ext.getDom('usuario').value;
var idusuario=Ext.getDom('idusuario').value;
var idperfil=Ext.getDom('idperfil').value;

var summary = new Ext.grid.GroupSummary(); 

var cm_bandeja = new Ext.grid.ColumnModel([
		{header: "Nro.Nota.Ped.",dataIndex: 'idnotapedido',sortable: true,width: 40,align:'center'},
		{header: "Almacen",dataIndex: 'desc_almacen',sortable: true,width: 45,align:'center'},
		{header: "IdCli",dataIndex: 'idcliente',sortable: false,width: 40,align:'center',hidden:true},
		{id:'nombre',header: "Cliente",dataIndex: 'nombre',sortable: true,width: 100,summaryType:'count',
			summaryRenderer: function(v, params, data){
                    return ((v === 0 || v > 1) ? v +' Registros' : '1 Registro');
                }},
		{header: "Forma Pago",dataIndex: 'desc_pago',sortable: true,width: 50,align:'center'},
		{header: "Doc.Pago",dataIndex: 'descripcion',sortable: true,width: 30,align:'center'},
		{header: "Dias Pago",dataIndex: 'diaspago',sortable: true,width: 50,align:'center'},
		{header: 'Doc.',dataIndex: 'desc_tipodocumento',sortable: true,width: 40},
		{header: 'Vendedor',dataIndex: 'codigo_vendedor',sortable: true,width: 50,align: 'center'},
		{id:'desc_estadonotaped',header: 'Estado',dataIndex: 'desc_estadonotaped',sortable: true,width: 60,align: 'center'},
		{header: 'Moneda',dataIndex: 'desc_moneda',sortable: true,width: 50,align: 'center'},
		{header: 'T. cambio',dataIndex: 'tipo_cambio',sortable: true,width: 45,align: 'center'},
		{header: 'Fecha Pedido',dataIndex: 'f_pedido',sortable: true,width: 60,align: 'center'},
		{header: 'Fecha Entrega',dataIndex: 'f_entrega',sortable: true,width: 60,align: 'center'},
		{header: 'Fecha Registro',dataIndex: 'f_registro',sortable: true,width: 75,align: 'center'},
		{header: 'Usuario',dataIndex: 'login',sortable: true,width: 45,align: 'center'}
		
    ]);

var store_bandeja= new Ext.data.GroupingStore({
	proxy		: new Ext.data.HttpProxy({url: 'query.php?n=19&estado=1,2,3'}),
	reader		: new Ext.data.JsonReader({
		root	: 'bandejapedido',
		fields	: [	{name:'idnotapedido', type:'int'},
					{name:'desc_almacen'},
					{name:'idcliente', type:'int'},
		            {name:'nombre'},
		            {name:'desc_pago'},
					{name:'descripcion'},
					{name:'diaspago'},
		            {name:'desc_tipodocumento'},
		            {name:'codigo_vendedor'},
					{name:'desc_estadonotaped'},
		            {name:'desc_moneda'},
					{name:'tipo_cambio'},
		            {name:'f_pedido'},
		            {name:'f_entrega'},
		            {name:'f_registro'},
					{name:'login'}
		          ],
		autoLoad:true}),
	groupField	: 'desc_estadonotaped',
	remoteSort	: false,
	sortInfo	: {field: 'f_registro', direction: 'ASC'},
	autoLoad	: true
});
 
var grid_bandeja = new Ext.grid.EditorGridPanel({
	store: store_bandeja,
	cm: cm_bandeja,
	width:710,
	height:190,
	plugins: summary,
	view: new Ext.grid.GroupingView({
		forceFit:true,
		showGroupName: false,
		enableNoGroups:false, // REQUIRED!
		hideGroupedColumn: true
        }),
	frame:true,
	clicksToEdit:1,
	layout:'fit',
	autoScroll:true,
	selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
});
store_bandeja.load();
grid_bandeja.on('rowdblclick', gestion);
	




function gestion(grid, rowIndex, e) {
	//tab_factura.setActiveTab(1);
	var record 	= grid.getStore().getAt(rowIndex);
	
	
var txt_nropedido = new Ext.form.TextField({
	id : 'idtxt_nropedido',
	fieldLabel: 'Nro. Pedido',
	disabled: true,
	anchor:'95%'
});

var txt_tipocambio = new Ext.form.TextField({
	id : 'idtxt_tipocambio',
	fieldLabel: 'Tipo Cambio',
	disabled: true,
	//decimalPrecision : 4,
	//allowNegative: false,
	anchor:'95%'
});

var fecha_pedido=new Ext.form.DateField({
        fieldLabel	:'Fecha Pedido',
        id			:'idfecha_pedido',
        name		:'idfecha_pedido',
        width		:110,
        format		:'d-m-Y',
		anchor		:'95%',
		//value		: hoy,
		readOnly	:true,
		disabled: true,
		//listeners	:{change:cambio_fpedido},
        renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; },
        allowBlank	:false
    }); 	

var fecha_entrega=new Ext.form.DateField({
        fieldLabel	:'Fecha de Entrega',
        id			:'idfecha_entrega',
        name		:'idfecha_entrega',
        width		:110,
        format		:'d-m-Y',        
		anchor		:'95%',
		readOnly	:true,
		disabled: true,
		//listeners	:{change:cambio_fentrega},
        renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; },        
        allowBlank	:false
    });

var txt_vendedor= new Ext.form.TextField({
	id : 'idtxt_vendedor',
	fieldLabel: 'Vendedor',
	disabled: true,
	anchor:'95%'
});

var txt_almacen= new Ext.form.TextField({
	id : 'idtxt_almacen',
	fieldLabel: 'Almacen',
	disabled: true,
	anchor:'95%'
});

var txt_cliente= new Ext.form.TextField({
	id : 'idtxt_cliente',
	fieldLabel: 'Cliente',
	disabled: true,
	anchor:'95%'
});

var txt_tipodocumento = new Ext.form.TextField({
	id : 'idtxt_tipodocumento',
	fieldLabel: 'Documento Solicitado',
	disabled: true,
	anchor:'95%'
});

var txt_formapago = new Ext.form.TextField({
	id : 'idtxt_formapago',
	fieldLabel: 'Forma de Pago',
	disabled: true,
	anchor:'95%'
});
var txt_docpago = new Ext.form.TextField({
	id : 'idtxt_docpago',
	fieldLabel: 'Doc. Pago',
	disabled: true,
	anchor:'95%'
});
var txt_diaspago = new Ext.form.TextField({
	id : 'idtxt_diaspago',
	fieldLabel: 'Plazo(dias)',
	disabled: true,
	anchor:'95%'
});

var txt_moneda = new Ext.form.TextField({
	id : 'idtxt_moneda',
	fieldLabel: 'Moneda',
	disabled: true,
	anchor:'95%'
});

var arreglodocumento = [];
var cadena_documento = [];

function arraydocumento(valor,valor2,accion){
	var newArray=[];
		switch (accion){
			case 'in'	: arreglodocumento.push(valor);cadena_documento.push(valor2);break;
			case 'out'	: newArray = arreglodocumento.splice(arreglodocumento.indexOf(valor),1);newArray = cadena_documento.splice(cadena_documento.indexOf(valor2),1);break;
		}	
	return cadena_documento.toString()
};
function onItemCheck(item, checked){
var texto;

	switch (item.text){
		case 'Factura' 		: 	checked ? texto=arraydocumento('F','Factura','in') : texto=arraydocumento('F','Factura','out'); 
								txt_igv.setValue(parseFloat(txt_subtotal.getValue()*0.19).toFixed(4));
								txt_total.setValue(parseFloat(txt_subtotal.getValue()+txt_igv.getValue()).toFixed(4));

								break;
		case 'Boleta'		:	checked ? texto=arraydocumento('B','Boleta','in') : texto=arraydocumento('B','Boleta','out');
								txt_igv.setValue(0);
								txt_total.setValue(parseFloat(txt_subtotal.getValue()+txt_igv.getValue()).toFixed(6));
								break;
		case 'Factura D2'	:  	checked ? texto=arraydocumento('FD2','Factura D2','in') : texto=arraydocumento('FD2','Factura D2','out') ;break;
		case 'Boleta D2'	:  	checked ? texto=arraydocumento('BD2','Boleta D2','in') : texto=arraydocumento('BD2','Boleta D2','out') ;break;
		case 'Guia de Remision'	:  	checked ? texto=arraydocumento('GR',' Guia de Remision','in') : texto=arraydocumento('GR',' Guia de Remision','out') ;break;
	}	
	boton_documento.setText('Documento:<b><br>'+texto+'</b>');
	if (BuscarenArray(arreglodocumento,'F')!=-1 || BuscarenArray(arreglodocumento,'FD2')!=-1){
		//aqui
		var val=parseFloat(txt_subtotal.getValue());
		var igv=parseFloat(val*0.19).toFixed(4);
		var total=parseFloat(val+igv*1).toFixed(4);	
		txt_igv.setValue(igv);
		txt_total.setValue(total);
	}else{
		txt_igv.setValue('0');
		txt_total.setValue(txt_subtotal.getValue());
	}
	
	//alert ('Resultado:'+arreglodocumento);
};


var boton_documento = new Ext.Toolbar.Button({
	text: 'Documento',
	menu: 	{items: ['<b class="menu-title">Escoja Documento a Generar</b>',
					{	text: 'Factura',
						id: 'optfactura',
						name: 'optfactura',
						checked: false,
						group : 'radiodocumento',
						checkHandler: onItemCheck
					},{	text: 'Boleta',
						id: 'optboleta',
						name: 'optboleta',
						checked: false,
						group : 'radiodocumento',
						checkHandler: onItemCheck
					},{	text: 'Factura D2',
						id: 'optfacturad2',
						name: 'optfacturad2',
						checked:false,
						group : 'radiodocumento',
						checkHandler: onItemCheck
					},{	text: 'Boleta D2',
						checked:false,
						id: 'optboletad2',
						name: 'optboletad2',
						group : 'radiodocumento',
						checkHandler: onItemCheck
					},
					{	text: 'Guia de Remision',
						id: 'optguia',
						name: 'optguia',
						group : 'radiodocumento',
						checked: false,
						checkHandler: onItemCheck
					}]
			}
});

var txt_igv = new Ext.form.TextField({
	id : 'idtxt_igv',
	fieldLabel: 'I.G.V.',
	disabled: true,
	anchor:'95%'
});

var txt_total = new Ext.form.TextField({
	id : 'idtxt_total',
	fieldLabel: 'Total',
	disabled: true,
	anchor:'95%'
});
var txt_1 = new Ext.form.TextField({
	id : 'idtxt_1',
	labelSeparator :'',
	fieldLabel: '',
	disabled: true,
	anchor:'95%'
});
var txt_2 = new Ext.form.TextField({
	id : 'idtxt_2',
	labelSeparator :'',
	fieldLabel: '',
	disabled: true,
	anchor:'95%'
});
var txt_subtotal = new Ext.form.TextField({
	id : 'idtxt_subtotal',
	labelSeparator :'',
	fieldLabel: '',
	disabled: true,
	anchor:'95%'
});

var txt_nrodoc = new Ext.form.TextField({
	id : 'idnro_documento',
	fieldLabel: 'Nro.Documento',
	disabled: false,
	anchor:'95%'
});
var txt_nroguia = new Ext.form.TextField({
	id : 'idnro_guia',
	fieldLabel: 'Nro.Guia',
	disabled: false,
	anchor:'95%'
});
txt_1.setVisible(false);
txt_2.setVisible(false);
txt_subtotal.setVisible(false);


var summary2 = new Ext.grid.GroupSummary(); 
function numero(val){
	var subtotal=parseFloat(val).toFixed(4);
	var igv=parseFloat(val*0.19).toFixed(4);
	var total=parseFloat(val+igv*1).toFixed(4);	
	//txt_igv.setValue(igv);
	//txt_total.setValue(total);
	txt_subtotal.setValue(subtotal);
	return parseFloat(val).toFixed(4);
}
	
	var cm_detalle = new Ext.grid.ColumnModel([
			new Ext.grid.RowNumberer(),
			{header: "Grupo",dataIndex: 'grupo',width: 1},
			{header: "IDproducto",dataIndex: 'idproducto',width: 20, hidden:true},
			{id:'common',header: "Codigo",dataIndex: 'codigo',width: 70},
			{header: "Descripcion",dataIndex: 'desc_producto',width: 220,summaryType:'count',
				summaryRenderer: function(v, params, data){
	                    return ((v === 0 || v > 1) ? v +' Items' : '1 Item');
	                }
	        },{header: 'Cant.',dataIndex: 'cantidad',width: 40,align: 'right',summaryType:'sum',
	           editor: new Ext.form.NumberField({
	               allowBlank: false,
				   readOnly:true,
	               allowNegative: false
	           })
	        },{header: 'U.Med',dataIndex: 'desc_unidad',width: 65,align: 'center'
	        },{header: 'Precio',dataIndex: 'p_unitario',width: 70,align: 'right',
				renderer:numero
	        },{header: 'Dcto.(%)',dataIndex: 'dscto',width: 70,align: 'right',
				renderer:numero,summaryType:'average'
	        },{header: 'Subtotal',dataIndex: 'sub_total',width: 70,align: 'right',
				renderer:numero,summaryType:'sum'
	        }
			
	    ]);
	       
	var store_detalle= new Ext.data.GroupingStore({
		proxy		: new Ext.data.HttpProxy({url: 'query.php?n=20'}),
		reader		: new Ext.data.JsonReader({
			root	: 'detalle_pedido',
			fields	: [{name: 'grupo',		type: 'string'},
					   {name: 'idproducto', type: 'int'},
					   {name: 'codigo', 	type: 'string'},
			           {name: 'desc_producto',type: 'string'},
			           {name: 'cantidad',	type: 'float'},
   			           {name: 'desc_unidad',	type: 'string'},
			           {name: 'p_unitario', 	type: 'float'},
					   {name: 'dscto', 		type: 'float' },
					   {name: 'sub_total', 	type: 'float' }
			          ],
			autoLoad:true}),
		groupField	: 'grupo',
		remoteSort	: false,
		sortInfo	: {field:'grupo', direction:'ASC'},
		autoLoad	: true
	});

var grid_detalle = new Ext.grid.EditorGridPanel({
	store: store_detalle,
	cm: cm_detalle,
	width:710,
	height:190,
	plugins: summary2,
	view: new Ext.grid.GroupingView({
		forceFit:true,
		showGroupName: false,
		enableNoGroups:false, // REQUIRED!
		hideGroupedColumn: true
        }),
	frame:true,
	clicksToEdit:1,
	layout:'fit',
	autoScroll:true,
	selModel: new Ext.grid.RowSelectionModel({singleSelect:false})
	/*tbar: [cbo_grupo,'  ',cbo_producto,{text: 'Agregar',
										iconCls:'agregar_item',
						            	handler : agregarproducto
			},'-',{	text:'Eliminar',
            		iconCls:'eliminar_item',
            	handler: handleDelete
        	}]*/
});
store_detalle.load();
/*
var impresion_factura = new Ext.Panel({
        title: 'Vista Previa',
		collapsible :true,
		collapsed:true,
        autoWidth: 750,
		autoHeight:500,
		frame:true
});
	*/	
var factura = new Ext.FormPanel({
        labelAlign: 'top',
        title: 'Nota de Pedido',
        bodyStyle:'padding:5px',
		collapsible :true,
        width: 750,
		frame:true,	
		tbar: [boton_documento,'-','Nro. Documento:',txt_nrodoc,'Nro. Guia:',txt_nroguia
		/*	{text: 'Agregar',
										iconCls:'agregar_item'
						            	//handler : agregarproducto
			},'-',{	text:'Eliminar',
            		iconCls:'eliminar_item'
//            	handler: handleDelete
        	}*/
			],
        items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_nropedido]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [fecha_pedido]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [fecha_entrega]
            },{
                columnWidth:.40,
                layout: 'form',
                border:false,
                items: [txt_vendedor]
            }]
        },{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.60,
                layout: 'form',
                border:false,
                items: [txt_cliente]
            },{
                columnWidth:.40,
                layout: 'form',
                border:false,
                items: [txt_almacen]
            }]
        },{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_tipodocumento]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_formapago]
            },{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_docpago ]
            },{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_diaspago]
            },{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_moneda]
            },{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_tipocambio]
            }]
        },grid_detalle,
		/*{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:235,
            defaults:{bodyStyle:'padding:0px'},
            items:[{
                title:'Detalle',
				items: [grid_detalle]
            }
			]
        }*/
		{	layout:'column',
            border:false,
            items:[{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_1]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_2]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_subtotal]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_igv]
            },{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_total]
            }]
        }
		],
        buttons: [{
            text: 'Grabar',
			handler : grabardocumento
        },{
            text: 'Cancelar',
			handler: cancelar
		//	handler : cancelarnotapedido
        }]
    });
	
function cancelar(){
				//alert ('Arreglosocumento:'+arreglodocumento+'Cadena Documento:'+cadena_documento)
		
				boton_documento.setText('Documento:');
				arreglodocumento = [];
				cadena_documento = [];
				//limpiarformulario();
				factura.destroy();
				win.hide();
				
				
				//alert ('cancelar');
				
			};


var windows;

function grabardocumento(){
/*	var pedido=trim(txt_nropedido.getValue());
	if (pedido == '') {alert('Ingrese Nro. de Pedido');return;}
*/	
	
	
	if (trim(txt_nrodoc.getValue())=='' || trim(txt_nroguia.getValue())=='')
		{	//swcabecera=1;
			Ext.MessageBox.alert('Mensaje de validaci&oacute;n','Ingrese Nro. de Documento y Nro. de Guia');
			return;
	}else{
		
		var nro_doc=trim(txt_nrodoc.getValue());
		var nro_guia=trim(txt_nroguia.getValue());
		var cant_doc=arreglodocumento;
		if (cant_doc==0){
			Ext.MessageBox.alert('Mensaje de validaci&oacute;n','No ha seleccionado ningun documento');
		}else{
			var idtipo_doc;
			if (arreglodocumento.indexOf('B')!=-1) idtipo_doc=1;
			if (arreglodocumento.indexOf('F')!=-1) idtipo_doc=2;
			if (arreglodocumento.indexOf('GR')!=-1) idtipo_doc=3;
			if (arreglodocumento.indexOf('BD2')!=-1) idtipo_doc=5;
			if (arreglodocumento.indexOf('FD2')!=-1) idtipo_doc=6;
			//alert(idtipo_doc);
			var idnotaped = txt_nropedido.getValue();
			var idmovimiento=1;
			var idestadodoc=1;
			var idusu = idusuario;
			var montoigv=txt_igv.getValue();
			var montototal= txt_total.getValue();
			var idcli = record.data.idcliente;

			Ext.Ajax.request({
				url: 'query.php',
				params: {
					n			: 21,
					nro_doc		: nro_doc,
					nro_guiarem	: nro_guia,
					idnotaped	: idnotaped,
					idmovimiento: idmovimiento,
					idusu		: idusu,
					idestadodoc	: idestadodoc,
					idtipo_doc	: idtipo_doc,
					montoigv	: montoigv,
					montototal	: montototal,
					idcliente	: idcli
				},
				method: 'GET',
				success: function(result, request){
					var respuesta=result.responseText;
				//	alert(respuesta);
				//	cancelar();
				//	store_bandeja.reload();
				//	alert ('idnotapedido'+idnotaped);
					
					var arrayrespuesta = respuesta.split(',');
	
					if(parseInt(arrayrespuesta[0])==1){
						//Ext.MessageBox.alert('Grabacion Documento','Grabacion Satisfactoria, Nro.Doc.: '+nro_doc);	
function imprimir_doc_internos(){
	//alert ('imprime doc internos'+' pedido:'+idnotaped );
	window.open("http://localhost/automotriz/imprimir_doc_internos.php?idpedido="+idnotaped,"ventana1" , "width=850,height=650,scrollbars=YES,resizable=YES");
};
function imprimir_guia(idpedido){
	alert ('imprime guia'+' pedido:'+idnotaped );
};
function imprimir_documento(idpedido){
//	alert ('imprime documento'+' pedido:'+idnotaped );
	window.open("http://localhost/automotriz/imprimir_factura.php?idpedido="+idnotaped,"ventana1" , "width=850,height=650,scrollbars=YES,resizable=YES");
};
var panel_impresion=new Ext.Panel({	
	//title		: 'Impresion',
	closable	: false,
	autoScroll	: false,
	frame:true,
	//layout		: 'fit',
	modal		: true,
	buttonAlign	: 'center',
//	items		: [txt],
	buttons		: [	{	text		: 'Imprimir Doc. Internos',
						handler 	: imprimir_doc_internos
									
//						listeners	: {click: imprimir_doc_internos(idnotaped)}
					},
					{	text		: 'Imprimir Guia',
//						listeners	: {click: imprimir_guia(idnotaped)}
						handler 	: imprimir_guia
					},
					{	text		: 'Imprimir Documento',
//						listeners	: {click: imprimir_documento(idnotaped)}
						handler 	: imprimir_documento
					}]
});
	
	windows = new Ext.Window({
		layout		: 'fit',
		width		: 750,
		height		: 75,
		modal		: true,
		closeAction	: 'hide',
		plain		: true,
		//y:130,
	//	items		: [factura,impresion_factura],
		items		: [panel_impresion],
		title		:'Impresion'
	});
    windows.show(this);

						//alert(arrayrespuesta[1]);
					//factura.collapse(true);
				/*	
					impresion_factura.expand(true);
					impresion_factura.load({
					    url: "imprimir_facturacion.php",
					    params: {nro_doc: arrayrespuesta[1]}, // or a URL encoded string
					    //callback: yourFunction,
					    //scope: yourObject, // optional scope for the callback
					    discardUrl: false,
					    nocache: false,
					    text: "Loading...",
					    timeout: 30,
					    scripts: false
					});
						
					*/	
						
					}else Ext.MessageBox.alert('Error al grabar documento',respuesta);
					
										
					
					
				},
				failure: function(result, request){
					Ext.MessageBox.alert('Fallo', result.responseText);
				}
			});
			
			
			
		}
	}
		
};


function limpiarformulario(){
	store_detalle.removeAll();
	txt_nropedido.reset();
	fecha_pedido.setValue('');
	fecha_entrega.setValue('');
	txt_vendedor.reset();
	txt_cliente.reset();
	txt_almacen.reset();
	txt_tipodocumento.reset();
	txt_formapago.reset();
	txt_docpago.reset();
	txt_diaspago.reset();
	txt_moneda.reset();
	txt_tipocambio.reset();
	txt_igv.reset();
	txt_subtotal.reset();
	txt_total.reset();

};	


	store_detalle.proxy = new Ext.data.HttpProxy({url: 'query.php?n=20&pedido='+record.data.idnotapedido});
	store_detalle.load();
	
	txt_nropedido.setValue(record.data.idnotapedido);
	txt_almacen.setValue(record.data.desc_almacen);	  
	fecha_pedido.setValue(record.data.f_pedido);
	fecha_entrega.setValue(record.data.f_entrega);
	txt_vendedor.setValue(record.data.codigo_vendedor);
	txt_cliente.setValue(record.data.nombre);
	txt_tipodocumento.setValue(record.data.desc_tipodocumento);
	txt_formapago.setValue(record.data.desc_pago);
	txt_docpago.setValue(record.data.descripcion);
	txt_diaspago.setValue(record.data.diaspago);
	txt_moneda.setValue(record.data.desc_moneda);
	if (record.data.tipo_cambio!='') txt_tipocambio.setValue(record.data.tipo_cambio);
	txt_nropedido.setVisible(true);
	
	win = new Ext.Window({
		layout		: 'fit',
		width		: 750,
		height		: 520,
		modal		: true,
		closeAction	: 'hide',
		plain		: true,
		y:130,
	//	items		: [factura,impresion_factura],
		items		: [factura],
		title		:'Facturaci&oacute;n '
	});
    win.show(this);
	//win.on('beforehide',cancelar);


};


var	tab_factura = new Ext.TabPanel({
	deferredRender:false,
	activeTab:0,
	items:[{	title		: 'Bandeja Nota de Pedido',
				closable	: false,
				autoScroll	: true,
				layout		: 'fit',
				items		: [grid_bandeja]
			/*	buttons		: [	{	text		: 'Enviar',
									//handler		: enviar,
					                 disabled	: false },
								{	text: 'Cerrar'
									//handler: function(){win.hide();}
								}]
				*/				
			}
			/*{
				title		: 'Detalle',
				closable	: false,
				autoScroll	: true,
//				layout		: 'column',
				items 		: [factura]
			},
			
			{
				title		: 'Mapa',
				closable	: false,
				autoScroll	: true,
				layout		: 'fit'
			//	listeners	: {activate: handlemapa},
			//	items 		: panelmapa
			}*/]
});
/*
var not = {
		QT : 'Get QuickTime: <a href="http://www.apple.com/quicktime/download" target="_fdownload">Here</a>'
		,FLASH: {tag:'span',cls:'noJoy'
		,html:'<p>Note: The Ext.MediaPanel Demo requires Flash Player 8.0 or higher. The latest version of Flash Player is available at the <a href="http://www.adobe.com/go/getflashplayer" target="_fdownload">Adobe Flash Player Download Center</a>.</p>'
		}
		,FLASHV:{tag:'span',cls:'noJoy'
	 	,html:'<p>Note: The Ext.MediaPanel Demo requires Flash Player {0} or higher. The latest version of Flash Player is available at the <a href="http://www.adobe.com/go/getflashplayer" target="_fdownload">Adobe Flash Player Download Center</a>.</p>'}
	 	,PDF : 'Get Acrobat Reader: <a href="http://www.adobe.com/products/acrobat/readstep2.html" target="_fdownload">Here</a>'
	 	,REAL : 'Get RealPlayer Plugin: <a href="http://www.realplayer.com/" target="_fdownload">Here</a>'
	 	,OFFICE: 'MSOffice Is not installed'
	 	,JWP : '<p>FLV Player can handle (FLV, but also MP3, H264, SWF, JPG, PNG and GIF). It also supports RTMP and HTTP (Lighttpd) streaming, RSS, XSPF and ASX playlists, a wide range of flashvars (variables), an extensive javascript API and accessibility features.</p>'+
	 	'Get FLV Player <a href="http://www.jeroenwijering.com/?item=JW_FLV_Player" target="_fdownload">Here</a>.'
	 	,JWROT :'The JW Image Rotator (built with Adobe\'s Flash) enables you to show photos in sequence, with fluid transitions between them. It supports rotation of an RSS, XSPF or ASX playlists with JPG, GIF and PNG images.'+
	 	'<p>Get JW ImageRotator <a href="http://www.jeroenwijering.com/?item=JW_Image_Rotator" target="_fdownload">Here</a>.'
	};    
var j_tipo='PDF';
var j_notplugin=not['PDF'];
tab_factura.add({
							xtype : 'mediapanel',
							id : 'idpanel',
							closable:true,
							mediaCfg: {
								mediaType:j_tipo,
								url:'imprimir_facturacion.php',
								id:'ex1swf',
								unsupportedText: j_notplugin,
								params:{page:1}
							},
							title : 'nombre_manual'							
						});	
						var IdItem=tab_factura.getItem('idpanel');
						tab_factura.setActiveTab(IdItem);

*/

var ventana = new Ext.Window({
	title	:	'Bandeja de Nota de Pedido',
	width:950,
	height:450,
	minWidth: 750,
	minHeight: 450,
	layout : 'fit',
	plain:true,
	y:130,
	bodyStyle: 'padding:5px;',
	items: tab_factura
});
ventana.show();


});
