Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var perfil=Ext.getDom('perfil').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText : 'Buscar Producto...',
        id:'v1',
        width:300,
        allowBlank: false,
		fieldLabel: 'Buscar producto'
    });
	
	var btnbuscar = new Ext.Button({
            text:		'Consultar',
            id:			'btn1',
            width:		150,
            handler: 	Buscar,
			iconCls:	'search'
	});
	
	var btn_xls = new Ext.Button({
            text:		'Exportar XLS',
            id:			'btn2',
            width:		150,
            handler: 	exportar_xls,
			iconCls:	'excel'
	});	

	function exportar_xls(){
		var login		=Ext.getDom('usuario').value;
		var idusuario	=Ext.getDom('idusuario').value;
		document.location='exp_productos.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_busca_producto.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'idproducto'},
		            {name:'desc_grupo'},
		            {name:'codigo'},
		            {name:'desc_producto'},
		            {name:'peso_kg'},
		            {name:'desc_unidad'},
		            {name:'precio_unit'},
		            {name:'codigo_mask'},
		            {name:'precio_dolar'},
		            {name:'desc_empaque'},
		            {name:'desc_marca'},
		            {name:'stk_actual'},
		            {name:'precio2_dolar'}
	        ]
	
	    }),
		   
	    groupField:'desc_grupo',
	    remoteSort: false,
	    sortInfo: {field: 'idproducto', direction: 'DESC'}
	});
	
	store1.load(); 

	var view = new Ext.grid.GroupingView({
	    forceFit		:true,
	    emptyText		:'<div style="text-align:center;">Lista vacia</div>',
	    groupTextTpl	:'<span class="groupHeader">{text}</span>',
	    enableRowBody	:true,
	    showGroupName	:false,
	    enableNoGroups	:false, 
	    showPreview		:true,
	    startCollapsed	:false,	    
	    hideGroupedColumn: true,
	    getRowClass : function(record, rowIndex, p, store){
	        if(this.showPreview){
	            //p.body = '<p>'+record.get('nom_tipo')+'</p>';
	            return 'x-grid3-row-expanded';
	        }
	        return 'x-grid3-row-collapsed';
	    }
	});	
	
	view.startCollapsed=true;
	
	var grid = new Ext.grid.GridPanel({
	    height:400,
	    frame: true,
	    collapsible: true,
	    loadMask: true,
	    store: store1,
	    view: view,
	    columns:[
		        { id:'idproducto',header: "idproducto",width: 100 ,sortable: false,groupable: false,dataIndex:'idproducto',hidden:true}, 	
		        	{ header: "Desc. Grupo",width: 200,sortable: true,dataIndex: 'desc_grupo',align:'left'},
		        	{ header: "C&oacute;digo I",width: 80,sortable: true,dataIndex: 'codigo',groupable:false},
		        	{ header: "C&oacute;digo II",width: 80,sortable: true,dataIndex: 'codigo_mask',groupable:false},
		        	{ header: "Descripci&oacute;n",width: 200,sortable: true,dataIndex: 'desc_producto',groupable:false},
		        	{ header: "Marca",width: 60,sortable: true,dataIndex: 'desc_marca',groupable:true,align:'center'},		        			        	
		        	{ header: "Empaque",width: 100,sortable: true,dataIndex:'desc_empaque', align:'center',groupable:true},		        	
		        	{ header: "Unidad",width: 60,sortable: true,dataIndex:'desc_unidad', align:'center',groupable:true},		        	
		        	{ header: "Stock",width: 60,sortable: true,dataIndex: 'stk_actual',groupable:false,align:'center'},		        	
		        	{ header: "Peso",width: 60,sortable: true,dataIndex: 'peso_kg',groupable:false,align:'center'},		        	
		        	{ header: "Precio S/.",width: 80,sortable: true,dataIndex: 'precio_unit',groupable:false},
		        	{ header: "Precio $/.",width: 80,sortable: true,dataIndex: 'precio_dolar',groupable:false},
		        	{ header: "Precio(2) $/.",width: 80,sortable: true,dataIndex: 'precio2_dolar',groupable:false,hidden:visible}
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar,'  ',btn_xls]   
	});	

	txtBuscado.on('change', Buscar);
	
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_busca_producto.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_busca_producto.php?n=1'});
	    	store1.load();    		
    		Ext.get("v1").focus();
    		view.startCollapsed=true;
    	}
    }	
	
	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:950,
	    autoHeight:true,
	    collapsible:false,
	    layout:'fit',
	    items: grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title: 'LISTA DE PRODUCTOS',
		width: 950,
		autoHeight:450,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		y:180,
		id: 'LoginWin2',
		bodyStyle:'padding:5px;',
		items: panel
	}); 	

	Ventana.show();

});