Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var visible=true;
	var formulario;
	var Ventana_modal;
	var data;
	var selectedRow;
	var st1, st2, st3, st4, store_cbo;
	var txtProducto,txtCodI,txtCodII,txtPeso,txtPrecioI,txtPrecioII,txtPrecioIII,txtStock;
	var xcbo_familia,xcbo_unidad,xcbo_empaque,xcbo_marca,xcbo_estado;
	
	var perfil		=Ext.getDom('perfil').value;
	var idusuario	=Ext.getDom('idusuario').value;
	
	if (perfil==2) visible=false;
	
	var txtBuscado = new Ext.form.TextField({
		emptyText 	:'Buscar Producto...',
        id			:'v1',
        width		:300,
        allowBlank	:false,
		fieldLabel	:'Buscar producto'
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
		            {name:'precio2_dolar'},
		            {name:'estado'}
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
		        	{ header: "Marca",width: 75,sortable: true,dataIndex: 'desc_marca',groupable:true,align:'center'},		        			        	
		        	{ header: "Empaque",width: 100,sortable: true,dataIndex:'desc_empaque', align:'center',groupable:true},		        	
		        	{ header: "Unidad",width: 60,sortable: true,dataIndex:'desc_unidad', align:'center',groupable:true},		        	
		        	{ header: "Stock",width: 60,sortable: true,dataIndex: 'stk_actual',groupable:false,align:'center'},		        	
		        	{ header: "Peso",width: 60,sortable: true,dataIndex: 'peso_kg',groupable:false,align:'center'},		        	
		        	{ header: "Precio S/.",width: 70,sortable: true,dataIndex: 'precio_unit',groupable:false},
		        	{ header: "Precio $/.",width: 80,sortable: true,dataIndex: 'precio_dolar',groupable:false},
		        	{ header: "Precio(2) $/.",width: 80,sortable: true,dataIndex: 'precio2_dolar',groupable:false,hidden:visible},
		        	{ header: "Estado",width: 55,sortable: true,dataIndex: 'estado',groupable:false,hidden:visible}
	    ],
	    sm: new Ext.grid.RowSelectionModel({
	        singleSelect:true
	    }),
	    tbar: [txtBuscado,'  ',btnbuscar,'  ',btnAgregar,'  ',btnActualizar,'  ',btnBorrar,'  ',btn_xls]   
	});	

	/****************************************************************************************************************/
	/*  ACTUALIZAR PRODUCTO */
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
			
			
			var grupo		=selectedRow.get(grid.getColumnModel().getDataIndex(1));
			var codigoI		=selectedRow.get(grid.getColumnModel().getDataIndex(2));
			var codigoII	=selectedRow.get(grid.getColumnModel().getDataIndex(3));
			var descripcion	=selectedRow.get(grid.getColumnModel().getDataIndex(4));
			var marca		=selectedRow.get(grid.getColumnModel().getDataIndex(5));
			var empaque		=selectedRow.get(grid.getColumnModel().getDataIndex(6));
			var unidad		=selectedRow.get(grid.getColumnModel().getDataIndex(7));
			var stock		=selectedRow.get(grid.getColumnModel().getDataIndex(8));
			var peso		=selectedRow.get(grid.getColumnModel().getDataIndex(9));
			var precioI		=selectedRow.get(grid.getColumnModel().getDataIndex(10));
			var precioII	=selectedRow.get(grid.getColumnModel().getDataIndex(11));					
			var precioIII	=selectedRow.get(grid.getColumnModel().getDataIndex(12));					
			var estado		=selectedRow.get(grid.getColumnModel().getDataIndex(13));					
			
			llama_formulario('MODIFICA PRODUCTO','modifica');	    
			
			txtProducto.value	=descripcion;
			txtCodI.value		=codigoI;		
			txtCodII.value		=codigoII;
			txtPeso.value		=peso;
			txtPrecioI.value	=precioI;
			txtPrecioII.value	=precioII;
			txtPrecioIII.value	=precioIII;
			txtStock.value		=stock;
			xcbo_familia.value	=grupo;
			xcbo_unidad.value	=unidad;
			xcbo_empaque.value	=empaque;
			xcbo_marca.value	=marca;
			xcbo_estado.value	=estado;			
							
			Ventana_modal.show();
			
	}
	
	/****************************************************************************************************************/
	/*  BORRAR PRODUCTO */
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
			var selectedRow	= grid.getSelectionModel().getSelected();
			var fieldName 	=grid.getColumnModel().getDataIndex(0);					
			var idproducto	=selectedRow.get(fieldName);
			
			if(idusuario!=0){ 
		        Ext.Ajax.request({
		        	url: 'p_admin_productos.php',
		            params: {
		                tarea		:'borrar',
						idproducto	:idproducto,
		                idusuario	:idusuario
		            },
		            failure:function(response,options){
			            Ext.MessageBox.alert('Error','Problema eliminando datos');
		            },
		            success:function(response,options){
		            	var respuesta=response.responseText;
		            	if(respuesta==1){
		            		if (selectedRow) store1.remove(selectedRow);
		            		Ext.Msg.alert('Confirmacion','El producto ha sido eliminado');	
		            	}else if(respuesta==3){
		            		Ext.Msg.alert('ALERTA!','El producto seleccionado no puede ser eliminado por tener movimientos asociados');	
		            	}
		            }
				});   			
			}else{
        		Ext.MessageBox.alert('Aviso','Proceso cancelado. debe volver a logearse');
        		document.location='login.php';				
			}
		}	
	};	
	

	/****************************************************************************************************************/
	/*  VENTANA PARA AGREGAR NUEVO PRODUCTO */
	/****************************************************************************************************************/
	function nuevo_producto(){		
		llama_formulario('NUEVO PRODUCTO','nuevo');	    
		Ventana_modal.show();			
	}
	
	function llama_formulario(titulo,accion){
		
		/*********** componentes del formulario *******************/
		
		st1=new Ext.data.JsonStore({		//	Data de familias de productos
			url		:"p_data_combos.php?n=1",
	 	   	root	:'grupo',
	       	fields: [
	           	{name:'idgrupo_prod'},
	           	{name:'desc_grupo'}
	       	]
		});		
		
		st2=new Ext.data.JsonStore({		//	Data de unidad de medida
			url		:"p_data_combos.php?n=2",
	 	   	root	:'unidad',
	       	fields: [
	           	{name:'idunidad'},
	           	{name:'desc_unidad'}
	       	]
		});		
		
		st3=new Ext.data.JsonStore({		//	Data de empaque
			url		:"p_data_combos.php?n=3",
	 	   	root	:'empaque',
	       	fields: [
	           	{name:'idempaque'},
	           	{name:'desc_empaque'}
	       	]
		});	
		
		st4=new Ext.data.JsonStore({		//	Data de marca
			url		:"p_data_combos.php?n=4",
	 	   	root	:'marca',
	       	fields: [
	           	{name:'idmarca'},
	           	{name:'desc_marca'}
	       	]
		});	
		
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

		txtProducto = new Ext.form.TextField({
			emptyText 	:'Ingrese nombre...',
        	id			:'txt1',
        	name		:'ntxt1',
        	width		:330,
        	labelAlign	:'right',
        	labelWidth	:100,        	
        	allowBlank	:true,
			fieldLabel	:'Descripci&oacute;n',
			minLength	:3,
			maxLength 	:30,
			minLengthText:'El texto debe tener como minimo 3 caracteres',
			maxLengthText:'El texto debe tener como maximo 30 caracteres' 
    	}); 

		txtCodI = new Ext.form.TextField({
			emptyText 	:'Ingrese codigo...',
        	id			:'txt2',
        	name		:'ntxt2',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'C&oacute;digo I',
			minLength	:3,
			maxLength 	:10			
    	});     	
		
		txtCodII = new Ext.form.TextField({
			emptyText 	:'Ingrese codigo...',
        	id			:'txt3',
        	name		:'ntxt3',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'C&oacute;digo II',
			minLength	:3,
			maxLength 	:10				
    	});    
    	
		txtPeso = new Ext.form.TextField({
			emptyText 	:'Ingrese peso...',
        	id			:'txt4',
        	name		:'ntxt4',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Peso'
    	});    
    	
		txtPrecioI = new Ext.form.TextField({
        	id			:'txt5',
        	name		:'ntxt5',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Precio S/.'
    	});  
    	
		txtPrecioII = new Ext.form.TextField({
        	id			:'txt6',
        	name		:'ntxt6',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Precio $/.'
    	});   
    	
		txtPrecioIII = new Ext.form.TextField({
        	id			:'txt7',
        	name		:'ntxt7',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Precio $/.(2)'
    	});
    	
		txtStock = new Ext.form.TextField({
        	id			:'txt8',
        	name		:'ntxt8',
        	width		:100,
        	allowBlank	:true,
			fieldLabel	:'Stock Inicial'
    	});    	
    	
		xcbo_familia = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Familia',
			id			:'idcbo_familia',
			store		:st1,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idgrupo_prod',
			width		:100,
			mode		:'remote',		
			displayField :'desc_grupo',
			triggerAction:'all'		
		}));    
		 
		xcbo_unidad = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Unidad Medida',
			id			:'idcbo_unidad',
			store		:st2,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idunidad',
			width		:100,
			mode		:'remote',		
			displayField :'desc_unidad',
			triggerAction:'all'		
		})); 	

		xcbo_empaque = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Empaque',
			id			:'idcbo_empaque',
			store		:st3,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idempaque',
			width		:100,
			mode		:'remote',		
			displayField :'desc_empaque',
			triggerAction:'all'		
		})); 
		

		xcbo_marca = new Ext.ux.Andrie.Select(Ext.applyIf({
			fieldLabel	:'Marca',
			id			:'idcbo_marca',
			store		:st4,		
			multiSelect	:false,
			minLength	:1,
			emptyText	:'Seleccionar...', 
			valueField	:'idmarca',
			width		:100,
			mode		:'remote',		
			displayField :'desc_marca',
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
                	items: [txtProducto]	        		
	        	}]
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtCodI]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtCodII]
		            }]	        			       
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [xcbo_familia]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtPeso]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [xcbo_unidad]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [xcbo_empaque]
		            }]		        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [xcbo_marca]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [xcbo_estado]
		            }]	 	        	
	        },{
	            layout:'column',
	            border:false,
	            items:[{
	            	    columnWidth:.50,
	        	        layout: 'form',
	    	            border:false,
		                items: [txtPrecioI]
	            	},{
		                columnWidth:.50,
		                layout: 'form',
		                border:false,
		                items: [txtPrecioII]
		            }]	       	
	        },{
            	layout	:'column',
            	border	:false,	        	
	        	items	:[{
	                columnWidth:.50,
	                layout: 'form',
	                border:false,
	                items: [txtPrecioIII]		        		
	        	},{
                	columnWidth:.50,
                	layout: 'form',
                	border:false,
                	items: [txtStock]	        		
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
			autoHeight	:550,
			minWidth	:400,
			minHeight	:150,
			plain		:true,
			y			:230,
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
	    	store1.proxy= new Ext.data.HttpProxy({url: 'p_busca_producto.php?n=2&buscar='+buscar});
	    	store1.load();
	    	Ext.get("v1").focus();
	    	view.startCollapsed=false;
    	}else if(buscar.length<1){
			recargar_grid
    	}
    }	
    
   
    function graba_nuevo(){
    	var descripcion=Ext.getCmp("txt1").getValue();
    	var codigoI	=Ext.getCmp("txt2").getValue();
    	var codigoII=Ext.getCmp("txt3").getValue();	
    	var familia	=Ext.getCmp("idcbo_familia").getValue();
    	var peso	=Ext.getCmp("txt4").getValue();	
    	var unidad	=Ext.getCmp("idcbo_unidad").getValue();	
    	var empaque	=Ext.getCmp("idcbo_empaque").getValue();	
    	var marca	=Ext.getCmp("idcbo_marca").getValue();	
    	var estado	=Ext.getCmp("idcbo_estado").getValue();	
    	var precio_s=Ext.getCmp("txt5").getValue();	
    	var precio_d=Ext.getCmp("txt6").getValue();	
    	var precio_f=Ext.getCmp("txt7").getValue();	
    	var stk_ini =Ext.getCmp("txt8").getValue();	
    	
        if(idusuario!=0){
	        Ext.Ajax.request({
	        	url: 'p_admin_productos.php',
	            params: {
	                tarea	:'nuevo',
	                desc	:descripcion,
	                codigoI	:codigoI,
	                codigoII:codigoII,
	                familia	:familia,
	                peso	:peso,
	                unidad	:unidad,
	                empaque	:empaque,
	                marca	:marca,
	                estado	:estado,
	                precio_s:precio_s,
	                precio_d:precio_d,
	                precio_f:precio_f,
	                stk_ini	:stk_ini,
	                idusuario:idusuario
	            },
	            failure:function(response,options){
		            Ext.MessageBox.alert('Error','Problema ingresando datos');
	            },
	            success:function(response,options){
	            	var respuesta=response.responseText;
	    			if(respuesta==2){
	    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre del producto, codigo I o codigo II');
	    			}else if(respuesta==5){
	    				Ext.MessageBox.alert('Cuidado','No puede utilizar , (coma) como separador decimal use . (punto) ');
	    			}else if(respuesta==9){
	    				Ext.MessageBox.alert('Cuidado','Hay un error de ingreso. Hay campos vacios o el codigo esta duplicado');    				
	    			}else if(respuesta==1){
						Ventana_modal.hide();
						Ventana_modal.destroy();
						Ext.MessageBox.alert('Aviso','Se agrego el nuevo Producto');
						recargar_grid();				
	    			}
	    			
	            }
			});    	
        }else{
        	Ext.MessageBox.alert('Aviso','Proceso cancelado. debe volver a logearse');
        	document.location='login.php';
        }
    }
    
    function graba_modificacion(){
    	var descripcion=Ext.getCmp("txt1").getValue();
    	var codigoI	=Ext.getCmp("txt2").getValue();
    	var codigoII=Ext.getCmp("txt3").getValue();	
    	var familia	=Ext.getCmp("idcbo_familia").getValue();
    	var peso	=Ext.getCmp("txt4").getValue();	
    	var unidad	=Ext.getCmp("idcbo_unidad").getValue();	
    	var empaque	=Ext.getCmp("idcbo_empaque").getValue();	
    	var marca	=Ext.getCmp("idcbo_marca").getValue();	
    	var estado	=Ext.getCmp("idcbo_estado").getValue();	
    	var precio_s=Ext.getCmp("txt5").getValue();	
    	var precio_d=Ext.getCmp("txt6").getValue();	
    	var precio_f=Ext.getCmp("txt7").getValue();	
    	var stk_ini =Ext.getCmp("txt8").getValue();	
    	
    	var idproducto	=selectedRow.get(grid.getColumnModel().getDataIndex(0));

		if(idusuario!=0){ 
	        Ext.Ajax.request({
	        	url: 'p_admin_productos.php',
	            params: {
	                tarea	:'modificar',
	                idprod	:idproducto,
	                desc	:descripcion,
	                codigoI	:codigoI,
	                codigoII:codigoII,
	                familia	:familia,
	                peso	:peso,
	                unidad	:unidad,
	                empaque	:empaque,
	                marca	:marca,
	                estado	:estado,
	                precio_s:precio_s,
	                precio_d:precio_d,
	                precio_f:precio_f,
	                stk_ini	:stk_ini,
	                idusuario:idusuario
	            },
	            failure:function(response,options){
		            Ext.MessageBox.alert('Error','Problema ingresando datos');
	            },
	            success:function(response,options){
	            	var respuesta=response.responseText;
					if(respuesta==5){
	    				Ext.MessageBox.alert('Cuidado','No puede utilizar , (coma) como separador decimal use . (punto) ');
	    			}else if(respuesta==1){    				
						Ventana_modal.hide();
						Ventana_modal.destroy();
						Ext.MessageBox.alert('Aviso','Se modifico el Producto seleccionado');
						recargar_grid();				
	    			}else if(respuesta==7 || respuesta==8 || respuesta==9){
	    				Ext.MessageBox.alert('Cuidado','Esta ingresando caracteres no validos en el nombre del producto, codigo I o codigo II');
	    			}else if(respuesta==2){
	    				Ext.MessageBox.alert('Cuidado','Ocurrio un error al actualizar registro, verifique');
	    			}
	    			
	            }
	        });
		}else{
			Ext.MessageBox.alert('Aviso','Proceso cancelado. debe volver a logearse');			
        	document.location='login.php';
		}
    }
    
	function recargar_grid(){
	   	store1.proxy= new Ext.data.HttpProxy({url: 'p_busca_producto.php?n=1'});
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
	    items: grid
	});	    
    
			
	var Ventana = new Ext.Window({
		title: 'MODULO -> MANTENIMIENTO DE PRODUCTOS',
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