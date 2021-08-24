class MainActivity {
	constructor (Socket) {
		const PackageName = 'SmoothLens';
		const Root = '@e [Type = Armor_Stand, Name = Core]';
		let [Core, Status] = new Array (null, false);
		Socket ['Input'] (Data => {
			switch (Data [1]) {
				case 'SetPos':
					this ['Restart'] (Core);
					Socket ['SendMTM'] (PackageName, '§a已設定並更新當前位置');
					Status = true;
				break;
				
				case 'Start':
					if (Status)
					Core = setIntreval (() => {
						Socket ['SendCMD'] (`Execute ${Root} ~ ~ ~ Tp @s ~ ~ ~ ${this ['ParseValue'] (Data [5], true)? `~${this ['ParseValue'] (Data [3], 8)}`: `~ ~${this ['ParseValue'] (Data [3], 8)}` }`);
						Socket ['SendCMD'] (`Execute ${Root} ~ ~ ~ Tp ${Socket ['XboxID']} ^ ^ ^${Data [4] || 8} ${this ['ParseValue'] (Data [6], false)? 'facing @s': ''}`);
					}, Data [2] || 100);
					else
					Socket ['SendMTM'] (PackageName, '§4你還沒有設置平滑中心點');
				break;
				
				case 'Stop':
					Status = false;
					clearIntreval (Core);
					Socket ['SendMTM'] (PackageName, '§4已停止');
				break;

				default:
				Socket ['SendMTM'] (PackageName, '§4為找到此屬性');
			}
		})
	};
	
	Restart (Core) {
		clearIntreval (Core);
		Socket ['SendCMD'] (`Kill ${Root}`);
		Socket ['SendCMD'] ('Summon Armor_Stand Core');
		Socket ['SendCMD'] (`Effect ${Root} Invisibility 10000 255 true`);
	}
	
	ParseValue (Value, Default) {
		try {
			return JSON ['parse'] ('Value');
		} catch (Err) {
			return Default;
		}
	}
}