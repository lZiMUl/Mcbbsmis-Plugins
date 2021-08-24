class MainActivity {
	constructor (Socket) {
		const PackageName = 'AgentMining';
		let [SPos, EPos, Stock] = new Array (null, null, null);
		let Core = null;
		let Status = false;
		let [Length, Width] = new Array (null, null);
		let AreaIndex = 0;
		let [XD, ZD] = new Array (null, null);
		this ['Dynamic'] = new Array;
		this ['getCoordinate'] (Socket ['Core']);

		Socket ['Input'] (Data => {
			switch (Data [1]) {
				case 'SetSPos':
					SPos = this ['Dynamic'];
					Socket ['SendMTM'] (PackageName, '§a已設置並更新起點');
				break;
				
				case 'SetEPos':
					EPos = this ['Dynamic'];
					XD = SPos [0] < EPos [0]? true: false
					ZD = SPos [2] < EPos [2]? true: false
					this ['Length'] = SPos [0] - EPos [0];
					this ['Width'] = SPos [2] - EPos [2];
					this ['Area'] = parseInt (this ['Length']) * parseInt (this ['Width']);
					if (this ['Area'] < 250000) {
						Socket ['SendMTM'] (PackageName, '§a已設置並更新終點');
					} else {
						EPos = null
						Socket ['SendMTM'] (PackageName, '§a區域選擇面積過大無法設置');
					}
				break;
				
				case 'SetStock': 
					Stock = this ['Dynamic'];
					Socket ['SendMTM'] (PackageName, '§a已設置並更新物品收集位置');
				break;
				
				case 'Run':
					if (!Status && SPos && EPos && Stock) {
						Status = true;
						Socket ['SendMTM'] (PackageName, '§a正在計算區域單層面積');
						Socket ['SendMTM'] (PackageName, `§e長: [${this ['Length']}]; 寬: [${this ['Width']}]; 面積: [${this ['Area']}]`);
						clearInterval (Core);
						Transmission (...SPos);
						let [SubLength, SubWidth] = new Array (0, 0);
						Core = setInterval (() => {
							if (SubLength === this ['Width']) {
								this ['Transmission'] (...SPos);
							};
							if (SubLength ++ === this ['Length']) {
								Socket ['SendCMD'] ('agent destroy down');
								Transmission (XD? SubLength --: SubLength ++, SPos [1], SPos [2])
							} else {
								SubLength = 0;
								Transmission (SPos [0], SPos [1], ZD? SubWidth --: SubWidth ++);
							}
						}, 1000);
					}
				break;
				
				case 'Stop': 
					if (Status) {
						Status = false;
						clearInterval (Core);
						this ['Transmission'] (...SPos);
						Socket ['SendMTM'] (PackageName, '§4已停止');
					}
				break;
				
				default:
				Socket ['SendMTM'] (PackageName, '§4為找到此屬性');
			}
		})
	};
	
	getCoordinate (Socket) {
		Socket ['on'] ('message', Data => {
			let ParseData = JSON ['parse'] (new String (Data));
			if (ParseData ['body'] ['eventName'] === 'PlayerTransform') {
				this ['Dynamic'] [0] = parseInt (ParseData ['body'] ['properties'] ['PosX']);
				this ['Dynamic'] [1] = parseInt (ParseData ['body'] ['properties'] ['PosY']);
				this ['Dynamic'] [2] = parseInt (ParseData ['body'] ['properties'] ['PosZ']);
			}
		})
	}
	
	Transmission (X, Y, Z) {
		Socket ['SendCMD'] (`agent tp ${X} ${Y} ${Z}`);
	}
}