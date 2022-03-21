import { LightningElement , api} from 'lwc';

export default class StudentTile extends LightningElement {
    @api student ={
        Name:"jinny",
        PhotoUrl:'/services/images/photo/003B0FakePictId',
    };
    @api isSelected = false;

    get tileSelected(){
        return this.selected ? "tile selected" : "tile";
    }

    studentClick(){
        alert(this.student.Name);
    }
}