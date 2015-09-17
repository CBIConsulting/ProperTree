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

		return <Fa name={icon} fixedWidth />;
	}
});