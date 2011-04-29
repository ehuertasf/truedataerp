Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    Ext.QuickTips.init();

    var fm = Ext.form;
    
	var txtBuscado = new Ext.form.TextField({
		emptyText : 'Buscar Producto...',
        id:'v1',
        width:200,
        allowBlank: true,
		fieldLabel: 'Buscar Producto'
    });
	
	var btnbuscar = new Ext.Button({
            text:		'Consultar',
            id:			'btn1',
            width:		150,
            handler: 	Buscar,
			iconCls:	'search'
	});
	
    var dsMovimiento = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'p_data_combos.php?n=9', waitMsg: 'Buscando...'}),
        reader: new Ext.data.JsonReader({root: 'movimiento'},['idmovimiento','desc_movimiento'])
    }); 	
	   
    var cm = new Ext.grid.ColumnModel([
    	{
           header: 'Movimiento',
           dataIndex: 'desc_movimiento',
           width: 150,
           align:'left',
           editor: new Ext.form.ComboBox({
                store: dsMovimiento,
                displayField: 'desc_movimiento',
                valueField: 'idmovimiento',
                hiddenName: 'idmovimiento',
                triggerAction: 'all',
                forceSelection:true,
                mode:'remote', 
                editable: false,
                allowBlank: false
            })     

       	},
       	{header: 'Estado',					dataIndex: 'desc_estado',		width: 110,	hidden:true},
        {header: 'C&oacute;d. Vendedor',	dataIndex: 'codigo_vendedor',	width: 90,	align:'center'},
        {header: 'Nombre Vendedor',			dataIndex: 'nombre_vendedor',	width: 250,	align:'center'},
        {header: 'Fecha Entrega',			dataIndex: 'f_entrega',			width: 90,	align:'center'},
        {header: 'Fecha Devoluci&oacute;n',	dataIndex: 'f_devolucion',		width: 100,	align:'center'},        
        {header: 'Fecha Registro',			dataIndex: 'f_registro',		width: 250,	hidden:true },
        {header: 'Usuario Entrego',			dataIndex: 'nombre_usuario',	width: 250,	align:'center'},
        {header: 'C&oacute;d. Prod. I',		dataIndex: 'codigo',			width: 100,	align:'center'},
        {header: 'C&oacute;d. Prod. II',	dataIndex: 'codigo_mask',		width: 100,	align:'center'},
        {header: 'Familia',					dataIndex: 'desc_grupo',		width: 90,	align:'center'},
        {header: 'Producto',				dataIndex: 'desc_producto',		width: 90,	align:'center'},
        {header: 'Cantidad',				dataIndex: 'cantidad',			width: 60,	align:'center'},
        {header: 'idmuestra',				dataIndex: 'idmuestra',			width: 95,	hidden: true}
    ]);

    cm.defaultSortable = true;
    


    var Producto = Ext.data.Record.create([
	        {name:'codigo_vendedor'},
	        {name:'nombre_vendedor'},
	        {name:'desc_movimiento'},
	        {name:'f_entrega'},
	        {name:'f_registro'},
	        {name:'nombre_usuario'},
	        {name:'codigo'},
	        {name:'codigo_mask'},       
	        {name:'desc_grupo'},
	        {name:'desc_producto'},
	        {name:'cantidad'},
	        {name:'desc_estado'},
	        {name:'f_devolucion'}
      ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'p_bandeja_muestras.php?n=1', waitMsg: 'Buscando...'}),
        reader: new Ext.data.JsonReader({root: 'lista',totalProperty: 'total'},[
	        {name:'codigo_vendedor'},
	        {name:'nombre_vendedor'},
	        {name:'desc_movimiento'},
	        {name:'f_entrega'},
	        {name:'f_registro'},
	        {name:'nombre_usuario'},
	        {name:'codigo'},
	        {name:'codigo_mask'},       
	        {name:'desc_grupo'},
	        {name:'desc_producto'},
	        {name:'cantidad'},
	        {name:'desc_estado'},
	        {name:'idmuestra'},
	        {name:'f_devolucion'}
        ]),
        remoteSort: false
    });

    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        width:1100,
        height:350,
        //autoExpandColumn:'desc_grupo',
        frame:false,
        clicksToEdit:1,
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),   
        tbar: [txtBuscado,'  ',btnbuscar]
    });

	store.load();
	
   
    function handleEdit(editEvent) {

        var j_idusuario =$F('idusuario'); 

		var NewId        	= editEvent.record.data.idmuestra;
        var NewMovimiento  	= editEvent.record.data.desc_movimiento;
        var NewCodvendedor 	= editEvent.record.data.codigo_vendedor;
        var NewCodproducto 	= editEvent.record.data.codigo;
        var NewNomvendedor 	= editEvent.record.data.nombre_vendedor;

                Ext.Ajax.request({
                    url: 'p_mtto_bandeja_entregados.php',
                    method: 'POST',
                       params: {
                       	tarea:'modificar',
                        idmuestra: NewId,
                        movimiento:	NewMovimiento,
                        c_vendedor:	NewCodvendedor,
                        c_producto:	NewCodproducto,
                        n_vendedor:	NewNomvendedor,
                        idusuario:	j_idusuario
                    },
                    failure:function(response,options){
                        Ext.Msg.alert('Error','Problemas cargando datos.');
                    },
                    success:function(response,options){
                    	if(response.responseText!=2){
                        	store.commitChanges();
                        	store.reload();
                        	Ext.Msg.alert('Ok','Registro Actualizado');
                    	}else{
                    		Ext.Msg.alert('ALERTA','Ocurrio un error al grabar el registro');
                    		
                    	}
                    }
                });

    }
    
    grid.on('afteredit', handleEdit);
    
	txtBuscado.on('change', Buscar);
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_bandeja_muestras.php?n=2&buscar='+buscar});
	    	store.load();
    	}else{
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_bandeja_muestras.php?n=1'});
	    	store.load();    		
    		Ext.get("v1").focus();
    	}
    }
    
    /* *************************************************************************************************** */
    /* Datos para la visualizacion en el viewport
    /* *************************************************************************************************** */

	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:1100,
	    autoHeight:true,
	    collapsible:false,
	    layout:'fit',
	    items: grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title:'PRODUCTOS ENTREGADOS A VENDEDOR',
		width: 1000,
		autoHeight:450,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		y:130,
		id: 'LoginWin2',
		bodyStyle:'padding:5px;',
		items: panel
	});     
    
    Ventana.show();    
	
         
});