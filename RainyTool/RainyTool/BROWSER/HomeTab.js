RainyTool.HomeTab = CLASS({

	preset : () => {
		return SkyDesktop.Tab;
	},

	params : () => {
		return {
			icon : IMG({
				src : RainyTool.R('icon/home.png')
			}),
			title : '홈'
		};
	}
});
