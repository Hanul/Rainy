RainyTool.TextEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.TextEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : SkyDesktop.R('file.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'text',
				icon : getIcon()
			}
		}
	};
});
