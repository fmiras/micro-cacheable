const test = require('ava')
const sinon = require('sinon')
const { sleep } = require('sleep')

const cache = require('../lib')

test('cache(...args) execute the handler twice with 3 requests', async t => {
  const handler = sinon.stub()
  handler.onCall(0).returns(1)
  handler.onCall(1).returns(2)

  const microFn = cache(1000, handler)
  const req = { url: 'https://someapi.com' }

  t.is(1, microFn(req))
  t.is(1, microFn(req))
  await sleep(1)
  t.is(2, microFn(req))
  t.is(2, handler.callCount)
})

test('cache(...args) execute the handler if different url', t => {
  const handler = sinon.stub()
  handler.onCall(0).returns(1)
  handler.onCall(1).returns(2)

  const microFn = cache(1000, handler)

  t.is(1, microFn({ url: 'https://someapi.com/resource/1' }))
  t.is(2, microFn({ url: 'https://someapi.com/resource/2' }))
})
