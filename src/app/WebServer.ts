import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import { readFileSync } from "fs";
import path from "path";

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

        await this.server.listen({
            port,
            host: "127.0.0.1"
        });
    }

    public async stop(): Promise<void> {
        await this.server.close();
    }
}