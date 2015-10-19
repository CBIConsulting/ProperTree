import React from "react/addons";
import $ from "jquery";
import _ from "underscore";
import Fa from "react-fontawesome";
import ItemRenderer from "./renderer";
import Selectors from "./selectors";

export default React.createClass({
	getDefaultProps() {
		return {
			data: null,
			renderer: ItemRenderer,
			collapsable: true,
			collapsed: true,
			onCollapseToggle: null,
			selectable: 'recursive',
			selected: false,
			onSelect: null,
			selection: []
		};
	},

	getInitialState() {
		return {
			collapsed: this.props.collapsed
		};
	},

	handleTogglerClick(e) {
		e.preventDefault();

		this.setState({'collapsed': !this.state.collapsed});
	},

	handleSelect(selection) {
		if (typeof this.props.onSelect == 'function') {
			this.props.onSelect(selection);
		}
	},

	render() {
		let has_children = !!this.props.children.length;
		let children = null;
		let toggler = null;
		let Renderer = this.props.renderer;
		let collapsedClass = 'collapsed';
		let togglerIcon = <Fa name="caret-right" fixedWidth />;
		let selectors = null;

		if (!this.state.collapsed || !this.props.data._parent) {
			collapsedClass = 'expanded';
			togglerIcon = <Fa name="caret-down" fixedWidth />;
		}

		if (has_children) {

			if (this.props.data._parent) {
				toggler = <a href="#" onClick={this.handleTogglerClick} className="propertree-toggler">
					{togglerIcon}
				</a>;
			}

			if (!this.state.collapsed || !this.props.data._parent) {
				children = <div className="propertree-node-children">
					<ul className="propertree-branch subtree">
						{this.props.children}
					</ul>
				</div>;
			}
		}

		if (this.props.selectable) {
			selectors = <Selectors {...this.props} key={"node-"+this.props.data._properId+'-selectors'} onSelect={this.handleSelect}/>;
		}

		return <li className={"propertree-node node-"+this.props.data._properId+' '+collapsedClass}>
			{toggler}
			{selectors}
			<Renderer data={this.props.data} has_children={has_children} selectable={this.props.selectable} selection={this.props.selection} onSelect={this.handleSelect} />
			{children}
		</li>;
	}
});
