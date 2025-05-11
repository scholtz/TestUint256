import { biguint, Contract, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod, UintN256, UintN64 } from '@algorandfoundation/algorand-typescript/arc4'

export class TestUint extends Contract {
  @abimethod({ readonly: true })
  uint256Touint64(n: UintN256): uint64 {
    return new UintN64(n.native).native
  }
  @abimethod({ readonly: true })
  uint256ToUintN64(n: UintN256): UintN64 {
    return new UintN64(n.native)
  }
  @abimethod({ readonly: true })
  safeConversion(n: UintN256): UintN64 {
    // Assume you have a UintN256 instance called uint256

    // Step 1: Get the native biguint value
    const native256: biguint = n.native as biguint

    // Step 2: Mask to lower 64 bits
    const lower64: biguint = native256 & ((1n << 64n) - 1n)

    // Step 3: Create a UintN64 from the lower 64 bits
    const uint64 = new UintN64(lower64)
    return uint64
  }
}
