Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"
Ext.onReady(function(){



//var summary = new Ext.grid.GroupSummary(); 

var cm_bandeja = new Ext.grid.ColumnModel([
		{header: "Nro.NP",dataIndex: 'idnotapedido',sortable: true,width: 40,align:'center'},
		{header: "vendedor",dataIndex: 'codigo_vendedor',sortable: true,width: 45,align:'center'},
		{header: 'Fecha Pedido',dataIndex: 'f_pedido',sortable: true,width: 60,align: 'center'},
		{header: 'Fecha Entrega',dataIndex: 'f_entrega',sortable: true,width: 60,align: 'center'},
		{header: "Forma Pago",dataIndex: 'desc_pago',sortable: true,width: 50,align:'center'},
		{header: "Doc. Pago",dataIndex: 'desc_abrv',sortable: true,width: 40,align:'center'},
		{header: "Dias Pago",dataIndex: 'diaspago',sortable: true,width: 35,align:'center'},
		{header: 'Doc.',dataIndex: 'desc_tipodocumento',sortable: true,width: 40},
		{header: 'Nro.Doc.',dataIndex: 'nro_documento',sortable: true,width: 40},
		{header: 'Nro.Guia',dataIndex: 'nro_guiaremision',sortable: true,width: 40},
		{header: 'Monto Total',dataIndex: 'montototal',sortable: true,width: 50,align: 'right'},
		{header: 'Monto Total D2',dataIndex: 'montototal_d2',sortable: true,width: 50,align: 'right'},
		{header: 'Moneda',dataIndex: 'desc_moneda',sortable: true,width: 50,align: 'center'}
    ]);

var store_bandeja= new Ext.data.GroupingStore({
	proxy		: new Ext.data.HttpProxy({url: 'query.php'}),
	reader		: new Ext.data.JsonReader({
		root	: 'bandeja',
		fields	: [	{name:'idnotapedido', type:'int'},
					{name:'codigo_vendedor'},
					{name:'f_pedido'},
		            {name:'f_entrega'},
		            {name:'desc_pago'},
					{name:'desc_abrv'},
					{name:'diaspago'},
		            {name:'desc_tipodocumento'},
		            {name:'nro_documento'},
					{name:'nro_guiaremision'},
					{name:'montototal'},
		            {name:'montototal_d2'},
					{name:'desc_moneda'}
		          ],
		autoLoad:true}),
	//groupField	: 'desc_estadonotaped',
	remoteSort	: false,
	sortInfo	: {field: 'idnotapedido', direction: 'ASC'},
	autoLoad	: true
});
 
var grid_bandeja = new Ext.grid.EditorGridPanel({
	store: store_bandeja,
	cm: cm_bandeja,
	width:950,
	height:300,
	//plugins: summary,
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


function gestion(obj_g,fila,ev){
	//alert('Amortizacion');
	//window.open('amortizacion.php?idsess=K321150115008505test');
	var registro = obj_g.getStore().getAt(fila);
	//alert (registro.data.idnotapedido);
	//return;
	//win_amortizacion.show();
	ventana.show();
	panel_amortizacion.load({
    			  url: "amortizacion.php",
	      	          params: {idnotapedido: registro.data.idnotapedido},
			  //grid_bandeja.row_index,evento
  			  discardUrl: false,
  			  nocache: false,
  			  text: "Cargando...",
  			  timeout: 30,
  			  scripts: true
			});

	//panel_amortizacion.setVisible(true);				
	
};

    var ds = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'query.php?n=30'
        }),
        reader: new Ext.data.JsonReader({
            root: 'consulta',
            totalProperty: 'totalCount',
            id: 'idcliente'
        }, [
            {name: 'idcliente', mapping: 'idcliente'},
            {name: 'nombre', mapping: 'nombre'},
            {name: 'cant_doc', mapping: 'cant_doc'},
            {name: 'ruc', mapping: 'ruc'},
            {name: 'dni', mapping: 'dni'}
        ])
    });


    // Custom rendering Template
    var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<h3><span>DNI: {dni}<br />Cant. Doc.: {cant_doc}</span>Ruc: {ruc}</h3>',
            '{nombre}',
        '</div></tpl>'
    );

	
    var search = new Ext.form.ComboBox({
        store: ds,
		fieldLabel :'Cliente',
        displayField:'ruc',
        typeAhead: false,
        loadingText: 'Searching...',
		emptyText	: 'Ingrese Nombre o Razon Social, Ruc o DNI',
        width: 570,
        pageSize:10,
        hideTrigger:true,
        tpl: resultTpl,
        itemSelector: 'div.search-item',
        onSelect: function(record){ // override default onSelect to do redirect
			panel_status.setVisible(true);
			grid_bandeja.setVisible(true);
			panel_status.load({
			    url: "cobranza_status.php",
			    params: {idcliente: record.data.idcliente,nombre: record.data.nombre,ruc: record.data.ruc,dni: record.data.dni}, // or a URL encoded string
			    discardUrl: false,
			    nocache: false,
			    text: "Loading...",
			    timeout: 30,
			    scripts: false
			});
			search.collapse();
			store_bandeja.proxy= new Ext.data.HttpProxy({url: 'query.php?n=31&idcliente='+record.data.idcliente});
		  	store_bandeja.load();
        }
    });
	
	var panel_status = new Ext.Panel({

	    frame:true,
	    autoWidth:true,
	    autoHeight:true,
	    collapsible:true
	});
	
	
	var limpiar = new Ext.Button({
		text: 'Nueva Busqueda',
		handler : limpia,
		iconCls: 'eliminar_item'
	});
	
	function limpia(){
		panel_status.setVisible(false);
		grid_bandeja.setVisible(false);

	};
	var cobranza = new Ext.FormPanel({
	       // title: 'Nota de Pedido',
			//style			: 'background-color:#889CB8;padding:15px 5px 5px 20px;',
	        autoWidth: true,
			autoHeight	:true,
			labelWidth : 45,
			tbar :['Cliente  ',search,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',limpiar],
			items:[panel_status,grid_bandeja]
	    });
	
	var panel = new Ext.Panel({
	    frame:true,
	    autoWidth:true,
	    autoHeight:true,
	    collapsible:true,
	    items: [cobranza ]
	});	
	
	var panel_amortizacion = new Ext.Panel({
	    frame:true,
	    autoWidth:true,
	    autoHeight:true,
	    collapsible:true
	});

	var win = new Ext.Window({
	//	layout		: 'fit',
		width		: 970,
		height		: 500,
		//modal		: true,
		closeAction	: 'hide',
		plain		: true,
		y:130,
		items		: [panel],
		title		:'Cobranzas '
	});
        win.show();
	panel_status.setVisible(false);
	grid_bandeja.setVisible(false);
	//panel_amortizacion.setVisible(false);
	//search.focus(true);
	

	var win_amortizacion = new Ext.Window({
	//	layout		: 'fit',
		width		: 770,
		height		: 400,
		//modal		: true,
		closeAction	: 'hide',
		plain		: true,
		y:130,
		items		: [panel_amortizacion],
		title		:'Amortizaciones'
	});
	
	
});

////////////////////////////declaraciones amortizaciones////////////////////////////////////////////

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


