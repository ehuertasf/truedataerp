Ext.BLANK_IMAGE_URL = "../librerias/ext-3.0/resources/images/default/s.gif"

Ext.onReady(function(){
    var visible=true;
    //	var perfil=Ext.getDom('perfil').value;
	
    //	if (perfil==2) visible=false;
	
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
	
    var btn_xls = new Ext.Button({
        text:		'Exportar XLS',
        id:			'btn2',
        width:		150,
        handler: 	exportar_xls,
        iconCls:	'excel'
    });

    function exportar_xls(){
        document.location='exp_ventas.php';
    }
	
    var store1= new Ext.data.GroupingStore({
        proxy: new Ext.data.HttpProxy({
            url: 'php_procesos/p_comisiones.php?f=1'
        }),
        reader: new Ext.data.JsonReader({
            root: 'lista',
            id: 'resourceId',
            totalProperty: 'total',
            fields: [
            {
                name    :'id_pedido'
            },

            {
                name    :'f_reg_ped'
            },

            {
                name    :'f_movimiento'
            },

            {
                name    :'nombre'
            },

            {
                name    :'id_tecnico'
            },

            {
                name    :'nom_tecnico'
            },

            {
                name    :'id_vendedor'
            },

            {
                name    :'nom_vendedor'
            },

            {
                name    :'id_estado'
            },

            {
                name    :'desc_estado'
            }
            ]
	
        }),
		   
        groupField:'nom_vendedor',
        remoteSort: false,
        sortInfo: {
            field: 'id_pedido',
            direction: 'ASC'
        }
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
        {
            id:'id_pedido',
            header: "Pedido",
            width: 100 ,
            sortable: false,
            groupable: true,
            dataIndex:'id_pedido'
        },

        {
            header: "Fec.Reg.Pedido",
            width: 200,
            sortable: true,
            dataIndex: 'f_reg_ped',
            align:'left'
        },

        {
            header: "F.Ejecuci&oacute;n",
            width: 100,
            sortable: true,
            dataIndex: 'f_movimiento',
            groupable:false
        },

        {
            header: "Cliente",
            width: 200,
            sortable: true,
            dataIndex: 'nombre',
            groupable:false
        },

        {
            header: "Estado",
            width: 50,
            sortable: true,
            dataIndex: 'desc_estado',
            groupable:false
        },

        {
            header: "T&eacute;cnico",
            width: 100,
            sortable: true,
            dataIndex:'nom_tecnico',
            align:'center',
            groupable:false
        },

        {
            header: "ID Vendedor",
            width: 100,
            sortable: true,
            dataIndex:'id_vendedor',
            align:'left',
            hidden:true
        },

        {
            header: "Vendedor",
            width: 100,
            sortable: true,
            dataIndex:'nom_vendedor',
            align:'left'
        }


        ],
        sm: new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
        //tbar: [txtBuscado,'  ',btnbuscar,'  ',btn_xls]
        tbar: [btn_xls]
    });

    txtBuscado.on('change', Buscar);
	
    function Buscar(){
        var buscar=Ext.get("v1").getValue();
        if(txtBuscado.validate()==true){
            store1.proxy= new Ext.data.HttpProxy({
                url: 'p_busca_ventas.php?n=2&buscar='+buscar
                });
            store1.load();
            Ext.get("v1").focus();
            view.startCollapsed=false;
        }else if(buscar.length<1){
            store1.proxy= new Ext.data.HttpProxy({
                url: 'p_busca_ventas.php?n=1'
            });
            store1.load();
            Ext.get("v1").focus();
            view.startCollapsed=true;
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
        title: 'LISTA DE VENTAS',
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
