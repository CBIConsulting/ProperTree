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

	triggerSelect(selection = []) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(selection);
		}
	},

	getCurrentSelection(data = this.props.data, selection = []) {
		return _.clone(this.props.selection);
	},

	render() {
		return <div className={'propertree-node-desc ' + this.props.selectable}>
			<div className="propertree-node-bg" />
			<this.props.iconRenderer {...this.props} />
			<span className="propertree-node-name">
				{this.props.data._label}
			</span>
		</div>;
	}
});