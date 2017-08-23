RainyTool.HaxeEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.HaxeEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/haxe.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'haxe',
				icon : getIcon()
			}
		}
	};
});
