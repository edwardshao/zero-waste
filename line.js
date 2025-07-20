class LineBotAPI {
    constructor() {
        this.baseURL = 'https://api.line.me/v2/bot';
    }

    Client(config) {
        if (!config.channelAccessToken) {
            throw new Error('Channel access token is required');
        }

        this.accessToken = config.channelAccessToken;
        return this;
    }

    replyMessage(replyToken, messages) {
        if (!this.accessToken) {
            throw new Error('Client is not initialized. Call Client() first.');
        }

        const url = `${this.baseURL}/message/reply`;
        const payload = {
            replyToken: replyToken,
            messages: Array.isArray(messages) ? messages : [messages]
        };

        const options = {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            'payload': JSON.stringify(payload)
        };

        try {
            const response = UrlFetchApp.fetch(url, options);
            return JSON.parse(response.getContentText());
        } catch (error) {
            throw new Error(`Failed to reply message: ${error.message}`);
        }
    }

    pushMessage(to, messages) {
        if (!this.accessToken) {
            throw new Error('Client is not initialized. Call Client() first.');
        }

        const url = `${this.baseURL}/message/push`;
        const payload = {
            to: to,
            messages: Array.isArray(messages) ? messages : [messages]
        };

        const options = {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            },
            'payload': JSON.stringify(payload)
        };

        try {
            const response = UrlFetchApp.fetch(url, options);
            return JSON.parse(response.getContentText());
        } catch (error) {
            throw new Error(`Failed to push message: ${error.message}`);
        }
    }
}