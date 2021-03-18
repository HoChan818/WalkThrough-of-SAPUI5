sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	],function(Controller,History,MessageToast,JSONModel){
		"use strict";
		
		return Controller.extend("sap.ui.demo.controller.Detail", {
			onInit: function(){
				var oViewModel = new JSONModel({currency: 'EUR'});
				this.getView().setModel(oViewModel,"view");
				
				var oRouter = this.getOwnerComponent().getRouter();
				//_onObjectMatched that will be executed when the route is hit
				oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			},
			
			onNavBack: function(){
				var oHistory = new History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();
				
				//if a navigation step inside our app has already happened.
				if (sPreviousHash !== undefined){
					//use the browser history to go back to the previous page
					window.history.go(-1);
					
				//if no navigation has happened before
				} else {
					var oRouter = this.getOwnerComponent().getRouter();
					//The second parameter is an empty array ({}) as we do not pass any additional parameters to this route.
					//The third parameter true tells the router to replace the current history state with the new on
					oRouter.navTo("overview", {}, true);
				}
			},
			
			//the event handler for ProductRating control change event
			onRatingChange: function(oEvent){
				var fValue = oEvent.getParameter("value");
				var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
				//simply display a message instead of sending the rating to the backend
				MessageToast.show(oResourceBundle.getText("ratingConfirmation",[fValue]));
			},
			
			//the event handler for hitting route
			_onObjectMatched: function(oEvent){
				//The arguments parameter will return an object that corresponds 
				//to our navigation parameters from the route pattern
				var sPath = oEvent.getParameter("arguments").invoicePath;
				//call custom control method
				this.byId("rating").reset();
				//Set context on the view
				this.getView().bindElement({
					path: "/" + window.decodeURIComponent(sPath),
					model: "invoice"
				});
			}
		});
	});