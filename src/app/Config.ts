import "dotenv/config";

class Config {
    private requireEnv(name: string): string {
        const value: string | undefined = process.env[name];
        if (!value) {
            throw new Error(`Missing environment variable: ${name}`);
        }
        return value;
    }

    public readonly discord = {
        secret: this.requireEnv("DISCORD_BOT_SECRET")
    }

    public readonly obs = {
        host: process.env.OBS_HOST ?? "127.0.0.1",
        port: Number(process.env.OBS_PORT ?? 4455),
        password: this.requireEnv("OBS_PASSWORD")
    }

    public readonly twitch = {
        channel: this.requireEnv("TWITCH_CHANNEL"),
        channelId: this.requireEnv("TWITCH_CHANNEL_ID"),
        clientId: this.requireEnv("TWITCH_CLIENT_ID"),
        clientSecret: this.requireEnv("TWITCH_CLIENT_SECRET"),
        accessToken: this.requireEnv("TWITCH_ACCESS_TOKEN"),
        refreshToken: this.requireEnv("TWITCH_REFRESH_TOKEN"),
        botToken: this.requireEnv("TWITCH_BOT_TOKEN")
    }
}

export default new Config();