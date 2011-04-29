function agrega_producto(){

Ext.onReady(function(){	

	var st1=new Ext.data.JsonStore({		//	Data de grupos
		url: "p_data_combos.php?n=1",
 	   	root: 'grupo',
       	fields: [
           	{name:'idgrupo_prod'},
           	{name:'desc_grupo'}
       	]
	});		

	var st2=new Ext.data.JsonStore({		//	Data de grupos
		url: "p_data_combos.php?n=2",
 	   	root: 'unidad',
       	fields: [
           	{name:'idunidad'},
           	{name:'desc_unidad'}
       	]
	});		
	
	var grupo = new Ext.ux.Andrie.Select(Ext.applyIf({
		fieldLabel	:'&nbsp;Grupo',
		id			:'idcbo_grupo',
		store		:st1,		
		multiSelect	:false,
		minLength	:1,
		emptyText	:'Seleccionar...', 
		valueField	:'idgrupo_prod',
		displayField:'desc_grupo',
		mode		:'remote',		
		width		:130,
		triggerAction:'all'		
	}));	

	var unidad = new Ext.ux.Andrie.Select(Ext.applyIf({
		fieldLabel	:'&nbsp;Unidad',
		id			:'idcbo_unidad',
		store		:st2,		
		multiSelect	:false,
		minLength	:1,
		emptyText	:'Seleccionar...', 
		valueField	:'idunidad',
		displayField:'desc_unidad',
		mode		:'remote',		
		width		:130,
		triggerAction:'all'		
	}));	
	
	var codigo = new Ext.form.TextField({
		emptyText 	:'Ingrese codigo...',
        id			:'txt1',
        name		:'ntxt1',
        width		:250,
        allowBlank	:true,
		fieldLabel	:'&nbsp;C&oacute;digo'
    }); 	
    
	var desc_producto = new Ext.form.TextField({
		emptyText 	:'Ingrese descripcion...',
        id			:'txt2',
        name		:'ntxt2',
        width		:250,
        allowBlank	:true,
		fieldLabel	:'&nbsp;Descripci&oacute;n'
    }); 	
    
	var peso_kg = new Ext.form.TextField({
        id			:'txt3',
        name		:'ntxt3',
        width		:100,
        allowBlank	:true,
        xtype		:'textfield',
        plugins		:[new Ext.ux.InputTextMask('9999.99', true)], 
		fieldLabel	:'&nbsp;Peso (Kg).'
    });     	
	
	var precio_unit = new Ext.form.TextField({
        id			:'txt4',
        name		:'ntxt4',
        width		:100,
        allowBlank	:true,
        xtype		:'textfield',
        plugins		:[new Ext.ux.InputTextMask('9999.9999', true)],        
		fieldLabel	:'&nbsp;Precio Uni.'
    });     
	
	var Formulario=new Ext.form.FieldSet({
        title		:'Producto',
        autoHeight	:true,
        defaultType	:'textfield',
        items: [
			codigo,desc_producto,peso_kg,precio_unit,unidad,grupo
        ],
        buttonAlign	:'center',
        buttons:[{
            text	:'Grabar',
			id		:'btngrabar',
            handler	:grabar_producto,
			failure	:error1    				
		}]

    }); 
    
	var ventana=new Ext.Window({
		title: 'Agregar Producto',
		width:400,
		modal:true,
		resizable:false,
		height:250,
		items: [
			Formulario
		]
	});
	
	function grabar_producto(){

    	var j_codigo		=Ext.getCmp('txt1').getValue();
    	var j_desc_producto	=Ext.getCmp('txt2').getValue();
    	var j_peso_kg		=Ext.getCmp('txt3').getValue();
    	var j_precio_unit	=Ext.getCmp('txt4').getValue();  
    	var j_grupo			=Ext.getCmp('idcbo_grupo').getValue();
    	var j_unidad		=Ext.getCmp('idcbo_unidad').getValue();    	
    	
        Ext.Ajax.request({
            url: 'p_agrega_producto.php',
            params: {
                n	  :1,
                codigo:j_codigo,
                descripcion:j_desc_producto,
                peso:j_peso_kg,
                precio:j_precio_unit,
                grupo:j_grupo,
                unidad:j_unidad
            },
            callback: function (options, success, response) {
                if (success) {}
                else {
                    Ext.MessageBox.alert('Intentelo nuevamente. [Q304]',response.responseText);
                }
            },
            failure:function(response,options){
                Ext.MessageBox.alert('Error','Problema insertando el dato');
            },
            success:function(response,options){                   
                if(response.responseText==1){
                	try{
                		Ext.MessageBox.alert('Mensaje', 'Se agrego satisfactoriamente el nuevo producto.');
                		busca_producto('p_busca_producto','contenido');
                		ventana.hide();
                	}catch(err){
                		var error=err.description;                		
                	}                	
                }else{
                	Ext.MessageBox.alert('Alerta', 'Debe utilizar punto decimal en el peso y precio');
                }
            }
           
        });	

	}
	
	var error1=function (result,request) {  
		Ext.MessageBox.alert('Error', 'Falla de Formulario');  
   	};        
        
	ventana.show();
});
}
