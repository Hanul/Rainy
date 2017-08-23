RainyTool.HTMLEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.HTMLEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/html.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'html',
				icon : getIcon()
			}
		}
	};
});
