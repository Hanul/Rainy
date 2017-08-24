RainyTool.IDE = OBJECT({
	
	preset : () => {
		return TABLE;
	},
	
	params : () => {
		return {
			style : {
				position : 'absolute',
				width : '100%',
				height : '100%'
			}
		};
	},

	init : (inner, self) => {
		
		let showHomeHandler;
		let loadHandler;
		let saveHandler;
		
		let editorMap = {};
		let editorSettingStore = RainyTool.STORE('editorSettingStore');
		let editorOpenedStore = RainyTool.STORE('editorOpenedStore');
		
		let addEditor = self.addEditor = (params) => {
			//REQUIRED: params
			//REQUIRED: params.extname
			//REQUIRED: params.editor
			
			let extname = params.extname;
			let editor = params.editor;
			
			if (editorMap[extname] === undefined) {
				editorMap[extname] = [];
			}
			
			editorMap[extname].push(editor);
		};
		
		let getEditor = self.getEditor = (extname) => {
			
			let SelectedEditor = RainyTool.TextEditor;
			
			if (editorSettingStore !== undefined) {
				
				let editorName = editorSettingStore.get(extname);
				
				if (editorMap[extname] !== undefined) {
					EACH(editorMap[extname], (editor) => {
						if (editorName === undefined || editor.getName() === editorName) {
							SelectedEditor = editor;
							return false;
						}
					});
				}
			}
			
			return SelectedEditor;
		};
		
		let getEditorOpenedStore = self.getEditorOpenedStore = () => {
			return editorOpenedStore;
		};
		
		let toolbar;
		self.append(TR({
			c : TD({
				style : {
					height : 28
				},
				c : toolbar = SkyDesktop.Toolbar({
					buttons : [SkyDesktop.ToolbarButton({
						icon : IMG({
							src : RainyTool.R('icon/home.png')
						}),
						title : '홈',
						on : {
							tap : () => {
								showHomeHandler(self);
							}
						}
					}), SkyDesktop.ToolbarButton({
						icon : IMG({
							src : SkyDesktop.R('file.png')
						}),
						title : '새 파일',
						on : {
							tap : () => {
								openEditor(RainyTool.TextEditor({
									title : '제목 없음'
								}));
							}
						}
					}), SkyDesktop.ToolbarButton({
						icon : IMG({
							src : RainyTool.R('icon/save.png')
						}),
						title : '저장',
						on : {
							tap : () => {
								
								let activeTab = editorGroup.getActiveTab();
								
								if (activeTab.checkIsInstanceOf(RainyTool.Editor) === true) {
									saveHandler(activeTab);
								}
							}
						}
					})]
				})
			})
		}));
		
		let addToolbarButton = self.addToolbarButton = (toolbarButton) => {
			toolbar.addButton(toolbarButton);
		};
		
		let openEditor = self.openEditor = (tab) => {
			
			editorGroup.addTab(tab);
			
			if (tab.checkIsInstanceOf(RainyTool.Editor) === true) {
				
				tab.on('scroll', RAR((e) => {
					
					editorOpenedStore.save({
						name : tab.getPath(),
						value : tab.getScrollTop()
					});
				}));
				
				tab.on('remove', () => {
					editorOpenedStore.remove(tab.getPath());
				});
			}
			
			return tab;
		};
		
		let closeAllEditors = self.closeAllEditors = () => {
			editorGroup.removeAllTabs();
		};
		
		let loadAndOpenEditor = (path, scrollTop, next) => {
			
			loadHandler(path, (path, content) => {
				
				let i = path.lastIndexOf('/');
				let j = path.lastIndexOf('\\');
				
				let fileName = path.substring((j === -1 || i > j ? i : j) + 1);
				
				let editor = openEditor(getEditor(fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase())({
					title : fileName.lastIndexOf('.') === -1 ? fileName : fileName.substring(0, fileName.lastIndexOf('.')),
					path : path,
					content : content
				}));
				
				if (scrollTop !== undefined) {
					editor.setScrollTop(scrollTop);
				}
				
				if (next !== undefined) {
					next();
				}
			});
		};
		
		let fileTree;
		let editorGroup;
		self.append(TR({
			c : TD({
				c : SkyDesktop.HorizontalTabList({
					tabs : [SkyDesktop.Tab({
						size : 23,
						c : fileTree = SkyDesktop.FileTree(loadAndOpenEditor)
					}), SkyDesktop.Tab({
						size : 77,
						c : editorGroup = SkyDesktop.TabGroup()
					})]
				})
			})
		}));
		
		let addItem = self.addItem = (params) => {
			//REQUIRED: params
			//REQUIRED: params.key
			//REQUIRED: params.item
			
			fileTree.addItem(params);
		};
		
		let getItem = self.getItem = (key) => {
			//REQUIRED: key
			
			return fileTree.getItem(key);
		};
		
		let removeItem = self.removeItem = (key) => {
			//REQUIRED: key
			
			fileTree.removeItem(key);
		};
		
		let clearFileTree = self.clearFileTree = () => {
			fileTree.removeAllItems();
		};
		
		let editorOpenedInfos = [];
		EACH(editorOpenedStore.all(), (scrollTop, path) => {
			editorOpenedInfos.push({
				path : path,
				scrollTop : scrollTop
			});
		});
		
		let init = self.init = (params) => {
			//REQUIRED: params
			//REQUIRED: params.showHome
			//REQUIRED: params.load
			//REQUIRED: params.save
			
			showHomeHandler = params.showHome;
			loadHandler = params.load;
			saveHandler = params.save;
			
			self.appendTo(BODY);
			
			if (editorOpenedInfos.length === 0) {
				showHomeHandler(self);
			} else {
				
				NEXT(editorOpenedInfos, (editorOpenedInfo, next) => {
					loadAndOpenEditor(editorOpenedInfo.path, editorOpenedInfo.scrollTop, next);
				});
			}
		};
		
		let load = self.load = (path, openEditor) => {
			loadHandler(path, openEditor);
		};
		
		let save = self.save = (activeTab) => {
			saveHandler(activeTab);
		};
	}
});
