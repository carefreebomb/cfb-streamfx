import chalk from "chalk";

class Logger {
    constructor() {

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
}

export default new Logger();