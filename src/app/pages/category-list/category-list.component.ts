import { Component } from '@angular/core';
import { AppRoles } from 'src/app/app.roles';
import { Category } from 'src/app/data/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  public categorys : Array<Category> = []
  roles = AppRoles

  constructor (
    private service : CategoryService
  ) {}

  ngOnInit():void{
    this.service.getList().subscribe(obj => {
      this.categorys = obj})
  }
  private reloadData () {
    this.service.getList().subscribe(obj => {
      this.categorys = obj
    })
  }
  public delete (obj:Category) {
    this.service.delete(obj.id).subscribe({
      next: response => {
        if (response.status ==  200) {
          this.reloadData()
        }
      }
    })
  }
}
