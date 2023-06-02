import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/data/place';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit {
  place : Place = new Place()

  public placeForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),

  })

  constructor(
    private router: Router,
    private service : PlaceService,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.service.getOne(id).subscribe(obj => {
          this.place = obj
          this.placeForm = this.formBuilder.group(this.place)
        })
      }
  }
    async back () {
      await this.router.navigate(['places'])
    }

    public compareOptions(o1 : any, o2 : any): boolean{
      return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
    }
    public save (formData: any) {
      this.place = Object.assign(formData)

      if (this.place.id) {
        this.service.update(this.place).subscribe({
          next: () => {
            this.back()
          }
        })
      } else {
        this.service.save(this.place).subscribe({
          next: () => {
            this.back()
          }
        })
      }
    }
}
