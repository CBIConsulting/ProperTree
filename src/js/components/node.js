import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Fa from "react-fontawesome";
import ItemRenderer from "./renderer";

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			renderer: ItemRenderer
		};
	},

	render() {
		let has_children = !!this.props.children.length;
		let children = null;
		let Renderer = this.props.renderer;

		if (has_children) {
			children = <div className="propertree-node-children">
				<ul className="propertree-branch subtree">
					{this.props.children}
				</ul>
			</div>;
		}

		return <li className={"propertree-node node-"+this.props.data._properId}>
			<Renderer data={this.props.data} has_children={has_children} />
			{children}
		</li>;
	}
});