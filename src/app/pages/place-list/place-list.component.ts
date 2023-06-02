import { Component, OnInit } from '@angular/core';
import { AppRoles } from 'src/app/app.roles';
import { Place } from 'src/app/data/place';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit{
  public places : Array<Place> = []
  roles = AppRoles

  constructor (
    private service : PlaceService
  ) {}

  ngOnInit():void{
    this.service.getList().subscribe(obj => {
      this.places = obj})
  }
  private reloadData () {
    this.service.getList().subscribe(obj => {
      this.places = obj
    })
  }
  public delete (obj:Place) {
    this.service.delete(obj.id).subscribe({
      next: response => {
        if (response.status ==  200) {
          this.reloadData()
        }
      }
    })
  }
}
