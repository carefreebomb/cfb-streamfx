import { StaticAuthProvider } from "@twurple/auth";
import { ChatClient, ChatMessage } from "@twurple/chat";
import config from "./../app/Config.js";
import logger from "../app/Logger.js";

export class TwitchChatHandler {
    private broadcaster: ChatClient;
    private bot: ChatClient;
    private channel: string;
    
    constructor(authProvider: StaticAuthProvider, channel: string) {
        this.broadcaster = new ChatClient({
            authProvider: authProvider,
            channels: [channel]
        });
        this.bot = new ChatClient({
            authProvider: new StaticAuthProvider(config.twitch.clientId, config.twitch.botToken),
            channels: [channel]
        })
        this.channel = channel;
        this.connect();
    }

    private async connect(): Promise<void> {
        this.broadcaster.connect();
        this.bot.connect();
        logger.twitch(`[INFO] Connected to channel \"${this.channel}\"`);
        this.bot.onMessage((channel: string, user: string, text: string, msg: ChatMessage) => {
            logger.twitch(`[CHAT] ${msg.userInfo.displayName}: ${text}`);
        });
    }

    public async disconnectBroadcaster(): Promise<void> {
        try {
            this.broadcaster.quit();
        } catch (error: unknown) {
            logger.twitch("Failed to disconnect broadcaster account from chat", error);
        }
    }

    public async disconnectBot(): Promise<void> {
        try {
            this.bot.quit();
        } catch (error: unknown) {
            logger.twitch("Failed to disconnect bot account from chat", error);
        }
    }
}