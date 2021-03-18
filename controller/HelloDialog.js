sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/Fragment",
	"sap/ui/core/syncStyleClass"
	],function(ManagedObject,Fragment,syncStyleClass){
		"use strict";
		
		return ManagedObject.extend("sap.ui.demo.controller.HelloDialog",{
			constructor: function(oView){
				this._oView = oView;
			},
			
			exit: function(){
				delete this._oView;
			},
			
			open: function(){
				var oView = this._oView;
				
				// if the dialog in the fragment does not exist yet
				if (!this.pDialog) {
					//a local helper object oFragmentContoller 
					//which included the needed event handler function onCloseDialog
					var oFragmentController={
						onCloseDialog: function(){
							oView.byId("helloDialog").close();
						}
					};
					
					this.pDialog = Fragment.load({
						id: oView.getId(),
						name: "sap.ui.demo.view.HelloDialog",
						controller:oFragmentController
					}).then(function (oDialog) {
						// connect dialog to the root view of this component (models, lifecycle)
						oView.addDependent(oDialog);
						// forward compact/cozy style into dialog
						syncStyleClass(oView.getController().getOwnerComponent().getContentDensityClass(),oView,oDialog);
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