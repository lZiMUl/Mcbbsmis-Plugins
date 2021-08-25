class MainActivity {
	constructor (Socket) {
		const PackageName = 'SmoothLens';
		const Root = '@e [Type = Armor_Stand, Name = Core]';
		let [Core, Status, SubStatus] = new Array (null, false, true);
		Socket ['SendMTM'] (PackageName, '§c歡迎使用 §d平滑鏡頭插件');
		Socket ['Input'] (Data => {
			switch (Data [1]) {
				case 'SetPos':
					clearTimeout (this ['Timer']);
					clearInterval (Core);
					Socket ['SendCMD'] (`Kill ${Root}`);
					Socket ['SendCMD'] ('Summon Armor_Stand Core');
					Socket ['SendCMD'] (`Effect ${Root} Invisibility 10000 255 true`);
					Socket ['SendMTM'] (PackageName, '§a已設定並更新當前位置');
					Status = true;
					SubStatus = true;
				break;
				
				case 'Start':
					if (SubStatus)
					if (Status) {
						SubStatus = false;
						this ['Timer'] = setTimeout (() => {
							SubStatus = true;
							clearInterval (Core);
							Socket ['SendMTM'] (PackageName, '§4已停止');
						}, (Data [2] || 20) * 1000);
						Core = setInterval (() => {
							Socket ['SendCMD'] (`Execute ${Root} ~ ~ ~ Tp @s ~ ~ ~ ~${this ['ParseValue'] (Data [4], 1)}`);
							Socket ['SendCMD'] (`Execute ${Root} ~ ~ ~ Tp ${Socket ['ServiceConfig'] ['Minecraft'] ['XboxID']} ^ ^${Data [5] || 0} ^${Data [5] || 20} ${this ['ParseValue'] (Data [7], false)? 'Facing @s': ''}`);
						}, Data [3] || 100);
					} else
					Socket ['SendMTM'] (PackageName, '§4你還沒有設置平滑中心點');
				break;
				
				case 'Stop':
					SubStatus = true;
					clearTimeout (this ['Timer']);
					clearInterval (Core);
					Socket ['SendMTM'] (PackageName, '§4已強制停止');
				break;

				default:
				Socket ['SendMTM'] (PackageName, '§4為找到此屬性');
			}
		})
	};
	
	ParseValue (Value, Default) {
		try {
			return JSON ['parse'] (Value);
		} catch (Err) {
			return Default;
		}
	}
}