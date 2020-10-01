class Timer {
	constructor(duartionInput, startBtn, pauseBtn, callbacks) {
		this.duartionInput = duartionInput;
		this.startBtn = startBtn;
		this.pauseBtn = pauseBtn;
		this.onstart = callbacks.onstart;
		this.onreduce = callbacks.onreduce;
		this.onstop = callbacks.onstop;
		this.onpause = callbacks.onpause;
		this.startBtn.addEventListener('click', this.start);
		this.pauseBtn.addEventListener('click', this.pause);
	}
	start = () => {
		if (this.timerid) clearInterval(this.timerid);
		const val = this.duartionInput.value;
		if (isNaN(val)) {
			alert('INVALID FORMAT');
		} else if (val > 0) {
			this.onstart(parseFloat(val));
			this.reduce();
			this.timerid = setInterval(this.reduce, 10);
		}
	};
	pause = () => {
		if (this.timerid) {
			this.onpause();
			clearInterval(this.timerid);
		}
	};
	reduce = () => {
		const val = parseFloat(this.duartionInput.value);
		if (val <= 0) {
			this.onstop();
			clearInterval(this.timerid);
			this.duartionInput.value = '0.00';
		} else {
			this.duartionInput.value = (val - 0.01).toFixed(2);
		}
		this.onreduce(val);
	};
}
const duartionInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');

const radius = circle.getAttribute('r');
const perimeter = Math.PI * parseInt(radius) * 2;
circle.setAttribute('stroke-dasharray', perimeter);
let totaltime;

const callbacks = {
	onstart(startTime) {
		totaltime = startTime;
		console.log('started', startTime);
	},
	onreduce(timerRemaining) {
		const reduce = perimeter * (timerRemaining / totaltime) - perimeter;
		circle.setAttribute('stroke-dashoffset', reduce);
	},
	onpause() {
		console.log('paused');
	},
	onstop() {
		console.log('ended');
	}
};
const timer = new Timer(duartionInput, startBtn, pauseBtn, callbacks);
