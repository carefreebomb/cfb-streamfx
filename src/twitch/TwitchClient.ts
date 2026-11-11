import { StaticAuthProvider } from "@twurple/auth";
import { TwitchChatHandler } from "./TwitchChatHandler.js";
import config from "./../app/Config.js";

export class TwitchClient {
    private authProvider: StaticAuthProvider;
    private chat: TwitchChatHandler;

    constructor() {
        this.authProvider = new StaticAuthProvider(
            config.twitch.clientId,
            config.twitch.accessToken
        );
        this.chat = new TwitchChatHandler(this.authProvider, config.twitch.channel);
    }
}