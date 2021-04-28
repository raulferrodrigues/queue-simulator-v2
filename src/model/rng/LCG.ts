export class LCG {
  private a = 1103515245
  private m: number = 2 ** 31
  private c = 4
  private seed = 0

  private count = 0
  private rand = 7

  constructor(seed?: number) {
    if (seed) { this.rand = seed }
  }

  next(min?: number, max?: number): number {
    this.count++
    const floor = min ? min : 0
    const ceil = max ? max : 1
    if (floor && ceil && floor >= ceil) throw `floor(${floor})  >= ceiling(${ceil})`

    this.rand = (this.a * this.rand + this.c) % this.m 

    const res = (ceil - floor) * (this.rand / this.m) + floor
    return res
  }

  generated(): number {
    return this.count
  }
}