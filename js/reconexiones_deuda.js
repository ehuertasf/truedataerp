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
	proxy: new Ext.data.HttpProxy({url: 'php_procesos/p_reconexiones_deuda.php?f=1'}),
	reader: new Ext.data.JsonReader({
 	   	root: 'lista',
	        fields: [
	            {name:'id_cliente'},
	            {name:'nombre'},
	            {name:'direccion'},
	            {name:'estado'},
	            {name:'f_registro'},
	            {name:'f_vencimiento'},
	            {name:'monto'},
                {name:'dias'}

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
	    	//sm2,
            {id:"id_cliente",header: "id_cliente", width: 160, sortable: true, groupable: false, dataIndex: 'id_cliente',hidden:true},
	    	{header: "Cliente", width: 220, sortable: true, groupable: false, dataIndex: 'nombre'},
	        {header: "Direccion", width: 250, sortable: true, groupable: true, dataIndex: 'direccion'},
	        {header: "Estado", width: 70, sortable: true, groupable: true, dataIndex: 'estado'},
	        {header: "Fec. Registro", width: 80, sortable: true, groupable: true, dataIndex: 'f_registro'},
	        {header: "Fec. Vencimiento", width: 80, sortable: true, groupable: false, dataIndex: 'f_vencimiento'},
	        {header: "Monto", width: 50, sortable: true, groupable: false, dataIndex: 'monto'},
            {header: "Dias Facturados", width: 50, sortable: true, groupable: false, dataIndex: 'dias'}

	    ]),
	    //plugins: summary,
	    viewConfig: {
	        forceFit: false
	    },
		//sm: sm2,
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
	{Ext.getDom('texto').value='';
	 var seleccion = grid.getSelections();
     var arreglo = [];
     var selectedKeys = grid.selModel.selections.keys;
	 for(var i=0;i<selectedKeys.length;i++)
	 	{
	    	var record = grid.getStore().getById(selectedKeys[i]);
			var fieldName = grid.getColumnModel().getDataIndex(0); //NroCliente
			var data = record.get(fieldName);
			arreglo.push(trim(data));
			//	paneles.activeTab = 'imp';
	    }
	 var arreglotexto=arreglo.join(',');
	 //arreglotexto = ver_mdfarmario+arreglotexto

	 Ext.getDom('texto').value=arreglotexto;

	 //Ext.getDom('boletas').submit();
	 document.getElementById('boletas').submit();
	 //document.location = 'imp_boletas_html.php?texto='+arreglotexto;
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
		title: 'LISTA DE RECONEXIONES',
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
