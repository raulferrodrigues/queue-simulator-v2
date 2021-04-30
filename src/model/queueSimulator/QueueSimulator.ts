import _ from 'lodash'
import { time } from 'node:console'
import { Action, Event, EventList } from './components/EventList'
import Queue, { Log } from './components/Queue'



export class QueueSimulator {
  // > rules
  private queues: Queue[]
  private simDuration: number
  // <

  // > state
  private currentTime: number
  private events: EventList
  // <

  constructor(queues: Queue[], firstEvent: Event, simDuration = 10) {
    this.queues = queues
    
    this.simDuration = simDuration
    this.currentTime = firstEvent.time
      
    this.events = new EventList()
    this.events.push(firstEvent.action, 0, firstEvent.time)
  }

  run(): void {
    
    // while (this.currentTime < this.simDuration) {
    while (global < 100) {
      this.scheduler()
      global++
    }
  }

  private arrivalScheduling = () => {
    // const nextArrivalTime = this.lcg.next(this.rules.arrival.floor, this.rules.arrival.ceil)
    // this.events.push(Action.Enqueue, this.currentTime, nextArrivalTime)
  }

  private serviceScheduling = () => {
    // const nextServiceTime = this.lcg.next(this.rules.service.floor, this.rules.service.ceil)
    // this.events.push(Action.Dequeue, this.currentTime, nextServiceTime)
  }

  private enqueue(event: Event) {
    const targetQueue: string = event.targetQueue
    const interval: number = event.time

    const queue = this.queues.find(el => el.id === targetQueue)
    if (!queue) throw new Error('⚠️ CRITICAL ⚠️: Queue not found during enqueue.')

    // const newState = this.logTime(time)


    // const newLog: Log = {
    //   action: Action.Enqueue,
    //   queueSize: this.size,
    //   simTime: this.currentTime,
    //   state: newState,
    // }


    queue.logTime(this.currentTime, interval)

    // newLog.queueSize++
      
    // if (this.size < this.capacity) {
    //   this.size++
    //   if (this.size <= this.servers) {
    //     this.serviceSchedule()
    //   }
    // }
      
    // this.logs.push(newLog)

    // this.arrivalSchedule()
  }

  private dequeue(time: Event) {
    // const newState = this.logTime(time)
      
    // this.size--
      
    // const newLog: Log = {
    //   action: Action.Dequeue,
    //   queueSize: this.size,
    //   simTime: this.currentTime,
    //   state: newState,
    // }
      
    // if (this.size > 0) {
    //   this.serviceSchedule()
    // }

    // this.logs.push(newLog)
  }

  
  private scheduler = () => {
    const nextEvent = this.events.pop()
    if (!nextEvent) return
    // if (!nextEvent) throw new Error('⚠️ CRITICAL ⚠️: Envent list is empty.')

    

    switch (nextEvent.action) {
      case Action.Enqueue:
        this.enqueue(nextEvent)
        break

      case Action.Dequeue:
        this.dequeue(nextEvent)
        break
      }
  }
}

var global = 0
