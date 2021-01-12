;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    1478: function (module, exports, __webpack_require__) {
      'use strict'
      __webpack_require__(5),
        __webpack_require__(55),
        __webpack_require__(48),
        __webpack_require__(31),
        __webpack_require__(36),
        __webpack_require__(1479),
        __webpack_require__(1480),
        __webpack_require__(7),
        __webpack_require__(49)
      var _clientApi = __webpack_require__(63),
        _clientLogger = __webpack_require__(38),
        _configFilename = __webpack_require__(1481)
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object)
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object)
          enumerableOnly &&
            (symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })),
            keys.push.apply(keys, symbols)
        }
        return keys
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {}
          i % 2
            ? ownKeys(Object(source), !0).forEach(function (key) {
                _defineProperty(target, key, source[key])
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(
                target,
                Object.getOwnPropertyDescriptors(source),
              )
            : ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(
                  target,
                  key,
                  Object.getOwnPropertyDescriptor(source, key),
                )
              })
        }
        return target
      }
      function _defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        )
      }
      ;(_configFilename.args || _configFilename.argTypes) &&
        _clientLogger.logger.warn(
          'Invalid args/argTypes in config, ignoring.',
          JSON.stringify({
            args: _configFilename.args,
            argTypes: _configFilename.argTypes,
          }),
        ),
        _configFilename.decorators &&
          _configFilename.decorators.forEach(function (decorator) {
            return (0, _clientApi.addDecorator)(decorator, !1)
          }),
        _configFilename.loaders &&
          _configFilename.loaders.forEach(function (loader) {
            return (0, _clientApi.addLoader)(loader, !1)
          }),
        (_configFilename.parameters ||
          _configFilename.globals ||
          _configFilename.globalTypes) &&
          (0, _clientApi.addParameters)(
            _objectSpread(
              _objectSpread({}, _configFilename.parameters),
              {},
              {
                globals: _configFilename.globals,
                globalTypes: _configFilename.globalTypes,
              },
            ),
            !1,
          ),
        _configFilename.argTypesEnhancers &&
          _configFilename.argTypesEnhancers.forEach(function (enhancer) {
            return (0, _clientApi.addArgTypesEnhancer)(enhancer)
          })
    },
    1481: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'parameters', function () {
          return parameters
        })
      var parameters = { actions: { argTypesRegex: '^on[A-Z].*' } }
    },
    1482: function (module, exports, __webpack_require__) {
      'use strict'
      ;(function (module) {
        ;(0, __webpack_require__(441).configure)(
          [__webpack_require__(1483), __webpack_require__(1492)],
          module,
          !1,
        )
      }.call(this, __webpack_require__(81)(module)))
    },
    1483: function (module, exports, __webpack_require__) {
      var map = {
        './Button.stories.js': 1484,
        './Header.stories.js': 256,
        './Page.stories.js': 1526,
      }
      function webpackContext(req) {
        var id = webpackContextResolve(req)
        return __webpack_require__(id)
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'")
          throw ((e.code = 'MODULE_NOT_FOUND'), e)
        }
        return map[req]
      }
      ;(webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map)
      }),
        (webpackContext.resolve = webpackContextResolve),
        (module.exports = webpackContext),
        (webpackContext.id = 1483)
    },
    1484: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Primary', function () {
          return Primary
        }),
        __webpack_require__.d(__webpack_exports__, 'Secondary', function () {
          return Secondary
        }),
        __webpack_require__.d(__webpack_exports__, 'Large', function () {
          return Large
        }),
        __webpack_require__.d(__webpack_exports__, 'Small', function () {
          return Small
        })
      __webpack_require__(139), __webpack_require__(4)
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          2,
        ),
        _Button__WEBPACK_IMPORTED_MODULE_4__ =
          (__webpack_require__(0), __webpack_require__(88))
      __webpack_exports__.default = {
        title: 'Example/Button',
        component: _Button__WEBPACK_IMPORTED_MODULE_4__.a,
        argTypes: { backgroundColor: { control: 'color' } },
      }
      var Template = function Template(args) {
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          _Button__WEBPACK_IMPORTED_MODULE_4__.a,
          Object.assign({}, args),
        )
      }
      Template.displayName = 'Template'
      var Primary = Template.bind({})
      Primary.args = { primary: !0, label: 'Button' }
      var Secondary = Template.bind({})
      Secondary.args = { label: 'Button' }
      var Large = Template.bind({})
      Large.args = { size: 'large', label: 'Button' }
      var Small = Template.bind({})
      ;(Small.args = { size: 'small', label: 'Button' }),
        (Primary.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Primary.parameters,
        )),
        (Secondary.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Secondary.parameters,
        )),
        (Large.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Large.parameters,
        )),
        (Small.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Small.parameters,
        ))
    },
    1486: function (module, exports, __webpack_require__) {
      var api = __webpack_require__(363),
        content = __webpack_require__(1487)
      'string' ==
        typeof (content = content.__esModule ? content.default : content) &&
        (content = [[module.i, content, '']])
      var options = { insert: 'head', singleton: !1 }
      api(content, options)
      module.exports = content.locals || {}
    },
    1487: function (module, exports, __webpack_require__) {
      ;(exports = __webpack_require__(364)(!1)).push([
        module.i,
        ".storybook-button {\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-weight: 700;\n  border: 0;\n  border-radius: 3em;\n  cursor: pointer;\n  display: inline-block;\n  line-height: 1;\n}\n.storybook-button--primary {\n  color: white;\n  background-color: #1ea7fd;\n}\n.storybook-button--secondary {\n  color: #333;\n  background-color: transparent;\n  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;\n}\n.storybook-button--small {\n  font-size: 12px;\n  padding: 10px 16px;\n}\n.storybook-button--medium {\n  font-size: 14px;\n  padding: 11px 20px;\n}\n.storybook-button--large {\n  font-size: 16px;\n  padding: 12px 24px;\n}\n",
        '',
      ]),
        (module.exports = exports)
    },
    1488: function (module, exports, __webpack_require__) {
      var api = __webpack_require__(363),
        content = __webpack_require__(1489)
      'string' ==
        typeof (content = content.__esModule ? content.default : content) &&
        (content = [[module.i, content, '']])
      var options = { insert: 'head', singleton: !1 }
      api(content, options)
      module.exports = content.locals || {}
    },
    1489: function (module, exports, __webpack_require__) {
      ;(exports = __webpack_require__(364)(!1)).push([
        module.i,
        ".wrapper {\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\nsvg {\n  display: inline-block;\n  vertical-align: top;\n}\n\nh1 {\n  font-weight: 900;\n  font-size: 20px;\n  line-height: 1;\n  margin: 6px 0 6px 10px;\n  display: inline-block;\n  vertical-align: top;\n}\n\nbutton + button {\n  margin-left: 10px;\n}\n",
        '',
      ]),
        (module.exports = exports)
    },
    1490: function (module, exports, __webpack_require__) {
      var api = __webpack_require__(363),
        content = __webpack_require__(1491)
      'string' ==
        typeof (content = content.__esModule ? content.default : content) &&
        (content = [[module.i, content, '']])
      var options = { insert: 'head', singleton: !1 }
      api(content, options)
      module.exports = content.locals || {}
    },
    1491: function (module, exports, __webpack_require__) {
      ;(exports = __webpack_require__(364)(!1)).push([
        module.i,
        "section {\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n  padding: 48px 20px;\n  margin: 0 auto;\n  max-width: 600px;\n  color: #333;\n}\n\nh2 {\n  font-weight: 900;\n  font-size: 32px;\n  line-height: 1;\n  margin: 0 0 4px;\n  display: inline-block;\n  vertical-align: top;\n}\n\np {\n  margin: 1em 0;\n}\n\na {\n  text-decoration: none;\n  color: #1ea7fd;\n}\n\nul {\n  padding-left: 30px;\n  margin: 1em 0;\n}\n\nli {\n  margin-bottom: 8px;\n}\n\n.tip {\n  display: inline-block;\n  border-radius: 1em;\n  font-size: 11px;\n  line-height: 12px;\n  font-weight: 700;\n  background: #e7fdd8;\n  color: #66bf3c;\n  padding: 4px 12px;\n  margin-right: 10px;\n  vertical-align: top;\n}\n\n.tip-wrapper {\n  font-size: 13px;\n  line-height: 20px;\n  margin-top: 40px;\n  margin-bottom: 40px;\n}\n\n.tip-wrapper svg {\n  display: inline-block;\n  height: 12px;\n  width: 12px;\n  margin-right: 4px;\n  vertical-align: top;\n  margin-top: 3px;\n}\n\n.tip-wrapper svg path {\n  fill: #1ea7fd;\n}\n",
        '',
      ]),
        (module.exports = exports)
    },
    1492: function (module, exports, __webpack_require__) {
      var map = { './frame/frame.stories.tsx': 1523 }
      function webpackContext(req) {
        var id = webpackContextResolve(req)
        return __webpack_require__(id)
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'")
          throw ((e.code = 'MODULE_NOT_FOUND'), e)
        }
        return map[req]
      }
      ;(webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map)
      }),
        (webpackContext.resolve = webpackContextResolve),
        (module.exports = webpackContext),
        (webpackContext.id = 1492)
    },
    1493: function (module, exports, __webpack_require__) {
      'use strict'
      __webpack_require__(36)
      var _interopRequireDefault = __webpack_require__(44)
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.default = void 0)
      var _default = _interopRequireDefault(__webpack_require__(1494)).default
      exports.default = _default
    },
    1494: function (module, exports, __webpack_require__) {
      'use strict'
      __webpack_require__(36),
        Object.defineProperty(exports, '__esModule', { value: !0 }),
        (exports.default = void 0)
      var _default = function dealWithIt(value) {
        return value ? ''.concat(value, ' (▀̿Ĺ̯▀̿ ̿).') : '(▀̿Ĺ̯▀̿ ̿)'
      }
      exports.default = _default
    },
    1523: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'Primary', function () {
          return Primary
        }),
        __webpack_require__.d(__webpack_exports__, 'Secondary', function () {
          return Secondary
        }),
        __webpack_require__.d(__webpack_exports__, 'Large', function () {
          return Large
        }),
        __webpack_require__.d(__webpack_exports__, 'Small', function () {
          return Small
        })
      __webpack_require__(139), __webpack_require__(4)
      var jsx_runtime = __webpack_require__(2),
        react = __webpack_require__(0),
        dist = __webpack_require__(602),
        dealWithIt_DealWithIt = function DealWithIt(_ref) {
          var text = _ref.text
          return Object(jsx_runtime.jsx)('span', {
            children: Object(dist.dealWithIt)(text),
          })
        }
      dealWithIt_DealWithIt.displayName = 'DealWithIt'
      try {
        ;(dealWithIt.displayName = 'dealWithIt'),
          (dealWithIt.__docgenInfo = {
            description: '',
            displayName: 'dealWithIt',
            props: {
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !0,
                type: { name: 'string' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              'components/dealWithIt/dealWithIt.tsx#dealWithIt'
            ] = {
              docgenInfo: dealWithIt.__docgenInfo,
              name: 'dealWithIt',
              path: 'components/dealWithIt/dealWithIt.tsx#dealWithIt',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      __webpack_require__(13),
        __webpack_require__(7),
        __webpack_require__(169),
        __webpack_require__(1495)
      var next_link = __webpack_require__(367),
        link_default = __webpack_require__.n(next_link),
        classnames = __webpack_require__(185),
        classnames_default = __webpack_require__.n(classnames)
      function _objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function _objectWithoutPropertiesLoose(source, excluded) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var button_button = Object(react.forwardRef)(function (_ref, ref) {
        var of = _ref.of,
          link = _ref.link,
          type = _ref.type,
          processing = _ref.processing,
          secondary = _ref.secondary,
          children = _ref.children,
          icon = _ref.icon,
          _onClick = _ref.onClick,
          rest = _objectWithoutProperties(_ref, [
            'of',
            'link',
            'type',
            'processing',
            'secondary',
            'children',
            'icon',
            'onClick',
          ]),
          size = rest.size || 'medium',
          disabled = rest.disabled || processing || !1,
          buttonType = type || 'primary',
          className = classnames_default()(size, rest.className, buttonType, {
            secondary: Boolean(secondary),
            disabled: Boolean(disabled),
            processing: Boolean(processing),
            hasIcon: Boolean(icon),
          }),
          button = Object(jsx_runtime.jsxs)(
            'button',
            Object.assign({ ref: ref }, rest, {
              disabled: disabled,
              className: className,
              onClick: function onClick(e) {
                !disabled && (null == _onClick || _onClick(e))
              },
              children: [
                Object(jsx_runtime.jsx)('style', {
                  jsx: !0,
                  children:
                    '\n          button {\n            display: flex;\n            align-items: center;\n            border: none;\n            border-radius: var(--radius);\n            cursor: pointer;\n            user-select: none;\n            outline: none;\n            background: var(--foreground);\n            color: var(--background);\n            padding: 5px 20px;\n            position: relative;\n            font-size: 0.875rem;\n            border: 1px solid var(--foreground);\n            height: fit-content;\n          }\n\n          button .text {\n            margin: 0 auto;\n            display: flex;\n            align-items: center;\n          }\n\n          button.disabled {\n            cursor: not-allowed;\n            filter: grayscale(1);\n            color: var(--shade-5);\n            border: 1px solid var(--shade-2);\n            background: var(--shade-1);\n          }\n\n          button.disabled.processing {\n            color: var(--accent-6);\n            cursor: default;\n          }\n\n          button.processing .text {\n            opacity: 0;\n          }\n          button.processing > :global(.spinner) {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            margin-left: -0.5rem;\n            margin-top: -0.5rem;\n          }\n          button.small {\n            padding: 1px 8px;\n          }\n          button.large {\n            padding: 6px 12px;\n            font-size: 1rem;\n          }\n          button.secondary {\n            background: var(--background);\n            border-color: var(--shade-2);\n            color: var(--secondary);\n          }\n\n          button:not(.disabled):hover,\n          button:not(.disabled):hover {\n            background: var(--background);\n            border-color: var(--foreground);\n            box-shadow: var(--shadow);\n            color: var(--foreground);\n          }\n\n          button.ghost {\n            color: var(--secondary);\n          }\n\n          button.ghost,\n          button.ghost:hover {\n            background: transparent;\n            border-color: transparent;\n            box-shadow: none;\n          }\n\n          button .icon {\n            display: inline-flex;\n            margin-right: 5px;\n          }\n        ',
                }),
                processing && Object(jsx_runtime.jsx)(components_spinner, {}),
                icon &&
                  Object(jsx_runtime.jsx)('span', {
                    className: 'icon',
                    children: icon,
                  }),
                Object(jsx_runtime.jsx)('span', {
                  className: 'text',
                  children: Object(jsx_runtime.jsx)(components_text, {
                    marginBottom: 0,
                    content: children,
                    of: of,
                    ratio: '1/3',
                  }),
                }),
              ],
            }),
          )
        return 'string' == typeof link
          ? link.startsWith('http')
            ? Object(jsx_runtime.jsx)('a', { href: link, children: button })
            : Object(jsx_runtime.jsx)(link_default.a, {
                href: link,
                children: button,
              })
          : link
          ? Object(jsx_runtime.jsx)(
              link_default.a,
              Object.assign({}, link, { children: button }),
            )
          : button
      })
      try {
        ;(button.displayName = 'button'),
          (button.__docgenInfo = {
            description: '',
            displayName: 'button',
            props: {
              of: {
                defaultValue: null,
                description: '',
                name: 'of',
                required: !0,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                  ],
                },
              },
              link: {
                defaultValue: null,
                description: '',
                name: 'link',
                required: !1,
                type: { name: 'linkType' },
              },
              type: {
                defaultValue: null,
                description: '',
                name: 'type',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"primary"' },
                    { value: '"secondary"' },
                    { value: '"ghost"' },
                    { value: '"success"' },
                    { value: '"error"' },
                    { value: '"warning"' },
                  ],
                },
              },
              transparent: {
                defaultValue: null,
                description: '',
                name: 'transparent',
                required: !1,
                type: { name: 'boolean' },
              },
              className: {
                defaultValue: null,
                description: '',
                name: 'className',
                required: !1,
                type: { name: 'string' },
              },
              disabled: {
                defaultValue: null,
                description: '',
                name: 'disabled',
                required: !1,
                type: { name: 'boolean' },
              },
              processing: {
                defaultValue: null,
                description: '',
                name: 'processing',
                required: !1,
                type: { name: 'boolean' },
              },
              secondary: {
                defaultValue: null,
                description: '',
                name: 'secondary',
                required: !1,
                type: { name: 'boolean' },
              },
              size: {
                defaultValue: null,
                description: '',
                name: 'size',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"medium"' },
                    { value: '"small"' },
                    { value: '"large"' },
                  ],
                },
              },
              icon: {
                defaultValue: null,
                description: '',
                name: 'icon',
                required: !1,
                type: { name: 'ReactNode' },
              },
              onClick: {
                defaultValue: null,
                description: '',
                name: 'onClick',
                required: !1,
                type: {
                  name: '(e: MouseEvent<HTMLElement, MouseEvent>) => void',
                },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/button/button.tsx#button'] = {
              docgenInfo: button.__docgenInfo,
              name: 'button',
              path: 'components/button/button.tsx#button',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var components_button = button_button
      __webpack_require__(14), __webpack_require__(6)
      function withSize_objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function withSize_objectWithoutPropertiesLoose(
            source,
            excluded,
          ) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var withSize_withSize = function withSize(Component) {
          var Wrapped = function Wrapped(_ref) {
            var width = _ref.width,
              height = _ref.height,
              size = _ref.size,
              rest = withSize_objectWithoutProperties(_ref, [
                'width',
                'height',
                'size',
              ]),
              props = Object.assign({}, rest, {
                width: width || size || '1em',
                height: height || size || '1em',
                size: size || '1em',
              })
            return Object(jsx_runtime.jsx)(Component, Object.assign({}, props))
          }
          return (
            (Wrapped.displayName = Component.displayName || Component.name),
            Wrapped
          )
        },
        shared_withSize_withSize = withSize_withSize
      try {
        ;(withSize_withSize.displayName = 'withSize'),
          (withSize_withSize.__docgenInfo = {
            description: '',
            displayName: 'withSize',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              'components/icons/shared/withSize/withSize.tsx#withSize'
            ] = {
              docgenInfo: withSize_withSize.__docgenInfo,
              name: 'withSize',
              path: 'components/icons/shared/withSize/withSize.tsx#withSize',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var shared_withSize = shared_withSize_withSize,
        spinner_Spinner = function Spinner(props) {
          return Object(jsx_runtime.jsx)('span', {
            className: 'spinner',
            children: Object(jsx_runtime.jsx)('style', {
              jsx: !0,
              children: '\n        @-webkit-keyframes spin {\n          0% {\n            -webkit-transform: rotate(0deg);\n          }\n          100% {\n            -webkit-transform: rotate(360deg);\n          }\n        }\n        @keyframes spin {\n          0% {\n            transform: rotate(0deg);\n          }\n          100% {\n            transform: rotate(360deg);\n          }\n        }\n        .spinner {\n          display: inline-block;\n          width: '
                .concat(props.width, ';\n          height: ')
                .concat(
                  props.height,
                  ';\n          border: solid 2px transparent;\n          border-top-color: inherit;\n          border-left-color: inherit;\n          border-radius: 50%;\n          animation: spin 550ms linear infinite;\n        }\n      ',
                ),
            }),
          })
        }
      spinner_Spinner.displayName = 'Spinner'
      var spinner_spinner = shared_withSize(spinner_Spinner)
      try {
        ;(spinner.displayName = 'spinner'),
          (spinner.__docgenInfo = {
            description: '',
            displayName: 'spinner',
            props: {
              width: {
                defaultValue: null,
                description: '',
                name: 'width',
                required: !1,
                type: { name: 'ReactText' },
              },
              height: {
                defaultValue: null,
                description: '',
                name: 'height',
                required: !1,
                type: { name: 'ReactText' },
              },
              size: {
                defaultValue: null,
                description: '',
                name: 'size',
                required: !1,
                type: { name: 'ReactText' },
              },
              filled: {
                defaultValue: null,
                description: '',
                name: 'filled',
                required: !1,
                type: { name: 'boolean' },
              },
              fill: {
                defaultValue: null,
                description: '',
                name: 'fill',
                required: !1,
                type: { name: 'string' },
              },
              color: {
                defaultValue: null,
                description: '',
                name: 'color',
                required: !1,
                type: { name: 'string' },
              },
              direction: {
                defaultValue: null,
                description: '',
                name: 'direction',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"left"' },
                    { value: '"right"' },
                    { value: '"up"' },
                    { value: '"down"' },
                  ],
                },
              },
              align: {
                defaultValue: null,
                description: '',
                name: 'align',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"left"' },
                    { value: '"right"' },
                    { value: '"justify"' },
                  ],
                },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES[
              'components/spinner/spinner.tsx#spinner'
            ] = {
              docgenInfo: spinner.__docgenInfo,
              name: 'spinner',
              path: 'components/spinner/spinner.tsx#spinner',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var components_spinner = spinner_spinner,
        emotion_css_esm =
          (__webpack_require__(593),
          __webpack_require__(55),
          __webpack_require__(54),
          __webpack_require__(19),
          __webpack_require__(70),
          __webpack_require__(108),
          __webpack_require__(347),
          __webpack_require__(26),
          __webpack_require__(53),
          __webpack_require__(89)),
        index_es = __webpack_require__(603),
        shevyjs_dist = __webpack_require__(604),
        shevyjs_dist_default = __webpack_require__.n(shevyjs_dist)
      function _slicedToArray(arr, i) {
        return (
          (function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr
          })(arr) ||
          (function _iterableToArrayLimit(arr, i) {
            if (
              'undefined' == typeof Symbol ||
              !(Symbol.iterator in Object(arr))
            )
              return
            var _arr = [],
              _n = !0,
              _d = !1,
              _e = void 0
            try {
              for (
                var _s, _i = arr[Symbol.iterator]();
                !(_n = (_s = _i.next()).done) &&
                (_arr.push(_s.value), !i || _arr.length !== i);
                _n = !0
              );
            } catch (err) {
              ;(_d = !0), (_e = err)
            } finally {
              try {
                _n || null == _i.return || _i.return()
              } finally {
                if (_d) throw _e
              }
            }
            return _arr
          })(arr, i) ||
          (function _unsupportedIterableToArray(o, minLen) {
            if (!o) return
            if ('string' == typeof o) return _arrayLikeToArray(o, minLen)
            var n = Object.prototype.toString.call(o).slice(8, -1)
            'Object' === n && o.constructor && (n = o.constructor.name)
            if ('Map' === n || 'Set' === n) return Array.from(o)
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return _arrayLikeToArray(o, minLen)
          })(arr, i) ||
          (function _nonIterableRest() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            )
          })()
        )
      }
      function _arrayLikeToArray(arr, len) {
        ;(null == len || len > arr.length) && (len = arr.length)
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
        return arr2
      }
      var headerKinds = {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
        },
        currentTheme = {
          media: { 1600: 70, 1200: 65, 900: 56, 600: 40, 0: 70 },
          headerTypography: [[18, 9, 5.6, 4.5, 3, 2.2]],
          baseFontSize: '10px',
        },
        characterPerLine = Object.values(currentTheme.media),
        breakpoints = Object.keys(currentTheme.media)
          .map(function (x) {
            return parseInt(x)
          })
          .filter(Boolean),
        typography_shevy = function shevy(options) {
          return new shevyjs_dist_default.a(
            Object.assign({ baseFontSize: currentTheme.baseFontSize }, options),
          )
        },
        headerTypography = currentTheme.headerTypography,
        f = characterPerLine.reduce(function () {
          if (headerTypography.length > 1) {
            if (characterPerLine.length !== headerTypography.length)
              throw new Error('Calculated matrix length does not match')
            return headerTypography
          }
          var vector = _slicedToArray(currentTheme.headerTypography, 1)[0]
          return characterPerLine.map(function (y, j, arr) {
            var max = arr.reduce(function (a, b) {
                return Math.max(a, b)
              }),
              currentCharacterPerLine = characterPerLine[j]
            return vector.map(function (x) {
              return x * (currentCharacterPerLine / max)
            })
          })
        }, []),
        getBit = function getBit() {
          var _scale,
            kind =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'h1'
          return null === (_scale = scale(f)({ ratio: 2 / 3 })) ||
            void 0 === _scale
            ? void 0
            : _scale[kind]
        },
        getWidth = function getWidth(fontSize) {
          return fontSize.map(function (size, i) {
            var num = parseInt(size.replace('px', ''))
            return characterPerLine[i] * (num / 1.618)
          })
        },
        scale = function scale(typography) {
          return function (payload) {
            var ratio = payload.ratio,
              _payload$overrides = payload.overrides,
              overrides =
                void 0 === _payload$overrides
                  ? { marginBottom: 0 }
                  : _payload$overrides,
              pluck = Object.keys(headerKinds),
              relative = ratio || 1
            return typography
              .map(function (baseFontScale) {
                return typography_shevy({
                  addMarginBottom: Boolean(
                    null == overrides ? void 0 : overrides.marginBottom,
                  ),
                  baseFontScale: baseFontScale.map(function (item) {
                    return item * relative
                  }),
                })
              })
              .reduce(function (acc, shevy) {
                return (pluck instanceof Array
                  ? pluck
                  : Object.keys(pluck)
                ).reduce(function (join, key) {
                  var _acc$key,
                    _acc$key2,
                    _acc$key3,
                    fontSize = ''.concat(
                      parseInt(shevy[key].fontSize.replace('px', '')),
                      'px',
                    ),
                    lineHeight = shevy[key].lineHeight,
                    marginBottom = shevy[key].marginBottom
                  return Object.assign(
                    {},
                    join,
                    (function _defineProperty(obj, key, value) {
                      return (
                        key in obj
                          ? Object.defineProperty(obj, key, {
                              value: value,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (obj[key] = value),
                        obj
                      )
                    })(
                      {},
                      key,
                      Object.assign(
                        {
                          fontSize: (
                            (null === (_acc$key = acc[key]) ||
                            void 0 === _acc$key
                              ? void 0
                              : _acc$key.fontSize) || []
                          ).concat(fontSize),
                          lineHeight: (
                            (null === (_acc$key2 = acc[key]) ||
                            void 0 === _acc$key2
                              ? void 0
                              : _acc$key2.lineHeight) || []
                          ).concat(lineHeight),
                          marginBottom:
                            marginBottom ||
                            (
                              (null === (_acc$key3 = acc[key]) ||
                              void 0 === _acc$key3
                                ? void 0
                                : _acc$key3.marginBottom) || []
                            ).concat(marginBottom),
                        },
                        overrides,
                      ),
                    ),
                  )
                }, {})
              }, {})
          }
        },
        typography_repeat = function repeat() {
          var fill =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1
          return function () {
            var unit =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '1fr'
            return new Array(fill).fill(unit).join(' ')
          }
        },
        typographyRatio = { 1: 1, '1/3': 1 / 3, '2/3': 2 / 3 },
        typography_typography = function typography(payload) {
          var _payload$ratio = payload.ratio,
            ratio = void 0 === _payload$ratio ? '1' : _payload$ratio,
            overrides = payload.overrides,
            _payload$of = payload.of,
            of = void 0 === _payload$of ? 'h1' : _payload$of
          return Object(emotion_css_esm.a)(
            mq(
              scale(f)({
                ratio: typographyRatio[ratio],
                overrides: Object.assign({}, overrides, {
                  marginBottom:
                    'string' ==
                    typeof (null == overrides ? void 0 : overrides.marginBottom)
                      ? getBit(of).fontSize
                      : null == overrides
                      ? void 0
                      : overrides.marginBottom,
                }),
              })[of],
            ),
          )
        },
        mq = Object(index_es.a)(
          breakpoints.map(function (bp) {
            return '@media (min-width: '.concat(bp, 'px)')
          }),
        ),
        typography_0 = typography_typography
      try {
        ;(typography_shevy.displayName = 'shevy'),
          (typography_shevy.__docgenInfo = {
            description: '',
            displayName: 'shevy',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#shevy'] = {
              docgenInfo: typography_shevy.__docgenInfo,
              name: 'shevy',
              path: 'typography/index.tsx#shevy',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(getBit.displayName = 'getBit'),
          (getBit.__docgenInfo = {
            description: '',
            displayName: 'getBit',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#getBit'] = {
              docgenInfo: getBit.__docgenInfo,
              name: 'getBit',
              path: 'typography/index.tsx#getBit',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(getWidth.displayName = 'getWidth'),
          (getWidth.__docgenInfo = {
            description: '',
            displayName: 'getWidth',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#getWidth'] = {
              docgenInfo: getWidth.__docgenInfo,
              name: 'getWidth',
              path: 'typography/index.tsx#getWidth',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(scale.displayName = 'scale'),
          (scale.__docgenInfo = {
            description: '',
            displayName: 'scale',
            props: {
              0: {
                defaultValue: null,
                description: '',
                name: '0',
                required: !0,
                type: { name: 'FontScaleType' },
              },
              1: {
                defaultValue: null,
                description: '',
                name: '1',
                required: !0,
                type: { name: 'FontScaleType' },
              },
              2: {
                defaultValue: null,
                description: '',
                name: '2',
                required: !0,
                type: { name: 'FontScaleType' },
              },
              3: {
                defaultValue: null,
                description: '',
                name: '3',
                required: !0,
                type: { name: 'FontScaleType' },
              },
              4: {
                defaultValue: null,
                description: '',
                name: '4',
                required: !0,
                type: { name: 'FontScaleType' },
              },
              length: {
                defaultValue: null,
                description: '',
                name: 'length',
                required: !0,
                type: { name: '5 | 1' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#scale'] = {
              docgenInfo: scale.__docgenInfo,
              name: 'scale',
              path: 'typography/index.tsx#scale',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(typography_repeat.displayName = 'repeat'),
          (typography_repeat.__docgenInfo = {
            description: '',
            displayName: 'repeat',
            props: {},
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#repeat'] = {
              docgenInfo: typography_repeat.__docgenInfo,
              name: 'repeat',
              path: 'typography/index.tsx#repeat',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(mq.displayName = 'mq'),
          (mq.__docgenInfo = { description: '', displayName: 'mq', props: {} }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#mq'] = {
              docgenInfo: mq.__docgenInfo,
              name: 'mq',
              path: 'typography/index.tsx#mq',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      try {
        ;(typography_typography.displayName = 'typography'),
          (typography_typography.__docgenInfo = {
            description: '',
            displayName: 'typography',
            props: {
              of: {
                defaultValue: null,
                description: '',
                name: 'of',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                  ],
                },
              },
              ratio: {
                defaultValue: null,
                description: '',
                name: 'ratio',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"1"' },
                    { value: '"1/3"' },
                    { value: '"2/3"' },
                  ],
                },
              },
              overrides: {
                defaultValue: null,
                description: '',
                name: 'overrides',
                required: !1,
                type: {
                  name:
                    '{ marginBottom?: number | "bit"; fontFamily?: string; }',
                },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['typography/index.tsx#typography'] = {
              docgenInfo: typography_typography.__docgenInfo,
              name: 'typography',
              path: 'typography/index.tsx#typography',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      function header_defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        )
      }
      function header_objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function header_objectWithoutPropertiesLoose(
            source,
            excluded,
          ) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var header_Header = function Header(_ref) {
        var _headerKinds$h1$heade,
          kind = _ref.kind,
          text = _ref.text,
          _ref$ratio = _ref.ratio,
          ratio = void 0 === _ref$ratio ? '1' : _ref$ratio,
          rest = header_objectWithoutProperties(_ref, [
            'kind',
            'text',
            'ratio',
          ]),
          marginBottom =
            'string' == typeof rest.marginBottom
              ? getBit(kind).fontSize
              : rest.marginBottom,
          baseProps = {
            className: typography_0({
              of: kind,
              ratio: ratio,
              overrides: { marginBottom: marginBottom },
            }),
          }
        return Object(jsx_runtime.jsx)(react.Fragment, {
          children: ((_headerKinds$h1$heade = {}),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h1,
            Object(jsx_runtime.jsx)(
              'h1',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h2,
            Object(jsx_runtime.jsx)(
              'h2',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h3,
            Object(jsx_runtime.jsx)(
              'h3',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h4,
            Object(jsx_runtime.jsx)(
              'h4',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h5,
            Object(jsx_runtime.jsx)(
              'h5',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          header_defineProperty(
            _headerKinds$h1$heade,
            headerKinds.h6,
            Object(jsx_runtime.jsx)(
              'h6',
              Object.assign({}, baseProps, { children: text }),
            ),
          ),
          _headerKinds$h1$heade)[kind],
        })
      }
      header_Header.displayName = 'Header'
      var header_header = header_Header
      try {
        ;(header.displayName = 'header'),
          (header.__docgenInfo = {
            description: '',
            displayName: 'header',
            props: {
              text: {
                defaultValue: null,
                description: '',
                name: 'text',
                required: !0,
                type: { name: 'string' },
              },
              kind: {
                defaultValue: null,
                description: '',
                name: 'kind',
                required: !0,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                  ],
                },
              },
              ratio: {
                defaultValue: { value: '1' },
                description: '',
                name: 'ratio',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"1"' },
                    { value: '"1/3"' },
                    { value: '"2/3"' },
                  ],
                },
              },
              marginBottom: {
                defaultValue: null,
                description: '',
                name: 'marginBottom',
                required: !1,
                type: { name: 'number | "bit"' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/header/header.tsx#header'] = {
              docgenInfo: header.__docgenInfo,
              name: 'header',
              path: 'components/header/header.tsx#header',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var components_header = header_header,
        lodash_defaultsdeep = __webpack_require__(605),
        lodash_defaultsdeep_default = __webpack_require__.n(lodash_defaultsdeep)
      function _typeof(obj) {
        return (_typeof =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function _typeof(obj) {
                return typeof obj
              }
            : function _typeof(obj) {
                return obj &&
                  'function' == typeof Symbol &&
                  obj.constructor === Symbol &&
                  obj !== Symbol.prototype
                  ? 'symbol'
                  : typeof obj
              })(obj)
      }
      function frame_objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function frame_objectWithoutPropertiesLoose(
            source,
            excluded,
          ) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var previews = (function frame_defineProperty(obj, key, value) {
          return (
            key in obj
              ? Object.defineProperty(obj, key, {
                  value: value,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (obj[key] = value),
            obj
          )
        })(
          {},
          '/static/images/ponyo.png',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        ),
        frame_Frame = function Frame(_ref) {
          var renderChildren,
            children = _ref.children,
            brand = _ref.brand,
            image = _ref.image,
            cta = _ref.cta,
            rest = frame_objectWithoutProperties(_ref, [
              'children',
              'brand',
              'image',
              'cta',
            ]),
            weight = rest.weight || 'fullBleed',
            span = lodash_defaultsdeep_default()(rest.span, {
              'min-width: 0px': '16',
              'min-width: 900px': '16',
              'min-width: 1200px': '16',
              'min-width: 1600px': '16',
            }),
            heading = getHeading(rest.heading),
            bit = getBit(heading.kind),
            preview = image ? previews[image.src] : void 0,
            maxWidth = getWidth(bit.fontSize),
            repeat = typography_repeat(16),
            margin =
              'fullBleed' === weight
                ? 0
                : bit.fontSize.map(function (size) {
                    return (
                      parseInt(size.replace('px', '')) *
                      { regular: 1, medium: 2, bold: 3, fullBleed: 0 }[weight]
                    )
                  })
          return Object(jsx_runtime.jsxs)('div', {
            className: Object(emotion_css_esm.a)(
              mq({
                position: 'relative',
                overflow: 'hidden',
                paddingLeft: margin,
                paddingRight: margin,
                paddingBottom: margin,
              }),
            ),
            children: [
              render(function () {
                if ('fit' === (null == image ? void 0 : image.position))
                  return Object(jsx_runtime.jsx)('figure', {
                    className: classnames_default()(
                      Object(emotion_css_esm.a)({
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        background: preview
                          ? 'url('.concat(preview, ')')
                          : 'none',
                      }),
                    ),
                    children: Object(jsx_runtime.jsx)(components_img, {
                      width: '2000px',
                      height: '2000px',
                      src: image.src,
                      alt: image.alt,
                      className: 'img',
                      objectFit: 'fill',
                      unoptimized: !0,
                      onLoad: function onLoad() {
                        var item = document.getElementsByClassName('frame')[1]
                        item && (item.style.background = 'none')
                      },
                    }),
                  })
              }),
              Object(jsx_runtime.jsxs)('div', {
                className: 'frame '
                  .concat(weight, ' ')
                  .concat(
                    Object(emotion_css_esm.a)(
                      mq({
                        maxWidth: maxWidth,
                        padding: bit.fontSize,
                        grid: Array(4).fill(
                          '"'
                            .concat(typography_repeat(8)('content'), ' ')
                            .concat(typography_repeat(8)('image'), '" / ')
                            .concat(repeat('1fr')),
                        ),
                        margin: '0 auto',
                        height: '100%',
                        display: 'grid',
                        position: 'relative',
                        overflow: 'hidden',
                      }),
                    ),
                  ),
                children: [
                  Object(jsx_runtime.jsx)('style', {
                    jsx: !0,
                    children: '\n          .frame-span {\n            grid-column: 1 / span '
                      .concat(
                        span['min-width: 0px'],
                        ';\n          }\n\n          // @media screen and (min-width: 600px) {\n          //   .frame {\n          //     width: calc(100vw - 19.200000000000003rem);\n          //     grid-template-columns: repeat(6, 1fr);\n          //     grid-column-gap: 3.2rem;\n          //   }\n\n          //   .frame-span {\n          //     grid-column: 1 / span ',
                      )
                      .concat(
                        span['min-width: 600px'],
                        ';\n          //   }\n          // }\n\n          // @media screen and (min-width: 900px) {\n          //   .frame {\n          //     width: calc(100vw - 21.6rem);\n          //     grid-template-columns: repeat(12, 1fr);\n          //     grid-column-gap: 3.6rem;\n          //   }\n\n          //   .frame-span {\n          //     grid-column: 1 / span ',
                      )
                      .concat(
                        span['min-width: 900px'],
                        ';\n          //   }\n          // }\n\n          // @media screen and (min-width: 1200px) {\n          //   .frame {\n          //     width: calc(100vw - 28.799999999999997rem);\n          //     grid-template-columns: repeat(16, 1fr);\n          //     grid-column-gap: 4.8rem;\n          //   }\n\n          //   .frame-span {\n          //     grid-column: 1 / span ',
                      )
                      .concat(
                        span['min-width: 1200px'],
                        ';\n          //   }\n          // }\n\n          // @media screen and (min-width: 1600px) {\n          //   .frame {\n          //     width: calc(100vw - 38.400000000000006rem);\n          //     grid-template-columns: repeat(16, 1fr);\n          //     grid-column-gap: 6.4rem;\n          //   }\n\n          //   .frame-span {\n          //     grid-column: 1 / span ',
                      )
                      .concat(
                        span['min-width: 1600px'],
                        ';\n          //   }\n          // }\n\n          // img,\n          // .img {\n          //   position: absolute;\n          //   width: 100%;\n          //   top: 0;\n          //   left: 0;\n          // }\n\n          // figure {\n          //   position: absolute;\n          //   top: 0;\n          //   left: 0;\n          // }\n\n          // .wrapper {\n          //   position: relative;\n          // }\n        ',
                      ),
                  }),
                  ((renderChildren = function renderChildren() {
                    return Object(jsx_runtime.jsx)(react.Fragment, {
                      children: Object(jsx_runtime.jsxs)('div', {
                        className: 'wrapper',
                        children: [
                          render(function () {
                            if ('object' === _typeof(heading))
                              return Object(jsx_runtime.jsx)(
                                components_header,
                                {
                                  marginBottom: bit.fontSize,
                                  kind: heading.kind,
                                  text: heading.text,
                                },
                              )
                          }),
                          render(function () {
                            if ('object' === _typeof(heading)) {
                              var subHead = heading.subHead,
                                kind = heading.kind
                              if (subHead)
                                return Object(jsx_runtime.jsx)(
                                  components_text,
                                  {
                                    content: subHead,
                                    of: kind,
                                    ratio: '1/3',
                                    marginBottom: 'bit',
                                  },
                                )
                            }
                          }),
                          children,
                          render(function () {
                            if (
                              'object' === _typeof(heading) &&
                              'string' == typeof brand
                            ) {
                              var kind = heading.kind
                              if (kind)
                                return Object(
                                  jsx_runtime.jsx,
                                )(components_header, {
                                  text: brand,
                                  kind: kind,
                                  marginBottom: 'bit',
                                  ratio: '2/3',
                                })
                            }
                          }),
                          render(function () {
                            if (heading && null != cta && cta.length)
                              return cta.map(function (action) {
                                var children = action.children
                                return Object(jsx_runtime.jsx)(
                                  components_button,
                                  { of: heading.kind, children: children },
                                  children,
                                )
                              })
                          }),
                        ],
                      }),
                    })
                  }),
                  Object(jsx_runtime.jsxs)(react.Fragment, {
                    children: [
                      Object(jsx_runtime.jsx)('div', {
                        className: Object(emotion_css_esm.a)({
                          gridArea: 'content',
                        }),
                        children: renderChildren(),
                      }),
                      Object(jsx_runtime.jsx)('div', {
                        className: Object(emotion_css_esm.a)({
                          gridArea: 'image',
                        }),
                        children: render(function () {
                          return image &&
                            'fit' !== (null == image ? void 0 : image.position)
                            ? Object(jsx_runtime.jsx)('div', {
                                className: Object(emotion_css_esm.a)({
                                  position: 'relative',
                                }),
                                children: Object(jsx_runtime.jsx)('figure', {
                                  className: classnames_default()(
                                    Object(emotion_css_esm.a)({
                                      position: 'absolute',
                                      top: '0',
                                      left: '0',
                                      background: preview
                                        ? 'url('.concat(preview, ')')
                                        : 'none',
                                    }),
                                  ),
                                  children: Object(jsx_runtime.jsx)(
                                    components_img,
                                    {
                                      width: '2000px',
                                      height: '2000px',
                                      src: image.src,
                                      alt: image.alt,
                                      className: 'img',
                                      objectFit: 'fill',
                                      onLoad: function onLoad() {
                                        var item = document.getElementsByClassName(
                                          'frame',
                                        )[1]
                                        item && (item.style.background = 'none')
                                      },
                                    },
                                  ),
                                }),
                              })
                            : null
                        }),
                      }),
                    ],
                  })),
                ],
              }),
            ],
          })
        }
      frame_Frame.displayName = 'Frame'
      try {
        ;(frame.displayName = 'frame'),
          (frame.__docgenInfo = {
            description: '',
            displayName: 'frame',
            props: {
              weight: {
                defaultValue: null,
                description: '',
                name: 'weight',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"fullBleed"' },
                    { value: '"regular"' },
                    { value: '"medium"' },
                    { value: '"bold"' },
                  ],
                },
              },
              span: {
                defaultValue: null,
                description: '',
                name: 'span',
                required: !1,
                type: { name: 'FrameSpanType' },
              },
              heading: {
                defaultValue: null,
                description: '',
                name: 'heading',
                required: !0,
                type: {
                  name:
                    'string | { kind: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; text: string; subHead?: string; }',
                },
              },
              brand: {
                defaultValue: null,
                description: '',
                name: 'brand',
                required: !1,
                type: { name: 'string' },
              },
              cta: {
                defaultValue: null,
                description: '',
                name: 'cta',
                required: !1,
                type: { name: '(ButtonPropsType & { children: string; })[]' },
              },
              image: {
                defaultValue: null,
                description: '',
                name: 'image',
                required: !1,
                type: {
                  name:
                    '{ src: string; alt: string; position?: "fit" | "left" | "right"; unoptimized?: boolean; }',
                },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/frame/frame.tsx#frame'] = {
              docgenInfo: frame.__docgenInfo,
              name: 'frame',
              path: 'components/frame/frame.tsx#frame',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var getHeading = function getHeading(heading) {
        return 'string' == typeof heading
          ? { kind: 'h1', text: heading }
          : heading
      }
      function text_objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function text_objectWithoutPropertiesLoose(
            source,
            excluded,
          ) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var text_Text = function Text(_ref) {
        var content = _ref.content,
          marginBottom = _ref.marginBottom,
          rest = text_objectWithoutProperties(_ref, [
            'content',
            'marginBottom',
          ]),
          of = rest.of || 'h1',
          ratio = rest.ratio || '1/3'
        return Object(jsx_runtime.jsx)('div', {
          className: 'text '.concat(
            typography_0({
              of: of,
              ratio: ratio,
              overrides: { marginBottom: marginBottom },
            }),
          ),
          children: content,
        })
      }
      text_Text.displayName = 'Text'
      var text_text = text_Text
      try {
        ;(text.displayName = 'text'),
          (text.__docgenInfo = {
            description: '',
            displayName: 'text',
            props: {
              content: {
                defaultValue: null,
                description: '',
                name: 'content',
                required: !0,
                type: { name: 'ReactNode' },
              },
              of: {
                defaultValue: null,
                description: '',
                name: 'of',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"h1"' },
                    { value: '"h2"' },
                    { value: '"h3"' },
                    { value: '"h4"' },
                    { value: '"h5"' },
                    { value: '"h6"' },
                  ],
                },
              },
              ratio: {
                defaultValue: null,
                description: '',
                name: 'ratio',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"1"' },
                    { value: '"1/3"' },
                    { value: '"2/3"' },
                  ],
                },
              },
              marginBottom: {
                defaultValue: null,
                description: '',
                name: 'marginBottom',
                required: !1,
                type: { name: 'number | "bit"' },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/text/text.tsx#text'] = {
              docgenInfo: text.__docgenInfo,
              name: 'text',
              path: 'components/text/text.tsx#text',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var components_text = text_text,
        img_Img =
          (__webpack_require__(606),
          function Img(props) {
            return Object(jsx_runtime.jsx)('img', Object.assign({}, props))
          })
      img_Img.displayName = 'Img'
      var img_img = img_Img
      try {
        ;(img.displayName = 'img'),
          (img.__docgenInfo = {
            description: '',
            displayName: 'img',
            props: {
              src: {
                defaultValue: null,
                description: '',
                name: 'src',
                required: !0,
                type: { name: 'string' },
              },
              quality: {
                defaultValue: null,
                description: '',
                name: 'quality',
                required: !1,
                type: { name: 'ReactText' },
              },
              priority: {
                defaultValue: null,
                description: '',
                name: 'priority',
                required: !1,
                type: { name: 'boolean' },
              },
              loading: {
                defaultValue: null,
                description: '',
                name: 'loading',
                required: !1,
                type: {
                  name: 'enum',
                  value: [{ value: '"lazy"' }, { value: '"eager"' }],
                },
              },
              unoptimized: {
                defaultValue: null,
                description: '',
                name: 'unoptimized',
                required: !1,
                type: { name: 'boolean' },
              },
              objectFit: {
                defaultValue: null,
                description: '',
                name: 'objectFit',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"fill"' },
                    { value: '"inherit"' },
                    { value: '"none"' },
                    { value: '"-moz-initial"' },
                    { value: '"initial"' },
                    { value: '"revert"' },
                    { value: '"unset"' },
                    { value: '"contain"' },
                    { value: '"cover"' },
                    { value: '"scale-down"' },
                  ],
                },
              },
              objectPosition: {
                defaultValue: null,
                description: '',
                name: 'objectPosition',
                required: !1,
                type: { name: 'ObjectPosition<ReactText>' },
              },
              width: {
                defaultValue: null,
                description: '',
                name: 'width',
                required: !1,
                type: { name: 'ReactText' },
              },
              height: {
                defaultValue: null,
                description: '',
                name: 'height',
                required: !1,
                type: { name: 'ReactText' },
              },
              unsized: {
                defaultValue: null,
                description: '@deprecated Use `layout="fill"` instead',
                name: 'unsized',
                required: !0,
                type: { name: 'true' },
              },
              layout: {
                defaultValue: null,
                description: '',
                name: 'layout',
                required: !1,
                type: {
                  name: 'enum',
                  value: [
                    { value: '"fill"' },
                    { value: '"fixed"' },
                    { value: '"intrinsic"' },
                    { value: '"responsive"' },
                  ],
                },
              },
            },
          }),
          'undefined' != typeof STORYBOOK_REACT_CLASSES &&
            (STORYBOOK_REACT_CLASSES['components/img/img.tsx#img'] = {
              docgenInfo: img.__docgenInfo,
              name: 'img',
              path: 'components/img/img.tsx#img',
            })
      } catch (__react_docgen_typescript_loader_error) {}
      var _root$htmlHtml$h,
        components_img = img_img,
        emotion_react_browser_esm =
          (__webpack_require__(9),
          __webpack_require__(31),
          __webpack_require__(32),
          __webpack_require__(186))
      __webpack_require__(36)
      function html_styles_defineProperty(obj, key, value) {
        return (
          key in obj
            ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (obj[key] = value),
          obj
        )
      }
      var html_styles =
          (html_styles_defineProperty(
            (_root$htmlHtml$h = {
              '::root': {
                '--foreground': '#000',
                '--background': '#fff',
                '--accent-0': '#dd2f2f',
                '--accent-1': '#f5a623',
                '--accent-2': '#97f646',
                '--accent-3': '#79c638',
                '--accent-4': '#58aa11',
                '--accent-5': '#4697f6',
                '--accent-6': '#197ef4',
                '--accent-7': '#f832e7',
                '--accent-8': '#863dcf',
                '--shade-1': '#fafafa',
                '--shade-2': '#eaeaea',
                '--shade-3': '#999',
                '--shade-4': '#888',
                '--shade-5': '#666',
                '--shade-6': '#444',
                '--shade-7': '#333',
                '--shade-8': '#111',
                '--selection': 'var(--accent-2)',
                '--link-color': 'var(--accent-6)',
                '--secondary-light': 'var(--shade-3)',
                '--secondary': 'var(--shade-5)',
                '--secondary-dark': 'var(--shade-7)',
                '--shadow': '0 5px 10px rgba(0, 0, 0, 0.12)',
                '--portal-opacity': '0.25',
                '--radius': '0',
                '--font-sans':
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                '--font-mono':
                  "'Roboto Mono', Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
              },
              'html, .html': {
                '--font-heading-regular': "'Uber Move Regular'",
                '--font-heading-medium': "'Uber Move Medium'",
                '--font-text-regular': "'Uber Move Text Regular'",
                '--font-text-medium': "'Uber Move Text Medium'",
              },
              'html.dark, .html.dark': {
                '--foreground': '#fff',
                '--background': '#000',
                '--shade-8': '#fafafa',
                '--shade-7': '#eaeaea',
                '--shade-6': '#999',
                '--shade-5': '#888',
                '--shade-4': '#666',
                '--shade-3': '#444',
                '--shade-2': '#333',
                '--shade-1': '#111',
                '--selection': 'var(--accent-7)',
              },
              'html, .html, body, .body': {
                backgroundColor: 'var(--background)',
                fontSize: '10px',
              },
            }),
            'body, .body',
            {
              color: 'var(--foreground)',
              fontFamily: 'var(--font-text-regular)',
              textRendering: 'optimizeLegibility',
              webkitFontSmoothing: 'antialiased',
              height: '100vh',
            },
          ),
          html_styles_defineProperty(_root$htmlHtml$h, 'pre, code', {
            fontFamily: 'var(--font-mono)',
          }),
          html_styles_defineProperty(
            _root$htmlHtml$h,
            'h1, h2, h3, h4, h5, h6',
            { fontFamily: 'var(--font-heading-regular)' },
          ),
          html_styles_defineProperty(_root$htmlHtml$h, 'a', {
            position: 'relative',
            textDecoration: 'none',
            color: 'var(--link-color)',
          }),
          html_styles_defineProperty(_root$htmlHtml$h, 'button, .clickable', {
            position: 'relative',
          }),
          html_styles_defineProperty(_root$htmlHtml$h, '.invert', {
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
          }),
          html_styles_defineProperty(_root$htmlHtml$h, '::selection', {
            background: 'var(--selection)',
          }),
          html_styles_defineProperty(_root$htmlHtml$h, '::-moz-selection', {
            background: 'var(--selection)',
          }),
          _root$htmlHtml$h),
        css = __webpack_require__(607)
      function _templateObject() {
        var data = (function _taggedTemplateLiteral(strings, raw) {
          raw || (raw = strings.slice(0))
          return Object.freeze(
            Object.defineProperties(strings, {
              raw: { value: Object.freeze(raw) },
            }),
          )
        })([
          '\n  #nprogress {\n    pointer-events: none;\n  }\n\n  #nprogress .bar {\n    background: var(--link-color);\n\n    position: fixed;\n    z-index: 1031;\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 2px;\n  }\n\n  /* Fancy blur effect */\n  #nprogress .peg {\n    display: block;\n    position: absolute;\n    right: 0px;\n    width: 100px;\n    height: 100%;\n    box-shadow: 0 0 10px var(--link-color);\n    opacity: 1;\n\n    -webkit-transform: rotate(3deg) translate(0px, -4px);\n    -ms-transform: rotate(3deg) translate(0px, -4px);\n    transform: rotate(3deg) translate(0px, -4px);\n  }\n\n  /* Remove these to get rid of the spinner */\n  #nprogress .spinner {\n    display: block;\n    position: fixed;\n    z-index: 1031;\n    top: 7px;\n    right: 5px;\n  }\n\n  #nprogress .spinner-icon {\n    width: 18px;\n    height: 18px;\n    box-sizing: border-box;\n\n    border: solid 2px transparent;\n    border-top-color: var(--link-color);\n    border-left-color: var(--link-color);\n    border-radius: 50%;\n\n    animation: nprogress-spinner 550ms linear infinite;\n  }\n\n  .nprogress-custom-parent {\n    overflow: hidden;\n    position: relative;\n  }\n\n  .nprogress-custom-parent #nprogress .spinner,\n  .nprogress-custom-parent #nprogress .bar {\n    position: absolute;\n  }\n\n  @-webkit-keyframes nprogress-spinner {\n    0% {\n      -webkit-transform: rotate(0deg);\n    }\n    100% {\n      -webkit-transform: rotate(360deg);\n    }\n  }\n  @keyframes nprogress-spinner {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n',
        ])
        return (
          (_templateObject = function _templateObject() {
            return data
          }),
          data
        )
      }
      __webpack_require__.n(css).a.global(_templateObject())
      function reset_styles_templateObject() {
        var data = (function reset_styles_taggedTemplateLiteral(strings, raw) {
          raw || (raw = strings.slice(0))
          return Object.freeze(
            Object.defineProperties(strings, {
              raw: { value: Object.freeze(raw) },
            }),
          )
        })([
          "\n  /* Box sizing rules */\n  *,\n  *::before,\n  *::after {\n    box-sizing: border-box;\n  }\n\n  /* Remove default padding */\n  ul[class],\n  ol[class] {\n    padding: 0;\n  }\n\n  /* Remove default margin */\n  body,\n  h1,\n  h2,\n  h3,\n  h4,\n  p,\n  ul[class],\n  ol[class],\n  figure,\n  blockquote,\n  dl,\n  dd {\n    margin: 0;\n  }\n\n  /* Set core body defaults */\n  body {\n    min-height: 100vh;\n    scroll-behavior: smooth;\n    text-rendering: optimizeSpeed;\n    line-height: 1.5;\n  }\n\n  /* Remove list styles on ul, ol elements with a class attribute */\n  ul[class],\n  ol[class] {\n    list-style: none;\n  }\n\n  /* A elements that don't have a class get default styles */\n  a:not([class]) {\n    text-decoration-skip-ink: auto;\n  }\n\n  /* Make images easier to work with */\n  img {\n    max-width: 100%;\n    display: block;\n  }\n\n  /* Natural flow and rhythm in articles by default */\n  article > * + * {\n    margin-top: 1em;\n  }\n\n  /* Inherit fonts for inputs and buttons */\n  input,\n  button,\n  textarea,\n  select {\n    font: inherit;\n  }\n\n  /* Blur images when they have no alt attribute */\n  img:not([alt]) {\n    filter: blur(10px);\n  }\n\n  /* Remove all animations and transitions for people that prefer not to see them */\n  @media (prefers-reduced-motion: reduce) {\n    * {\n      animation-duration: 0.01ms !important;\n      animation-iteration-count: 1 !important;\n      transition-duration: 0.01ms !important;\n      scroll-behavior: auto !important;\n    }\n  }\n",
        ])
        return (
          (reset_styles_templateObject = function _templateObject() {
            return data
          }),
          data
        )
      }
      var reset_styles = Object(emotion_react_browser_esm.b)(
        reset_styles_templateObject(),
      )
      function globalStyles_templateObject() {
        var data = (function globalStyles_taggedTemplateLiteral(strings, raw) {
          raw || (raw = strings.slice(0))
          return Object.freeze(
            Object.defineProperties(strings, {
              raw: { value: Object.freeze(raw) },
            }),
          )
        })([
          "\n      @font-face {\n        font-family: 'Uber Move Text Regular';\n        font-style: normal;\n        font-weight: normal;\n        src: url('/static/fonts/move/uberMoveText.regular.woff');\n      }\n\n      @font-face {\n        font-family: 'Uber Move Text Medium';\n        font-style: normal;\n        font-weight: normal;\n        src: url('/static/fonts/move/uberMoveText.medium.woff');\n      }\n\n      @font-face {\n        font-family: 'Uber Move Regular';\n        font-style: normal;\n        font-weight: normal;\n        src: url('/static/fonts/move/uberMove.regular.woff');\n      }\n\n      @font-face {\n        font-family: 'Uber Move Medium';\n        font-style: normal;\n        font-weight: normal;\n        src: url('/static/fonts/move/uberMove.medium.woff');\n      }\n    ",
        ])
        return (
          (globalStyles_templateObject = function _templateObject() {
            return data
          }),
          data
        )
      }
      var globalStyles_GlobalStyles = function GlobalStyles() {
        return Object(jsx_runtime.jsx)(emotion_react_browser_esm.a, {
          styles: [
            reset_styles,
            Object(emotion_react_browser_esm.b)(globalStyles_templateObject()),
            mq(html_styles),
          ],
        })
      }
      globalStyles_GlobalStyles.displayName = 'GlobalStyles'
      var render = function render(f) {
          return f()
        },
        stories_Button = __webpack_require__(88),
        frame_stories_Template =
          ((__webpack_exports__.default = {
            title: 'EFrames/Frame',
            component: stories_Button.a,
            argTypes: { backgroundColor: { control: 'color' } },
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(
              stories_Button.a,
              Object.assign({}, args),
            )
          })
      frame_stories_Template.displayName = 'Template'
      var Primary = frame_stories_Template.bind({})
      Primary.args = { primary: !0, label: 'Button' }
      var Secondary = frame_stories_Template.bind({})
      Secondary.args = { label: 'Button' }
      var Large = frame_stories_Template.bind({})
      Large.args = { size: 'large', label: 'Button' }
      var Small = frame_stories_Template.bind({})
      ;(Small.args = { size: 'small', label: 'Button' }),
        (Primary.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Primary.parameters,
        )),
        (Secondary.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Secondary.parameters,
        )),
        (Large.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Large.parameters,
        )),
        (Small.parameters = Object.assign(
          { storySource: { source: 'args => <Button {...args} />' } },
          Small.parameters,
        ))
    },
    1526: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'LoggedIn', function () {
          return LoggedIn
        }),
        __webpack_require__.d(__webpack_exports__, 'LoggedOut', function () {
          return LoggedOut
        })
      __webpack_require__(139), __webpack_require__(4)
      var jsx_runtime = __webpack_require__(2),
        prop_types = (__webpack_require__(0), __webpack_require__(1)),
        prop_types_default = __webpack_require__.n(prop_types),
        Header = __webpack_require__(184),
        Page_Page =
          (__webpack_require__(1490),
          function Page(_ref) {
            var user = _ref.user,
              onLogin = _ref.onLogin,
              onLogout = _ref.onLogout,
              onCreateAccount = _ref.onCreateAccount
            return Object(jsx_runtime.jsxs)('article', {
              children: [
                Object(jsx_runtime.jsx)(Header.a, {
                  user: user,
                  onLogin: onLogin,
                  onLogout: onLogout,
                  onCreateAccount: onCreateAccount,
                }),
                Object(jsx_runtime.jsxs)('section', {
                  children: [
                    Object(jsx_runtime.jsx)('h2', {
                      children: 'Pages in Storybook',
                    }),
                    Object(jsx_runtime.jsxs)('p', {
                      children: [
                        'We recommend building UIs with a',
                        ' ',
                        Object(jsx_runtime.jsx)('a', {
                          href: 'https://componentdriven.org',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          children: Object(jsx_runtime.jsx)('strong', {
                            children: 'component-driven',
                          }),
                        }),
                        ' ',
                        'process starting with atomic components and ending with pages.',
                      ],
                    }),
                    Object(jsx_runtime.jsx)('p', {
                      children:
                        'Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:',
                    }),
                    Object(jsx_runtime.jsxs)('ul', {
                      children: [
                        Object(jsx_runtime.jsx)('li', {
                          children:
                            'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories',
                        }),
                        Object(jsx_runtime.jsx)('li', {
                          children:
                            'Assemble data in the page component from your services. You can mock these services out using Storybook.',
                        }),
                      ],
                    }),
                    Object(jsx_runtime.jsxs)('p', {
                      children: [
                        'Get a guided tutorial on component-driven development at',
                        ' ',
                        Object(jsx_runtime.jsx)('a', {
                          href: 'https://www.learnstorybook.com',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          children: 'Learn Storybook',
                        }),
                        '. Read more in the',
                        ' ',
                        Object(jsx_runtime.jsx)('a', {
                          href: 'https://storybook.js.org/docs',
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          children: 'docs',
                        }),
                        '.',
                      ],
                    }),
                    Object(jsx_runtime.jsxs)('div', {
                      className: 'tip-wrapper',
                      children: [
                        Object(jsx_runtime.jsx)('span', {
                          className: 'tip',
                          children: 'Tip',
                        }),
                        ' Adjust the width of the canvas with the',
                        ' ',
                        Object(jsx_runtime.jsx)('svg', {
                          width: '10',
                          height: '10',
                          viewBox: '0 0 12 12',
                          xmlns: 'http://www.w3.org/2000/svg',
                          children: Object(jsx_runtime.jsx)('g', {
                            fill: 'none',
                            fillRule: 'evenodd',
                            children: Object(jsx_runtime.jsx)('path', {
                              d:
                                'M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z',
                              id: 'a',
                              fill: '#999',
                            }),
                          }),
                        }),
                        'Viewports addon in the toolbar',
                      ],
                    }),
                  ],
                }),
              ],
            })
          })
      ;(Page_Page.displayName = 'Page'),
        (Page_Page.propTypes = {
          user: prop_types_default.a.shape({}),
          onLogin: prop_types_default.a.func.isRequired,
          onLogout: prop_types_default.a.func.isRequired,
          onCreateAccount: prop_types_default.a.func.isRequired,
        }),
        (Page_Page.defaultProps = { user: null }),
        (Page_Page.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'Page',
          props: {
            user: {
              defaultValue: { value: 'null', computed: !1 },
              type: { name: 'shape', value: {} },
              required: !1,
              description: '',
            },
            onLogin: { type: { name: 'func' }, required: !0, description: '' },
            onLogout: { type: { name: 'func' }, required: !0, description: '' },
            onCreateAccount: {
              type: { name: 'func' },
              required: !0,
              description: '',
            },
          },
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/Page.js'] = {
            name: 'Page',
            docgenInfo: Page_Page.__docgenInfo,
            path: 'stories/Page.js',
          })
      var Header_stories = __webpack_require__(256),
        Page_stories_Template =
          ((__webpack_exports__.default = {
            title: 'Example/Page',
            component: Page_Page,
          }),
          function Template(args) {
            return Object(jsx_runtime.jsx)(Page_Page, Object.assign({}, args))
          })
      Page_stories_Template.displayName = 'Template'
      var LoggedIn = Page_stories_Template.bind({})
      LoggedIn.args = Object.assign({}, Header_stories.LoggedIn.args)
      var LoggedOut = Page_stories_Template.bind({})
      ;(LoggedOut.args = Object.assign({}, Header_stories.LoggedOut.args)),
        (LoggedIn.parameters = Object.assign(
          { storySource: { source: 'args => <Page {...args} />' } },
          LoggedIn.parameters,
        )),
        (LoggedOut.parameters = Object.assign(
          { storySource: { source: 'args => <Page {...args} />' } },
          LoggedOut.parameters,
        ))
    },
    184: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return Header
      })
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          2,
        ),
        prop_types__WEBPACK_IMPORTED_MODULE_2__ =
          (__webpack_require__(0), __webpack_require__(1)),
        prop_types__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          prop_types__WEBPACK_IMPORTED_MODULE_2__,
        ),
        _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(88),
        Header =
          (__webpack_require__(1488),
          function Header(_ref) {
            var user = _ref.user,
              onLogin = _ref.onLogin,
              onLogout = _ref.onLogout,
              onCreateAccount = _ref.onCreateAccount
            return Object(
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
            )('header', {
              children: Object(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs,
              )('div', {
                className: 'wrapper',
                children: [
                  Object(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs,
                  )('div', {
                    children: [
                      Object(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                      )('svg', {
                        width: '32',
                        height: '32',
                        viewBox: '0 0 32 32',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: Object(
                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs,
                        )('g', {
                          fill: 'none',
                          fillRule: 'evenodd',
                          children: [
                            Object(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                            )('path', {
                              d:
                                'M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z',
                              fill: '#FFF',
                            }),
                            Object(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                            )('path', {
                              d:
                                'M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z',
                              fill: '#555AB9',
                            }),
                            Object(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                            )('path', {
                              d:
                                'M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z',
                              fill: '#91BAF8',
                            }),
                          ],
                        }),
                      }),
                      Object(
                        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                      )('h1', { children: 'Acme' }),
                    ],
                  }),
                  Object(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                  )('div', {
                    children: user
                      ? Object(
                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                        )(_Button__WEBPACK_IMPORTED_MODULE_3__.a, {
                          size: 'small',
                          onClick: onLogout,
                          label: 'Log out',
                        })
                      : Object(
                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs,
                        )(
                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                          {
                            children: [
                              Object(
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                              )(_Button__WEBPACK_IMPORTED_MODULE_3__.a, {
                                size: 'small',
                                onClick: onLogin,
                                label: 'Log in',
                              }),
                              Object(
                                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx,
                              )(_Button__WEBPACK_IMPORTED_MODULE_3__.a, {
                                primary: !0,
                                size: 'small',
                                onClick: onCreateAccount,
                                label: 'Sign up',
                              }),
                            ],
                          },
                        ),
                  }),
                ],
              }),
            })
          })
      ;(Header.displayName = 'Header'),
        (Header.propTypes = {
          user: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({}),
          onLogin:
            prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
          onLogout:
            prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
          onCreateAccount:
            prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,
        }),
        (Header.defaultProps = { user: null }),
        (Header.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'Header',
          props: {
            user: {
              defaultValue: { value: 'null', computed: !1 },
              type: { name: 'shape', value: {} },
              required: !1,
              description: '',
            },
            onLogin: { type: { name: 'func' }, required: !0, description: '' },
            onLogout: { type: { name: 'func' }, required: !0, description: '' },
            onCreateAccount: {
              type: { name: 'func' },
              required: !0,
              description: '',
            },
          },
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/Header.js'] = {
            name: 'Header',
            docgenInfo: Header.__docgenInfo,
            path: 'stories/Header.js',
          })
    },
    256: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'LoggedIn', function () {
          return LoggedIn
        }),
        __webpack_require__.d(__webpack_exports__, 'LoggedOut', function () {
          return LoggedOut
        })
      __webpack_require__(139), __webpack_require__(4)
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          2,
        ),
        _Header__WEBPACK_IMPORTED_MODULE_4__ =
          (__webpack_require__(0), __webpack_require__(184))
      __webpack_exports__.default = {
        title: 'Example/Header',
        component: _Header__WEBPACK_IMPORTED_MODULE_4__.a,
      }
      var Template = function Template(args) {
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(
          _Header__WEBPACK_IMPORTED_MODULE_4__.a,
          Object.assign({}, args),
        )
      }
      Template.displayName = 'Template'
      var LoggedIn = Template.bind({})
      LoggedIn.args = { user: {} }
      var LoggedOut = Template.bind({})
      ;(LoggedOut.args = {}),
        (LoggedIn.parameters = Object.assign(
          { storySource: { source: 'args => <Header {...args} />' } },
          LoggedIn.parameters,
        )),
        (LoggedOut.parameters = Object.assign(
          { storySource: { source: 'args => <Header {...args} />' } },
          LoggedOut.parameters,
        ))
    },
    602: function (module, exports, __webpack_require__) {
      'use strict'
      __webpack_require__(36)
      var _interopRequireDefault = __webpack_require__(44)
      Object.defineProperty(exports, '__esModule', { value: !0 }),
        Object.defineProperty(exports, 'dealWithIt', {
          enumerable: !0,
          get: function get() {
            return _dealWithIt.default
          },
        })
      var _dealWithIt = _interopRequireDefault(__webpack_require__(1493))
    },
    610: function (module, exports, __webpack_require__) {
      __webpack_require__(611),
        __webpack_require__(915),
        __webpack_require__(916),
        __webpack_require__(1124),
        __webpack_require__(1418),
        __webpack_require__(1452),
        __webpack_require__(1457),
        __webpack_require__(1469),
        __webpack_require__(1471),
        __webpack_require__(1476),
        __webpack_require__(1478),
        (module.exports = __webpack_require__(1482))
    },
    738: function (module, exports) {},
    786: function (module, exports) {},
    843: function (module, exports) {},
    864: function (module, exports) {},
    88: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.d(__webpack_exports__, 'a', function () {
        return Button
      })
      __webpack_require__(13),
        __webpack_require__(54),
        __webpack_require__(4),
        __webpack_require__(7)
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          2,
        ),
        prop_types__WEBPACK_IMPORTED_MODULE_6__ =
          (__webpack_require__(0), __webpack_require__(1)),
        prop_types__WEBPACK_IMPORTED_MODULE_6___default = __webpack_require__.n(
          prop_types__WEBPACK_IMPORTED_MODULE_6__,
        )
      __webpack_require__(1486)
      function _objectWithoutProperties(source, excluded) {
        if (null == source) return {}
        var key,
          i,
          target = (function _objectWithoutPropertiesLoose(source, excluded) {
            if (null == source) return {}
            var key,
              i,
              target = {},
              sourceKeys = Object.keys(source)
            for (i = 0; i < sourceKeys.length; i++)
              (key = sourceKeys[i]),
                excluded.indexOf(key) >= 0 || (target[key] = source[key])
            return target
          })(source, excluded)
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
          for (i = 0; i < sourceSymbolKeys.length; i++)
            (key = sourceSymbolKeys[i]),
              excluded.indexOf(key) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(source, key) &&
                  (target[key] = source[key]))
        }
        return target
      }
      var Button = function Button(_ref) {
        var primary = _ref.primary,
          backgroundColor = _ref.backgroundColor,
          size = _ref.size,
          label = _ref.label,
          props = _objectWithoutProperties(_ref, [
            'primary',
            'backgroundColor',
            'size',
            'label',
          ]),
          mode = primary
            ? 'storybook-button--primary'
            : 'storybook-button--secondary'
        return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(
          'button',
          Object.assign(
            {
              type: 'button',
              className: [
                'storybook-button',
                'storybook-button--'.concat(size),
                mode,
              ].join(' '),
              style: backgroundColor && { backgroundColor: backgroundColor },
            },
            props,
            { children: label },
          ),
        )
      }
      ;(Button.displayName = 'Button'),
        (Button.propTypes = {
          primary: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.bool,
          backgroundColor:
            prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
          size: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.oneOf([
            'small',
            'medium',
            'large',
          ]),
          label:
            prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,
          onClick: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func,
        }),
        (Button.defaultProps = {
          backgroundColor: null,
          primary: !1,
          size: 'medium',
          onClick: void 0,
        }),
        (Button.__docgenInfo = {
          description: 'Primary UI component for user interaction',
          methods: [],
          displayName: 'Button',
          props: {
            backgroundColor: {
              defaultValue: { value: 'null', computed: !1 },
              type: { name: 'string' },
              required: !1,
              description: 'What background color to use',
            },
            primary: {
              defaultValue: { value: 'false', computed: !1 },
              type: { name: 'bool' },
              required: !1,
              description: 'Is this the principal call to action on the page?',
            },
            size: {
              defaultValue: { value: "'medium'", computed: !1 },
              type: {
                name: 'enum',
                value: [
                  { value: "'small'", computed: !1 },
                  { value: "'medium'", computed: !1 },
                  { value: "'large'", computed: !1 },
                ],
              },
              required: !1,
              description: 'How large should the button be?',
            },
            onClick: {
              defaultValue: { value: 'undefined', computed: !0 },
              type: { name: 'func' },
              required: !1,
              description: 'Optional click handler',
            },
            label: {
              type: { name: 'string' },
              required: !0,
              description: 'Button contents',
            },
          },
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/Button.js'] = {
            name: 'Button',
            docgenInfo: Button.__docgenInfo,
            path: 'stories/Button.js',
          })
    },
    916: function (module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__)
      __webpack_require__(441)
    },
  },
  [[610, 1, 2]],
])
//# sourceMappingURL=main.63916ef409c49f81f238.bundle.js.map
