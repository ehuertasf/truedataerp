Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1, st2, st3, store_cbo;
	var txtNombre,txtDireccion,txtLatitud,txtLongitud;
	var xcbo_departamento,xcbo_ciudad,xcbo_distrito,xcbo_estado;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Amplificador...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar Amplificador'
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
		document.location='exp_cabecera.php?usuario='+login+'&idusuario='+idusuario;
	}	
	
	var store1= new Ext.data.GroupingStore({
	    proxy: new Ext.data.HttpProxy({
	        url: 'p_lista_cabecera.php?n=1'
	    }),
	    reader: new Ext.data.JsonReader({
	        root: 'lista',
	        id: 'resourceId',
	        totalProperty: 'total',	 	        
	        fields: [
		            {name:'id_cabecera'},
		            {name:'nom_cabecera'},
		            {name:'direccion'},
		            {name:'latitud'},
		            {name:'longitud'}
		            
	        ]
	
	    }),
		   
	    //groupField:'departamento',
	    remoteSort: false,
	    sortInfo: {field: 'nom_cabecera', direction: 'DESC'}
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
        //renderTo: 'test',
	    columns:[
		        { id:'id_cabecera',header: "id_cabecera",width: 100 ,sortable: false,groupable: false,dataIndex:'id_cabecera',hidden:true},
		        { header: "Nombre Cabecera",width: 80,sortable: true,dataIndex: 'nom_cabecera',align:'left'},
		        { header: "Direccion",width: 80,sortable: true,dataIndex: 'direccion',groupable:false},
		        { header: "Latitud",width: 120,sortable: true,dataIndex:'latitud',groupable:false},
		        { header: "Longitud",width: 200,sortable: true,dataIndex: 'longitud',groupable:true,align:'left'}
		        
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar,'  ',btnAgregar,'  ',btnActualizar,'  ',btnBorrar,'  ',btn_xls]   
	});	

	/****************************************************************************************************************/
	/*  ACTUALIZAR CLIENTE */
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
			
			var m_cabecera          =selectedRow.get(grid.getColumnModel().getDataIndex(1));
			var m_direccion         =selectedRow.get(grid.getColumnModel().getDataIndex(2));
			var m_latitud           =selectedRow.get(grid.getColumnModel().getDataIndex(3));
            var m_longitud           =selectedRow.get(grid.getColumnModel().getDataIndex(4));
			
								
			
			llama_formulario('MODIFICA CLIENTE','modifica');	    
			
			txtNombre.value			=  m_cabecera;
			txtDireccion.value		=  m_direccion;
			txtLatitud.value		=  m_latitud;
			txtLongitud.value		=  m_longitud;
		
			Ventana_modal.show();
			
	}
	
	/****************************************************************************************************************/
	/*  BORRAR CLIENTE */
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
			var id_cabecera	=selectedRow.get(fieldName);
			
	        Ext.Ajax.request({
	        	url: 'p_admin_cabecera.php',
	            params: {
	                tarea		:'borrar',
					id_cabecera	:id_cabecera,
	                idusuario	:idusuario
	            },
	            failure:function(response,options){
		            Ext.MessageBox.alert('Error','Problema eliminando datos');
	            },
	            success:function(response,options){
	            	var respuesta=response.responseText;
	            	if(respuesta==1){
	            		if (selectedRow) store1.remove(selectedRow);
	            		Ext.Msg.alert('Confirmacion','La cabecera ha sido eliminada');
	            	}else if(respuesta==3){
	            		Ext.Msg.alert('ALERTA!','La cabecera seleccionada no puede ser eliminada por tener movimientos asociados');
	            	}else if(respuesta==4){
	            		Ext.Msg.alert('CUIDADO!','No se puede borrar este registro por ser usado en documentos internos');	
	            	}
	            }
			});   			
			
		}	
	};	
	

	/****************************************************************************************************************/
	/*  VENTANA PARA AGREGAR NUEVO CLIENTE */
	/****************************************************************************************************************/
	function nuevo_producto(){		
		llama_formulario('NUEVA CABECERA','nuevo');
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		/*
		st1=new Ext.data.JsonStore({		//	Data de departamentos
			url		:"p_data_combos.php?n=6",
	 	   	root	:'departamento',
	       	fields: [
	           	{name:'iddepartamento'},
	           	{name:'departamento'}
	       	]
		});		
		
		*/
	    Ext.namespace('Ext.exampledata');
	
		Ext.exampledata.states = [
				['0','Inactivo'],
				['1','Activo']
			];    
		    
	

		txtNombre = new Ext.form.TextField({
			emptyText 	:'Ingrese nombre...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:330,
        	labelAlign	:'right',
        	labelWidth	:100,        	
        	allowBlank	:false,
			fieldLabel	:'Nombre',
			minLength	:3,
			maxLength 	:30,
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 30 caracteres' 
    	}); 

  
    	
		txtDireccion = new Ext.form.TextField({
			emptyText 	:'Ingrese Direccion ...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:330,
            labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
        	fieldLabel	:'Direcci&oacute;n '
    	});  

        txtLongitud = new Ext.form.TextField({
			emptyText 	:'Ingrese Longitud ...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:100,
            labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Longitud '
    	});

        txtLatitud = new Ext.form.TextField({
			emptyText 	:'Ingrese Latitud ...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:100,
            labelAlign	:'right',
        	labelWidth	:100,
        	allowBlank	:false,
			fieldLabel	:'Latitud '
    	});
		
		/*xcbo_departamento = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Departamento',
			id			:'idcbo_departamento',
			store		:st1,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'iddepartamento',
			width		:100,
			mode		:'remote',		
			displayField :'departamento',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xdpto= xcbo_departamento.value;
						st2.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=7&idDpto='+xdpto}); 
						st2.load();
			   		}  
	   		}	
		}));    
		 
		xcbo_ciudad = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Ciudad',
			id			:'idcbo_ciudad',
			store		:st2,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idciudad',
			width		:100,
			mode		:'remote',		
			displayField :'ciudad',
			triggerAction:'all',
		   	listeners: {
		   		select: function (){
		   				xciudad= xcbo_ciudad.value;
						st3.proxy= new Ext.data.HttpProxy({url: 'p_data_combos.php?n=8&idciudad='+xciudad}); 
						st3.load();
			   		}  
	   		}	
		})); 	

		xcbo_distrito = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Distrito',
			id			:'idcbo_distrito',
			store		:st3,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'iddistrito',
			width		:100,
			mode		:'remote',		
			displayField :'distrito',
			triggerAction:'all'		
		})); 
		
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
		*/

		
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
                	items: [txtNombre]	        		
	        	}]
	        },
            {
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
                	columnWidth:1.0,
                	layout: 'form',
                	border:false,
                	items: [txtDireccion]	        		
	        	}]
	        },
            {
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtLongitud]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtLatitud]
		            }]	        			       
	        },
            {
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [btnGraba_nuevo]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [btnCancelar]
		            }]                          
	        }
        ]
		
	
		
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
			y			:180,
			id			:'LoginWin1',
			bodyStyle	:'padding:5px;',
			items		:formulario
		}); 		
	}
	
	/****************************************************************************************************************/
	
	
	txtBuscado.on('change', Buscar);
	
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_cabecera.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid;
    	}
    }	
    
   
    function graba_nuevo(){
    	var j_nombre=Ext.getCmp("txt1").getValue();
    	var j_direccion=Ext.getCmp("txt2").getValue();
    	var j_longitud	=Ext.getCmp("txt3").getValue();
    	var j_latitud	=Ext.getCmp("txt4").getValue();
    	
    	
        	
        Ext.Ajax.request({
        	url: 'p_admin_cabecera.php',
            params: {
                tarea	:'nuevo',
                nombre      :j_nombre,
                direccion	:j_direccion,
                longitud    :j_longitud,
                latitud     :j_latitud,
                idusuario:idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre de la cabecera');
    			}else if(respuesta==3){
    				Ext.MessageBox.alert('Cuidado','El campo Direccion es obligatorio');
    			}else if(respuesta==4){
    				Ext.MessageBox.alert('Cuidado','El campo Longitud es obligatorio');
    			}else if(respuesta==5){
    				Ext.MessageBox.alert('Cuidado','El campo Latitud es obligatorio');
    			}else if(respuesta==1){
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se agrego la nueva Cabecera');
					recargar_grid();				
    			}
    			
            }
		});    	
    
    }
    
    function graba_modificacion(){
    	var j_nombre=Ext.getCmp("txt1").getValue();
    	var j_direccion=Ext.getCmp("txt2").getValue();
    	var j_longitud	=Ext.getCmp("txt3").getValue();
    	var j_latitud	=Ext.getCmp("txt4").getValue();
    	
    	
    	var id_cabecera	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

       
        Ext.Ajax.request({
        	url: 'p_admin_cabecera.php',
            params: {
                tarea	:'modificar',
                id_cabecera	:id_cabecera,
                nombre      :j_nombre,
                direccion	:j_direccion,
                longitud	:j_longitud,
                latitud		:j_latitud,
                idusuario   :idusuario
            },
            failure:function(response,options){
	            Ext.MessageBox.alert('Error','Problema ingresando datos');
            },
            success:function(response,options){
            	var respuesta=response.responseText;
    			if(respuesta==2){
    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre del cliente o en el codigo');
    			}else if(respuesta==5){
    				Ext.MessageBox.alert('Cuidado','El campo RUC es obligatorio y debe ser solo numerico');
    			}else if(respuesta==6){	
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar un Departamento');
    			}else if(respuesta==7){		
    				Ext.MessageBox.alert('Cuidado','Debe seleccionar una Ciudad');
    			}else if(respuesta==1){    				
					Ventana_modal.hide();
					Ventana_modal.destroy();
					Ext.MessageBox.alert('Aviso','Se modifico la Cabecera seleccionada');
					recargar_grid();				
    			}
    			
            }
        });
    }
    
	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_lista_cabecera.php?n=1'});
	  	store1.load();    		
		Ext.get("v1").focus();
		view.startCollapsed=true;			
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
	    width:1000,
	    autoHeight:true,
	    collapsible:false,
	    layout:'fit',
	    items: grid,
        //renderTo:'test'
	});	    
    
			
	var Ventana = new Ext.Window({
		title: 'MANTENIMIENTO DE CABECERAS',
		width: 1000,
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