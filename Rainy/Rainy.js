global.Rainy = METHOD((m) => {
	
	let workspace = '';
	
	let setWorkspace = m.setWorkspace = (_workspace) => {
		//REQUIRED: workspace
		
		workspace = _workspace;
	};
	
	let dataSet = {};
	
	let getData = m.getData = (id) => {
		return dataSet[id];
	};
	
	let getDataByName = m.getDataByName = (name) => {
		
		let foundData;
		
		EACH(dataSet, (data) => {
			if (data.name === name) {
				foundData = data;
				return false;
			}
		});
		
		return foundData;
	};
	
	return {
		run : (data) => {
			//REQUIRED: data
			//REQUIRED: data.src
			
			let src = data.src;
			
			let copy = COPY(data);
			
			if (src !== undefined) {
				copy.src = workspace + '/' + src;
			}
			
			dataSet[data.id] = copy;
		}
	}
});
