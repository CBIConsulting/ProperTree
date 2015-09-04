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

	__webpack_require__(7);

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

	var _node = __webpack_require__(5);

	var _node2 = _interopRequireDefault(_node);

	var _reactFontawesome = __webpack_require__(6);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "tree",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				itemRenderer: _node2["default"],
				selectable: 'recursive',
				emptyMsg: 'No data found',
				idField: 'id',
				parentField: 'parent_id',
				displayField: 'label',
				uniqueId: _underscore2["default"].uniqueId('propertree-')
			};
		},

		getInitialState: function getInitialState() {
			return {
				rawdata: null,
				mounted: false,
				tree_data: null
			};
		},

		componentDidMount: function componentDidMount() {
			if (!this.state.mounted) {
				this.buildTree(this.props.data);
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
			this.rebuildTree = !_underscore2["default"].isEqual(nextProps.data, this.props.data);

			return true;
		},

		buildTree: function buildTree(data) {
			var _this = this;

			var raw = _underscore2["default"].values(_jquery2["default"].extend(true, data, []));
			var tree_data = null;

			raw = _underscore2["default"].map(raw, function (item) {
				item._properId = item[_this.props.idField];
				item._selected = false;
				item._label = item[_this.props.displayField];

				return item;
			});

			tree_data = this.buildTreeData(raw);

			console.log(raw);

			this.setState({
				rawdata: raw,
				tree_data: tree_data
			});
		},

		buildTreeData: function buildTreeData(tree) {
			var _this2 = this;

			var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			var result = [];
			var findcond = {};
			var branch = [];

			findcond[this.props.parentField] = parent;
			branch = _underscore2["default"].where(tree, findcond);

			if (branch.length) {
				result = _underscore2["default"].map(branch, function (leaf) {
					var children = _this2.buildTreeData(tree, leaf[_this2.props.idField]);
					var item = _underscore2["default"].clone(leaf);

					if (children.length) {
						item.children = children;
					}

					return item;
				});
			}

			return result;
		},

		renderNodes: function renderNodes(data) {
			var _this3 = this;

			var result = [];
			var Renderer = this.props.itemRenderer;

			result = _underscore2["default"].map(data, function (item) {
				var children = [];

				if (typeof item.children != 'undefined' && item.children.length) {
					children = _this3.renderNodes(item.children);
				}

				return _reactAddons2["default"].createElement(
					Renderer,
					{ key: 'propertree-node-' + item[_this3.props.idField], data: item },
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

			if (this.state.mounted) {
				if (!this.state.tree_data || !this.state.tree_data.length) {
					content = _reactAddons2["default"].createElement(
						"p",
						{ className: "emptymsg muted text-muted" },
						this.props.emptyMsg
					);
				} else {
					content = _reactAddons2["default"].createElement(
						"div",
						{ className: "propertree-container" },
						_reactAddons2["default"].createElement(
							"ul",
							{ className: "propertree-branch root" },
							this.renderNodes(this.state.tree_data)
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

	var _reactFontawesome = __webpack_require__(6);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	exports["default"] = _reactAddons2["default"].createClass({
		displayName: "node",

		getDefaultProps: function getDefaultProps() {
			return {
				data: null
			};
		},

		render: function render() {
			var children = null;
			var icon = 'file-o';

			if (this.props.children.length) {
				children = _reactAddons2["default"].createElement(
					"div",
					{ className: "propertree-node-children" },
					_reactAddons2["default"].createElement(
						"ul",
						{ className: "propertree-branch subtree" },
						this.props.children
					)
				);

				icon = 'folder-open';
			}

			return _reactAddons2["default"].createElement(
				"li",
				{ className: "propertree-node node-" + this.props.data._properId },
				_reactAddons2["default"].createElement(
					"div",
					{ className: "propertree-node-desc" },
					_reactAddons2["default"].createElement("div", { className: "propertree-node-bg" }),
					_reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: icon, fixedWidth: true }),
					_reactAddons2["default"].createElement(
						"span",
						{ className: "propertree-node-name" },
						this.props.data._label
					)
				),
				children
			);
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "node.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);