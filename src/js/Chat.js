import Message from './Message';
import ModalCustom from './ModalCustom';

export default class Chat {
	static get selectorMessageChat() {
		return '.message_chat';
	}

	static get selectorMessagesChat() {
		return '.messages_chat';
	}

	static get selectorPanelRecord() {
		return '.panel-record';
	}

	static get selectorBtnAudio() {
		return '.btn-audio';
	}

	static get selectorBtnRecordAudio() {
		return '.panel-record-audio .btn-record';
	}

	static get selectorBtnCancelRecordAudio() {
		return '.panel-record-audio .btn-cancel';
	}

	static get markup() {
		return `
			<div class="chat">
				<div class="messages_chat"></div>
				<div class="input-group">
					<input type="text" class="message_chat form-control"
						   placeholder="Username">
					<div class="input-group-text">
						<div class="panel-record">
							<button class="btn-control btn-audio"
							type="button"></button>
							<button class="btn-control btn-video"
							type="button"></button>
						</div>
						<div class="panel-record-audio d-none">
							<button class="btn-control btn-record"
									type="button"></button>
							<button class="btn-control btn-cancel"
									type="button"></button>
						</div>
						<div class="panel-record-video d-none">
							<button class="btn-control btn-record"
									type="button"></button>
							<button class="btn-control btn-cancel"
									type="button"></button>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	constructor(container) {
		this.container = container;
	}

	init() {
		this.bindToDOM();
		this.registerEvents();
	}

	bindToDOM() {
		this.container.innerHTML = Chat.markup;
	}

	registerEvents() {
		const messageInput = this.container.querySelector(
			Chat.selectorMessageChat,
		);
		const chat = this.container.querySelector(
			Chat.selectorMessagesChat,
		);
		messageInput.addEventListener('keyup', async (event) => {
			if (event.key === 'Enter') {
				const text = messageInput.value;

				if (!text) return;

				const coords = await this.getLocation();

				const date = new Date();
				const currentDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
				const sendMessage = {
					date: currentDate,
					text,
					coords,
				};

				const messageContainer = document.createElement('div');
				const message = new Message(messageContainer, sendMessage);
				message.bindToDOM();
				chat.prepend(messageContainer);

				messageInput.value = '';
			}
		});

		const btnAudio = this.container.querySelector(
			Chat.selectorBtnAudio,
		);
		btnAudio.addEventListener('click', async () => {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			const recorder = new MediaRecorder(stream);
			const chunks = [];

			recorder.addEventListener('start', () => {
				console.log('start');
			});

			recorder.addEventListener('start', (event) => {
				chunks.push(event.data);
			});

			recorder.addEventListener('stop', () => {
				const blob = new Blob(chunks);

				audioPlayer.src = URL.createObjectURL(blob);
			});

			recorder.start();

			audioStop.addEventListener('click', () => {
				recorder.stop();
				stream.getTracks().forEach((track) => track.stop());
			});
		});
	}

	// eslint-disable-next-line class-methods-use-this
	getLocation() {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition((data) => {
				resolve(`${data.coords.latitude} ${data.coords.longitude}`);
			}, function () {
				const modal = new ModalCustom(
					document.querySelector(ModalCustom.selectorModal),
				);
				modal.show();
				resolve(modal.getCoords());
			});
		});
	}
}
