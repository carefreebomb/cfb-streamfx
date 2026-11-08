import { OBSWebSocket, OBSEventTypes, OBSRequestTypes, OBSResponseTypes } from "obs-websocket-js";
import config from "./Config.js";

export class OBSSocket {
    private obs: OBSWebSocket;

    private currentScene!: string;
    
    constructor() {
        this.obs = new OBSWebSocket();
        this.connect();
        this.registerEventHandlers();
    }

    private async connect(): Promise<void> {
        try {
            const {
                obsWebSocketVersion,
                negotiatedRpcVersion
            } = await this.obs.connect(`${config.obs.host}:${config.obs.port}`, config.obs.password, { rpcVersion: 1  });
            console.log(`Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);

            this.currentScene = await this.getCurrentSceneName();
        } catch (error: unknown) {
            console.log(`Failed to connect to OBS websocket.`);
        }
    }

    public async call<T extends keyof OBSRequestTypes>(requestType: T, requestData?: OBSRequestTypes[T]): Promise<OBSResponseTypes[T]> {
        return await this.obs.call(requestType, requestData);
    }

    // EVENT HANDLERS

    private async registerEventHandlers(): Promise<void> {
        this.obs.on("StreamStateChanged", (data: OBSEventTypes["StreamStateChanged"]) => {
            if (data.outputState === "OBS_WEBSOCKET_OUTPUT_STARTED") {
                console.log("STREAM STARTED!");
            } else if (data.outputState === "OBS_WEBSOCKET_OUTPUT_STOPPED") {
                console.log("STREAM STOPPED!");
            }
        });
    }

    // STREAM OUTPUT

    public async startStream(): Promise<void> {
        await this.call("StartStream");
    }

    public async stopStream(): Promise<void> {
        await this.call("StopStream");
    }

    // SCENES

    public async getCurrentSceneName(): Promise<string> {
        const scene: OBSResponseTypes['GetCurrentProgramScene'] = await this.obs.call('GetCurrentProgramScene');
        return scene.sceneName;
    }

    public async setScene(sceneName: string): Promise<void> {
        await this.call("SetCurrentProgramScene", { "sceneName" : sceneName });
    }
}
