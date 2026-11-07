import { OBSWebSocket, OBSEventTypes, OBSRequestTypes, OBSResponseTypes } from "obs-websocket-js";
import config from "./Config.js";

export class OBSSocket {
    private obs: OBSWebSocket;

    private currentScene!: string;
    
    constructor() {
        this.obs = new OBSWebSocket();
        this.connect();
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

    public async getCurrentSceneName(): Promise<string> {
        const scene: OBSResponseTypes['GetCurrentProgramScene'] = await this.obs.call('GetCurrentProgramScene');
        return scene.sceneName;
    }
}
