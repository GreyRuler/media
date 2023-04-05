export default class Message {
	static get selectorDate() {
		return '.date_message';
	}

	static get selectorText() {
		return '.text_message';
	}

	static get selectorCoords() {
		return '.coords';
	}

	static get markup() {
		return `
			<div class="message">
				<div class="title_message mute_text">
					<div class="user_message"></div>
					<div class="date_message"></div>
				</div>
				<div class="text_message"></div>
				<div class="mute_text coords"></div>
			</div>
		`;
	}

	constructor(container, message = { date: '', text: '', coords: '' }) {
		this.container = container;
		this.message = message;
	}

	bindToDOM() {
		this.container.innerHTML = Message.markup;

		const date = this.container.querySelector(
			Message.selectorDate,
		);
		const text = this.container.querySelector(
			Message.selectorText,
		);
		const coords = this.container.querySelector(
			Message.selectorCoords,
		);

		date.textContent = this.message.date;
		text.textContent = this.message.text;
		coords.textContent = this.message.coords;
	}
}
