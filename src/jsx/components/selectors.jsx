import immutable from "immutable";
import React from "react/addons";
import _ from "underscore";
import Fa from "react-fontawesome";

function getDescendants(data, inmediate = false, descendants = []) {
	if (_.isArray(data.children) && data.children. length) {
		descendants.push.apply(descendants, _.pluck(data.children, '_properId'));

		if (!inmediate) {
			_.each(data.children, (child) => {
				getDescendants(child, inmediate, descendants);
			});
		}
	}

	return descendants;
}

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

export default React.createClass({
	mixins: [React.addons.PureRenderMixin],

	getDefaultProps() {
		return {
			data: null,
			selected: false,
			selectable: 'recursive',
			onSelect: null,
			selection: []
		};
	},

	getInitialState() {
		return {
			single: this.props.selected,
			inmediate: false,
			recursive: false
		}
	},

	componentDidMount() {
		this.checkSelections();
	},

	componentDidUpdate() {
		this.checkSelections();
	},

	checkSelections() {
		let inmediate = this.state.inmediate;
		let recursive = this.state.recursive;
		let included = false;
		let children = [];
		let descendants = [];
		let selection = this.props.selection.toJS();

		if (this.props.selectable == 'recursive' || this.props.selectable == 'children') {
			descendants = getDescendants(this.props.data, true);
			children = _.clone(descendants);

			if (this.props.selectable === 'recursive') {
				descendants = getDescendants(this.props.data);
			}
		}

		if (descendants.length) {
			inmediate = _.intersection(children, selection).length == children.length;

			if (this.props.selectable == 'recursive') {
				recursive = _.intersection(descendants, selection).length == descendants.length;
			}
		}

		this.setState({
			inmediate: inmediate,
			recursive: recursive
		});
	},

	handleSingleSelect(e) {
		let selection = this.getCurrentSelection() || [];

		if (!this.props.data.disabled) {
			if (this.props.selected) {
				selection = _.without(selection, this.props.data._properId);

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

			selection = _.uniq(selection);
			this.triggerSelect(immutable.List(selection));
			clearSelection();

			this.setState({
				single: !this.props.selected
			});
		}
	},

	getCurrentSelection() {
		return this.props.selection.toJS();
	},

	handleChildrenSelect() {
		let children = getDescendants(this.props.data, true);
		let inmediate = this.state.inmediate;
		let selection = this.props.selection.toJS();
		clearSelection();

		if (this.props.data.disabled) {
			return ;
		}

		if (!inmediate) {
			selection = _.union(selection, children);
			inmediate = true;
		} else {
			selection = _.difference(selection, children);
			inmediate = false;
		}

		this.triggerSelect(immutable.List(selection));

		this.setState({
			inmediate: inmediate
		});
	},

	handleRecursiveSelect() {
		let children = getDescendants(this.props.data);
		let recursive = this.state.recursive;
		let selection = this.props.selection.toJS();
		clearSelection();

		if (this.props.data.disabled) {
			return ;
		}

		if (!recursive) {
			selection = _.union(selection, children);
			recursive = true;
		} else {
			selection = _.difference(selection, children);
			recursive = false;
		}

		this.triggerSelect(immutable.List(selection));

		this.setState({
			recursive: recursive,
			inmediate: recursive
		});
	},

	triggerSelect(selection = []) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(immutable.List(selection));
		}
	},

	render() {
		let selectors = [];

		if (this.props.selectable != 'single') {
			selectors.push(<input type="checkbox" key={"cb-selector"} className="propertree-selector single" disabled={this.props.data.disabled} checked={this.props.selected} onChange={this.handleSingleSelect} />);

			if (_.isArray(this.props.data.children) && this.props.data.children.length) {
				if (this.props.selectable == 'recursive' || this.props.selectable == 'inmediate') {
					selectors.push(<span key={"children-selector"} className={"propertree-selector children"+(this.state.inmediate? ' selected' : '')} onClick={this.handleChildrenSelect}>
						<Fa name="long-arrow-down" />
					</span>);
				}

				if (this.props.selectable == 'recursive') {
					selectors.push(<span key={"hierarchy-selector"} className={"propertree-selector recursive"+(this.state.recursive? ' selected' : '')} onClick={this.handleRecursiveSelect}>
						<Fa name="sort-amount-asc" />
					</span>);
				}
			}

			return <div className="propertree-node-selectors">
				{selectors}
			</div>;
		} else {
			return <a href="#" className={"propertree-single-selector" + (this.props.selected? ' selected' : '')} onClick={this.handleSingleSelect} />;
		}

	}
});
