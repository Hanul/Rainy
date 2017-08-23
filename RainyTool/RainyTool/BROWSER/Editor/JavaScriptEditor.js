RainyTool.JavaScriptEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.JavaScriptEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/js.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'javascript',
				icon : getIcon()
			}
		}
	};
});
