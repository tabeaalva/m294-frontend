import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { Category } from '../data/category';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import { HttpClient, HttpResponse } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpSpy: Spy<HttpClient>;

  const fakeCategorys: Category[] = [
    {
      id: 1,
      name: 'Category 1'
    },
    {
      id: 2,
      name: 'Category 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        },
      ]
    });
    service = TestBed.inject(CategoryService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of categorys', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeCategorys);

    service.getList().subscribe({
        next:
          categorys => {
            expect(categorys).toHaveSize(fakeCategorys.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new category', (done: DoneFn) => {

    const newCategory: Category = {
      id: 3,
      name: 'Category 3'
    };

    httpSpy.post.and.nextWith(newCategory);

    service.save(newCategory).subscribe({
        next: category => {
          expect(category).toEqual(newCategory);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an category', (done: DoneFn) => {

    const category = fakeCategorys[0];
    category.name = 'Updated Category';

    httpSpy.put.and.nextWith(category);

    service.update(category).subscribe({
      next: category => {
        expect(category.name).toEqual('Updated Category');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing category', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});
