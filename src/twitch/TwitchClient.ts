import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { TwitchChatHandler } from "./TwitchChatHandler.js";
import config from "./../app/Config.js";
import type { EventSubChannelRedemptionAddEvent } from "@twurple/eventsub-base";

export class TwitchClient {
    private authProvider: StaticAuthProvider;
    private api: ApiClient;
    private chat: TwitchChatHandler;
    private eventSub: EventSubWsListener;

    constructor() {
        this.authProvider = new StaticAuthProvider(
            config.twitch.clientId,
            config.twitch.accessToken
        );
        this.api = new ApiClient({ authProvider: this.authProvider });
        this.chat = new TwitchChatHandler(this.authProvider, config.twitch.channel);
        this.eventSub = new EventSubWsListener({ apiClient: this.api });

        this.connectEventSub();
    }

    private async connectEventSub(): Promise<void> {
        this.eventSub.start();
        this.eventSub.onChannelRedemptionAdd(
            config.twitch.channelId,
            (redeem: EventSubChannelRedemptionAddEvent) => {
                console.log(`[${redeem.redemptionDate.toLocaleTimeString()}]: ${redeem.userDisplayName} redeemed ${redeem.rewardTitle} for ${redeem.rewardCost} channel points.`);
            }
        )
    }
}