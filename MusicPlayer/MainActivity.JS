class MainActivity {
	constructor (Socket) {
		const {exec} = require ('child_process');
		const Root = Socket ['ModulesList'] ['Path'] ['join'] (Socket ['ModulesList'] ['Path'] ['resolve'] (), './Mcbbsmis/Plugins/MusicPlayer/Musics/');
		const PackageName = 'MusicPlayer';
		Socket ['SendMTM'] (PackageName, '§c歡迎使用 §d音樂播放器插件');
		Socket ['ModulesList'] ['Fs'] ['exists'] (Socket ['LWPC'] (Root), Status => {
			if (!Status)
			Socket ['ModulesList'] ['Fs'] ['mkdir'] (Socket ['LWPC'] (Root), Status => null);
		});
		Socket ['Input'] (Data => {
			const MusicPath = Socket ['LWPC'] (Socket ['ModulesList'] ['Path'] ['join'] (Root, `${Data [2]}.mp3`));
			switch (Data [1]) {
				case 'Play':
					if (Data [2] === undefined) {
						Socket ['SendMTM'] (PackageName, '§4請輸入歌名');
						return null;
					};
					Socket ['ModulesList'] ['Fs'] ['exists'] (MusicPath, Status => {
						if (Status) {
							Socket ['SendMTM'] (PackageName, `§a正在播放 §e=> §9[§b${Data [2]}§9]`);
							if (MusicPath ['indexOf'] ('/') === -1) {
								exec (`start /min "" wmplayer.exe ${MusicPath}`);
							} else {
								exec (`termux-media-player play ${MusicPath}`);
							}
						} else {
							Socket ['SendMTM'] (PackageName, '§4音樂資源不存在，請檢查是否輸入正確');
						}
					})
				break;

				case 'List':
					Socket ['ModulesList'] ['Fs'] ['readdir'] (Socket ['LWPC'] (Root), (Err, Result) => {
						if (!Err) {
							const MusicList = new Array;
							if (Result ['length'] === 0)
								Socket ['SendMTM'] (PackageName, '§4當前音樂資源為空');
								else
								Result ['forEach'] (Value => {
									if (Socket ['ModulesList'] ['Path'] ['extname'] (Value) === '.mp3')
									MusicList ['push'] (Value ['replace'] ('.mp3', ''));
								});
								Socket ['SendMTM'] (PackageName, `§a音樂資源 §e=> §d[§b${MusicList ['join'] ('§d, §b')}§d]`);
						}
					});
				break;

				default:
				Socket ['SendMTM'] (PackageName, '§4為找到此屬性');
			}
		})
	}
}
