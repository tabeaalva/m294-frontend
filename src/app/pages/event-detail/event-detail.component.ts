import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/category';
import { Event } from 'src/app/data/event';
import { Member } from 'src/app/data/member';
import { Place } from 'src/app/data/place';
import { CategoryService } from 'src/app/service/category.service';
import { EventService } from 'src/app/service/event.service';
import { MemberService } from 'src/app/service/member.service';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event : Event = new Event()
  categorys : Category[] = []
  places : Place[] = []
  members : Member[] = []

  public eventForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    startDate: new FormControl(),
    endDate: new FormControl(),
    category: new FormControl(),
    place: new FormControl(),
    members: new FormControl(),

  })

  constructor(
    private router: Router,
    private service : EventService,
    private route : ActivatedRoute,
    private placeService: PlaceService,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.service.getOne(id).subscribe(obj => {
          this.event = obj
          this.eventForm = this.formBuilder.group(this.event)

          this.eventForm.controls.place.setValue(this.event.place)
          this.eventForm.controls.category.setValue(this.event.category)
          this.eventForm.controls.members.setValue(this.event.members)
        })
      }

      this.placeService.getList().subscribe(obj => {
        this.places = obj
      })

      this.categoryService.getList().subscribe(obj => {
        this.categorys = obj
      })
      this.memberService.getList().subscribe(obj => {
        this.members = obj
      })
    }
    async back () {
      await this.router.navigate(['events'])
    }

    public compareOptions(o1 : any, o2 : any): boolean{
      return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
    }
    public save (formData: any) {
      this.event = Object.assign(formData)

      if (this.event.id) {
        this.service.update(this.event).subscribe({
          next: () => {
            this.back()
          }
        })
      } else {
        this.service.save(this.event).subscribe({
          next: () => {
            this.back()
          }
        })
      }
    }
}
