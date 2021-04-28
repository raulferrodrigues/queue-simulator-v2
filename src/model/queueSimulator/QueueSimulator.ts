import _ from 'lodash'
import { LCG } from '../rng/LCG'
import { Action, Event, EventList } from './components/EventList'

export class QueueSimulator {
  // > rules
  private lcg: LCG
  private rules: Rules
  private capacity: number
  private servers: number
  private simDuration: number
  // <

  // > state
  private currentTime: number
  private size: number
  private logs: Log[]
  private events: EventList
  // <

  constructor(rules: Rules, initialSize: number, firstEvent: Event, capacity = Infinity, servers = 1, simDuration = 10) {
    this.lcg = new LCG()
    this.rules = rules

    this.size = initialSize
    this.capacity = capacity
    this.servers = servers
    this.simDuration = simDuration

    const firstLog: Log = {
      action: Action.None,
      queueSize: 0,
      simTime: 0,
      state: new Array(capacity + 1).fill(0),
    }
      
    this.logs = [firstLog]
    this.currentTime = firstEvent.time
      
    this.events = new EventList()
    this.events.push(firstEvent.action, 0, firstEvent.time)
  }

  run(): void {
    while (this.currentTime < this.simDuration) {
      this.scheduler()
    }
  }

  getLastLog(): Log | undefined {
    return _.cloneDeep(_.last(this.logs))
  }

  private logTime = (interval: number): number[] => {
    const lastestLog = _.last(this.logs)
    if (!lastestLog) throw new Error('Logs are empty! Logs should be initialized with a None log. Check the constructor')

    if (this.size > lastestLog.state.length) throw new Error('CRITICAL (!): Queue size is bigger than state length.')
    const newState: number[] =  [...lastestLog.state]
    const newTime = newState[this.size] + interval
    newState[this.size] = newTime
      
    this.currentTime = newState.reduce((acc, state) => acc + state, 0) // Contabiliza o tempo

    return newState
  }

  private arrivalSchedule = () => {
    const nextArrivalTime = this.lcg.next(this.rules.arrival.floor, this.rules.arrival.ceil)
    this.events.push(Action.Enqueue, this.currentTime, nextArrivalTime)
  }

  private serviceSchedule = () => {
    const nextServiceTime = this.lcg.next(this.rules.service.floor, this.rules.service.ceil)
    this.events.push(Action.Dequeue, this.currentTime, nextServiceTime)
  }

  private enqueue(time: number) {
    const newState = this.logTime(time)

    const newLog: Log = {
      action: Action.Enqueue,
      queueSize: this.size,
      simTime: this.currentTime,
      state: newState,
    }
    newLog.queueSize++
      
    if (this.size < this.capacity) {
      this.size++
      if (this.size <= this.servers) {
        this.serviceSchedule()
      }
    }
      
    this.logs.push(newLog)

    this.arrivalSchedule()
  }

  private dequeue(time: number) {
    const newState = this.logTime(time)
      
    this.size--
      
    const newLog: Log = {
      action: Action.Dequeue,
      queueSize: this.size,
      simTime: this.currentTime,
      state: newState,
    }
      
    if (this.size > 0) {
      this.serviceSchedule()
    }

    this.logs.push(newLog)
  }

  
  private scheduler = () => {
    const nextEvent = this.events.pop()
      
    if (nextEvent) {
      switch (nextEvent.action) {
      case Action.Enqueue:
        this.enqueue(nextEvent.time)
        break

      case Action.Dequeue:
        this.dequeue(nextEvent.time)
        break
      }
    }
  }
}

export type Rules = {
  arrival: { floor: number, ceil: number }
  service: { floor: number, ceil: number }
}

export type Log = {
  action: Action
  queueSize: number
  simTime: number
  state: number[]
}