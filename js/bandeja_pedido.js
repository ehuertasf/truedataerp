Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

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
		{header: 'Idestado',dataIndex: 'idestadonotaped',sortable: true,width: 60,align: 'center', hidden:true},
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
					{name:'idestadonotaped'},
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
	

var xsub_total;
var xsub_total_d2;


function gestion(grid, rowIndex, e) {
	xsub_total=0.0000;
	xsub_total_d2=0.0000;

	//tab_factura.setActiveTab(1);
	var record 	= grid.getStore().getAt(rowIndex);
	if (record.data.idestadonotaped!=2) {
		Ext.MessageBox.alert('Estado no v&aacute;lido','Falta validar por almacen');
		return;
	}
	

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
	
	function ocultar_columna(sw){
		if (sw==1) {
			cm_detalle.setHidden(10,false);
			cm_detalle.setHidden(11,false);
			document.getElementById("div_d2").style.display="block";
			//txt_igv_d2.setVisible(true);
			//txt_total_d2.setVisible(true);
		}else{
			cm_detalle.setHidden(10, true);
			cm_detalle.setHidden(11, true);
			//txt_igv_d2.setVisible(false);
			//txt_total_d2.setVisible(false);
			document.getElementById("div_d2").style.display="none";

		}
	};
	
	function onItemCheck(item, checked){
	var texto;
	
		switch (item.text){
			case 'Factura' 		: 	checked ? texto=arraydocumento('F','Factura','in') : texto=arraydocumento('F','Factura','out'); 
									ocultar_columna(0);
									break;
			case 'Boleta'		:	checked ? texto=arraydocumento('B','Boleta','in') : texto=arraydocumento('B','Boleta','out');
									ocultar_columna(0);
									break;
			case 'Factura D2'	:  	checked ? texto=arraydocumento('FD2','Factura D2','in') : texto=arraydocumento('FD2','Factura D2','out');
									ocultar_columna(1);
									break;
			case 'Boleta D2'	:  	checked ? texto=arraydocumento('BD2','Boleta D2','in') : texto=arraydocumento('BD2','Boleta D2','out');
									ocultar_columna(1);
									break;
			case 'Guia de Remision'	:  	checked ? texto=arraydocumento('GR',' Guia de Remision','in') : texto=arraydocumento('GR',' Guia de Remision','out');
									ocultar_columna(0);
									break;
		}	
		boton_documento.setText('Documento:<b>'+texto+'</b>');
		if (BuscarenArray(arreglodocumento,'F')!=-1 || BuscarenArray(arreglodocumento,'FD2')!=-1){

			var val=parseFloat(xsub_total);
			var igv=parseFloat(val*0.19).toFixed(2);
			var total=parseFloat(val+igv*1).toFixed(2);	
			
			var val_d2=parseFloat(xsub_total_d2);
			var igv_d2=parseFloat(val_d2*0.19).toFixed(2);
			var total_d2=parseFloat(val_d2+igv_d2*1).toFixed(2);	
			
			document.getElementById("div_igv").innerHTML = igv;
			document.getElementById("div_total").innerHTML = total;
			document.getElementById("div_igv_d2").innerHTML = igv_d2;
			document.getElementById("div_total_d2").innerHTML = total_d2;			

		}else{
		
			document.getElementById("div_igv").innerHTML = 0;
			document.getElementById("div_igv_d2").innerHTML = 0;
			document.getElementById("div_total").innerHTML = xsub_total;
			document.getElementById("div_total_d2").innerHTML = xsub_total_d2;			
		}
	};


	var boton_documento = new Ext.Toolbar.Button({
		text: 'Documento',
		height:80,
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


	var txt_nrodoc = new Ext.form.TextField({
		id : 'idnro_documento',
		fieldLabel: 'Nro.Documento',
		disabled: false,
		anchor:'95%'
	});
	var txt_nroguia = new Ext.form.TextField({
		id : 'idnro_guia',
		fieldLabel: 'Nro.Guia'
		//disabled: false
		//anchor:'95%'
	});

//	txt_1
//	txt_2.setVisible(false);
//	txt_subtotal.setVisible(false);
//	txt_nroguia.on('blur',function(){alert('hola');});

	function numero(val){
		return parseFloat(val).toFixed(4);
	}
	function subtotal(val){
		var subtotal=parseFloat(val).toFixed(2);
		var igv=parseFloat(val*0.19).toFixed(2);
		var total=parseFloat(val+igv*1).toFixed(2);	
	////	txt_subtotal.setValue(subtotal);
		xsub_total=subtotal;
		return parseFloat(val).toFixed(2);
	}
	function subtotal_d2(val){
		var subtotal=parseFloat(val).toFixed(2);
		var igv=parseFloat(val*0.19).toFixed(2);
		var total=parseFloat(val+igv*1).toFixed(2);	
	////	txt_2.setValue(subtotal);
		xsub_total_d2=subtotal;
		return parseFloat(val).toFixed(2);
	}
	var summary2 = new Ext.grid.GroupSummary(); 

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
				renderer:numero
	        },{header: 'Subtotal',dataIndex: 'sub_total',width: 70,align: 'right',
				renderer:subtotal,summaryType:'sum'
	        },{header: 'Precio2',dataIndex: 'p_unitario_d2',width: 85,align: 'right',hidden:true,
				renderer:numero
	        },{header: 'Subtotal2',dataIndex: 'sub_total_d2',width: 85,align: 'right',hidden:true,
				renderer:subtotal_d2,summaryType:'sum'
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
					   {name: 'sub_total', 	type: 'float' },
					   {name: 'p_unitario_d2', 		type: 'float' },
					   {name: 'sub_total_d2', 	type: 'float' }
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

	var guia = new Ext.FormPanel({
	        labelAlign: 'top',
	        //title: 'Nota de Pedido',
	        bodyStyle:'padding:5px',
			collapsible :true,
	        width: 750,
			frame:true,	
			items:[new Ext.form.TextField({
		id : 'idnro_documento',
		fieldLabel: 'Nro.Documento',
		disabled: false,
		anchor:'95%'
	})]
	});
	var factura = new Ext.FormPanel({
	        labelAlign: 'top',
	        //title: 'Nota de Pedido',
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
				//html: '<table border=1 width=100%><tr><td width=90%>Nro.Pedido</td><td width=10%>'+record.data.idnotapedido+'</td></tr></table>'
				html: '<table border=1 width=100% class="tabla" >'+
					  '<tr><td width=20% class="td2">Nro.Pedido</td><td width=20% class="td2">Fecha de Pedido</td><td width=20% class="td2">Fecha de Entrega</td><td width=40% class="td2" colspan=3>Vendedor</td></tr>'+
			  		  '<tr><td width=20% class="td3" id="idnotaped">'+record.data.idnotapedido+'</td><td width=20% class="td3">'+record.data.f_pedido+'</td><td width=20% class="td3">'+record.data.f_entrega+'</td><td width=40% colspan=3 class="td3">'+record.data.codigo_vendedor+'</td></tr>'+
					  '<tr><td colspan=3 width=60% class="td2">Cliente</td><td width=40% class="td2" colspan=3>Almacen</td></tr>'+
					  '<tr><td colspan=3 width=60% class="td3">'+record.data.nombre+'</td><td width=40% colspan=3 class="td3">'+record.data.desc_almacen+'</td></tr>'+
					  '<tr><td width=16% class="td2">Documento Solicitado</td><td width=16% class="td2">Forma de Pago</td><td width=16% class="td2">Doc. Pago</td><td width=13% class="td2">Plazo (Dias)</td><td width=13% class="td2">Moneda</td><td width=13% class="td2">Tipo Cambio</td></tr>'+
					  '<tr><td width=16% class="td3">'+record.data.desc_tipodocumento+'</td><td width=16% class="td3">'+record.data.desc_pago+'</td><td width=16% class="td3">'+record.data.descripcion+'</td><td width=13% class="td3">'+record.data.diaspago+'</td><td width=13% class="td3">'+record.data.desc_moneda+'</td><td width=13% class="td3">'+record.data.tipo_cambio+'</td></tr>'+
					  '</table><br>'
			
			
			},grid_detalle,
			{
				//html: '<table border=1 width=100%><tr><td width=90%>Nro.Pedido</td><td width=10%>'+record.data.idnotapedido+'</td></tr></table>'
				html: '<table border=1 width=100% class="tabla" >'+
					  '<tr><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=13% class="td2"></td><td width=13% class="td2" align="center">I.G.V(19%)</td><td width=13% class="td2" align="center">Total</td></tr>'+
					  '<tr><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=13% class="td2" align="right"></td><td width=13% class="td3" align="right"><div><span id="div_igv"></span></div></td><td width=13% class="td3" align="right"><div><span id="div_total"></span></div></td></tr>'+
					  '<tr id="div_d2" style="display:none"><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=16% class="td2"></td><td width=13% class="td2" align="right">D2</td><td width=13% class="td3" align="right"><div><span id="div_igv_d2"></span></div></td><td width=13% class="td3" align="right"><div><span id="div_total_d2"></span></div></td></tr>'+
					  '</table><br>'
			}],
			buttonAlign:'left',
	        buttons: [{
	            text: 'Grabar',
				handler : grabardocumento
	        },{
	            text: 'Cancelar',
				handler: cancelar
			//	handler : cancelarnotapedido
	        }]
	    });
		
var store_dircliente=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=24&idcli="+record.data.idcliente}),
			reader		: new Ext.data.JsonReader({root: 'direcciones'}, [
		        {name: 'direccion', mapping: 'direccion'}
			    ]),
			autoLoad	:true
});

 var cbo_direc = new Ext.form.ComboBox({
        fieldLabel	: 'Direccion de Entrega',
//		width		: 250,
		store		: store_dircliente,
        displayField:'direccion',
		valueField	: 'direccion',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'all',
       // emptyText	:'Seleccione Cliente...',
		anchor		:'95%',
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true
    });
	var txt_transportista = new Ext.form.TextField({
	                    fieldLabel: 'Nombre o Razon Social Transportista',
						anchor : '95%'
	});
	var txt_dirtransp = new Ext.form.TextField({
	                    fieldLabel: 'Direccion Transportista',
						anchor : '95%'
	});
	var txt_ructransp = new Ext.form.TextField({
	                    fieldLabel: 'Ruc Transportista'
	});

	var txt_placa = new Ext.form.TextField({
	                    fieldLabel: 'Placa'
	});
	var txt_chofer = new Ext.form.TextField({
	                    fieldLabel: 'Chofer'
	});
	var txt_licencia = new Ext.form.TextField({
	                    fieldLabel: 'Licencia'
	});

	var txt_marca = new Ext.form.TextField({
	                    fieldLabel: 'Marca'
	});

	var tabs = new Ext.TabPanel({
//	    renderTo: Ext.getBody(),
	    activeTab: 0,
		 
	    items: [{
	        title: 'Datos del Documento',
						layout:'fit',
	        items: factura
	    },{
	        title: 'Datos de Guia de Remision',
	    		frame : true,
                layout:'form',
				
				bodyStyle : 'padding:10px',
                defaults: {width: 230},
                defaultType: 'textfield',
				labelWidth :140,
                items: [cbo_direc,txt_transportista,txt_dirtransp,txt_ructransp, txt_placa,txt_chofer,txt_licencia,txt_marca]
           
	    }]
	});
	
function cancelar(){
				boton_documento.setText('Documento:');
				arreglodocumento = [];
				cadena_documento = [];
				factura.destroy();
				win.hide();
};


var windows;

function grabardocumento(){

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
			//var idnotaped = txt_nropedido.getValue();
			var idnotaped = document.getElementById("idnotaped").innerHTML;
			
			var idmovimiento=1;
			var idestadodoc=1;
			var idusu = idusuario;
//			var montoigv=txt_igv.getValue();
//			var montototal= txt_total.getValue();
			var montoigv=document.getElementById("div_igv").innerHTML;
			var montototal= document.getElementById("div_total").innerHTML;
			var montoigv_d2=document.getElementById("div_igv_d2").innerHTML;
			var montototal_d2= document.getElementById("div_total_d2").innerHTML;
			var idcli = record.data.idcliente;
			
			var dir_entrega = cbo_direc.getValue();
			var trans 		= txt_transportista.getValue();
			var dir_trans	= txt_dirtransp.getValue();
			var ruc_trans	= txt_ructransp.getValue();
			var placa		= txt_placa.getValue();
			var chofer 		= txt_chofer.getValue();
			var licencia	= txt_licencia.getValue();
			var marca		= txt_marca.getValue();
			//alert ('DIR_ENTREGA='+dir_entrega+'_TRANSP='+trans+'_DIR-TRANSP='+dir_trans+'_RUC='+ruc_trans+
			//		'_PLACA='+placa+'_CHOFER='+chofer+'_LICENCIA='+licencia+'_MARCA='+marca);
//			alert ('igv='+montoigv+'_total='+montototal+'igv2='+montoigv_d2+'_total2='+montototal_d2);
			//return;
			Ext.Ajax.request({
				url: 'query.php',
				params: {
					n				: 21,
					nro_doc			: nro_doc,
					nro_guiarem		: nro_guia,
					idnotaped		: idnotaped,
					idmovimiento	: idmovimiento,
					idusu			: idusu,
					idestadodoc		: idestadodoc,
					idtipo_doc		: idtipo_doc,
					montoigv		: montoigv,
					montototal		: montototal,
					montoigv_d2		: montoigv_d2,
					montototal_d2	: montototal_d2,
					idcliente		: idcli,
					dir_entrega : dir_entrega,
					trans 		: trans,
					dir_trans	: dir_trans,
					ruc_trans	: ruc_trans,
					placa		: placa,
					chofer 		: chofer,
					licencia	: licencia,
					marca		: marca
				},
				method: 'GET',
				success: function(result, request){
					var respuesta=result.responseText;

				

					
					var arrayrespuesta = respuesta.split(',');
	
					if(parseInt(arrayrespuesta[0])==1){
						store_bandeja.reload();
						//Ext.MessageBox.alert('Grabacion Documento','Grabacion Satisfactoria, Nro.Doc.: '+nro_doc);	
						function imprimir_doc_internos(){
							window.open("http://192.168.1.5/apache2-default/automotriz/imprimir_doc_internos.php?idpedido="+idnotaped,"ventana1" , "width=850,height=650,scrollbars=YES,resizable=YES");
						};
						function imprimir_guia(idpedido){
							window.open("http://192.168.1.5/apache2-default/automotriz/imprimir_guiaremision.php?idpedido="+idnotaped,"ventana1" , "width=500,height=650,scrollbars=YES,resizable=YES");
						};
						function imprimir_documento(idpedido){
							window.open("http://192.168.1.5/apache2-default/automotriz/imprimir_factura.php?idpedido="+idnotaped,"ventana1" , "width=500,height=650,scrollbars=YES,resizable=YES");
						};
		
						windows = new Ext.Window({
							layout		: 'fit',
							width		: 750,
							autoHeight	: true,
							modal		: true,
							closeAction	: 'hide',
							buttonAlign : 'center',
							html		: '<table width=100% border=1><tr><td align="center"><p>DOCUMENTO GRABADO SATISFACTORIAMENTE</p></td></tr></table>',
							buttons		: [	{	text		: 'Imprimir Doc. Internos',
												handler 	: imprimir_doc_internos
											},
											{	text		: 'Imprimir Guia',
												handler 	: imprimir_guia
											},
											{	text		: 'Imprimir Documento',
												handler 	: imprimir_documento
											},
											{	text		: 'Salir',
												handler 	: function(){
																windows.hide();
																cancelar();
															}
											}],
							title		:'Impresion'
						});
					    windows.show();

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
};	

	store_detalle.proxy = new Ext.data.HttpProxy({url: 'query.php?n=20&pedido='+record.data.idnotapedido});
	store_detalle.load();

	win = new Ext.Window({
		layout		: 'fit',
		width		: 750,
		height		: 500,
		modal		: true,
		closeAction	: 'hide',
		plain		: true,
		y:130,
	//	items		: [factura,impresion_factura],
		items		: [tabs],
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
			
			}]
});


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
