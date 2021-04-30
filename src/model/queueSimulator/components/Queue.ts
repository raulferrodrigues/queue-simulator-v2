import _ from 'lodash'

import { LCG } from "../../rng/LCG"
import { Action } from "./EventList"

export default class Queue {
  private lcg: LCG
  readonly capacity: number
  readonly servers: number
  
  readonly id: string
  readonly rules: Rules
  
  private logs: Log[]
  private size: number
  
  constructor(id: string, lcg: LCG, rules: Rules, capacity: number = 3, servers: number = 1, initialSize: number = 0) {
    this.id = id
    this.lcg = lcg
    this.capacity = capacity
    this.servers = servers
    this.rules = rules
    this.size = initialSize

    const firstLog: Log = {
      action: Action.None,
      queueSize: 0,
      simTime: 0,
      state: new Array(capacity + 1).fill(0),
    }

    this.logs = [firstLog]
  }

  latestLog(): Log {
    const log = _.last(this.logs)
    if (!log) throw new Error('⚠️ CRITICAL ⚠️: Logs empty!')
    return log
  }
  
  // addNewState(interval: number): number[] {
    // const lastestLog = this.latestLog()
    // if (!lastestLog) throw new Error('Logs are empty! Logs should be initialized with a None log. Check the constructor')
    
    // if (this.size > lastestLog.state.length) throw new Error('⚠️ CRITICAL ⚠️: Queue size is bigger than state length.')
    // const newState: number[] =  [...lastestLog.state]
    // const newTime = newState[this.size] + interval
    // newState[this.size] = newTime

    // return newState
  // }

  logTime(action: Action, currentTime: number, interval: number): number {
    const lastestLog = this.latestLog()
    if (!lastestLog) throw new Error('⚠️ CRITICAL ⚠️: Logs are empty! Logs should be initialized with a None log. Check the constructor')
    
    if (this.size > lastestLog.state.length) throw new Error('⚠️ CRITICAL ⚠️: Queue size is bigger than state length.')
    const newState: number[] =  [...lastestLog.state]
    const newTime = newState[this.size] + interval
    newState[this.size] = newTime
    
    const newLog: Log = {
      action: action,
      queueSize: this.size,
      simTime: currentTime,
      state: newState,
    }

    this.logs.push(newLog)
    
    const p = newState.reduce((acc, state) => acc + state, 0)

    return p
  }

  getLastLog(): Log | undefined {
    return _.cloneDeep(_.last(this.logs))
  }
}

export type Rules = {
  arrival?: { floor: number, ceil: number }
  service: { floor: number, ceil: number }
  drainsChances: { [id: string] : number }
}

export type Log = {
  action: Action
  queueSize: number
  simTime: number
  state: number[]
}