import { OBSSocket } from "./OBSSocket.js";
import { TwitchClient } from "../twitch/TwitchClient.js";
import WebServer from "./WebServer.js";

export default class CFBStreamFX {
    //private obs: OBSSocket;
    private twitch: TwitchClient;
    //private webserver: WebServer;

    constructor() {
        //this.obs = new OBSSocket();
        this.twitch = new TwitchClient();
        //this.webserver = new WebServer();
    }
}