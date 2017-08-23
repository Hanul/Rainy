RainyTool.ActionScriptEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.ActionScriptEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/actionscript.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'actionscript',
				icon : getIcon()
			}
		}
	};
});
