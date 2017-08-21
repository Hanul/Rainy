RUN(() => {
	
	const SEP = require('path').sep;
	
	let loadUSONs = (path) => {
		
		EACH(FIND_FOLDER_NAMES({
			path : path,
			isSync : true
		}), (folderName) => {
			loadUSONs(path + SEP + folderName);
		});
		
		EACH(FIND_FILE_NAMES({
			path : path,
			isSync : true
		}), (fileName) => {
			
			if (fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase() === 'js') {
				require(path + SEP + fileName);
			}
		});
	};
	
	loadUSONs('./Samples' + SEP + 'Platformer');
	
	RainyNode({
		id : 'main'
	}).appendTo(SkyEngine.Screen);
});
