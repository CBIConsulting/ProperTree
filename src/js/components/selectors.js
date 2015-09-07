import React from "react/addons";
import $ from "jquery";
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

	shouldComponentUpdate(nextProps, nextState) {
		return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
	},

	checkSelections() {
		let inmediate = this.state.inmediate;
		let recursive = this.state.recursive;
		let included = false;
		let children = [];
		let descendants = [];

		if (this.props.selectable == 'recursive' || this.props.selectable == 'children') {
			descendants = getDescendants(this.props.data, true);
			children = _.clone(descendants);

			if (this.props.selectable === 'recursive') {
				descendants = getDescendants(this.props.data);
			}
		}

		if (descendants.length) {
			inmediate = _.intersection(children, this.props.selection).length == children.length;

			if (this.props.selectable == 'recursive') {
				recursive = _.intersection(descendants, this.props.selection).length == descendants.length;
			}
		}

		this.setState({
			inmediate: inmediate,
			recursive: recursive
		});
	},

	handleSingleSelect(e) {
		let selection = this.getCurrentSelection() || [];

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
		this.triggerSelect(selection);
		clearSelection();

		this.setState({
			single: !this.props.selected
		});
	},

	getCurrentSelection(data = this.props.data, selection = []) {
		return _.clone(this.props.selection);
	},

	handleChildrenSelect() {
		let children = getDescendants(this.props.data, true);
		let inmediate = this.state.inmediate;
		let selection = _.clone(this.props.selection);
		clearSelection();

		if (!inmediate) {
			selection.push.apply(selection, children);
			selection = _.uniq(selection);
			inmediate = true;
		} else {
			selection = _.without.apply(_, selection, children);
			inmediate = false;
		}

		this.triggerSelect(selection);

		this.setState({
			inmediate: inmediate
		});
	},

	handleRecursiveSelect() {
		let children = getDescendants(this.props.data);
		let recursive = this.state.recursive;
		let selection = _.clone(this.props.selection);
		clearSelection();

		if (!recursive) {
			selection.push.apply(selection, children);
			selection = _.uniq(selection);
			recursive = true;
		} else {
			selection = _.without.apply(_, selection, children);
			recursive = false;
		}

		this.triggerSelect(selection);

		this.setState({
			recursive: recursive,
			inmediate: recursive
		});
	},

	triggerSelect(selection = []) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(selection);
		}
	},

	render() {
		let selectors = [];

		if (this.props.selectable != 'single') {
			selectors.push(<input type="checkbox" key={"cb-selector"} className="propertree-selector single" checked={this.props.selected} onChange={this.handleSingleSelect} />);

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
			return <a href="#" className={"propertree-single-selector" + (this.props.selected? ' selected' : '')} onClick={this.handleSingleSelect}>hola</a>
		}

	}
});
