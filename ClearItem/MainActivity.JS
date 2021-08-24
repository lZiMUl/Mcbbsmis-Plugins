class MainActivity {
	constructor (Socket) {
		let [SI, SII, Status] = [null, null, false];
		let ST = 30;
		let SU = 3;
		const PackageName = 'ClearItem';
		Socket ['SendMTM'] (PackageName, '§c歡迎使用 §d延遲清理掉落物插件');
		Socket ['Input'] (Data => {
			switch (Data [1]) {
				case 'On':
					if (!Status) {
						Status = true;
						Socket ['SendMTM'] (PackageName, '§a開啟成功');
						SI = setInterval (Event => {
							Socket ['SendMTM'] (PackageName, `§e${SU} 秒後開始清理掉落物, 請做好準備`);
							setTimeout (Event => {
								Socket ['SendCMD'] ('Kill @e [Type = Item]');
								Socket ['SendMTM'] (PackageName, '§a清理完成');
							}, SU * 1000);
						}, (ST - SU) * 1000);
					} else
					Socket ['SendMTM'] (PackageName, '§4已經開啟了，無法再次開啟');
				break;

				case 'Off':
					if (Status) {
						Status = false;
						clearInterval (SI);
						clearTimeout (SII);
						Socket ['SendMTM'] (PackageName, '§4關閉成功');
					} else
					Socket ['SendMTM'] (PackageName, '§4已經關閉了，無法再次關閉');
				break;

				case 'SetTime':
					Status = true;
					if (parseInt (new Number (Data [2])) - SU >= SU) {
						ST = parseInt (new Number (Data [2]) * 2);
						Socket ['SendMTM'] (PackageName, `§b成功設置延遲為 ${ST / 2} 秒`);
					} else {
						Socket ['SendMTM'] (PackageName, `§e由於你設置延遲秒數太小 已默認設置最小值 6 秒`);
						ST = 12;
					};
					clearInterval (SI);
					clearTimeout (SII);
					SI = setInterval (Event => {
						Socket ['SendMTM'] (PackageName, `§e${SU} 秒後開始清理掉落物, 請做好準備`);
						SII = setTimeout (Event => {
							Socket ['SendCMD'] ('Kill @e [Type = Item]');
							Socket ['SendMTM'] (PackageName, '§a清理完成');
							}, SU * 1000);
					}, (ST - SU) * 1000);
				break;
				
				default:
				Socket ['SendMTM'] (PackageName, '§4為找到此屬性')
			}
		})
	}
}