import { LightningElement, wire } from 'lwc';
import{subscribe, unsubscribe, MessageContext} from'lightning/messageService'
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import reduceErrors from 'c/ldsUtils';
import {getRecord} from 'lightning/uiRecordApi';
import Utils from 'c/utils';
import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Description from '@salesforce/schema/Contact.Description';
import FILED_Email from '@salesforce/schema/Contact.Email';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';
const fields = [FIELD_Name, FIELD_Description, FILED_Email, FIELD_Phone];

export default class StudentDetail extends LightningElement {


	subscription;
	studentId;

	@wire(MessageContext) messageContext;




	@wire(getRecord, { recordId: '$studentId', fields })
	wiredStudent;

	connectedCallback(){
		if(this.subscription){return;}
		this.subscription=subscribe(this.messageContext,SELECTED_STUDENT_CHANNEL, (message)=>{
			this.handleStudentChange(message)
		});
	}

	disconnectedCallback(){
		unsubscribe(this.subscription);
		this.subscription = null;
	}

	handleStudentChange(message){
		this.studentId = message.studentId;
	}
		
	get name() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}

	//TODO #6: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.

    get description() {
        return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Description);
    }
    get phone() {
        return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Phone);
    }
    get email() {
        return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Email);
    }
    
	
	//TODO #7: Review the errorMessages getter, the cardTitle getter, and the _getDisplayValue function below.
	get errorMessages() {
		let errors = reduceErrors(this.wiredStudent.error);
		return errors.length ? errors : false;
	}

	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}
	
	// _getDisplayValue(data, field) {
	// 	return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	// }
	
}