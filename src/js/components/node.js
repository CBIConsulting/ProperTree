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

		if (this.props.children.length) {
			children = <div className="propertree-node-children">
				<ul className="propertable-subtree">
					{this.props.children}
				</ul>
			</div>;
		}

		return <li className={"propertable-node node-"}>
			<div className="propertree-node-bg" />
			<div className="propertree-node-desc">
				<Fa name="folder-open" />
				<span className="propertree-node-name">
					{this.props.data._label}
				</span>
			</div>
			{children}
		</li>;
	}
});