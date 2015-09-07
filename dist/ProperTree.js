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

	__webpack_require__(9);

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

	var _renderer = __webpack_require__(7);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _reactFontawesome = __webpack_require__(6);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	function pathTo(data, node) {
		var path = [];
		var citem = undefined;

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
				onSelect: null
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
			this.rebuildTree = this.rebuildTree || !_underscore2["default"].isEqual(nextProps.data, this.props.data);

			return true;
		},

		buildTree: function buildTree() {
			var _this = this;

			var data = arguments.length <= 0 || arguments[0] === undefined ? this.props.data : arguments[0];

			var raw = _underscore2["default"].values(_jquery2["default"].extend(true, data, []));
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
						onSelect: _this4.handleSelect
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _reactAddons = __webpack_require__(2);

	var _reactAddons2 = _interopRequireDefault(_reactAddons);

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _reactFontawesome = __webpack_require__(6);

	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

	var _renderer = __webpack_require__(7);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _selectors = __webpack_require__(8);

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
			if (typeof this.props.onSelect == 'function') {
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

			if (!this.state.collapsed || !this.props.data._parent) {
				collapsedClass = 'expanded';
				togglerIcon = _reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: "caret-down", fixedWidth: true });
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

			if (this.props.selectable) {
				selectors = _reactAddons2["default"].createElement(_selectors2["default"], _extends({}, this.props, { key: "node-" + this.props.data._properId + '-selectors', onSelect: this.handleSelect }));
			}

			return _reactAddons2["default"].createElement(
				"li",
				{ className: "propertree-node node-" + this.props.data._properId + ' ' + collapsedClass },
				toggler,
				selectors,
				_reactAddons2["default"].createElement(Renderer, { data: this.props.data, has_children: has_children }),
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
		displayName: "renderer",

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

			return _reactAddons2["default"].createElement(
				"div",
				{ className: "propertree-node-desc" },
				_reactAddons2["default"].createElement("div", { className: "propertree-node-bg" }),
				_reactAddons2["default"].createElement(_reactFontawesome2["default"], { name: icon, fixedWidth: true }),
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
/* 8 */
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

		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			return !_underscore2["default"].isEqual(nextProps, this.props) || !_underscore2["default"].isEqual(nextState, this.state);
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

			console.log('hola hola hola');

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

			console.log(this.props, this.props.selectable);

			if (this.props.selectable == 'single') {
				e.preventDefault();
			}

			selection = _underscore2["default"].uniq(selection);
			this.triggerSelect(selection);
			clearSelection();

			this.setState({
				single: !this.props.selected
			});
		},

		getCurrentSelection: function getCurrentSelection() {
			var data = arguments.length <= 0 || arguments[0] === undefined ? this.props.data : arguments[0];
			var selection = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			return _underscore2["default"].clone(this.props.selection);
		},

		handleChildrenSelect: function handleChildrenSelect() {
			var children = getDescendants(this.props.data, true);
			var inmediate = this.state.inmediate;
			var selection = _underscore2["default"].clone(this.props.selection);
			clearSelection();

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

			console.log(selection);

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
				return _reactAddons2["default"].createElement(
					"a",
					{ href: "#", className: "propertree-single-selector" + (this.props.selected ? ' selected' : ''), onClick: this.handleSingleSelect },
					"hola"
				);
			}
		}
	});
	module.exports = exports["default"];

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/home/agazquez/git/ProperTree/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "selectors.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);