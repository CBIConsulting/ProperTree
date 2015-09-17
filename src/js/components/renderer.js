import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Fa from "react-fontawesome";
import IconRenderer from "./iconRenderer"

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			has_children: false,
			iconRenderer: IconRenderer
		};
	},

	render() {
		return <div className="propertree-node-desc">
			<div className="propertree-node-bg" />
			<this.props.iconRenderer {...this.props} />
			<span className="propertree-node-name">
				{this.props.data._label}
			</span>
		</div>;
	}
});