import { Event, Action } from "./queueSimulator/components/EventList"
import { QueueSimulator } from "./queueSimulator/QueueSimulator"

export default class Model {
  constructor() {    
    const rules = { 
      arrival: { floor: 1, ceil: 10 }, 
      service: { floor: 2, ceil: 4 },
    }
    const firstEvent: Event = { action: Action.Enqueue, time: 2, scheduledTime: 2 }
    const initialSize = 0
    const capacity = 3
    const serves = 1
    const simDuration = 100

    const qs = new QueueSimulator(rules, initialSize, firstEvent, capacity, serves, simDuration)
    qs.run()
    console.debug('last log:', qs.getLastLog())
  }
}