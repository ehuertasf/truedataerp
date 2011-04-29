Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
	var txtClave1 = new Ext.form.TextField({
        id			:'txt1',
        name		:'ntxt1',
        width		:150,
        allowBlank	:true,
		renderTo	:'clave1',
		inputType 	:'password',
		allowBlank 	:false,
		minLength 	:3,
		maxLengthText :15
    });   	
    
	var txtClave2 = new Ext.form.TextField({
        id			:'txt2',
        name		:'ntxt2',
        inputType 	:'password',
        width		:150,
        allowBlank	:true,
		renderTo	:'clave2',
		allowBlank 	:false,
		minLength 	:3,
		maxLengthText :15		
    });      
    
	var btn_grabar = new Ext.Button({
        text	:'Confirmar',
        id		:'btn1',
        width	:150,
        renderTo:'btn_grabar',
        handler	:confirmar,
		iconCls	:'search'
	});      
	
	function confirmar(){
		Ext.Msg.show({
			title:'CONFIRMACION',
			msg: 'Desea cambiar su clave?.',
			buttons: Ext.Msg.YESNO,
			fn: function(btn,text){
				if(btn=='yes'){
					Ext.Ajax.request({
						url:'p_cambios_clave.php',
						method:	'POST',
						params:{
							clave1		:Ext.get('txt1').getValue(),
							clave2		:Ext.get('txt2').getValue(),
							idsess		:Ext.getDom('idsess').value,
							usuario		:Ext.getDom('usuario').value
						},
						success: function(response,options){
							if(response.responseText==1){
								Ext.Msg.show({
								   title:'ALERTA',
								   msg: 'Su clave ha sido cambiada',
								   buttons: Ext.Msg.OK,
								   animEl: 'elId',
								   icon: Ext.MessageBox.INFO
								});	
								txtClave1.reset();
								txtClave2.reset();
							}else{
								Ext.Msg.show({
								   title:'ALERTA',
								   msg: 'Las claves ingresadas no coinciden. Vuelva a intentarlo',
								   buttons: Ext.Msg.OK,
								   animEl: 'elId',
								   icon: Ext.MessageBox.INFO
								});		
															
							}		
						}
					});					
				}else if(btn=='no'){
					//no hago nada
				}
			},
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION
		});		
	}
	
	
});