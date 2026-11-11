import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient, ChatMessage } from "@twurple/chat";

export class TwitchChatHandler {
    private chat: ChatClient;
    private channel: string;
    
    constructor(authProvider: StaticAuthProvider, channel: string) {
        this.chat = new ChatClient({
            authProvider: authProvider,
            channels: [channel]
        });
        this.channel = channel;
        this.connect();
    }

    private async connect(): Promise<void> {
        this.chat.connect();
        console.log(`Connected to twitch chat: ${this.channel}`);
        this.chat.onMessage((channel: string, user: string, text: string, msg: ChatMessage) => {
            console.log(`[${msg.date.toLocaleTimeString()}] ${msg.userInfo.displayName}: ${text}`);
        });
    }
}