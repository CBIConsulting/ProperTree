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
	];

	React.render(<ProperTree data={data} selectable="single" collapsable={true} disabled={[6, 3]} defaultExpanded={[5]} defaultSelected={[5]} onSelect={(selection) => {
		console.log('Tree 1 - Selection', selection);
	}}/>, document.getElementById('tree-1'));


	React.render(<ProperTree data={data} collapsable={true} disabled={[6, 3]} defaultExpanded={[5]} defaultSelected={[1,5]} onSelect={(selection) => {
		console.log('Tree 2 - Selection', selection);
	}}/>, document.getElementById('tree-2'));

	React.render(<ProperTree data={data} selectable="single" searchable={true} collapsable={true} defaultExpanded={[5]} defaultSelected={[1]} onSelect={(selection) => {
		console.log('Tree 3 - Selection', selection);
	}}/>, document.getElementById('tree-3'));

});