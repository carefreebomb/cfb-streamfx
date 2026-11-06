import WebServer from "./WebServer.js";

export default class CFBStreamFX {
    private webserver: WebServer;

    constructor() {
        this.webserver = new WebServer();
    }
}