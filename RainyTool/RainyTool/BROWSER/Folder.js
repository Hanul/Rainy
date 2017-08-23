RainyTool.Folder = CLASS({

	preset : () => {
		return SkyDesktop.Folder;
	},

	init : (inner, self) => {
		
		self.on('contextmenu', (e) => {
			
			RainyTool.FileContextMenu({
				path : self.getPath(),
				e : e
			});
			
			e.stop();
		});
	}
});
