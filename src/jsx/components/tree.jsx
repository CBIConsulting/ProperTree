import React from "react/addons";
import _ from "underscore";
import immutable from "immutable";
import Node from "./node";
import ItemRenderer from "./renderer";
import Fa from "react-fontawesome";
import IconRenderer from "./iconRenderer";

let iterations = 0;

function pathTo(data, node) {
	let path = [];
	let citem;

	if (!node) {
		return path;
	}

	citem = node;

	while(citem && citem._parent) {
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
			searchable: false,
			emptyMsg: 'No data found',
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
			tree_data: null,
			selected: immutable.List(this.props.defaultSelected || []),
			expanded: _.clone(this.props.defaultExpanded) || []
		}
	},

	componentDidMount() {
		if (!this.state.mounted) {
			this.buildTree(this.props.data);
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
			this.buildTree();
			this.rebuildTree = false;
		}
	},

	shouldComponentUpdate(nextProps, nextState) {
		this.rebuildTree = this.rebuildTree || !immutable.List(nextProps.data).equals(immutable.List(this.props.data));

		return true;
	},

	buildTree(data = this.props.data) {
		let tree_data = null;
		let expandedPaths = [];
		let selection = this.state.selected.toJS();

		data = _.map(data, (item) => {
			item._properId = item[this.props.idField];
			item._parent = item[this.props.parentField];
			item._selected = selection.indexOf(item._properId) >= 0;
			item._label = item[this.props.displayField];
			item._collapsed = true && this.props.collapsable;

			return item;
		});

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

		tree_data = this.buildTreeData(data);

		this.setState({
			expanded: expandedPaths,
			rawdata: immutable.List(data),
			tree_data: immutable.List(tree_data)
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
				return _.findWhere(this.props.data, findCond);
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

	handleSearch(event) {
		const $this = $(event.target);
		const searchString = $this.val();
		this.search(searchString);
	},

	search: _.debounce(function(searchString) {
		let resultIds = [];
		let results = this.props.data;

		if (searchString) {
			const regex = new RegExp(searchString, 'i');
			if (!this.searching) {
				this.searching = true;
				this.lastExpanded = _.clone(this.state.expanded);
			} 

			let search = _.filter(this.props.data, (item) => {
				return regex.test(item._label);
			});

			if (search.length) {
				this.state.expanded = [];

				_.each(search, (item) => {
					resultIds.push(item._properId);
					this.state.expanded.push(item._properId);
					resultIds = _.union(resultIds, pathTo(this.props.data, item));
				});

				if (this.props.data.length) {
					resultIds.push(this.props.data[0]._properId);
				}
			}

			results = _.filter(this.props.data, (item) => {
				return _.indexOf(resultIds, item._properId) >= 0;
			});
		} else {
			this.searching = false;
			this.state.expanded = this.lastExpanded;
		}

		this.buildTree(results);
	},300),

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

	render() {
		let content = <div className="preloading">
			<Fa name="spinner" spin size="2x" />
		</div>;
		let nodes = [];
		let searchBox = null;

		if (this.state.mounted) {
			if (this.props.searchable) {
				searchBox = (
					<div className="toolbar">
						<div className="right">
							<input className="search-box" placeholder="Search..." onKeyUp={this.handleSearch}/>
						</div>
					</div>
				);
			}
			if (!this.state.tree_data || !this.state.tree_data.size) {
				content = <p className="emptymsg muted text-muted">
					{this.props.emptyMsg}
				</p>;
			} else {
				nodes = this.renderNodes(this.state.tree_data.toJS());
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
