RainyTool.MAIN = METHOD({

	run : (params) => {
		
		RainyTool.IDE.addEditor({
			extname : 'js',
			editor : RainyTool.RainyNodeEditor
		});
	}
});
