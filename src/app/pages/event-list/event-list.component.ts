import { Component, OnInit } from '@angular/core';
import { AppRoles } from 'src/app/app.roles';
import { EventService } from 'src/app/service/event.service';
import { Event } from '../../data/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  public events : Array<Event> = []
  roles = AppRoles

  constructor (
    private service : EventService
  ) {}

  ngOnInit():void{
    this.service.getList().subscribe(obj => {
      this.events = obj})
  }
  private reloadData () {
    this.service.getList().subscribe(obj => {
      this.events = obj
    })
  }
  public delete (obj:Event) {
    this.service.delete(obj.id).subscribe({
      next: response => {
        if (response.status ==  200) {
          this.reloadData()
        }
      }
    })
  }
}
