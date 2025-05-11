import { Contract } from '@algorandfoundation/algorand-typescript'

export class TestUint extends Contract {
  hello(name: string): string {
    return `Hello, ${name}`
  }
}
