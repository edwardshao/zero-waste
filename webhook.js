function doPost(e) {
    const lineBot = new LineBotAPI().Client({
        channelAccessToken: PropertiesService.getScriptProperties().getProperty("LINE_CH_ACCESS_TOKEN")
    });

    const eventsProcessor = new EventsProcessor(lineBot);

    // dump the event object for debugging
    console.log("doPost called with event: " + JSON.stringify(e));

    // make sure the request is valid
    if (!e.postData || !e.postData.contents) {
        console.error("Invalid request: " + JSON.stringify(e));
        return;
    }

    // make sure the event is a message event and has a text message
    let postContents;
    try {
        postContents = JSON.parse(e.postData.contents);
    } catch (error) {
        console.error("Error parsing post data: " + error);
        return;
    }
    if (!postContents.events || postContents.events.length === 0) {
        console.error("No events found in the request: " + JSON.stringify(postContents));
        return;
    }

    const events = postContents.events;
    let returnText = 'OK';
    try {
        events.forEach(event => {
            console.log('received event type:', event.type);

            if (event.type === 'message' && event.message.type === 'text') {
                eventsProcessor.handleMessage(event);
            }
        });
    } catch (error) {
        console.error('Failed to handle event:', error);
        returnText = 'Error handling event: ' + error.message;
    }
    let htmlOutput = HtmlService.createHtmlOutput('<b>' + returnText + '</b>');
    return htmlOutput;
}