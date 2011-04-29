Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){

	/***********************************************************************************************************/
	/*	STOCKS	*/
	/***********************************************************************************************************/		
	
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

	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_stocks.php?n=1'
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
		            {name:'stk_actual'},
	        ]
	
	    }),
		   
	    groupField:'desc_grupo',
	    remoteSort: false,
	    sortInfo: {field: 'desc_producto', direction: 'DESC'}
	});


	var view = new Ext.grid.GroupingView({
	    forceFit		:true,
	    emptyText		:'<div style="text-align:center;">No se encontrar&oacute;n registros</div>',
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
	
	var grid = new Ext.grid.GridPanel({
	    height:350,
	    frame: true,
	    collapsible: true,
	    loadMask: true,
	    store: store1,
	    view: view,
	    columns:[
		        { id:'idproducto',header: "idproducto",width: 100 ,sortable: false,groupable: false,dataIndex:'idproducto',hidden:true}, 	
		        	{ header: "Desc. Grupo",width: 200,sortable: true,dataIndex: 'desc_grupo',align:'left'},
		        	{ header: "C&oacute;digo",width: 100,sortable: true,dataIndex: 'codigo',groupable:false},
		        	{ header: "Descripci&oacute;n Producto",width: 200,sortable: true,dataIndex: 'desc_producto',groupable:false},
		        	{ header: "Peso",width: 50,sortable: true,dataIndex: 'peso_kg',groupable:false,hidden:true},		        	
		        	{ header: "Uni. Medida",width: 100,sortable: true,dataIndex:'desc_unidad', align:'center',groupable:false,hidden:true},
		        	{ header: "Precio",width: 50,sortable: true,dataIndex: 'precio_unit',groupable:false,hidden:true},
		        	{ header: "Stock",width: 50,sortable: true,dataIndex: 'stk_actual',groupable:false,align:'center'}
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar],
        bbar: new Ext.PagingToolbar({
            pageSize: 17,
            store: store1,
            displayInfo: true,
            displayMsg: 'Total registros {0} - {1} de {2}',
            emptyMsg: "No hay registros para mostrar"
        })	    
	});	

	store1.load({params:{n:1,start:0, limit:17}}); 	
	
    function toggleDetails(btn, pressed){
        grid.refresh();
    }	
	
	txtBuscado.on('change', Buscar);
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_stocks.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
    	}else if(buscar.length<1){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_stocks.php?n=1&start=0&limit=17'});
	    	store1.load();    		
    		Ext.get("v1").focus();
    	}
    }	
	
	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:720,
	    autoHeight:true,
	    collapsible:false,
	    collapsed:false,
	    layout:'fit',
	    items: grid
	});	    
    
	
 	
	var Ventana = new Ext.Window({
		title: 'CONSULTA DE STOCKS',
		width: 720,
		autoHeight:450,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		y:130,
		id: 'LoginWin3',
		bodyStyle:'padding:5px;',
		items: panel
	}); 	

	Ventana.show();

});