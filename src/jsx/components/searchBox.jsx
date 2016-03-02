import React from "react/addons";
import _ from "underscore";
import removeDiacritics from "./search";

function pathTo(data, node) {
	let path = [];
	let citem = _.clone(node);

	if (!node) {
		return path;
	}

	while(citem && citem._parent) {
		path.push(citem._properId);
		citem = _.findWhere(data, {_properId: citem._parent});
	}
	path.push(citem._properId);

	return _.uniq(path);
}



export default React.createClass({
	getDefaultProps() {
		return {
			searchMsg: 'Search...',
			data: [],
			expanded: [],
			afterSearch: () => {}
		}
	},

	handleSearch(event) {
		const $this = $(event.target);
		const searchString = $this.val();
		this.search(searchString);
	},

	search: _.debounce(function(searchString) {
		this._search(searchString);
	},300),

	_search(searchString) {
		let resultIds = [];
		let results = $.extend(true, {}, this.props.data);
		let expanded = this.props.expanded;

		if (searchString && searchString.length > 2) {
			const regex = new RegExp(removeDiacritics(searchString), 'i');
			if (!this.searching) {
				this.searching = true;
				this.lastExpanded = _.clone(expanded);
			} 

			let search = _.filter(results, (item) => {
				return regex.test(item._search);
			});

			if (search.length) {
				expanded = [];

				_.each(search, (item) => {
					resultIds.push(item._properId);
					expanded.push(item._properId);
					resultIds = _.union(resultIds, pathTo(results, item));
				});

				if (results.length) {
					resultIds.push(results[0]._properId);
				}
			}

			results = _.filter(results, (item) => {
				return _.indexOf(resultIds, item._properId) >= 0;
			});
		} else {
			if (this.searching) {
				this.searching = false;
				expanded = this.lastExpanded;
			}
		}

		this.props.afterSearch(results, expanded);
	},

	handleClear(event) {
		const $searchBox = $(this.refs.searchBox.getDOMNode());

		$searchBox.val('');

		this._search();
	},

	getExpanded(selected) {
		if (this.searching) {
			this.searching = false;
			const expanded = _.unique(_.union(this.lastExpanded, selected));
			
			const $searchBox = $(this.refs.searchBox.getDOMNode());
			$searchBox.val('');
			
			return expanded;
		}

		return false;
	},

	render() {
		return (
			<div className="toolbar">
				<input className="search-box" ref="searchBox" placeholder={this.props.searchMsg} onKeyUp={this.handleSearch}/>
				<div className="clear" onClick={this.handleClear}>
					<i className="fa fa-times"></i>
				</div>
			</div>
		);
	}
});
