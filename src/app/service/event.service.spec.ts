import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Event } from '../data/event';
import { Category } from '../data/category';
import { Place } from '../data/place';

describe('GameService', () => {
  let service: EventService;
  let httpSpy: Spy<HttpClient>;

  const fakeEvents: Event[] = [
    {
      id: 1,
      name: 'Event 3',
      startDate: new Date(),
      endDate: new Date(),
      members: [],
      place: new Place(),
      category: new Category()
    },
    {
      id: 2,
      name: 'Event 3',
      startDate: new Date(),
      endDate: new Date(),
      members: [],
      place: new Place(),
      category: new Category()
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
    service = TestBed.inject(EventService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of events', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeEvents);

    service.getList().subscribe({
        next:
          events => {
            expect(events).toHaveSize(fakeEvents.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new event', (done: DoneFn) => {

    const newEvent: Event = {
      id: 3,
      name: 'Event 3',
      startDate: new Date(),
      endDate: new Date(),
      members: [],
      place: new Place(),
      category: new Category()
    };

    httpSpy.post.and.nextWith(newEvent);

    service.save(newEvent).subscribe({
        next: event => {
          expect(event).toEqual(newEvent);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an event', (done: DoneFn) => {

    const event = fakeEvents[0];
    event.name = 'Update event';
    event.members = [
      {
        id: 1,
        name: 'Member 1',
        lastname: '',
        gender: ''
      },
      {
        id: 2,
        name: 'Member 2',
        lastname: '',
        gender: ''
      }
    ]

    httpSpy.put.and.nextWith(event);

    service.update(event).subscribe({
      next: event => {
        expect(event.name).toEqual('Updated Event');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing event', (done: DoneFn) => {

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
