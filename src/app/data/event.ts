import { Place } from "./place"
import { Member } from "./member"
import { Category } from "./category"

export class Event {
  public id! : number
  public name : string = ''
  public startDate! : Date
  public endDate! : Date
  public place : Place = new Place()
  public category : Category = new Category()
  public members : Member[] = []
}
