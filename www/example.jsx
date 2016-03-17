import ProperTree from "../src/jsx/ProperTree";

let body = document.body;

$(() => {
	var data = [
		{
			id: 1,
			parent_id: null,
			label: 'Root'
		},
		{
			id: 2,
			parent_id: 1,
			label: 'Folder 1'
		},
		{
			id: 3,
			parent_id: 1,
			label: 'Folder 2'
		},
		{
			id: 4,
			parent_id: 1,
			label: 'Node'
		},
		{
			id: 5,
			parent_id: 2,
			label: 'Sub 1'
		},
		{
			id: 6,
			parent_id: 3,
			label: 'Test 1'
		},
		{
			id: 7,
			parent_id: 2,
			label: 'Sub 2'
		},
		{
			id: 8,
			parent_id: 2,
			label: 'Sub 3'
		},
		{
			id: 10,
			parent_id: 1,
			label: 'Node Folder'
		},
		{
			id: 11,
			parent_id: 10,
			label: 'Sub Node'
		},
		{
			id: 12,
			parent_id: 11,
			label: 'Node with a extremly long text to test what happens when rendering the node in the tree and text is very very very long'
		},
		{
			id: 13,
			parent_id: 11,
			label: 'España'
		},
		{
			id: 14,
			parent_id: 11,
			label: 'Camión'
		},
		{
			id: 20,
			parent_id: null,
			label: 'Root 2'
		},
		{
			id: 21,
			parent_id: 20,
			label: 'Folder TR1'
		},
		{
			id: 22,
			parent_id: 20,
			label: 'Folder TR2'
		}
	];

	ReactDOM.render(<ProperTree data={data} selectable="single" collapsable={true} disabled={[6, 3]} defaultExpanded={[5]} defaultSelected={[5]} onSelect={(selection) => {
		console.log('Tree 1 - Selection', selection);
	}}/>, document.getElementById('tree-1'));

	ReactDOM.render(<ProperTree data={data} collapsable={true} disabled={[6, 3]} defaultExpanded={[5]} defaultSelected={[1,5]} onSelect={(selection) => {
		console.log('Tree 2 - Selection', selection);
	}}/>, document.getElementById('tree-2'));

	ReactDOM.render(<ProperTree data={data} selectable="single" searchable={true} collapsable={true} defaultExpanded={[5]} defaultSelected={[1]} onSelect={(selection) => {
		console.log('Tree 3 - Selection', selection);
	}}/>, document.getElementById('tree-3'));

});