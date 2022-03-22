import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
export default class StudentBrowser extends LightningElement {
    selectedDeliveryId='';
    selectedInstructorId='';
    @wire(getStudents, {instructorId:"$selectedInstructorId", courseDeliveryId:"$selectedDeliveryId"})
    students;

    handleFilterChange(event){
        this.selectedInstructorid = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
    }
    
}