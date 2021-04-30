import { Event, Action } from "./queueSimulator/components/EventList"
import Queue, { Rules } from "./queueSimulator/components/Queue"
import { QueueSimulator } from "./queueSimulator/QueueSimulator"
import { LCG } from "./rng/LCG"

export default class Model {
  constructor() {    
    const rulesQ1: Rules = {
      arrival: { floor: 1, ceil: 10 }, 
      service: { floor: 2, ceil: 4 },
      drainsChances: {
        'out': 70,
        'q2': 30,
      }
    }

    const rulesQ2: Rules = {
      service: { floor: 2, ceil: 4 },
      drainsChances: {
        'out': 100,
      }
    }
    
    const firstEvent: Event = { targetQueue: 'q1',action: Action.Enqueue, time: 2, scheduledTime: 2 }
    const q1 = new Queue('q1', new LCG(), rulesQ1)
    const q2 = new Queue('q2', new LCG(), rulesQ2)

    const queues: Queue[] = [q1, q2]
    
    const qs = new QueueSimulator(queues, firstEvent, 100)
    qs.run()
    // console.debug('last log:', qs.getLastLog())
  }
}