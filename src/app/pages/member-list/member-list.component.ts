import { Component } from '@angular/core';
import { AppRoles } from 'src/app/app.roles';
import { Member } from 'src/app/data/member';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  public members : Array<Member> = []
  roles = AppRoles

  constructor (
    private service : MemberService
  ) {}

  ngOnInit():void{
    this.service.getList().subscribe(obj => {
      this.members = obj})
  }
  private reloadData () {
    this.service.getList().subscribe(obj => {
      this.members = obj
    })
  }
  public delete (obj:Member) {
    this.service.delete(obj.id).subscribe({
      next: response => {
        if (response.status ==  200) {
          this.reloadData()
        }
      }
    })
  }
}
