import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Fa from "react-fontawesome";

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			has_children: false
		};
	},

	render() {
		let icon = 'file-o';

		if (this.props.has_children) {
			icon = 'folder-open';
		}

		return <div className="propertree-node-desc">
			<div className="propertree-node-bg" />
			<Fa name={icon} fixedWidth />
			<span className="propertree-node-name">
				{this.props.data._label}
			</span>
		</div>;
	}
});