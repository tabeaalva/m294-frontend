import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  category : Category = new Category()

  public categoryForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
  })

  constructor(
    private router: Router,
    private service : CategoryService,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.service.getOne(id).subscribe(obj => {
          this.category = obj
          this.categoryForm = this.formBuilder.group(this.category)
        })
      }
  }
    async back () {
      await this.router.navigate(['categorys'])
    }

    public compareOptions(o1 : any, o2 : any): boolean{
      return o1 && o2 ? o1?.id === o2?.id : o1 === o2;
    }
    public save (formData: any) {
      this.category = Object.assign(formData)

      if (this.category.id) {
        this.service.update(this.category).subscribe({
          next: () => {
            this.back()
          }
        })
      } else {
        this.service.save(this.category).subscribe({
          next: () => {
            this.back()
          }
        })
      }
    }
}
