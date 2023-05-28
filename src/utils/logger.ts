interface Config {
    level: 'info' | 'warn' | 'error'
}

export default class Logger {
    private static config: Config = {
        level: 'info'
    }

    static setConfig(config: Config) {
        this.config = config
    }

    static error(...args: any[]) {
        console.error('[ERROR]', ...args)
    }

    static warn(...args: any[]) {
        if (['info', 'warn'].includes(this.config.level)) console.warn('[WARN]', ...args)
    }

    static info(...args: any[]) {
        if (['info'].includes(this.config.level)) console.info('[INFO]', ...args)
    }
}