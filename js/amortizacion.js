Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"	

Ext.onReady(function(){
var usuario=Ext.getDom('usuario').value;
var idusuario=Ext.getDom('idusuario').value;
var idperfil=Ext.getDom('idperfil').value;

var recep = Ext.getDom('var_idnotapedido').value;

//alert(recep);

var store_grupo=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=1"}),
			reader		: new Ext.data.JsonReader({root: 'grupo'}, [
		        {name: 'idgrupo_prod', mapping: 'idgrupo_prod'},
				{name: 'desc_grupo', mapping: 'desc_grupo'}
			    ]),
			autoLoad	:true
});

var store_vendedor=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=10"}),
			reader		: new Ext.data.JsonReader({root: 'vendedor'}, [
		        {name: 'idvendedor', mapping: 'idvendedor'},
//		        {name: 'codigo_vendedor', mapping: 'codigo_vendedor'},
				{name: 'nombre_vendedor', mapping: 'nombre_vendedor'}
			    ]),
			autoLoad	:true
});
var store_cliente=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=11"}),
			reader		: new Ext.data.JsonReader({root: 'cliente'}, [
		        {name: 'idcliente', mapping: 'idcliente'},
				{name: 'nombre', mapping: 'nombre'}
			    ]),
			autoLoad	:true
});

var store_tipodocumento=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=12"}),
			reader		: new Ext.data.JsonReader({root: 'tipodocumento'}, [
		        {name: 'idtipodocumento', mapping: 'idtipodocumento'},
				{name: 'desc_tipodocumento', mapping: 'desc_tipodocumento'}
			    ]),
			autoLoad	:true
});
var store_formapago_opc=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=9&fpago=0"}),
			reader		: new Ext.data.JsonReader({root: 'opc'}, [
		        {name: 'id', mapping: 'id'},
				{name: 'descripcion', mapping: 'descripcion'}
			    ]),
			autoLoad	:true
});
var store_formapago=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=13"}),
			reader		: new Ext.data.JsonReader({root: 'formapago'}, [
		        {name: 'idformapago', mapping: 'idformapago'},
				{name: 'desc_pago', mapping: 'desc_pago'}
			    ]),
			autoLoad	:true
});
var store_moneda=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=14"}),
			reader		: new Ext.data.JsonReader({root: 'moneda'}, [
		        {name: 'idmoneda', mapping: 'idmoneda'},
				{name: 'desc_moneda', mapping: 'desc_moneda'}
			    ]),
			autoLoad	:true
});
var store_producto=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=15"}),
			reader		: new Ext.data.JsonReader({root: 'producto'}, [
		        {name: 'idproducto', mapping: 'idproducto'},
				{name: 'codigo', mapping: 'codigo'},
				{name: 'descripcion', mapping: 'descripcion'},
				{name: 'desc_producto', mapping: 'desc_producto'},
				{name: 'precio_unit', mapping: 'precio_unit'},
				{name: 'precio_d2', mapping: 'precio_d2'},
				{name: 'desc_unidad', mapping: 'desc_unidad'},
				{name: 'stk_actual', mapping: 'stk_actual'}
			    ]),
			autoLoad	:true
});
var store_almacen=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=16"}),
			reader		: new Ext.data.JsonReader({root: 'almacen'}, [
		        {name: 'idalmacen', mapping: 'idalmacen'},
				{name: 'desc_almacen', mapping: 'desc_almacen'}
			    ]),
			autoLoad	:true
});

var store_banco=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=69"}),
			reader		: new Ext.data.JsonReader({root: 'banco'}, [
		        {name: 'idbanco', mapping: 'idbanco'},
				{name: 'desc_banco', mapping: 'desc_banco'}
			    ]),
			autoLoad	:true
});

var store_notacredito=new Ext.data.Store({			
			proxy		: new Ext.data.HttpProxy({url: "query.php?n=70"}),
			reader		: new Ext.data.JsonReader({root: 'notacredito'}, [
		        {name: 'idnotapedido', mapping: 'idnotapedido'},
				{name: 'obs', mapping: 'obs'}
			    ]),
			autoLoad	:true
});

var cbo_banco = new Ext.form.ComboBox({
        fieldLabel	: 'Banco',
		id			: 'idcbo_banco',
		store		: store_banco,
        displayField:'desc_banco',
		valueField	: 'idbanco',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'all',
        //emptyText	:'Seleccione Banco...',
		anchor		:'95%',
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true,
	hidden:true
    });
 
	
 
 

 var cbo_formapago = new Ext.form.ComboBox({
        fieldLabel	: 'Forma de Pago',
		id			: 'idcbo_formapago',
		store		: store_formapago,
        displayField:'desc_pago',
		valueField	: 'idformapago',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'all',
        //emptyText	:'Seleccione Forma de Pago...',
		anchor		:'95%',
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true
    });

 var cbo_formapago_opc = new Ext.form.ComboBox({
        fieldLabel	: 'Doc. Pago',
		id			: 'idcbo_formapago_opc',
		store		: store_formapago_opc,
        displayField:'descripcion',
		valueField	: 'id',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'query',
		anchor		:'95%',
		editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true
    });	
	

	
 var cbo_moneda = new Ext.form.ComboBox({
        fieldLabel	: 'Moneda',
		id			: 'idcbo_moneda',
		store		: store_moneda,
        displayField:'desc_moneda',
		valueField	: 'idmoneda',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'all',
        //emptyText	:'Seleccione Moneda...',
		anchor		:'95%',
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true
    });

 var cbo_grupo = new Ext.form.ComboBox({
        fieldLabel	: 'Grupo',
		id			: 'idcbo_grupo',
		store		: store_grupo,
        displayField:'desc_grupo',
		valueField	: 'idgrupo_prod',
        typeAhead	: true,
        mode		: 'local',
        triggerAction: 'all',
        //emptyText	:'Seleccione grupo...',
//		anchor		:'95%',
		width		: 100,
        editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
        selectOnFocus:true
});

cbo_grupo.on('select',function(combo, record, index ){
	cbo_producto.setValue('');
	store_producto.proxy= new Ext.data.HttpProxy({url: 'query.php?n=15&idgrupo='+record.data.idgrupo_prod});
   	store_producto.load();
});
//bo_plazopago.on('select',actualiza_detalle);

function actualiza_detalle(){
	var cant_registros = store.getCount();
	for (var i = 0; i < cant_registros; i++) {
		var record = grid.getStore().getAt(i);
		record.beginEdit(); 
		//record.data.dcto=parseFloat(cbo_plazopago.getValue());
		record.data.subtotal = parseFloat((record.data.precio * record.data.cantidad)-(record.data.precio * record.data.cantidad*record.data.dcto/100));
		record.data.subtotal_d2 = parseFloat(record.data.precio_d2 * record.data.cantidad);
		record.data.item = i+1;
		record.endEdit();
		record.commit();
	}
};

cbo_formapago.on('select',function(combo, record, index ){
	cbo_formapago_opc.setValue('');
	store_formapago_opc.proxy= new Ext.data.HttpProxy({url: 'query.php?n=9&fpago='+cbo_formapago.getValue()});
   	store_formapago_opc.load();
});

cbo_moneda.on('select',function(combo, record, index ){

	if (cbo_moneda.getValue()==2){//Soles
	
		if (trim(txt_tipocambio.getValue())!='') txt_tipocambio.reset();
		txt_tipocambio.setDisabled(true);
	}else {		txt_tipocambio.setDisabled(false);
	}
});

cbo_formapago_opc.on('select',function(combo, record, index ){

	if (cbo_formapago_opc.getValue()==3){//Cheque
	
		txt_nrodocumento.setVisible(true);
		cbo_banco.setVisible(true);
		//if (trim(txt_tipocambio.getValue())!='') txt_tipocambio.reset();
		//txt_tipocambio.setDisabled(true);
	}else {		//txt_tipocambio.setDisabled(false);
		txt_nrodocumento.setVisible(false);
		cbo_banco.setVisible(false);
	}
});



var hoy = new Date();

/*var fecha_pedido=new Ext.form.DateField({
        fieldLabel	:'Fecha Pedido',
        id			:'idfecha_pedido',
        name		:'idfecha_pedido',
        width		:110,
        format		:'d-m-Y',
		anchor		:'95%',
		value		: hoy,
		readOnly	:true,
		renderer	:function(value) { return value ? new Date(value).dateFormat('d.m.Y') : ''; }
    }); 	
*/

var fecha_pedido = new Ext.form.TextField({
	id : 'idfecha_pedido',
	fieldLabel: 'Fecha Pedido',
	readOnly	:true,
	width:85
});

var cbo_producto= new Ext.form.ComboBox({
		fieldLabel	: 'Producto',
		id			: 'idcbo_producto',
		store		: store_producto,
		displayField:'descripcion',
		valueField	: 'idproducto',
		typeAhead	: true,
		mode		: 'local',
		triggerAction: 'all',
		//emptyText	:'Seleccione producto...',
		anchor		:'95%',
		editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
		selectOnFocus:true
	});
	
var idproducto=-1,codigo,descripcion,punitario,unidad,stock;

cbo_producto.on('select',function(combo,record,index)
	{	idproducto 	= record.data.idproducto;
		codigo 		= record.data.codigo;
		descripcion = record.data.desc_producto;
		punitario 	= parseFloat(record.data.precio_unit);
		if (record.data.precio_d2==null) precio_d2 	= parseFloat(0.0000);
		else precio_d2 	= parseFloat(record.data.precio_d2);
		unidad 		= record.data.desc_unidad;
		stock 		= record.data.stk_actual;
	}
);


var cbo_notacredito= new Ext.form.ComboBox({
		fieldLabel	: 'Nota Credito',
		id		: 'id_notapedido',
		store		: store_notacredito,
		displayField:'obs',
		valueField	: 'idnotapedido',
		typeAhead	: true,
		mode		: 'local',
		triggerAction: 'all',
		//emptyText	:'Seleccione producto...',
		anchor		:'95%',
		editable 	: true,
		forceSelection : true,
		hideTrigger : false, 
		lazyRender : true, 
		selectOnFocus:true
	});


var summary = new Ext.grid.GroupSummary(); 
function numero(val){
	return parseFloat(val).toFixed(4);
}

var cm = new Ext.grid.ColumnModel([
		{header: "Grupo",dataIndex: 'grupo',width: 1},
		{header: "Item",dataIndex: 'item',width: 40,align:'center'},
		{header: "IDproducto",dataIndex: 'idproducto',width: 20, hidden:true},
		{id:'common',header: "Nro Documento",dataIndex: 'codigo',width: 70},
		{header: "Desc. Documento",dataIndex: 'descripcion',width: 220,summaryType:'count',
			summaryRenderer: function(v, params, data){
                    return ((v === 0 || v > 1) ? v +' Items' : '1 Item');
                }
        },{header: 'Monto',dataIndex: 'stock',width: 65,align: 'center'}/*,
	{header: 'Cant.',dataIndex: 'cantidad',width: 50,align: 'right',summaryType:'sum',
           editor: new Ext.form.NumberField({
               allowBlank: false,
               allowNegative: false
//			   listeners:{'change':validar_stock}
           })
        },{header: 'U.Med',dataIndex: 'unidad',width: 65,align: 'center'
        },{header: 'Precio',dataIndex: 'precio',width: 85,align: 'right',
			renderer:numero
        },{header: 'Dcto.(%)',dataIndex: 'dcto',width: 85,align: 'right',
			renderer:numero,summaryType:'average'
        },{header: 'Subtotal',dataIndex: 'subtotal',sortable: true,width: 85,align: 'right',
			renderer:numero,summaryType:'sum'
        },{header: 'Precio2',dataIndex: 'precio_d2',width: 85,align: 'right',
			renderer:numero,hidden:true
        },{header: 'Subtotal2',dataIndex: 'subtotal_d2',width: 85,align: 'right',
			renderer:numero,summaryType:'sum',hidden:true
        }*/
		
    ]);

function validar_stock(editEvent){
	var registro=editEvent.record.data;
	var idproducto = registro.idproducto;
	var stk = registro.stock;
	var cant= registro.cantidad;
	var stock3=consulta_stock(idproducto);

	if (stock3!=stk) registro.stock=stock3;
	if (cant > stock3) {
		registro.cantidad=0;
		alert('Cantidad excede stock')
	}
	actualiza_detalle();
};

 var newItem = Ext.data.Record.create([
           {name: 'grupo',		type: 'string'},
		   {name: 'idproducto', type: 'int'},
		   {name: 'item', 		type: 'int'},
		   {name: 'codigo', 	type: 'string'},
           {name: 'descripcion',type: 'string'},
           {name: 'cantidad',	type: 'float'},
           {name: 'unidad', 	type: 'string'},    
           {name: 'precio', 	type: 'float'},
		   {name: 'dcto', 		type: 'float' },
		   {name: 'subtotal', 	type: 'float' },
		   {name: 'stock', 		type: 'float' },
		   {name: 'precio_d2', 	type: 'float'},
		   {name: 'subtotal_d2', 	type: 'float' }
      ]);

var store = new Ext.data.GroupingStore({
		proxy		: new Ext.data.HttpProxy({url: "query.php?n=0"}),
        reader		: new Ext.data.JsonReader(newItem),
        sortInfo	: {field:'item', direction:'ASC'},
		groupField	: 'grupo'
});

var txt_dcto = new Ext.form.NumberField({
	id : 'idtxt_dcto',
	fieldLabel: 'Descuento',
	decimalPrecision : 4,
	allowNegative: false,
	width:75
});

	var btnamortizar = new Ext.Button({
        text	:'Amortizar',
        id		:'btn1',
        width	:150,
		height : .100,
        handler	:amortizar,
		iconCls	:'agregar_item'
	    
	});
 
var grid = new Ext.grid.EditorGridPanel({
	store: store,
	title:'Detalle Documentos',
	cm: cm,
	width:710,
	anchor:'100%',
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
	tools:[{
	    id:'plus',
	    qtip: 'Refresh form Data',
	    // hidden:true,
	    handler: function(event, toolEl, panel){
			if (cm.isHidden(11)==true) {
				cm.setHidden(11,false);
				cm.setHidden(12,false);
			}else{
				cm.setHidden(11, true);
				cm.setHidden(12, true);
			}

	    }
	}],
	selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
		/*
		tbar: ['&nbsp;&nbsp;&nbsp;Importe',txt_dcto,'-',{text: 'Amortizar',
										iconCls:'agregar_item',
						            	handler : agregarproducto
			}]
		*/	
			
});
store.load();
grid.on('afteredit', validar_stock);
//grid.on('afteredit', actualiza_detalle);
var swmoneda=0;
function amortizar(){
	if (cbo_moneda.getValue() == 2) {
		if (swmoneda == 0) {
			//alert('Se facturara en dolares');
			Ext.Msg.alert('ALERTA!','Se facturar&aacute; en d&oacute;lares');
			cbo_moneda.setDisabled(true);
			txt_tipocambio.setDisabled(true);
			swmoneda = 1;
		}
	}else {
		if (cbo_moneda.getValue() != '' && (txt_tipocambio.getValue() != '' || txt_tipocambio.getValue() > 0)) {
			if (swmoneda == 0) {
				//alert('Se facturara en ' + Ext.getDom('idcbo_moneda').value + ' al tipo de cambio: ' + txt_tipocambio.getValue());
				Ext.Msg.alert('ALERTA!','Se facturar&aacute; en '+Ext.getDom('idcbo_moneda').value + ' al tipo de cambio: ' + txt_tipocambio.getValue());
				cbo_moneda.setDisabled(true);
				txt_tipocambio.setDisabled(true);
			swmoneda=1;
			}
			punitario= punitario * txt_tipocambio.getValue();
		}else {
			alert('Ingresar Moneda y/o Tipo de Cambio');
			return;
		}
	}
//	if (cbo_moneda.getValue()!='' && txt_tipocambio!='')
	var sw=0;
	stock2=consulta_stock(idproducto);
	if (idproducto != -1) {
		if (stock2 > 0) {
			var cant_registros = store.getCount();
			var arreglo = [];
			for (var i = 0; i < cant_registros; i++) {
				var record = grid.getStore().getAt(i);
				var idprod = record.data.idproducto;
				if (idproducto == idprod) {
					sw = 1;
					break;
				}
			}
			var descuento = 0;
			if (txt_dcto.getValue() != '') 
				descuento = txt_dcto.getValue();
			if (sw == 0) {
				var p = new newItem({
					grupo: 'Detalle',
					item: store.getCount() + 1,
					idproducto: idproducto,
					codigo: codigo,
					descripcion: descripcion,
					cantidad: 0,
					unidad: unidad,
					precio: punitario,
					dcto: descuento,
					subtotal: 0,
					stock: stock2,
					precio_d2:precio_d2,
					subtotal_d2:0
				});
				grid.stopEditing();
				store.insert(store.getCount(), p);
				grid.startEditing(0, 0);
				store.reload();
			}
			else 
				alert('Producto ya agregado');
		}else alert('El producto no tiene Stock');
	}else alert('Seleccione un producto');
};




function handleDelete() {
	var selectedKeys = grid.selModel.selections.keys;
    if(selectedKeys.length > 0) {
    	Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?', deleteRecord);
	}else{
		Ext.Msg.alert('ALERTA!','Seleccione un registro para eliminar');
	}
};

function deleteRecord(btn) {
	if (btn == 'yes') {
		var selectedRow = grid.getSelectionModel().getSelected();
		if (selectedRow) store.remove(selectedRow);
		actualiza_detalle();
	}	
};

var txt_nropedido = new Ext.form.TextField({
	id : 'idtxt_nropedido',
	fieldLabel: 'Nro. Pedido',
	disabled: true,
	name: 'idtxt_nropedido',
	anchor:'95%'
});

var txt_tipocambio = new Ext.form.NumberField({
	id : 'idtxt_tipocambio',
	fieldLabel: 'Tipo Cambio',
	disabled: true,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});

var txt_montodeuda = new Ext.form.NumberField({
	id : 'idtxt_montodeuda',
	fieldLabel: 'Monto Deuda',
	disabled: true,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});

var txt_montocobrado = new Ext.form.NumberField({
	id : 'idtxt_montocobrado',
	fieldLabel: 'Monto Cobrado',
	disabled: true,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});

var txt_fecdespacho = new Ext.form.NumberField({
	id : 'idtxt_fecdespacho',
	fieldLabel: 'Fecha Despacho',
	disabled: true,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});

var txt_fecvencimiento = new Ext.form.NumberField({
	id : 'idtxt_fecvencimiento',
	fieldLabel: 'Fecha Vencimiento',
	disabled: true,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});

var txt_nrodocumento = new Ext.form.NumberField({
	id : 'idtxt_nro_documento',
	fieldLabel: 'Nro Documento',
	disabled: false,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%',
	hidden:true
});

var txt_montoamortizar = new Ext.form.NumberField({
	id : 'idtxt_montoamortizar',
	fieldLabel: 'Monto Amortizar',
	disabled: false,
	decimalPrecision : 4,
	allowNegative: false,
	anchor:'95%'
});



var tab2 = new Ext.FormPanel({
        labelAlign: 'top',
        //title: 'Nota de Pedido',
        bodyStyle:'padding:5px',
        width: 750,
		frame:true,	
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
            },		
			{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_montodeuda]
            }
			,
			{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_montocobrado]
            }
			]
        },
		{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_fecdespacho]
            },{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_fecvencimiento ]
            }
			]
        },
		{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [cbo_formapago]
            }
	    ,
	    {
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [cbo_formapago_opc ]
            }
	    ,
	   {
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [cbo_moneda]
            },
	    {
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_tipocambio]
            }]
        },
	{
            layout:'column',
            border:false,
            items:[
			{
                columnWidth:.20,
                layout: 'form',
                border:false,
                items: [txt_nrodocumento]
            },
			{
                columnWidth:.40,
                layout: 'form',
                border:false,
                items: [cbo_banco]
            }
		]
        },
	{
            layout:'column',
            border:false,
            items:[
	    {
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [txt_montoamortizar]
            },
			{
                columnWidth:.15,
                layout: 'form',
                border:false,
                items: [btnamortizar]
            }
			]
        }
	,
		grid],
        buttons: [{
            text: 'Grabar',
			handler : grabarnotapedido
        },{
            text: 'Cancelar',
			handler : cancelarnotapedido
        }]
    });

function grabarnotapedido(){
/*	var pedido=trim(txt_nropedido.getValue());
	if (pedido == '') {alert('Ingrese Nro. de Pedido');return;}
*/	
	if (Ext.getDom('idfecha_pedido').value=='' || 
		Ext.getDom('idcbo_formapago').value=='' || Ext.getDom('idcbo_moneda').value=='')
		{	//swcabecera=1;
			alert('Datos de cabecera no son validos');return;
	}else{
		if (cbo_moneda.getValue()!=2 && Ext.getDom('idtxt_tipocambio').value==''){
			alert('Ingrese Tipo de Cambio');return;
		}
		if (cbo_formapago.getValue()==2 && Ext.getDom('idcbo_formapago_opc').value==''){
			alert('Ingrese Documento de Pago');return;
		}
	
	}

	var cant_registros = store.getCount();
	if (cant_registros != 0) {
		var sw = 0;
		var array_detalle = [];
		for (var i = 0; i < cant_registros; i++) {
			var record = grid.getStore().getAt(i);
			var cant = record.data.cantidad;
			if (cant == 0) {
				sw = 1;
				break;
			}
			else {
				var xidproducto = record.data.idproducto;
				var dscto= record.data.dcto;
				var precio= record.data.precio;
				var monto_dscto= parseFloat((precio*cant*(dscto/100)).toFixed(4));
				var subtotal= record.data.subtotal;
				var precio_d2= record.data.precio_d2;
				var subtotal_d2= record.data.subtotal_d2;
				
				var item = xidproducto + '$$' + cant+ '$$'+ precio+ '$$' + dscto+ '$$' + subtotal+ '$$' + monto_dscto+ '$$' + precio_d2+ '$$' + subtotal_d2;
				array_detalle.push(item);
			}
		}
		if (sw == 1) {alert('Existe un item con cantidad 0(cero)');return;}
		if (sw == 0) {
			var nropedido = txt_nropedido.getValue();
			var f_pedido = Ext.getDom('idfecha_pedido').value;
			var forma_pago = cbo_formapago.getValue();
			var forma_pago_opc = cbo_formapago_opc.getValue();
			var moneda = cbo_moneda.getValue();
			var tipo_cambio = txt_tipocambio.getValue();
			var detalle = array_detalle.join('|,|');
			Ext.Ajax.request({
				url: 'query.php',
				params: {
					n			: 18,
					nropedido	: nropedido,
					f_pedido	: f_pedido,
					f_entrega	: f_entrega,
					idvendedor	: vendedor,
					idcliente	: cliente,
					idalmacen	: almacen,
					idtipodoc	: tipo_doc,
					idformapago	: forma_pago,
					idfpago_opc	: forma_pago_opc,
					diaspago	: diaspago,
					idmoneda	: moneda,
					tipo_cambio	: tipo_cambio,
					detalle		: detalle,
					usuario		: idusuario
				},
				method: 'GET',
				success: function(result, request){
					var respuesta=result.responseText;
					var arrayrespuesta = respuesta.split(',');
					
					txt_nropedido.setValue(arrayrespuesta[1]);
					Ext.MessageBox.alert('Grabado', arrayrespuesta[0]+arrayrespuesta[1]);
					limpiar();
				},
				failure: function(result, request){
					Ext.MessageBox.alert('Fallo', 'Error al grabar Nota de Pedido');
				}
			});
		}
	}else {alert('No ha ingresado Items en el Detalle');return;}
	
	

};

var ventana = new Ext.Window({
	title	:	'Amortizaciones',
	width:850,
	height:450,
	minWidth: 750,
	minHeight: 450,
	layout : 'fit',
	plain:true,
	y:130,
	bodyStyle: 'padding:5px;',
	items: tab2

});
ventana.show();

function cancelarnotapedido(){
	Ext.Msg.confirm('ALERTA!','Realmente desea cancelar la Nota dePedido?', function(btn){
			if (btn == 'yes') {
				limpiar();
			}
	});
};	

function limpiar(){
	store.removeAll();
	txt_nropedido.setValue('');
	fecha_pedido.setValue(hoy);
	cbo_formapago.setValue('');
	cbo_formapago_opc.setValue('');
	cbo_moneda.setValue('');
	cbo_moneda.setDisabled(false);
	txt_tipocambio.setValue(0)
	cbo_producto.setValue('');
	cbo_grupo.setValue('');
	idproducto 	= '';
	codigo 		= '';
	descripcion = '';
	punitario 	= '';
	unidad 		= '';
	swmoneda	= 0	
};
	
//	elemento=Ext.getDom('contenido');
//	tab2.render(elemento) ;	
	

});
