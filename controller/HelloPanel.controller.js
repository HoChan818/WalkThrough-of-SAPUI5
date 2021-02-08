sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
	],function(Controller, MessageToast, Fragment){
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
			var oView = this.getView();

			// if the dialog in the fragment does not exist yet
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "sap.ui.demo.view.HelloDialog"
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			
			// open Dialog
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		}
	});
});