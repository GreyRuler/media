import Chat from './Chat';

export default class Root {
	static get selectorChatContainer() {
		return '.chat-container';
	}

	static init() {
		this.chatContainer = document.querySelector(Root.selectorChatContainer);
		const chat = new Chat(this.chatContainer);
		chat.init();
	}
}
