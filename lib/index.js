const responses = []

module.exports = (ms, microFunction) => (req, res) => {
  const lastCall = responses[req.url]
  if (lastCall && lastCall.date > new Date()) {
    return lastCall.data
  }
  const data = microFunction(req, res)
  const date = new Date(new Date().getTime() + ms)
  responses[req.url] = { data, date }
  return data
}
