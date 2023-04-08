import Message from './Message';
import ModalCustom from './ModalCustom';

export default class Chat {
	static get selectorMessageChat() {
		return '.message_chat';
	}

	static get selectorMessagesChat() {
		return '.messages_chat';
	}

	static get markup() {
		return `
			<div class="chat">
				<div class="messages_chat"></div>
				<input type="text" class="message_chat form-control"
					   placeholder="Username">
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
