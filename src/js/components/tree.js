import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Node from "./node";
import ItemRenderer from "./renderer";
import Fa from "react-fontawesome";

function pathTo(data, node) {
	let path = [];
	let citem;

	citem = node;
	path.push(citem._properId);

	while(citem._parent) {
		path.push(citem._properId);
		citem = _.findWhere(data, {_properId: citem._parent});
	}

	return _.uniq(path);
}

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			itemRenderer: ItemRenderer,
			selectable: 'recursive',
			emptyMsg: 'No data found',
			idField: 'id',
			parentField: 'parent_id',
			displayField: 'label',
			collapsable: true,
			uniqueId: _.uniqueId('propertree-'),
			defaultSelected: [],
			defaultExpanded: [],
			onSelect: null
		}
	},

	getInitialState() {
		return {
			rawdata: null,
			mounted: false,
			tree_data: null,
			selected: _.clone(this.props.defaultSelected) || [],
			expanded: _.clone(this.props.defaultExpanded) || [],
		}
	},

	componentDidMount() {
		if (!this.state.mounted) {
			this.buildTree(this.props.data);
		}

		this.setState({
			mounted: true
		});
	},

	componentDidUpdate() {
		if (this.rebuildTree) {
			this.buildTree();
			this.rebuildTree = false;
		}
	},

	shouldComponentUpdate(nextProps, nextState) {
		this.rebuildTree = this.rebuildTree || !_.isEqual(nextProps.data, this.props.data);

		return true;
	},

	buildTree(data = this.props.data) {
		let raw = _.values($.extend(true, data, []));
		let tree_data = null;
		let expandedPaths = [];

		raw = _.map(raw, (item) => {
			item._properId = item[this.props.idField];
			item._parent = item[this.props.parentField];
			item._selected = this.state.selected.indexOf(item._properId) >= 0;
			item._label = item[this.props.displayField];
			item._collapsed = true && this.props.collapsable;

			return item;
		});

		_.each(this.state.expanded, (item) => {
			let path = pathTo(raw, _.findWhere(raw, {_properId: item}));

			expandedPaths.push.apply(expandedPaths, path);
		});

		expandedPaths = _.uniq(expandedPaths);

		raw = _.map(raw, (item) => {
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

	buildTreeData(tree, parent = null) {
		let result = [];
		let findcond = {}
		let branch = [];

		findcond[this.props.parentField] = parent;
		branch = _.where(tree, findcond);

		if (branch.length) {
			result = _.map(branch, (leaf) => {
				let children = this.buildTreeData(tree, leaf[this.props.idField]);
				let item = _.clone(leaf);

				if (children.length) {
					item.children = children;
				}

				return item;
			});
		}

		return result;
	},

	handleSelect(selection) {
		this.rebuildTree = true;
		this.triggerSelect(selection);
		this.setState({
			selected: selection
		});
	},

	triggerSelect(selection) {
		let selectedNodes = [];
		let findCond = {};

		if (typeof this.props.onSelect === 'function') {
			selectedNodes = _.map(selection, (id) => {
				findCond[this.props.idField] = id;
				return _.findWhere(this.props.data, findCond);
			});

			this.props.onSelect(selectedNodes);
		}
	},

	renderNodes(data) {
		let result = [];
		let Renderer = this.props.itemRenderer;

		result = _.map(data, (item) => {
			let children = [];

			if (typeof item.children != 'undefined' && item.children.length) {
				children = this.renderNodes(item.children);
			}

			return <Node
				collapsed={item._collapsed}
				renderer={Renderer}
				key={'propertree-node-'+item[this.props.idField]}
				data={item}
				selectable={this.props.selectable}
				selected={item._selected}
				selection={_.clone(this.state.selected)}
				onSelect={this.handleSelect}
			>
				{children}
			</Node>;
		});

		return result;
	},

	render() {
		let content = <div className="preloading">
			<Fa name="spinner" spin size="2x" />
		</div>;

		if (this.state.mounted) {
			if (!this.state.tree_data || !this.state.tree_data.length) {
				content = <p className="emptymsg muted text-muted">
					{this.props.emptyMsg}
				</p>;
			} else {
				content = <div className="propertree-container">
					<ul className="propertree-branch root">
						{this.renderNodes(this.state.tree_data)}
					</ul>
				</div>;
			}
		}

		return <div className="propertree" id={this.props.uniqueId}>
			{content}
		</div>;
	}
});
