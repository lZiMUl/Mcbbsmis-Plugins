class MainActivity {
	static Cache = [];

	constructor (Socket) {
		const {exec} = require ('child_process');
		let Switch = true;
		
		//彈幕播報
		Socket ['Live'] ['on'] ('DANMU_MSG', Message => {
			let User = Message ['info'] [2];
			let ParseMessage = Message ['info'] [1];
			if (!Socket ['JudgeUsersExist'] (User [1], Socket ['Interactives'] ['BarrageBlacklists']))
			MainActivity ['Cache'] ['push'] (`${User [1]}說${Message ['info'] [1] ['replace'] (new RegExp ('@e', 'img'), '')}`);
		});
		
		//禮物播報
		Socket ['Live'] ['on'] ('SEND_GIFT', Message => {
			MainActivity ['Cache'] ['push'] (`感謝${Message ['data'] ['uname']}老闆${Message ['data'] ['action']}了${Message ['data'] ['num']}個${Message ['data'] ['giftName']}`);
		});
		
		setInterval (() => {
			if (Switch && MainActivity ['Cache'] ['length'] !== 0) {
				Switch = false;
				this ['Broadcast'] (MainActivity ['Cache'] ['shift'] ());
			} else if (MainActivity ['Cache'] ['length'] === 0)
			Switch = true;
		}, 500)
	};
	
	Broadcast (Message) {
		exec (`termux-tts-speak "${Message}"`, Err => {
			if (MainActivity ['Cache'] ['length'] !== 0)
			Broadcast (MainActivity ['Cache'] ['shift'] ());
		})
	}
}
