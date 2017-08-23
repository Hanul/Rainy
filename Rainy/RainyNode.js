global.RainyNode = METHOD({
	
	run : (params) => {
		//REQUIRED: params
		//OPTIONAL: params.id
		//OPTIONAL: params.name
		//OPTIONAL: params.x
		//OPTIONAL: params.y
		
		let id = params.id;
		let name = params.name;
		let x = params.x;
		let y = params.y;
		
		let data = COPY(id !== undefined ? Rainy.getData(id) : Rainy.getDataByName(name));
		data.x = x;
		data.y = y;
		
		let NodeClass;
		
		if (data.type === 'Line') {
			NodeClass = SkyEngine.Line;
		} else if (data.type === 'Rect') {
			NodeClass = SkyEngine.Rect;
		} else if (data.type === 'Circle') {
			NodeClass = SkyEngine.Circle;
		} else if (data.type === 'Polygon') {
			NodeClass = SkyEngine.Polygon;
		}
		
		else if (data.type === 'Image') {
			NodeClass = SkyEngine.Image;
		} else if (data.type === 'Sprite') {
			NodeClass = SkyEngine.Sprite;
		} else if (data.type === 'Silhouette') {
			NodeClass = SkyEngine.Silhouette;
		} else if (data.type === 'Background') {
			NodeClass = SkyEngine.Background;
		}
		
		else if (data.type === 'ParticleSystem') {
			NodeClass = SkyEngine.ParticleSystem;
		} else if (data.type === 'ParticleSystemOnce') {
			NodeClass = SkyEngine.ParticleSystemOnce;
		}
		
		else {
			NodeClass = SkyEngine.Node;
		}
		
		let node = NodeClass(data);
		
		if (data.on !== undefined && data.on.create !== undefined) {
			data.on.create(node);
		}
		
		return node;
	}
});
