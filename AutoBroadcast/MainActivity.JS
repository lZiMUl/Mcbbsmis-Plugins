class MainActivity {
	constructor (Socket) {
		const {exec} = require ('child_process');
		
		//彈幕播報
		Socket ['Live'] ['on'] ('DANMU_MSG', Message => {
			let User = Message ['info'] [2];
			let ParseMessage = Message ['info'] [1];
			if (!Socket ['JudgeUsersExist'] (User [1], Socket ['Interactives'] ['BarrageBlacklists']))
			exec (`termux-tts-speak "${User [1]}說${Message ['info'] [1] ['replace'] (new RegExp ('@e', 'img'), '')}"`);
		});
		
		//禮物播報
		Socket ['Live'] ['on'] ('SEND_GIFT', Message => {
			exec (`termux-tts-speak "感謝${Message ['data'] ['uname']}老闆${Message ['data'] ['action']}了${Message ['data'] ['num']}個${Message ['data'] ['giftName']}"`);
		});
	}
}