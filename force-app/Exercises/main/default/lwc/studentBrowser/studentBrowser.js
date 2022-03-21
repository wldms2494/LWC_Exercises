import { LightningElement } from 'lwc';

export default class StudentBrowser extends LightningElement {
    studentList = [];
    constructor() {
        super();
        const studentNames =  ['Rad', 'Stuart', 'Andres', 'Rahul', 'Amit', 'Simon'];
        this.studentList = studentNames.map((studentNames, index) =>{
            return{
                'sobjectType' : 'Contact',
                'Name' : studentNames,
                'PhotoUrl' :'/services/images/photo/003B0FakePictId',
                'Id' : index
            };
        });
    }

    
}