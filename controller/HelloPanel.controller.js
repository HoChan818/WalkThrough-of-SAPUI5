sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
	],function(Controller, MessageToast){
	"use strict";
	
	return Controller.extend("sap.ui.demo.controller.HelloPanel",{
		onPress: function(){
			// read message from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("popupMsg",[sRecipient]);
			
			// show message
			MessageToast.show(sMsg);
		},
		
		onOpenDialog : function () {
			//call component method openHelloDialog
			this.getOwnerComponent().openHelloDialog();
		},
		
		onCloseDialog : function(){
			// close Dialog
			this.byId("helloDialog").close();
		}
	});
});