import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

class Logger {
    constructor() {

    }

    public app(message: string, ...data: unknown[]): void {
        this.log(chalk.hex("#DD0012")(`[APP] ${message}`));
    }

    public twitch(message: string, ...data: unknown[]): void {
        this.log(chalk.hex("#9146FF")(`[TWITCH] ${message}`));
    }

    public log(message: string, ...data: unknown[]): void {
        const dateTime: string = this.getDateTimeStr();
        console.log(`${chalk.gray(`[${dateTime}]`)} ${message}`);
    }

    private getDateTimeStr(): string {
        const today: Date = new Date();
        const ms: string = today.getMilliseconds().toString().padStart(3, "0");
        const time: string = today.toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const timeStr: string = time.substring(0, time.length - 3) + "." + ms + time.substring(time.length - 3);
        const dateStr: string = today.toLocaleDateString("en-CA"); // YYYY-MM-DD
        return `${dateStr} ${timeStr}`;
    }

    public asciiBanner(): void {
        const banner: string = readFileSync(
            join(dirname(fileURLToPath(import.meta.url)), "../../assets/asciiBanner.ansi"),
            "utf8",
        ).replace(/\\033/g, "\x1b");
        console.log(banner);
        console.log(chalk.hex("#AA0000")("THERE IS NO CAUSE FOR CONCERN - PLEASE REMAIN CALM"));
        console.log(chalk.hex("#AA0000")("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    }
}

export default new Logger();