import "dotenv/config";

class Config {
    public readonly obs = {
        host: process.env.OBS_HOST ?? "127.0.0.1",
        port: Number(process.env.OBS_PORT ?? 4455),
        password: this.requireEnv("OBS_PASSWORD")
    }

    private requireEnv(name: string): string {
        const value: string | undefined = process.env[name];

        if (!value) {
            throw new Error(`Missing environment variable: ${name}`);
        }

        return value;
    }
}

export default new Config();