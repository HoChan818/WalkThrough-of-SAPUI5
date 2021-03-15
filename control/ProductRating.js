sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/RatingIndicator",
	"sap/m/Label",
	"sap/m/Button"
	],function(Control,RatingIndicator,Label,Button){
		"use strict";
		
		return Control.extend("sap.ui.demo.control.ProductRating",{
			//define the properties, events, and aggregations of the control
			metadata: {
				properties:{
					value: { type: "float", defaultValue: 0 }
				},
				aggregations: {
					_rating: {type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
					_label: {type: "sap.m.Label", multiple: false, visibility: "hidden" },
					_button : {type: "sap.m.Button", multiple: false, visibility: "hidden" }
				},
				events: {
					//specify a change event for the control
					change: {
						parameters: {
							value: {type: "int"}
						}
					}
				}
			},
			
			//set up the control and prepare its content for display whenever the control is instantiated
			init: function(){
				this.setAggregation("_rating", new RatingIndicator({
					value: this.getValue(),
					iconSize: "2rem",
					visualMode: "Half",
					//register a liveChange event to the rating
					//It is called every time the user changes the rating. 
					liveChange: this._onRate.bind(this)
				}));
				this.setAggregation("_label", new Label({
					text: "{i18n>productRatingLabelInitial}"
				}).addStyleClass("sapUiSmallMargin"));
				this.setAggregation("_button", new Button({
					text: "{i18n>productRatingButton}",
					press: this._onSubmit.bind(this)
				}).addStyleClass("sapUiTinyMarginTopBottom"));
			},
			
			//define the HTML structure
			renderer: function(oRM, oControl){
				//start of the outer <div> tag as <div
				oRM.openStart("div",oControl);
				//add a custom CSS class
				oRM.class("myAppDemoProductRating");
				//close the surrounding div tag
				oRM.openEnd();
				//render three internal controls by passing the content of the internal aggregation
				oRM.renderControl(oControl.getAggregation("_rating"));
				oRM.renderControl(oControl.getAggregation("_label"));
				oRM.renderControl(oControl.getAggregation("_button"));
				//close our surrounding <div> tag
				oRM.close("div");
			},
			
			//override setter
			setValue: function(fValue){
				//updates the property value
				this.setProperty("value",fValue,true);
				//update the internal rating control in the hidden aggregation
				this.getAggregation("_rating").setValue(fValue/*update the control property*/);
			},
			
			//revert the state of the custom control
			reset: function(){
				var oResourceBundle = this.getModel("i18n").getResourceBundle();
				
				this.setValue(0);
				
				this.getAggregation("_label").setDesign("Standard");
				this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
				
				this.getAggregation("_rating").setEnabled(true);
				this.getAggregation("_button").setEnabled(true);
			},
			
			//the event handler for the internal Rating control
			_onRate: function(oEvent){
				var oResourceBundle = this.getModel("i18n").getResourceBundle();
				//read from the event parameter value of the sap.m.RatingIndicator control. 
				var fValue = oEvent.getParameter("value");
				
				this.setProperty("value",fValue,true/*update the control property*/);

				//the placeholder values is read from the i18n model
				this.getAggregation("_label").setText(
					oResourceBundle.getText("productRatingLabelIndicator", [
						fValue, oEvent.getSource().getMaxValue()]));
				this.getAggregation("_label").setDesign("Bold");
			},
			
			//the event handler for the internal Button control that submits our rating
			_onSubmit: function(oEvent){
				var oResourceBundle = this.getModel("i18n").getResourceBundle();
				//disable the rating and the button
				this.getAggregation("_rating").setEnabled(false);
				this.getAggregation("_button").setEnabled(false);
				//update the label text
				this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
				//fire the change event of the control and pass in the current value as a parameter	
				this.fireEvent("change",{
					value: this.getValue()
				});
			}
		});
	});