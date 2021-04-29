// import _ from 'lodash'

import { Action } from "./EventList"

export default class Queue {
  readonly id: String
  readonly rulesSet: Rules[]
  
  private logs: Log[]

  constructor(id: String, rulesSet: Rules[]) {
    this.id = id
    this.rulesSet = rulesSet
    this.logs = []
  }

}

export type Rules = {
  source: String
  drain: String
  arrival: { floor: number, ceil: number }
  service: { floor: number, ceil: number }
}

export type Log = {
  action: Action
  queueSize: number
  simTime: number
  state: number[]
}