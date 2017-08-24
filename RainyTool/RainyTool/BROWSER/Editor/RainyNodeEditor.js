RainyTool.RainyNodeEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.RainyNodeEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/javascript.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.Editor;
		},
		
		params : () => {
			return {
				icon : getIcon()
			}
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//OPTIONAL: params.mode
			//OPTIONAL: params.content
			
			let mode = params.mode;
			let content = params.content;
			
			self.append('test');
		}
	};
});
