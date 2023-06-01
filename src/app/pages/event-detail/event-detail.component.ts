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
export class EventDetailComponent {
  event : Event = new Event()
  categorys : Category = new Category()
  places : Place = new Place()
  members : Member = new Member()

  public gameForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    categorys: new FormControl(''),
    places: new FormControl(false),
    members: new FormControl(),

  })

  constructor(
    private router: Router,
    private service : EventService,
    private route : ActivatedRoute,
    private platformService: PlaceService,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private formBuilder: FormBuilder
    ) {}
}
