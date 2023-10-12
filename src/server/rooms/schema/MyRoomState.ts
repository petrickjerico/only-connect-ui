import { Schema, Context, type } from '@colyseus/schema'

export class MyRoomState extends Schema {

  mySynchronizedProperty: string = 'Hello world'

}