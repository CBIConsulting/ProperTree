import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Node from "./node";

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			itemRenderer: Node,
			selectable: 'recursive'
		}
	},

	getInitialState() {
		return {
			rawdata: null,
			mounted: false,

		}
	},

	render() {
		return <div className="propertree">
			<ul>
				<Node />
			</ul>
		</div>
	}
});