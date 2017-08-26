RUN(() => {
	
	const {shell} = require('electron');
	const {dialog} = require('electron').remote;
	
	const FS = require('fs');
	const SEP = require('path').sep;
	
	let exec = require('child_process').exec;
	
	let editorStore = STORE('editorStore');
	let folderOpenedStore = STORE('folderOpened');
	let saveCommandStore = STORE('saveCommandStore');
	
	RainyTool.IDE.init({
		
		showHome : () => {
			
			RainyTool.IDE.openEditor(RainyTool.HomeTab({
				title : '홈',
				c : DIV({
					style : {
						padding : 10
					},
					c : A({
						style : {
							color : '#59A7FD',
							textDecoration : 'underline'
						},
						c : 'Rainy',
						on : {
							tap : () => {
								shell.openExternal('https://github.com/Hanul/Rainy');
							}
						}
					})
				})
			}));
		},
		
		load : (path, openEditor) => {
			
			READ_FILE(path, (buffer) => {
				openEditor(path, buffer.toString());
			});
		},
		
		save : (activeTab) => {
			
			NEXT([(next) => {
				
				if (activeTab.getPath() === undefined) {
					
					dialog.showSaveDialog((path) => {
						if (path !== undefined) {
							next(path);
						}
					});
				}
				
				else {
					next(activeTab.getPath());
				}
			},
			
			() => {
				return (path) => {
					
					WRITE_FILE({
						path : path,
						content : activeTab.getContent()
					}, () => {
						
						activeTab.setPath(path);
						
						SkyDesktop.Noti('저장하였습니다.');
						
						let i = path.lastIndexOf('/');
						let j = path.lastIndexOf('\\');
						
						let filename = path.substring((j === -1 || i > j ? i : j) + 1);
						activeTab.setTitle(filename);
						
						let extname = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
						
						let Editor = RainyTool.IDE.getEditor(extname);
						if (Editor !== undefined) {
							activeTab.setIcon(Editor.getIcon());
						}
						
						let command = saveCommandStore.get(extname);
						
						if (command !== undefined) {
							
							command = command.replace(/\{\{folder\}\}/g, path.substring(0, path.lastIndexOf(SEP)));
							command = command.replace(/\{\{path\}\}/g, path);
							
							EACH(command.split('\n'), (command) => {
								
								console.log('저장 시 명령을 실행합니다: ' + command);
								
								exec(command, (error) => {
									if (error !== TO_DELETE) {
										SHOW_ERROR('저장 시 명령 실행', error.toString());
									}
								});
							});
						}
					});
				};
			}]);
		}
	});
	
	let workspaceFileWatcher;
	
	let loadWorkspaceFiles = () => {
		
		RainyTool.IDE.clearFileTree();
		
		let createFileWatcher = (path, addItem, removeItem) => {
			
			return FS.watch(path, (eventType, fileName) => {
				
				if (eventType === 'rename') {
					
					CHECK_FILE_EXISTS(path + SEP + fileName, (isExists) => {
						
						if (isExists === true) {
							addItem({
								key : path + SEP + fileName,
								item : RainyTool.File({
									path : path + SEP + fileName,
									title : fileName.lastIndexOf('.') === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf('.'))
								})
							});
						}
						
						else {
							removeItem(path + SEP + fileName);
						}
					});
				}
			});
		};
		
		let loadFiles = (path, addItem) => {
			
			EACH(FIND_FOLDER_NAMES({
				path : path,
				isSync : true
			}), (folderName) => {
				
				let folder;
				let isOpened = folderOpenedStore.get(path + SEP + folderName);
				
				let fileWatcher;
				
				addItem({
					key : path + SEP + folderName,
					item : folder = RainyTool.Folder({
						path : path + SEP + folderName,
						title : folderName,
						isOpened : isOpened,
						on : {
							
							open : () => {
								
								folderOpenedStore.save({
									name : path + SEP + folderName,
									value : true
								});
								
								loadFiles(path + SEP + folderName, folder.addItem);
								
								if (fileWatcher !== undefined) {
									fileWatcher.close();
								}
								
								fileWatcher = createFileWatcher(path + SEP + folderName, folder.addItem, folder.removeItem);
							},
							
							close : () => {
								
								folderOpenedStore.remove(path + SEP + folderName);
								
								fileWatcher.close();
							}
						}
					})
				});
			});
			
			EACH(FIND_FILE_NAMES({
				path : path,
				isSync : true
			}), (fileName) => {
				
				addItem({
					key : path + SEP + fileName,
					item : RainyTool.File({
						path : path + SEP + fileName,
						title : fileName.lastIndexOf('.') === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf('.'))
					})
				});
			});
		};
		
		let workspacePath = editorStore.get('workspacePath');
		
		if (workspacePath === undefined) {
			workspacePath = 'workspace';
		}
		
		loadFiles(workspacePath, RainyTool.IDE.addItem);
		
		if (workspaceFileWatcher !== undefined) {
			workspaceFileWatcher.close();
		}
		
		workspaceFileWatcher = createFileWatcher(workspacePath, RainyTool.IDE.addItem, RainyTool.IDE.removeItem);
	};
	
	RainyTool.IDE.addToolbarButton(SkyDesktop.ToolbarButton({
		icon : IMG({
			src : RainyTool.R('icon/workspace.png')
		}),
		title : '작업 폴더 지정',
		on : {
			tap : () => {
				
				let fileInput;
				
				SkyDesktop.Confirm({
					okButtonTitle : '저장',
					msg : [P({
						c : '작업 폴더를 지정해주시기 바랍니다.'
					}), editorStore.get('workspacePath') === undefined ? '' : P({
						c : '현재 작업 폴더: ' + editorStore.get('workspacePath')
					}), DIV({
						style : {
							marginTop : 5
						},
						c : fileInput = INPUT({
							style : {
								width : 222,
								padding : 8,
								backgroundColor : '#e0e1e2',
								border : '1px solid #999',
								borderRadius : 4
							},
							type : 'file'
						})
					})]
				}, () => {
					
					if (fileInput.getEl().files[0] !== undefined) {
						
						editorStore.save({
							name : 'workspacePath',
							value : fileInput.getEl().files[0].path
						});
						
						RainyTool.IDE.closeAllEditors();
						
						RainyTool.IDE.getEditorOpenedStore().clear();
						
						loadWorkspaceFiles();
					}
				});
				
				// 폴더 선택 가능하도록
				fileInput.getEl().setAttribute('webkitDirectory', 'webkitDirectory');
			}
		}
	}));
	
	loadWorkspaceFiles();
});
