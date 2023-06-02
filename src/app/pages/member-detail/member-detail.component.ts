import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/data/member';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member : Member = new Member()

  public memberForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    lastname: new FormControl(''),
    gender: new FormControl(''),
  })

  constructor(
    private router: Router,
    private service : MemberService,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder
    ) {}
    ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.service.getOne(id).subscribe(obj => {
          this.member = obj
          this.memberForm = this.formBuilder.group(this.member)
        })
      }
  }
    async back () {
      await this.router.navigate(['members'])
    }

    public compareOptions(o1 : any, o2 : any): boolean{
      return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
    }
    public save (formData: any) {
      this.member = Object.assign(formData)

      if (this.member.id) {
        this.service.update(this.member).subscribe({
          next: () => {
            this.back()
          }
        })
      } else {
        this.service.save(this.member).subscribe({
          next: () => {
            this.back()
          }
        })
      }
    }
}
