global.RainyNode = METHOD({
	
	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.id
		//REQUIRED: params.x
		//REQUIRED: params.y
		
		let id = params.id;
		let x = params.x;
		let y = params.y;
		
		let data = COPY(Rainy.getData(id));
		data.x = x;
		data.y = y;
		
		let NodeClass;
		if (data.type === 'circle') {
			NodeClass = SkyEngine.Circle;
		} else {
			NodeClass = SkyEngine.Node;
		}
		
		let node = NodeClass(data);
		
		if (data.on !== undefined && data.on.create !== undefined) {
			data.on.create();
		}
		
		return node;
	}
});
