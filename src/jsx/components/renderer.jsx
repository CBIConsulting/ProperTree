import immutable from "immutable";
import React from "react/addons";
import _ from "underscore";
import Fa from "react-fontawesome";
import IconRenderer from "./iconRenderer"

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			has_children: false,
			iconRenderer: IconRenderer,
			selectable: 'recursive',
			selection: [],
			onSelect: null
		};
	},

	handleSelection(e) {
		e.stopPropagation();

		if (this.props.selectable == 'single') {
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
			this.triggerSelect(immutable.List(selection));
		}
	},

	triggerSelect(selection = []) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(selection);
		}
	},

	getCurrentSelection(data = this.props.data, selection = []) {
		return _.clone(this.props.selection);
	},

	render() {
		return <div className={'propertree-node-desc ' + this.props.selectable} onClick={this.handleSelection}>
			<div className="propertree-node-bg" />
			<this.props.iconRenderer {...this.props} />
			<span className="propertree-node-name">
				{this.props.data._label}
			</span>
		</div>;
	}
});