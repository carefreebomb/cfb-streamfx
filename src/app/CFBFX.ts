import { OBSSocket } from "./OBSSocket.js";
import { TwitchClient } from "../twitch/TwitchClient.js";
import { WebServer } from "./WebServer.js";
import logger from "./Logger.js";

export default class CFBFX {
    //private obs: OBSSocket;
    private twitch: TwitchClient;
    //private webserver: WebServer;

    constructor() {
        logger.asciiBanner();
        //this.obs = new OBSSocket();
        this.twitch = new TwitchClient();
        //this.webserver = new WebServer();
    }
}