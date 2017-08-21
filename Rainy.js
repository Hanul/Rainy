global.Rainy = METHOD((m) => {
	
	let dataSet = {};
	
	let getData = m.getData = (id) => {
		return dataSet[id];
	};
	
	return {
		run : (data) => {
			//REQUIRED: data
			
			dataSet[data.id] = data;
		}
	}
});
