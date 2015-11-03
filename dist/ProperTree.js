var ProperTree =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _componentsTree = __webpack_require__(1);

	var _componentsTree2 = _interopRequireDefault(_componentsTree);

	__webpack_require__(12);

	exports["default"] = _componentsTree2["default"];
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "ProperTree.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _equals = __webpack_require__(5);

	var _equals2 = _interopRequireDefault(_equals);

	var _node = __webpack_require__(7);

	var _node2 = _interopRequireDefault(_node);

	var _renderer = __webpack_require__(9);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _reactFontawesome = __webpack_require__(8);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _iconRenderer = __webpack_require__(10);

	var _iconRenderer2 = _interopRequireDefault(_iconRenderer);

	var iterations = 0;

	function pathTo(data, node) {
		var path = [];
		var citem = undefined;

		if (!node) {
			return path;
		}

		citem = node;
		path.push(citem._properId);

		while (citem._parent) {
			path.push(citem._properId);
			citem = _underscore2["default"].findWhere(data, { _properId: citem._parent });
		}

		return _underscore2["default"].uniq(path);
	}

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "tree",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				itemRenderer: _renderer2["default"],
				selectable: 'recursive',
				emptyMsg: 'No data found',
				idField: 'id',
				parentField: 'parent_id',
				displayField: 'label',
				collapsable: true,
				uniqueId: _underscore2["default"].uniqueId('propertree-'),
				defaultSelected: [],
				defaultExpanded: [],
				iconRenderer: _iconRenderer2["default"],
				onSelect: null,
				disabled: []
			};
		},

		getInitialState: function getInitialState() {
			return {
				rawdata: null,
				mounted: false,
				tree_data: null,
				selected: _underscore2["default"].clone(this.props.defaultSelected) || [],
				expanded: _underscore2["default"].clone(this.props.defaultExpanded) || []
			};
		},

		componentDidMount: function componentDidMount() {
			if (!this.state.mounted) {
				this.buildTree(this.props.data);
			}

			if (this.state.selected) {
				this.handleSelect(this.props.defaultSelected);
			}

			this.setState({
				mounted: true
			});
		},

		componentDidUpdate: function componentDidUpdate() {
			if (this.rebuildTree) {
				this.buildTree();
				this.rebuildTree = false;
			}
		},

		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			this.rebuildTree = this.rebuildTree || !(0, _equals2["default"])(nextProps.data, this.props.data);

			return true;
		},

		buildTree: function buildTree() {
			var _this = this;

			var data = arguments.length <= 0 || arguments[0] === undefined ? this.props.data : arguments[0];

			var raw = _underscore2["default"].values(_jquery2["default"].extend(true, [], data));
			var tree_data = null;
			var expandedPaths = [];

			raw = _underscore2["default"].map(raw, function (item) {
				item._properId = item[_this.props.idField];
				item._parent = item[_this.props.parentField];
				item._selected = _this.state.selected.indexOf(item._properId) >= 0;
				item._label = item[_this.props.displayField];
				item._collapsed = true && _this.props.collapsable;

				return item;
			});

			_underscore2["default"].each(this.state.expanded, function (item) {
				var path = pathTo(raw, _underscore2["default"].findWhere(raw, { _properId: item }));

				expandedPaths.push.apply(expandedPaths, path);
			});

			expandedPaths = _underscore2["default"].uniq(expandedPaths);

			raw = _underscore2["default"].map(raw, function (item) {
				if (expandedPaths.indexOf(item._properId) >= 0) {
					item._collapsed = false;
				}

				return item;
			});

			tree_data = this.buildTreeData(raw);

			this.setState({
				expanded: expandedPaths,
				rawdata: raw,
				tree_data: tree_data
			});
		},

		buildTreeData: function buildTreeData(tree) {
			var _this2 = this;

			var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
			var grouped = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

			var result = [];
			var findcond = {};
			var branch = [];

			if (!grouped) {
				grouped = _underscore2["default"].groupBy(tree, this.props.parentField);
			}

			if (parent) {
				branch = grouped[parent];
			} else {
				branch = grouped['null'];
			}

			if (branch && branch.length) {
				result = _underscore2["default"].map(branch, function (leaf) {
					var children = _this2.buildTreeData(tree, leaf[_this2.props.idField], grouped);
					var item = _underscore2["default"].clone(leaf);

					item.disabled = false;

					if (children.length) {
						item.children = children;
					}

					if (_underscore2["default"].indexOf(_this2.props.disabled, leaf[_this2.props.idField]) >= 0) {
						item.disabled = true;
					}

					return item;
				});
			}

			return result;
		},

		handleSelect: function handleSelect(selection) {
			this.rebuildTree = true;
			this.triggerSelect(selection);
			this.setState({
				selected: selection
			});
		},

		triggerSelect: function triggerSelect(selection) {
			var _this3 = this;

			var selectedNodes = [];
			var findCond = {};

			if (typeof this.props.onSelect === 'function') {
				selectedNodes = _underscore2["default"].map(selection, function (id) {
					findCond[_this3.props.idField] = id;
					return _underscore2["default"].findWhere(_this3.props.data, findCond);
				});

				this.props.onSelect(selectedNodes);
			}
		},

		renderNodes: function renderNodes(data) {
			var _this4 = this;

			var result = [];
			var Renderer = this.props.itemRenderer;

			result = _underscore2["default"].map(data, function (item) {
				var children = [];

				if (typeof item.children != 'undefined' && item.children.length) {
					children = _this4.renderNodes(item.children);
				}

				return _reactAddons2["default"].createElement(
					_node2["default"],
					{
						collapsed: item._collapsed,
						renderer: Renderer,
						key: 'propertree-node-' + item[_this4.props.idField],
						data: item,
						selectable: _this4.props.selectable,
						selected: item._selected,
						selection: _underscore2["default"].clone(_this4.state.selected),
						onSelect: _this4.handleSelect,
						iconRenderer: _this4.props.iconRenderer
					},
					children
				);
			});

			return result;
		},

		render: function render() {
			var content = _reactAddons2["default"].createElement(
				"div",
				{ className: "preloading" },
				_reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "spinner", spin: true, size: "2x" })
			);
			var nodes = [];

			if (this.state.mounted) {
				if (!this.state.tree_data || !this.state.tree_data.length) {
					content = _reactAddons2["default"].createElement(
						"p",
						{ className: "emptymsg muted text-muted" },
						this.props.emptyMsg
					);
				} else {

					nodes = this.renderNodes(this.state.tree_data);
					content = _reactAddons2["default"].createElement(
						"div",
						{ className: "propertree-container" },
						_reactAddons2["default"].createElement(
							"ul",
							{ className: "propertree-branch root" },
							nodes
						)
					);
				}
			}

			return _reactAddons2["default"].createElement(
				"div",
				{ className: "propertree", id: this.props.uniqueId },
				content
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "tree.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = $;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var type = __webpack_require__(6)

	// (any, any, [array]) -> boolean
	function equal(a, b, memos){
	  // All identical values are equivalent
	  if (a === b) return true
	  var fnA = types[type(a)]
	  var fnB = types[type(b)]
	  return fnA && fnA === fnB
	    ? fnA(a, b, memos)
	    : false
	}

	var types = {}

	// (Number) -> boolean
	types.number = function(a, b){
	  return a !== a && b !== b/*Nan check*/
	}

	// (function, function, array) -> boolean
	types['function'] = function(a, b, memos){
	  return a.toString() === b.toString()
	    // Functions can act as objects
	    && types.object(a, b, memos)
	    && equal(a.prototype, b.prototype)
	}

	// (date, date) -> boolean
	types.date = function(a, b){
	  return +a === +b
	}

	// (regexp, regexp) -> boolean
	types.regexp = function(a, b){
	  return a.toString() === b.toString()
	}

	// (DOMElement, DOMElement) -> boolean
	types.element = function(a, b){
	  return a.outerHTML === b.outerHTML
	}

	// (textnode, textnode) -> boolean
	types.textnode = function(a, b){
	  return a.textContent === b.textContent
	}

	// decorate `fn` to prevent it re-checking objects
	// (function) -> function
	function memoGaurd(fn){
	  return function(a, b, memos){
	    if (!memos) return fn(a, b, [])
	    var i = memos.length, memo
	    while (memo = memos[--i]) {
	      if (memo[0] === a && memo[1] === b) return true
	    }
	    return fn(a, b, memos)
	  }
	}

	types['arguments'] =
	types['bit-array'] =
	types.array = memoGaurd(arrayEqual)

	// (array, array, array) -> boolean
	function arrayEqual(a, b, memos){
	  var i = a.length
	  if (i !== b.length) return false
	  memos.push([a, b])
	  while (i--) {
	    if (!equal(a[i], b[i], memos)) return false
	  }
	  return true
	}

	types.object = memoGaurd(objectEqual)

	// (object, object, array) -> boolean
	function objectEqual(a, b, memos) {
	  if (typeof a.equal == 'function') {
	    memos.push([a, b])
	    return a.equal(b, memos)
	  }
	  var ka = getEnumerableProperties(a)
	  var kb = getEnumerableProperties(b)
	  var i = ka.length

	  // same number of properties
	  if (i !== kb.length) return false

	  // although not necessarily the same order
	  ka.sort()
	  kb.sort()

	  // cheap key test
	  while (i--) if (ka[i] !== kb[i]) return false

	  // remember
	  memos.push([a, b])

	  // iterate again this time doing a thorough check
	  i = ka.length
	  while (i--) {
	    var key = ka[i]
	    if (!equal(a[key], b[key], memos)) return false
	  }

	  return true
	}

	// (object) -> array
	function getEnumerableProperties (object) {
	  var result = []
	  for (var k in object) if (k !== 'constructor') {
	    result.push(k)
	  }
	  return result
	}

	module.exports = equal


/***/ },
/* 6 */
/***/ function(module, exports) {

	var toString = {}.toString
	var DomNode = typeof window != 'undefined'
	  ? window.Node
	  : Function // could be any function

	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */

	module.exports = exports = function type(x){
	  var type = typeof x
	  if (type != 'object') return type
	  type = types[toString.call(x)]
	  if (type == 'object') {
	    // in case they have been polyfilled
	    if (x instanceof Map) return 'map'
	    if (x instanceof Set) return 'set'
	    return 'object'
	  }
	  if (type) return type
	  if (x instanceof DomNode) switch (x.nodeType) {
	    case 1:  return 'element'
	    case 3:  return 'text-node'
	    case 9:  return 'document'
	    case 11: return 'document-fragment'
	    default: return 'dom-node'
	  }
	}

	var types = exports.types = {
	  '[object Function]': 'function',
	  '[object Date]': 'date',
	  '[object RegExp]': 'regexp',
	  '[object Arguments]': 'arguments',
	  '[object Array]': 'array',
	  '[object Set]': 'set',
	  '[object String]': 'string',
	  '[object Null]': 'null',
	  '[object Undefined]': 'undefined',
	  '[object Number]': 'number',
	  '[object Boolean]': 'boolean',
	  '[object Object]': 'object',
	  '[object Map]': 'map',
	  '[object Text]': 'text-node',
	  '[object Uint8Array]': 'bit-array',
	  '[object Uint16Array]': 'bit-array',
	  '[object Uint32Array]': 'bit-array',
	  '[object Uint8ClampedArray]': 'bit-array',
	  '[object Error]': 'error',
	  '[object FormData]': 'form-data',
	  '[object File]': 'file',
	  '[object Blob]': 'blob'
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _reactFontawesome = __webpack_require__(8);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _renderer = __webpack_require__(9);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _selectors = __webpack_require__(11);

	var _selectors2 = _interopRequireDefault(_selectors);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "node",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				renderer: _renderer2["default"],
				collapsable: true,
				collapsed: true,
				onCollapseToggle: null,
				selectable: 'recursive',
				selected: false,
				onSelect: null,
				selection: []
			};
		},

		getInitialState: function getInitialState() {
			return {
				collapsed: this.props.collapsed
			};
		},

		handleTogglerClick: function handleTogglerClick(e) {
			e.preventDefault();

			this.setState({ 'collapsed': !this.state.collapsed });
		},

		handleSelect: function handleSelect(selection) {
			if (typeof this.props.onSelect == 'function' && !this.props.data.disabled) {
				this.props.onSelect(selection);
			}
		},

		render: function render() {
			var has_children = !!this.props.children.length;
			var children = null;
			var toggler = null;
			var Renderer = this.props.renderer;
			var collapsedClass = 'collapsed';
			var togglerIcon = _reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "caret-right", fixedWidth: true });
			var selectors = null;
			var disabledClass = '';

			if (!this.state.collapsed || !this.props.data._parent) {
				collapsedClass = 'expanded';
				togglerIcon = _reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "caret-down", fixedWidth: true });
			}

			if (this.props.data.disabled) {
				disabledClass = 'disabled';
			}

			if (has_children) {
				if (this.props.data._parent) {
					toggler = _reactAddons2["default"].createElement(
						"a",
						{ href: "#", onClick: this.handleTogglerClick, className: "propertree-toggler" },
						togglerIcon
					);
				}

				if (!this.state.collapsed || !this.props.data._parent) {
					children = _reactAddons2["default"].createElement(
						"div",
						{ className: "propertree-node-children" },
						_reactAddons2["default"].createElement(
							"ul",
							{ className: "propertree-branch subtree" },
							this.props.children
						)
					);
				}
			}

			if (this.props.selectable && !this.props.data.disabled) {
				selectors = _reactAddons2["default"].createElement(_selectors2["default"], _extends({}, this.props, { key: "node-" + this.props.data._properId + '-selectors', onSelect: this.handleSelect }));
			}

			return _reactAddons2["default"].createElement(
				"li",
				{ className: "propertree-node node-" + this.props.data._properId + ' ' + collapsedClass + ' ' + disabledClass },
				toggler,
				selectors,
				_reactAddons2["default"].createElement(Renderer, { data: this.props.data, has_children: has_children, selectable: this.props.selectable, selection: this.props.selection, onSelect: this.handleSelect }),
				children
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "node.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	/**
	 * A React component for the font-awesome icon library.
	 *
	 *
	 * @param {Boolean} [border=false] Whether or not to show a border radius
	 * @param {String} [className] An extra set of CSS classes to add to the component
	 * @param {Boolean} [fixedWidth=false] Make buttons fixed width
	 * @param {String} [flip=false] Flip the icon's orientation.
	 * @param {Boolean} [inverse=false]Inverse the icon's color
	 * @param {String} name Name of the icon to use
	 * @param {Boolean} [pulse=false] Rotate icon with 8 steps (rather than smoothly)
	 * @param {Number} [rotate] The degress to rotate the icon by
	 * @param {String} [size] The icon scaling size
	 * @param {Boolean} [spin=false] Spin the icon
	 * @param {String} [stack] Stack an icon on top of another
	 * @module FontAwesome
	 * @type {ReactClass}
	 */
	exports['default'] = _react2['default'].createClass({

	  displayName: 'FontAwesome',

	  propTypes: {
	    border: _react2['default'].PropTypes.bool,
	    className: _react2['default'].PropTypes.string,
	    fixedWidth: _react2['default'].PropTypes.bool,
	    flip: _react2['default'].PropTypes.oneOf(['horizontal', 'vertical']),
	    inverse: _react2['default'].PropTypes.bool,
	    name: _react2['default'].PropTypes.string.isRequired,
	    pulse: _react2['default'].PropTypes.bool,
	    rotate: _react2['default'].PropTypes.oneOf([90, 180, 270]),
	    size: _react2['default'].PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
	    spin: _react2['default'].PropTypes.bool,
	    stack: _react2['default'].PropTypes.oneOf(['1x', '2x'])
	  },

	  render: function render() {
	    var className = 'fa fa-' + this.props.name;

	    if (this.props.size) {
	      className += ' fa-' + this.props.size;
	    }

	    if (this.props.spin) {
	      className += ' fa-spin';
	    }

	    if (this.props.pulse) {
	      className += ' fa-pulse';
	    }

	    if (this.props.border) {
	      className += ' fa-border';
	    }

	    if (this.props.fixedWidth) {
	      className += ' fa-fw';
	    }

	    if (this.props.inverse) {
	      className += ' fa-inverse';
	    }

	    if (this.props.flip) {
	      className += ' fa-flip-' + this.props.flip;
	    }

	    if (this.props.rotate) {
	      className += ' fa-rotate-' + this.props.rotate;
	    }

	    if (this.props.stack) {
	      className += ' fa-stack-' + this.props.stack;
	    }

	    if (this.props.className) {
	      className += ' ' + this.props.className;
	    }

	    return _react2['default'].createElement('span', _extends({}, this.props, {
	      className: className
	    }));
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _reactFontawesome = __webpack_require__(8);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _iconRenderer = __webpack_require__(10);

	var _iconRenderer2 = _interopRequireDefault(_iconRenderer);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "renderer",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				has_children: false,
				iconRenderer: _iconRenderer2["default"],
				selectable: 'recursive',
				selection: [],
				onSelect: null
			};
		},

		handleSelection: function handleSelection(e) {
			e.stopPropagation();

			if (this.props.selectable == 'single') {
				var selection = this.getCurrentSelection() || [];

				if (this.props.selected) {
					selection = _underscore2["default"].without(selection, this.props.data._properId);

					if (this.props.selectable == 'single') {
						selection = [];
					}
				} else {
					selection.push(this.props.data._properId);

					if (this.props.selectable == 'single') {
						selection = [this.props.data._properId];
					}
				}

				if (this.props.selectable == 'single') {
					e.preventDefault();
				}

				selection = _underscore2["default"].uniq(selection);
				this.triggerSelect(selection);
			}
		},

		triggerSelect: function triggerSelect() {
			var selection = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			if (typeof this.props.onSelect == 'function') {
				this.props.onSelect(selection);
			}
		},

		getCurrentSelection: function getCurrentSelection() {
			var data = arguments.length <= 0 || arguments[0] === undefined ? this.props.data : arguments[0];
			var selection = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			return _underscore2["default"].clone(this.props.selection);
		},

		render: function render() {
			return _reactAddons2["default"].createElement(
				"div",
				{ className: "propertree-node-desc", onClick: this.handleSelection },
				_reactAddons2["default"].createElement("div", { className: "propertree-node-bg" }),
				_reactAddons2["default"].createElement(this.props.iconRenderer, this.props),
				_reactAddons2["default"].createElement(
					"span",
					{ className: "propertree-node-name" },
					this.props.data._label
				)
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "renderer.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _reactFontawesome = __webpack_require__(8);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "iconRenderer",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				has_children: false
			};
		},

		render: function render() {
			var icon = 'file-o';

			if (this.props.has_children) {
				icon = 'folder-open';
			}

			return _reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: icon, fixedWidth: true });
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "iconRenderer.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _reactFontawesome = __webpack_require__(8);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _equals = __webpack_require__(5);

	var _equals2 = _interopRequireDefault(_equals);

	function getDescendants(data) {
		var inmediate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
		var descendants = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

		if (_underscore2["default"].isArray(data.children) && data.children.length) {
			descendants.push.apply(descendants, _underscore2["default"].pluck(data.children, '_properId'));

			if (!inmediate) {
				_underscore2["default"].each(data.children, function (child) {
					getDescendants(child, inmediate, descendants);
				});
			}
		}

		return descendants;
	}

	function clearSelection() {
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		} else if (window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
		}
	}

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "selectors",

		mixins: [_reactAddons2["default"].addons.PureRenderMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				selected: false,
				selectable: 'recursive',
				onSelect: null,
				selection: []
			};
		},

		getInitialState: function getInitialState() {
			return {
				single: this.props.selected,
				inmediate: false,
				recursive: false
			};
		},

		componentDidMount: function componentDidMount() {
			this.checkSelections();
		},

		componentDidUpdate: function componentDidUpdate() {
			this.checkSelections();
		},

		checkSelections: function checkSelections() {
			var inmediate = this.state.inmediate;
			var recursive = this.state.recursive;
			var included = false;
			var children = [];
			var descendants = [];

			if (this.props.selectable == 'recursive' || this.props.selectable == 'children') {
				descendants = getDescendants(this.props.data, true);
				children = _underscore2["default"].clone(descendants);

				if (this.props.selectable === 'recursive') {
					descendants = getDescendants(this.props.data);
				}
			}

			if (descendants.length) {
				inmediate = _underscore2["default"].intersection(children, this.props.selection).length == children.length;

				if (this.props.selectable == 'recursive') {
					recursive = _underscore2["default"].intersection(descendants, this.props.selection).length == descendants.length;
				}
			}

			this.setState({
				inmediate: inmediate,
				recursive: recursive
			});
		},

		handleSingleSelect: function handleSingleSelect(e) {
			var selection = this.getCurrentSelection() || [];

			if (!this.props.data.disabled) {
				if (this.props.selected) {
					selection = _underscore2["default"].without(selection, this.props.data._properId);

					if (this.props.selectable == 'single') {
						selection = [];
					}
				} else {
					selection.push(this.props.data._properId);

					if (this.props.selectable == 'single') {
						selection = [this.props.data._properId];
					}
				}

				if (this.props.selectable == 'single') {
					e.preventDefault();
				}

				selection = _underscore2["default"].uniq(selection);
				this.triggerSelect(selection);
				clearSelection();

				this.setState({
					single: !this.props.selected
				});
			}
		},

		getCurrentSelection: function getCurrentSelection() {
			return _underscore2["default"].clone(this.props.selection);
		},

		handleChildrenSelect: function handleChildrenSelect() {
			var children = getDescendants(this.props.data, true);
			var inmediate = this.state.inmediate;
			var selection = _underscore2["default"].clone(this.props.selection);
			clearSelection();

			if (this.props.data.disabled) {
				return;
			}

			if (!inmediate) {
				selection.push.apply(selection, children);
				selection = _underscore2["default"].uniq(selection);
				inmediate = true;
			} else {
				selection = _underscore2["default"].without.apply(_underscore2["default"], selection, children);
				inmediate = false;
			}

			this.triggerSelect(selection);

			this.setState({
				inmediate: inmediate
			});
		},

		handleRecursiveSelect: function handleRecursiveSelect() {
			var children = getDescendants(this.props.data);
			var recursive = this.state.recursive;
			var selection = _underscore2["default"].clone(this.props.selection);
			clearSelection();

			if (this.props.data.disabled) {
				return;
			}

			if (!recursive) {
				selection.push.apply(selection, children);
				selection = _underscore2["default"].uniq(selection);
				recursive = true;
			} else {
				selection = _underscore2["default"].without.apply(_underscore2["default"], selection, children);
				recursive = false;
			}

			this.triggerSelect(selection);

			this.setState({
				recursive: recursive,
				inmediate: recursive
			});
		},

		triggerSelect: function triggerSelect() {
			var selection = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

			if (typeof this.props.onSelect == 'function') {
				this.props.onSelect(selection);
			}
		},

		render: function render() {
			var selectors = [];

			if (this.props.selectable != 'single') {
				selectors.push(_reactAddons2["default"].createElement("input", { type: "checkbox", key: "cb-selector", className: "propertree-selector single", checked: this.props.selected, onChange: this.handleSingleSelect }));

				if (_underscore2["default"].isArray(this.props.data.children) && this.props.data.children.length) {
					if (this.props.selectable == 'recursive' || this.props.selectable == 'inmediate') {
						selectors.push(_reactAddons2["default"].createElement(
							"span",
							{ key: "children-selector", className: "propertree-selector children" + (this.state.inmediate ? ' selected' : ''), onClick: this.handleChildrenSelect },
							_reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "long-arrow-down" })
						));
					}

					if (this.props.selectable == 'recursive') {
						selectors.push(_reactAddons2["default"].createElement(
							"span",
							{ key: "hierarchy-selector", className: "propertree-selector recursive" + (this.state.recursive ? ' selected' : ''), onClick: this.handleRecursiveSelect },
							_reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "sort-amount-asc" })
						));
					}
				}

				return _reactAddons2["default"].createElement(
					"div",
					{ className: "propertree-node-selectors" },
					selectors
				);
			} else {
				return _reactAddons2["default"].createElement("a", { href: "#", className: "propertree-single-selector" + (this.props.selected ? ' selected' : ''), onClick: this.handleSingleSelect });
			}
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "selectors.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 12 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);