import React from "react/addons";
import _ from "underscore";
import immutable from "immutable";
import SearchBox from "./searchBox";
import Node from "./node";
import ItemRenderer from "./renderer";
import Fa from "react-fontawesome";
import IconRenderer from "./iconRenderer";

function pathTo(data, node) {
	let path = [];
	let citem = _.clone(node);

	if (!node) {
		return path;
	}

	while(citem && citem._parent) {
		path.push(citem._properId);
		citem = _.findWhere(data, {_properId: citem._parent});
	}
	path.push(citem._properId);

	return _.uniq(path);
}

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			itemRenderer: ItemRenderer,
			selectable: 'recursive',
			searchable: false,
			emptyMsg: 'No data found',
			searchMsg: 'Search...',
			idField: 'id',
			parentField: 'parent_id',
			displayField: 'label',
			collapsable: true,
			uniqueId: _.uniqueId('propertree-'),
			defaultSelected: [],
			defaultExpanded: [],
			iconRenderer: IconRenderer,
			onSelect: null,
			disabled: []
		}
	},

	getInitialState() {
		return {
			rawdata: null,
			mounted: false,
			treeData: null,
			selected: immutable.List(this.props.defaultSelected || []),
			expanded: _.clone(this.props.defaultExpanded) || []
		}
	},

	componentDidMount() {
		if (!this.state.mounted) {
			this.prepareData();
			this.buildTree();
		}

		if (this.state.selected) {
			this.handleSelect(immutable.List(this.props.defaultSelected));
		}

		this.setState({
			mounted: true
		});
	},

	componentDidUpdate() {
		if (this.rebuildTree) {
			this.prepareData();
			this.buildTree();
			this.rebuildTree = false;
		}
	},

	shouldComponentUpdate(nextProps, nextState) {
		this.rebuildTree = this.rebuildTree || !immutable.List(nextProps.data).equals(immutable.List(this.props.data));

		return true;
	},

	prepareData(data = this.props.data) {
		let selection = this.state.selected.toJS();

		data = $.extend(true, {}, data);

		this._baseData = _.map(data, (item) => {
			item._properId = item[this.props.idField];
			item._parent = item[this.props.parentField];
			item._selected = selection.indexOf(item._properId) >= 0;
			item._label = item[this.props.displayField];
			item._collapsed = true && this.props.collapsable;

			return item;
		});
	},

	buildTree(data = this._baseData) {
		let treeData = null;
		let expandedPaths = [];
		let selection = this.state.selected.toJS();

		_.each(this.state.expanded, (item) => {
			let path = pathTo(data, _.findWhere(data, {_properId: item}));
			if (path.length > 1) {
				let children = _.findWhere(data, {_parent: item});
				if (!children) {
					path = _.rest(path);
				}
			}
			expandedPaths = _.union(expandedPaths, path);
		});

		expandedPaths = _.uniq(expandedPaths);

		data = _.map(data, (item) => {
			if (expandedPaths.indexOf(item._properId) >= 0) {
				item._collapsed = false;
			}

			return item;
		});

		treeData = this.buildTreeData(data);

		this.setState({
			expanded: expandedPaths,
			rawdata: immutable.List(data),
			treeData: immutable.List(treeData)
		});
	},

	buildTreeData(tree, parent = null, grouped = null) {
		let result = [];
		let findcond = {}
		let branch = [];

		if (!grouped) {
			grouped = _.groupBy(tree, this.props.parentField);
		}

		if (parent) {
			branch = grouped[parent];
		} else {
			branch = grouped['null'];
		}

		if (branch && branch.length) {
			result = _.map(branch, (leaf) => {
				let children = this.buildTreeData(tree, leaf[this.props.idField], grouped);
				let item = _.clone(leaf);

				item.disabled = false;

				if (children.length) {
					item.children = children;
				}

				if (_.indexOf(this.props.disabled, leaf[this.props.idField]) >= 0) {
					item.disabled = true;
				}

				return item;
			});
		}

		return result;
	},

	handleSelect(selection) {
		this.rebuildTree = true;
		this.triggerSelect(selection);

		if (this.props.searchable && this.refs.searchBox) {
			const expanded = this.refs.searchBox.getExpanded(selection.toJS());
			if (expanded) {
				this.state.expanded = expanded;
			}
		}

		this.setState({
			selected: selection
		});
	},

	triggerSelect(selection) {
		let selectedNodes = [];
		let findCond = {};

		if (typeof this.props.onSelect === 'function') {
			selectedNodes = _.map(selection.toJS(), (id) => {
				findCond[this.props.idField] = id;
				return _.findWhere(this._baseData, findCond);
			});

			this.props.onSelect(selectedNodes);
		}
	},

	handleToggle(item_id) {
		let nodes = this.state.rawdata.toJS();
		let expanded = [];

		_.each(nodes, (item) => {
			if (item._properId == item_id) {
				item._collapsed = !item._collapsed;
			}
			if (!item._collapsed) {
				expanded.push(item._properId);
			}
		});

		this.state.expanded = expanded;
		this.buildTree(nodes);
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
				key={this.props.uniqueId+'-propertree-node-'+item[this.props.idField]}
				data={item}
				selectable={this.props.selectable}
				selected={item._selected}
				selection={this.state.selected}
				onSelect={this.handleSelect}
				onToggle={this.handleToggle}
				iconRenderer={this.props.iconRenderer}
			>
				{children}
			</Node>;
		});

		return result;
	},

	afterSearch(results, expanded) {
		this.state.expanded = expanded;
		this.buildTree(results);
	},

	render() {
		let content = <div className="preloading">
			<Fa name="spinner" spin size="2x" />
		</div>;
		let nodes = [];
		let searchBox = null;

		if (this.state.mounted) {
			if (this.props.searchable) {
				searchBox = (
					<SearchBox
						ref="searchBox"
						searchMsg={this.props.searchMsg}
						data={this._baseData}
						expanded={this.state.expanded}
						afterSearch={this.afterSearch}
					/>
				);
			}
			if (!this.state.treeData || !this.state.treeData.size) {
				content = <p className="emptymsg muted text-muted">
					{this.props.emptyMsg}
				</p>;
			} else {
				nodes = this.renderNodes(this.state.treeData.toJS());
				content = <div className="propertree-container">
					<ul className="propertree-branch root">
						{nodes}
					</ul>
				</div>;
			}
		}

		return <div className="propertree" id={this.props.uniqueId}>
			{searchBox}
			{content}
		</div>;
	}
});
