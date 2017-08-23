Rainy({
	id : 'main',
	on : {
		create : (self) => {
			
			RainyNode({
				name : '테스트'
			}).appendTo(self);
		}
	}
});