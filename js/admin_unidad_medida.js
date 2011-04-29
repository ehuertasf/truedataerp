Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var store_cbo;
	var txtDesc;
	var xcbo_estado;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Unidad...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar unidad'
    });
	
	var btnbuscar = new Ext.Button({
        text	:'Consultar',
        id		:'btn1',
        width	:150,
        handler	:Buscar,
		iconCls	:'search'
	});

	var btnAgregar = new Ext.Button({
        text	:'Nuevo',
        id		:'btn2',
        width	:150,
        handler	:nuevo_producto,
		iconCls	:'agregar_item'
	});	

	var btnBorrar = new Ext.Button({
        text	:'Eliminar',
        id		:'btn3',
        width	:150,
        handler	:handleDelete,
		iconCls	:'eliminar_item'
	});		
	
	var btnActualizar = new Ext.Button({
        text	:'Modificar',
        id		:'btn4',
        width	:150,
        handler	:actualizar_producto,
		iconCls	:'update_item'
	});		
	
	var btn_xls = new Ext.Button({
        text	:'Exportar XLS',
        id		:'btn5',
        width	:150,
        handler	:exportar_xls,
		iconCls	:'excel'
	});	

	function exportar_xls(){
		var login		=Ext.getDom('usuario').value;
		var idusuario	=Ext.getDom('idusuario').value;
		document.location='exp_unidad_medida.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_unidad_medida.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'idunidad'},
		            {name:'desc_unidad'},
		            {name:'estado'}
	        ]
	
	    }),
		   
	    remoteSort: false,
	    sortInfo: {field: 'desc_unidad', direction: 'DESC'}
	});
	
	store1.load(); 

	var grid = new Ext.grid.GridPanel({
	    height:400,
	    frame: true,
	    collapsible: true,
	    loadMask: true,
	    store: store1,
	    columns:[
		        { id:'idunidad',header: "idunidad",width: 100 ,sortable: false,groupable: false,dataIndex:'idunidad',hidden:true}, 	
		        	{ header: "Unidad de Medida",width: 200,sortable: true,dataIndex: 'desc_unidad',align:'left'},
		        	{ header: "Estado",width: 100,sortable: true,dataIndex: 'estado',groupable:false,hidden:visible}
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [btnAgregar,'  ',btnActualizar,'  ',btnBorrar,'  ',btn_xls]   
	});	

	/****************************************************************************************************************/
	/*  ACTUALIZAR UNIDAD DE MEDIDA */
	/****************************************************************************************************************/	
	
	function actualizar_producto(){
		var selectedKeys = grid.selModel.selections.keys;
	    if(selectedKeys.length > 0) {
	    	muestra_datos();
		}else{
			Ext.Msg.alert('Aviso','Seleccione un registro para modificar');
		}
				
	}
	
	function muestra_datos(){
			selectedRow	= grid.getSelectionModel().getSelected();
			
			var m_desc	=selectedRow.get(grid.getColumnModel().getDataIndex(1));			
			var m_estado=selectedRow.get(grid.getColumnModel().getDataIndex(2));
			
			llama_formulario('MODIFICA UNIDAD DE MEDIDA','modifica');	    
			
			txtDesc.value			=m_desc;
			xcbo_estado.value		=m_estado;
			Ventana_modal.show();
			
	}
	
	/****************************************************************************************************************/
	/*  BORRAR UNIDAD DE MEDIDA */
	/****************************************************************************************************************/	
	
	function handleDelete(){
		var selectedKeys = grid.selModel.selections.keys;
	    if(selectedKeys.length > 0) {
	    	Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?', deleteRecord);
		}else{
			Ext.Msg.alert('Aviso','Seleccione un registro para eliminar');
		}
		
	}
	
	function deleteRecord(btn) {
		if (btn == 'yes') {
			var selectedRow	=grid.getSelectionModel().getSelected();
			var fieldName 	=grid.getColumnModel().getDataIndex(0);					
			var idunidad	=selectedRow.get(fieldName);
			
	        Ext.Ajax.request({
	        	url: 'p_admin_unidad_medida.php',
	            params: {
	                tarea		:'borrar',
					idunidad	:idunidad,
	                idusuario	:idusuario
	            },
	            failure:function(response,options){
		            Ext.MessageBox.alert('Error','Problema eliminando datos');
	            },
	            success:function(response,options){
	            	var respuesta=response.responseText;
	            	if(respuesta==1){
	            		if (selectedRow) store1.remove(selectedRow);
	            		Ext.Msg.alert('Confirmacion','El registro ha sido eliminado');	
	            	}else if(respuesta==3){
	            		Ext.Msg.alert('ALERTA!','El registro seleccionado no puede ser eliminado por tener movimientos asociados');	
	            	}
	            }
			});   			
			
		}	
	};	
	

	/****************************************************************************************************************/
	/*  VENTANA PARA AGREGAR NUEVA UNIDAD DE MEDIDA */
	/****************************************************************************************************************/
	function nuevo_producto(){		
		llama_formulario('NUEVA UNIDAD DE MEDIDA','nuevo');	    
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		
	    Ext.namespace('Ext.exampledata');
	
		Ext.exampledata.states = [
				['0','Inactivo'],
				['1','Activo']
			];    
		    
		store_cbo = new Ext.data.SimpleStore({
			fields: [
				{name: 'idestado'},
				{name: 'estado'}
			],
			data : Ext.exampledata.states 
		});		

		txtDesc = new Ext.form.TextField({
			emptyText 	:'Ingrese descripcion...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:330,
        	labelAlign	:'right',
        	labelWidth	:100,        	
        	allowBlank	:false,
			fieldLabel	:'Descripcion',
			minLength	:3,
			maxLength 	:30,
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 20 caracteres' 
    	}); 
		
		xcbo_estado = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Estado',
			id			:'idcbo_estado',
			store		:store_cbo,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idestado',
			width		:100,
			mode		:'local',		
			displayField :'estado',
			triggerAction:'all'		
		}));		
		

		
		var btnGraba_nuevo = new Ext.Button({
            text	:'Grabar',
            id		:'btn4',
            width	:150,
            handler	:function(){
            	if(accion=='nuevo'){
            		graba_nuevo();
            	}else{
            		graba_modificacion();
            	}
            }
		});	

		var btnCancelar = new Ext.Button({
            text	:'Cancelar',
            id		:'btn5',
            width	:150,
            handler	:cancelar
		});	
		
    	/********************************************************/
    	
		formulario = new Ext.FormPanel({
	        frame		:true,        
	        labelAlign	:'right',
	        labelWidth	:90,
	        autoWidth	:true,
	        waitMsgTarget:true,
	        items		:[{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtDesc]	        		
	        	}]
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout	:'form',
	    	            border	:false,
	    	            items	:[xcbo_estado]		                
	            	},{
		                columnWidth:.50,
		                layout	:'form',
		                border	:false,
		                html	:'&nbsp;'
		            }]	 	        	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                items	:btnGraba_nuevo
	        	},{
	                columnWidth:.25,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'	        		
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                items	:btnCancelar
	        	},{
	                columnWidth:.20,
	                layout	:'form',
	                border	:false,
	                html	:'&nbsp;'
	        	}]	        	
	        }]
		
	
		
	    }); 			
    	
		Ventana_modal = new Ext.Window({
			title		:titulo,
			width		:500,
			modal		:true,
			frame		:true,
			autoHeight	:650,
			minWidth	:400,
			minHeight	:150,
			plain		:true,
			y			:200,
			id			:'LoginWin1',
			bodyStyle	:'padding:5px;',
			items		:formulario
		}); 		
	}
	
	/****************************************************************************************************************/
	
	/* No empleamos buscador en este modulo */
	txtBuscado.on('change', Buscar);
	
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_unidad_medida.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid;
    	}
    }	
    
   
    function graba_nuevo(){
    	var j_desc=Ext.getCmp("txt1").getValue();
    	var j_estado=Ext.getCmp("idcbo_estado").getValue();
    	
        	
        Ext.Ajax.request({
        	url: 'p_admin_unidad_medida.php',
            params: {
                tarea	:'nuevo',
                nombre	:j_desc,
                estado	:j_estado,
                idusuario:idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en la descripcion');
    			}else if(respuesta==8){	
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar un estado');
    			}else if(respuesta==9){
    				Ext.MessageBox.alert('Cuidado','Hay un error de ingreso');
    			}else if(respuesta==1){
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se agrego nueva unidad de medida');
					recargar_grid();				
    			}
    			
            }
		});    	
    
    }
    
    function graba_modificacion(){
    	var j_desc	=Ext.getCmp("txt1").getValue();
    	var j_estado=Ext.getCmp("idcbo_estado").getValue();
    	
    	var j_idunidad	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

       
        Ext.Ajax.request({
        	url: 'p_admin_unidad_medida.php',
            params: {
                tarea	:'modificar',
                idunidad:j_idunidad,
                nombre	:j_desc,
                estado	:j_estado,
                idusuario:idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en la descripcion');
    			}else if(respuesta==9){
    				Ext.MessageBox.alert('Cuidado','Hay un error de ingreso');
    			}else if(respuesta==8){	
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar un estado');    				
    			}else if(respuesta==1){    				
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se modifico el registro seleccionado seleccionado');
					recargar_grid();				
    			}
    			
            }
        });
    }
    
	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_unidad_medida.php?n=1'});
	  	store1.load();    		
		//Ext.get("v1").focus();
	}
    
    function cancelar(){
    	try{    		
    		Ventana_modal.hide();  		
    	}catch(e){
    		//no hago nada
    	}
    }
	
	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:false,
	    width:350,
	    autoHeight:true,
	    collapsible:false,
	    layout:'fit',
	    items: grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title: 'MODULO -> MANTENIMIENTO DE UNIDAD DE MEDIDA',
		width: 350,
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