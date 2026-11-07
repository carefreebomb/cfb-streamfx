import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import websocket from "@fastify/websocket";
import { readFileSync } from "fs";
import path from "path";
import type { RawData } from "ws";

export default class WebServer {
    private server: FastifyInstance;

    constructor() {
        this.server = Fastify({
            logger: true,
            https: {
                key: readFileSync(path.resolve("./config/certs/localhost-key.pem")),
                cert: readFileSync(path.resolve("./config/certs/localhost.pem"))
            }
        });

        this.start();
    }

    public async start(port: number = 8038): Promise<void> {
        this.registerWebsocket();

        this.registerStaticServer();
        
        await this.server.listen({
            host: "127.0.0.1",
            port: port
        });
    }

    public async stop(): Promise<void> {
        await this.server.close();
    }

    private async registerWebsocket(): Promise<void> {
        await this.server.register(websocket);
        this.server.get("/ws", { websocket: true }, (socket, request) => {
            console.log("Fastify websocket client connected.");

            socket.on("message", (message: RawData) => {
                console.log(message.toString());
            });

            socket.send("Fastify websocket connected.");
        });
    }

    private async registerStaticServer(): Promise<void> {
        await this.server.register(fastifyStatic, {
            root: path.resolve("overlay"),
            prefix: "/"
        });

        this.server.get("/api/status", async () => {
            return {
                running: true,
                application: "CFB StreamFX"
            };
        });
    }
}