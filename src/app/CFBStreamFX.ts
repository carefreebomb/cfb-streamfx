import { OBSSocket } from "./OBSSocket.js";
import WebServer from "./WebServer.js";

export default class CFBStreamFX {
    private obs: OBSSocket;
    private webserver: WebServer;

    constructor() {
        this.obs = new OBSSocket();
        this.webserver = new WebServer();
    }
}