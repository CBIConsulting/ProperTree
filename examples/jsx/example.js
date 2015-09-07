let body = document.body;

$(() => {
	var data = [
		{
			id: 1,
			parent_id: null,
			label: 'item-1'
		},
		{
			id: 2,
			parent_id: 1,
			label: 'item-2'
		},
		{
			id: 3,
			parent_id: 1,
			label: 'item-3'
		},
		{
			id: 4,
			parent_id: 1,
			label: 'item-4'
		},
		{
			id: 5,
			parent_id: 2,
			label: 'item-5'
		},
		{
			id: 6,
			parent_id: 3,
			label: 'item-6'
		}
	];

	React.render(<ProperTree data={data} collapsable={true} defaultExpanded={[5]} defaultSelected={[5]}/>, body);
});