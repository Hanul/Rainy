RUN(() => {
	
	const SEP = require('path').sep;
	
	let loadUSONs = (path, addItem) => {
		
		EACH(FIND_FOLDER_NAMES({
			path : path,
			isSync : true
		}), (folderName) => {
			loadFiles(path + SEP + folderName, folder.addItem);
		});
		
		EACH(FIND_FILE_NAMES({
			path : path,
			isSync : true
		}), (fileName) => {
			
			let extname = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
			
			if (extname === 'uson') {
				
				READ_FILE({
					path : path + SEP + fileName,
					isSync : true
				}, (buffer) => {
					
					Rainy.ConvertDataToNode(eval('(' + buffer.toString() + ')'));
				});
			}
		});
	};
	
	loadUSONs('usons');
});
