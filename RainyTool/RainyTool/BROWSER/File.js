RainyTool.File = CLASS({

	preset : () => {
		return SkyDesktop.File;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.path
		//REQUIRED: params.title
		
		let path = params.path;
		let title = params.title;
		
		let extname = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
		
		let Editor = RainyTool.IDE.getEditor(extname);
		
		if (Editor !== undefined) {
			self.setIcon(Editor.getIcon());
		}
		
		self.on('contextmenu', (e) => {
			
			RainyTool.FileContextMenu({
				path : self.getPath(),
				e : e
			});
			
			e.stop();
		});
	}
});
