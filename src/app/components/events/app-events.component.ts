import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-events',
  templateUrl: './app-events.component.html',
  styleUrls: ['./app-events.component.css']
})
export class EventsComponent implements OnInit {

  ELEMENT_DATA: {id: number, name: string, date: string, place: string}[] = [
    {id: 1, name: 'Hydrogen', date: "test", place: 'H'},
    {id: 2, name: 'Helium', date: "test", place: 'He'},
    {id: 3, name: 'Lithium', date: "test", place: 'Li'},
    {id: 4, name: 'Beryllium', date: "test", place: 'Be'},
    {id: 5, name: 'Boron', date: "test", place: 'B'},
    {id: 6, name: 'Carbon', date: "test", place: 'C'},
    {id: 7, name: 'Nitrogen', date: "test", place: 'N'},
    {id: 8, name: 'Oxygen', date: "test", place: 'O'},
    {id: 9, name: 'Fluorine', date: "test", place: 'F'},
    {id: 10, name: 'Neon', date: "test", place: 'Ne'},
  ];

  displayedColumns = ['name', 'date', 'place', 'id'];
  dataSource = this.ELEMENT_DATA;

    ngOnInit() {
        console.log("xxxxx");
    }

    removeEvent(id: number) {
      let res = [];
      res = this.ELEMENT_DATA.filter(el => { return el.id != id;});
      this.ELEMENT_DATA = res;
      this.dataSource = this.ELEMENT_DATA;
    }

    addEvent() {
      let arr = [];
      let maxid = 0;
      arr =  JSON.parse(JSON.stringify(this.ELEMENT_DATA));

      arr.filter((obj) => {
        if (obj.id > maxid) {maxid = obj.id};
      });
    
      maxid++;

      arr.unshift({id: maxid, name: '', date: '', place: ''});
      console.log(arr);
      this.ELEMENT_DATA = arr;
      this.dataSource = arr;
    }
}