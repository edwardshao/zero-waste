class EventsProcessor {
    constructor(line_bot_api) {
        this.line_bot_api = line_bot_api;
    }

    /**
     * 處理訊息的主要函數
     * @param {Object} event - LINE event 物件
     */
    handleMessage(event) {
        this.handleGeneralMessage(event);
    }

    /**
     * 處理一般訊息
     * @param {Object} event - LINE event 物件
     */
    handleGeneralMessage(event) {
        if (event.message.text.trim().toLowerCase() === 'show me the id') {
            this.handleShowMeTheId(event);
        }
    }

    handleShowMeTheId(event) {
        // reply with the user ID or groupId or roomId
        let replyText = '';
        if (event.source.type === 'user') {
            replyText = 'Your user ID is: ' + event.source.userId;
        } else if (event.source.type === 'group') {
            replyText = 'Your group ID is: ' + event.source.groupId;
        } else if (event.source.type === 'room') {
            replyText = 'Your room ID is: ' + event.source.roomId;
        } else {
            console.warn("Unknown source type: " + event.source.type);
            return null;
        }
        this.line_bot_api.replyMessage(event.replyToken, {
            type: 'text',
            text: replyText
        });
    }
}