function var_dump(obj) {
   if(typeof obj == "object") {
      return "Type: "+typeof(obj)+((obj.constructor) ? "\nConstructor: "+obj.constructor : "")+"\nValue: " + obj;
   } else {
      return "Type: "+typeof(obj)+"\nValue: "+obj;
   }
}
/*
var cadena="";
function trim(cadena)
{
	for(i=0; i<cadena.length; )
	{
		if(cadena.charAt(i)==" ")
			cadena=cadena.substring(i+1, cadena.length);
		else
			break;
	}

	for(i=cadena.length-1; i>=0; i=cadena.length-1)
	{
		if(cadena.charAt(i)==" ")
			cadena=cadena.substring(0,i);
		else
			break;
	}
	
	return cadena;
}
*/

Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"
Ext.onReady(function(){
	
	//var usuario = Ext.getDom('usuario').value;
	//var pagina='imp_boletas_query.php?usuario='+usuario+'&n=4';
	
	/*************************************************************************************************/
	/* Grid principal
	/*************************************************************************************************/
	
	//var store1= new Ext.data.GroupingStore({
    var store1= new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({url: 'php_procesos/p_avisos_pago.php?f=1'}),
	reader: new Ext.data.JsonReader({
 	   	root: 'lista',
	        fields: [
	            {name:'id_cliente'},
	            {name:'nombre'},
	            {name:'direccion'},
	            {name:'estado'},
	            {name:'f_registro'},
	            {name:'f_vencimiento'},
	            {name:'monto'}
	        ],
	        autoLoad:true
	}),
		//groupField:'tecnico',
	    remoteSort: false,
	    sortInfo: {field: 'id_cliente', direction: 'ASC'},
	    autoLoad:true
	});
	
		
	var view = new Ext.grid.GroupingView({
	    forceFit:true,
	    emptyText: '<div style="text-align:center;">No hay registros</div>',
	    //groupTextTpl: '<span class="groupHeader">{text}</span>',
	    //enableRowBody:true,
	    //showGroupName: true,
	    //enableNoGroups:false,
	    showPreview: true,
	    //hideGroupedColumn: true,
	    //startCollapsed:false,
	    getRowClass : function(record, rowIndex, p, store){
	        if(this.showPreview){
	            //p.body = '<p>'+record.get('nom_tipo')+'</p>';
	            return 'x-grid3-row-expanded';
	        }
	        return 'x-grid3-row-collapsed';
	    }
	});	
	
	
	var sm2 = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false
		});

    
	var grid = new Ext.grid.GridPanel({
		store: store1,
		//view: view,
		id: 'mygrid',
	    cm: new Ext.grid.ColumnModel([
	    	sm2,
            {id:"id_cliente",header: "id_cliente", width: 160, sortable: true, groupable: false, dataIndex: 'id_cliente',hidden:true},
	    	{header: "Cliente", width: 220, sortable: true, groupable: false, dataIndex: 'nombre'},
	        {header: "Direccion", width: 300, sortable: true, groupable: true, dataIndex: 'direccion'},
	        {header: "Estado", width: 70, sortable: true, groupable: true, dataIndex: 'estado'},
	        {header: "Fec. Registro", width: 80, sortable: true, groupable: true, dataIndex: 'f_registro'},
	        {header: "Fec. Vencimiento", width: 80, sortable: true, groupable: false, dataIndex: 'f_vencimiento'},
	        {header: "Monto", width: 150, sortable: true, groupable: false, dataIndex: 'monto'}

	    ]),
	    //plugins: summary,
	    viewConfig: {
	        forceFit: false
	    },
		sm: sm2,
		tbar:[{
            id:'imprime',
            text:'Imprimir',
            tooltip:'Imprime avisos de pago seleccionados',
            handler: imprimir,
            iconCls:'imprimir'
        }],
	    height:520,
	    frame:true,    
	    iconCls:'icon-grid',
	    loadMask:true

	});



	function imprimir()
	{
                        var seleccion = grid.getSelections();
                        var selectedKeys = grid.selModel.selections.keys;

                        var ids=[];
                        for(var i=0;i<selectedKeys.length;i++){
                            var record = grid.getStore().getById(selectedKeys[i]);
                            var fieldName1 = grid.getColumnModel().getDataIndex(1);  //id_cliente
                            var data1 = record.get(fieldName1);
                            ids.push(data1);
                        }

                        if(ids.length==0){
                            Ext.MessageBox.alert('Cuidado','Debe seleccionar minimo un cliente');
                        }else{
                            window.open("php_procesos/imp_avisos_pago.php?ids="+ids,"","toolbar=0,location=no,status=no,menubar=no,resizable=no,scrollbars=yes,width=750,height=470,left=0,top=0");
                            //window.open("php_procesos/imp_avisos_pago_pdf.php?ids="+ids,"","toolbar=0,location=no,status=no,menubar=no,resizable=no,scrollbars=yes,width=750,height=470,left=0,top=0");

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
		title: 'LISTA DE AVISOS DE PAGO',
		width: 950,
		autoHeight:450,
		minWidth: 300,
		minHeight: 150,
		layout: 'fit',
		plain:true,
		y:10,
		id: 'LoginWin2',
		bodyStyle:'padding:5px;',
		items: panel
	});

	Ventana.show();

});
