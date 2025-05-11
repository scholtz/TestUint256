import { Config } from '@algorandfoundation/algokit-utils'
import { registerDebugEventHandlers } from '@algorandfoundation/algokit-utils-debug'
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing'
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
import algosdk, { Address } from 'algosdk'
import { beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { TestUintFactory } from '../artifacts/test_uint/TestUintClient'

describe('AvmSatoshiDice contract', () => {
  const localnet = algorandFixture()
  beforeAll(() => {
    Config.configure({
      debug: true,
      // traceAll: true,
    })
    registerDebugEventHandlers()
  })
  beforeEach(localnet.newScope)

  const deploy = async (account: Address) => {
    const factory = localnet.algorand.client.getTypedAppFactory(TestUintFactory, {
      defaultSender: account,
    })

    const { appClient } = await factory.deploy({
      onUpdate: 'append',
      onSchemaBreak: 'append',
    })

    await localnet.algorand.account.ensureFunded(appClient.appAddress, account, AlgoAmount.Algo(10))
    return { client: appClient }
  }
  test('test uint256ToUintN64', async () => {
    const deployerAccount = await localnet.context.generateAccount({ initialFunds: AlgoAmount.Algo(10000) })
    const deployerAccountAddr = algosdk.encodeAddress(deployerAccount.addr.publicKey)
    const { client } = await deploy(deployerAccount)

    let data = await client.uint256ToUintN64({
      args: {
        n: 1n,
      },
    })
    expect(data).toBe(1n)
  })
  test('test uint256Touint64', async () => {
    const deployerAccount = await localnet.context.generateAccount({ initialFunds: AlgoAmount.Algo(10000) })
    const deployerAccountAddr = algosdk.encodeAddress(deployerAccount.addr.publicKey)
    const { client } = await deploy(deployerAccount)

    let data = await client.uint256Touint64({
      args: {
        n: 1n,
      },
    })
    expect(data).toBe(1n)
  })
  test('test correctConversion', async () => {
    const deployerAccount = await localnet.context.generateAccount({ initialFunds: AlgoAmount.Algo(10000) })
    const deployerAccountAddr = algosdk.encodeAddress(deployerAccount.addr.publicKey)
    const { client } = await deploy(deployerAccount)

    let data = await client.safeConversion({
      args: {
        n: 1n,
      },
    })
    expect(data).toBe(1n)
  })
})
