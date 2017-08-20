Rainy.ConvertDataToNode = METHOD({
	
	run : (data) => {
		
		if (data.type === 'circle') {
			
			SkyEngine.Circle(data).appendTo(SkyEngine.Screen);
		}
	}
});
