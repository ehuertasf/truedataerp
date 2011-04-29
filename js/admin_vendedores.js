Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    Ext.QuickTips.init();

    Ext.namespace('Ext.exampledata');

	Ext.exampledata.states = [
			['Inactivo'],
			['Activo']
		];    
	    
	var store_cbo = new Ext.data.SimpleStore({
		fields: ['estado'],
		data : Ext.exampledata.states 
	});    
    
    var fm = Ext.form;
    
	var txtBuscado = new Ext.form.TextField({
		emptyText : 'Buscar Vendedor...',
        id:'v1',
        width:200,
        allowBlank: true,
		fieldLabel: 'Buscar Vendedor'
    });
	
	var btnbuscar = new Ext.Button({
            text:		'Consultar',
            id:			'btn1',
            width:		150,
            handler: 	Buscar,
			iconCls:	'search'
	});
	  
    var cm = new Ext.grid.ColumnModel([{
           id:'codigo',
           header: 'C&oacute;digo ',
           dataIndex: 'codigo_vendedor',
           width: 90,
           align:'center',
           editor: new fm.TextField({
               allowBlank: false
           })       	
        },{	
           header: 'Nombre',
           dataIndex: 'nombre_vendedor',
           width: 200,
           align:'center',
           editor: new fm.TextField({
               allowBlank: false
           })
        },{
           header: 'Apellido Paterno',
           dataIndex: 'ap_paterno_vendedor',
           width: 200,
           align:'center',
           editor: new fm.TextField({
               allowBlank: true
           })        	
        },{
           header: 'Apellido Materno',
           dataIndex: 'ap_materno_ven',
           width: 200,
           align:'center',
           editor: new fm.TextField({
               allowBlank: true
           })
        },{
           header: 'Estado',
           dataIndex: 'flag',
           width: 100,
           align:'center',
           editor: new Ext.form.ComboBox({
                store: store_cbo,
                displayField: 'estado',
                valueField: 'estado',
                hiddenName: 'estado',
                triggerAction: 'all',
                forceSelection:true,
                mode:'local', 
                editable: false,
                allowBlank: false
            })        	
        },{   
           header: 'idvendedor',
           dataIndex: 'idvendedor',
           width: 95,
           hidden: true,
           editor: new fm.TextField({
                allowBlank: false,
                readOnly: true
            })
        }
    ]);

    cm.defaultSortable = true;
    


    var Vendedor = Ext.data.Record.create([
           	{name: 'codigo_vendedor'},
           	{name: 'nombre_vendedor', type: 'string'},
           	{name: 'ap_paterno_vendedor', type: 'string'},
           	{name: 'ap_materno_ven', type: 'string'},
           	{name: 'flag'}
      ]);

    var store = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({url: 'p_lista_vendedores.php?n=1', waitMsg: 'Buscando...'}),
        reader: new Ext.data.JsonReader({root: 'lista'},[
			{name:'idvendedor'},
		    {name:'codigo_vendedor'},
		    {name:'nombre_vendedor'},
		    {name:'ap_paterno_vendedor'},
		    {name:'ap_materno_ven'},
		    {name:'flag'}      
        ]),
        remoteSort: false
    });

    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        cm: cm,
        width:700,
        height:350,
        frame:true,
        clicksToEdit:1,
        selModel: new Ext.grid.RowSelectionModel({singleSelect:false}),
        tbar: [{
            text: 'Agregar',
            iconCls:'add',
            handler : function(){
                var p = new Vendedor({
                    codigo_vendedor: '',
                    nombre_vendedor: '',
                    ap_paterno_vendedor: '',
                    ap_materno_ven: '',
                    flag:'',
                    nuevo: 'si'
                });
                grid.stopEditing();
                store.insert(0, p);
                grid.startEditing(0, 0);
            }
        },'-',{
            text:'Eliminar',
            iconCls:'del',
            handler: handleDelete
        },'-','  ',txtBuscado,'  ',btnbuscar]
    });

    store.load();

    function handleDelete() {
        var selectedKeys = grid.selModel.selections.keys;
        if(selectedKeys.length > 0) {
            Ext.Msg.confirm('ALERTA!','Realmente desea eliminar el registro?', deleteRecord);
        } else {
            Ext.Msg.alert('ALERTA!','Seleccione un registro para eliminar');
        }
    };

    function deleteRecord(btn) {
        if (btn=='yes') {
        	var j_idusuario =$F('idusuario');
        	var m = grid.getSelections();
			var selectedKeys=m[0].get("idvendedor"); 	     	
        	
            var selectedRow = grid.getSelectionModel().getSelected();
			
            if(selectedRow){
                store.remove(selectedRow);
            }

            Ext.Ajax.request({
                url: 'p_mtto_vendedores.php',
                params: {
                    idvendedor	:selectedKeys,
                    idusuario	:j_idusuario,
                    tarea		:'borrar'
                },
                callback: function (options, success, response) {
                    if (success) {}
                    else {
                        Ext.MessageBox.alert('Intentelo nuevamente. [Q304]',response.responseText);
                    }
                },
                success:function(response,options){
                	if(response.responseText==2) Ext.MessageBox.alert('AVISO','Este producto no puede ser eliminado porque ya registra movimiento en los almacenes.');
                    store.reload();
                }
            });
        };
    };
    
    function handleEdit(editEvent) {
        isNew = editEvent.record.data.nuevo;
        var j_idusuario =$F('idusuario');
        if(isNew == 'si'){
            var NewCod_vendedor  	= editEvent.record.data.codigo_vendedor;
            var NewNombre			= editEvent.record.data.nombre_vendedor;
            var NewApellido_pa      = editEvent.record.data.ap_paterno_vendedor;
            var NewApellido_ma		= editEvent.record.data.ap_materno_ven;
            var NewFlag				= editEvent.record.data.flag;
            
            if(NewCod_vendedor != '' && NewNombre != '' && NewApellido_pa != '' && NewApellido_ma != '' && NewFlag != ''){
                Ext.Ajax.request({
                    url: 'p_mtto_vendedores.php',
                    method: 'POST',
                       params: {
                       	tarea:		'nuevo',
                        codigo:		NewCod_vendedor,
                        nombre: 	NewNombre,
                        ap_pa:		NewApellido_pa,
                        ap_ma:		NewApellido_ma,
                        flag:		NewFlag,
                        idusuario:	j_idusuario
                    },
                    success:function(response,options){
                    	if(response.responseText!=2){
		                      if(response.responseText!=2){
		                        var newID = Ext.util.JSON.decode(newID);
		                        editEvent.record.id = newID;
		                        editEvent.record.set('nuevo','no');
		                        editEvent.record.set('id',newID);
		                        store.commitChanges();
		                        store.reload(); 
		                        Ext.Msg.alert('Ok','Registro Ingresado');
		                      }else{
		                        Ext.Msg.alert('ALERTA','Error de ingreso de datos. Intentelo nuevamente');
		                      }
                    	}else{
                    			Ext.Msg.alert('ALERTA','Ocurrio un error al grabar el registro. Recuerde: Solo puede ingresar N&uacute;meros, Letras o los caracteres Espacio o Gui&oacute;n');
                    			
                    	}	                      
                    }
                });
            }
        }else{
            var NewId        		= editEvent.record.data.idvendedor;
            var NewCod_vendedor  	= editEvent.record.data.codigo_vendedor;
            var NewNombre			= editEvent.record.data.nombre_vendedor;
            var NewApellido_pa      = editEvent.record.data.ap_paterno_vendedor;
            var NewApellido_ma		= editEvent.record.data.ap_materno_ven;
            var NewFlag				= editEvent.record.data.flag;

            if(NewCod_vendedor != '' && NewNombre != '' && NewApellido_pa != '' && NewApellido_ma != '' && NewFlag != '' ){
                Ext.Ajax.request({
                    url: 'p_mtto_vendedores.php',
                    method: 'POST',
                       params: {
                       	tarea:'modificar',
                        idvendedor: NewId,
                        codigo:		NewCod_vendedor,
                        nombre: 	NewNombre,
                        ap_pa:		NewApellido_pa,
                        ap_ma:		NewApellido_ma,
                        flag:		NewFlag,
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
        }
    }
    
    grid.on('afteredit', handleEdit);
    
	txtBuscado.on('change', Buscar);
	function Buscar(){
    	var buscar=Ext.get("v1").getValue();
		if(txtBuscado.validate()==true){
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_lista_vendedores.php?n=2&buscar='+buscar});
	    	store.load();
    	}else{
	    	store.proxy= new Ext.data.HttpProxy({url: 'p_lista_vendedores.php?n=1'});
	    	store.load();    		
    		Ext.get("v1").focus();
    	}
    }
    
    /* *************************************************************************************************** */
    /* Datos para la visualizacion en el viewport
    /* *************************************************************************************************** */

	var panel = new Ext.Panel({
	    id:'images-view',
	    frame:true,
	    autoWidth:true,
	    height:350,
	    collapsible:false,
	    layout:'fit',
	    title:'MODULO -> MANTENIMIENTO DE VENDEDORES',
	    items: grid
	});	     
    
    
        
	elemento=Ext.getDom('contenido');
	panel.render(elemento) ;	
         
});