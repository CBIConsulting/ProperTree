import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Fa from "react-fontawesome";

export default React.createClass({
	getDefaultProps() {
		return {
			data: null
		};
	},

	render() {
		let children = null;
		let icon = 'file-o';

		if (this.props.children.length) {
			children = <div className="propertree-node-children">
				<ul className="propertree-branch subtree">
					{this.props.children}
				</ul>
			</div>;

			icon = 'folder-open';
		}

		return <li className={"propertree-node node-"+this.props.data._properId}>
			<div className="propertree-node-desc">
				<div className="propertree-node-bg" />
				<Fa name={icon} fixedWidth />
				<span className="propertree-node-name">
					{this.props.data._label}
				</span>
			</div>
			{children}
		</li>;
	}
});