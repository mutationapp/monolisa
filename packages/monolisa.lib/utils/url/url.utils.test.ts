import {
  removeLeadingSlashes,
  getParentPath,
  buildQuery,
  parseQuery,
  appendQuery,
  removeTrailingSlashes,
  getDomain,
  addLeadingSlash,
  removeQuery,
  getParentPathUntil,
} from './url.utils'

test.each([undefined, '', 'clean', '/path/to/me/', 'relative/'])(
  'Removes leading slash for: %s',
  (value?: string) => {
    expect(removeLeadingSlashes(value)).toMatchSnapshot()
  },
)

test.each([undefined, 'clean', '/parent/me/', 'relative/me'])(
  'Returns parent path for: %s',
  (value?: string) => {
    expect(getParentPath(value)).toMatchSnapshot()
  },
)

test.each([undefined, {}, { f: 1, g: '2', k: false, j: true }])(
  'Builds the query for: %o',
  (object?: object) => {
    expect(buildQuery(object)).toMatchSnapshot()
  },
)

test.each(['', 'monolisa.lab?', 'monolisa.app?foo=bar&bar=foo'])(
  'parseQuery: %s',
  value => {
    expect(parseQuery(value)).toMatchSnapshot()
  },
)

test.each(['', 'monolisa.lab?', 'monolisa.app?foo=bar&bar=foo'])(
  'removeQuery: %s',
  value => {
    expect(removeQuery(value)).toMatchSnapshot()
  },
)

test.each([
  {
    url: '?foo=bar&bar=foo',
    query: {
      baz: 'baz',
    },
  },
])('appendQuery: %o', ({ url, query }) => {
  expect(appendQuery(url, query)).toMatchSnapshot()
})

test.each([undefined, '/', '//', 'nope'])(
  'removeTrailingSlashes: %s',
  value => {
    expect(removeTrailingSlashes(value)).toMatchSnapshot()
  },
)

test.each(['/', '//', 'nope'])('addLeadingSlash: %s', value => {
  expect(addLeadingSlash(value)).toMatchSnapshot()
})

test.each([
  undefined,
  new URL('http://foo.bar'),
  'http://monolisa.app',
  'http://localhost:3000',
])('removeTrailingSlashes: %s', value => {
  expect(getDomain(value)).toMatchSnapshot()
})

test.each([
  { path: 'foo/bar/baz', until: 'bar' },
  { path: 'oops', until: 'foo' },
])('getParentPathUntil: %o', ({ path, until }) => {
  expect(getParentPathUntil(path, until)).toMatchSnapshot()
})
