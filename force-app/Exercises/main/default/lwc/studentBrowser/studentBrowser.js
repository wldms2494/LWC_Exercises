import { LightningElement, wire } from 'lwc';
import {publish, MessageContext} from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { NavigationMixin } from 'lightning/navigation';




export default class StudentBrowser extends NavigationMixin(LightningElement) {

    
    @wire(MessageContext) messageContext;    
    selectedDeliveryId='';
    selectedInstructorId='';
    @wire(getStudents, {instructorId:"$selectedInstructorId", courseDeliveryId:"$selectedDeliveryId"})
    students;

    cols = [
        {
            fieldName:"Name",
            label: "Name"
            },
            {
            fieldName:"Title",
            label: "Title",
            hiddenOnMobile: true
            },
            {
            fieldName:"Phone",
            label: "Phone",
            type: "phone"
            },
            {
            fieldName:"Email",
            label: "E-Mail",
            type: "email"
        }
            ];

    handleRowClick(event){
        const studentId = event.detail.pk;
        this.updateSelectedStudent(studentId);
    }


    handleRowDblClick(event) {
        const studentId = event.detail.pk;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
            recordId: studentId,
            objectApiName: 'Contact',
            actionName: 'edit'
            }
            });
    }

    handleFilterChange(event){
        this.selectedInstructorid = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
    }

    handleStudentSelected(event){
        const studentId=event.detail.studentId;
        this.updateSelectedStudent(studentId);

    }
    
    updateSelectedStudent(studentId){
        publish(this.messageContext,SELECTED_STUDENT_CHANNEL,{studentId: studentId});
    }
}