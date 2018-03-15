const test = require('ava')
const sinon = require('sinon')
const { sleep } = require('sleep')

const cache = require('../lib')

test('cache(1000, <Function>) execute the handler twice', async t => {
  const handler = sinon.stub()
  handler.onCall(0).returns(1)
  handler.onCall(1).returns(2)

  const microFn = cache(1000, handler)
  const req = { url: 'https://github.com' }

  t.is(1, microFn(req))
  t.is(1, microFn(req))
  await sleep(1)
  t.is(2, microFn(req))
  t.is(2, handler.callCount)
})
