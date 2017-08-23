RainyTool.MAIN = METHOD({

	run : (params) => {

		RainyTool.IDE.addEditor({
			extname : 'txt',
			editor : RainyTool.TextEditor
		});
		
		RainyTool.IDE.addEditor({
			extname : 'js',
			editor : RainyTool.JavaScriptEditor
		});
		
		RainyTool.IDE.addEditor({
			extname : 'html',
			editor : RainyTool.HTMLEditor
		});
		
		RainyTool.IDE.addEditor({
			extname : 'hx',
			editor : RainyTool.HaxeEditor
		});
		
		RainyTool.IDE.addEditor({
			extname : 'as',
			editor : RainyTool.ActionScriptEditor
		});
		
		RainyTool.IDE.addEditor({
			extname : 'erl',
			editor : RainyTool.ErlangEditor
		});
	}
});
