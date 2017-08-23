RainyTool.ErlangEditor = CLASS((cls) => {
	
	let getName = cls.getName = () => {
		return 'RainyTool.ErlangEditor';
	};
	
	let getIcon = cls.getIcon = () => {
		return IMG({
			src : RainyTool.R('icon/erlang.png')
		});
	};
	
	return {
		
		preset : () => {
			return RainyTool.AceEditor;
		},
		
		params : () => {
			return {
				mode : 'erlang',
				icon : getIcon()
			}
		}
	};
});
