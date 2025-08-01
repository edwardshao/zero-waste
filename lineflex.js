const TITLE_COLORS = {
    expired: "#FF5555",
    thirtyDays: "#FFAA00",
    sixtyDays: "#1DB446"
};

function createBubbleContent(title, titleColor, items) {
    return {
        type: "bubble",
        header: {
            type: "box",
            layout: "vertical",
            contents: [
                {
                    "type": "text",
                    "text": title,
                    "size": "md",
                    "weight": "bold",
                    "color": "#FFFFFF"
                }
            ]
        },
        body: {
            type: "box",
            layout: "vertical",
            contents: [
                {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "box",
                            layout: "horizontal",
                            contents: [
                                {
                                    type: "text",
                                    text: "品項",
                                    align: "start",
                                    size: "sm",
                                    weight: "bold"
                                },
                                {
                                    type: "text",
                                    text: "過期時間",
                                    align: "center",
                                    size: "sm",
                                    weight: "bold"
                                },
                                {
                                    type: "text",
                                    text: "位置",
                                    align: "end",
                                    size: "sm",
                                    weight: "bold"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "separator"
                },
                {
                    type: "box",
                    layout: "vertical",
                    contents: items.map((item, index) => ({
                        type: "box",
                        layout: "horizontal",
                        backgroundColor: index % 2 === 1 ? "#F5F5F5" : undefined,
                        contents: [
                            {
                                type: "text",
                                text: item.name,
                                size: "sm",
                                color: "#555555",
                                wrap: true,
                                align: "start"
                            },
                            {
                                type: "text",
                                text: new Date(item.expiredTime).toLocaleDateString('zh-TW', {
                                    timeZone: 'Asia/Taipei',
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }),
                                size: "sm",
                                align: "center",
                                color: "#555555"
                            },
                            {
                                type: "text",
                                text: item.loc,
                                size: "sm",
                                color: "#555555",
                                align: "end"
                            }
                        ]
                    })),
                    margin: "xl"
                }
            ],
            spacing: "sm"
        },
        styles: {
            header: {
                backgroundColor: titleColor
            }
        }
    };
}

function buildLineFlexMessage(expiredItems, expiredAfter30DaysItems, expiredAfter60DaysItems) {
    const bubbles = [];

    if (expiredItems.length > 0) {
        bubbles.push(createBubbleContent("己過期", TITLE_COLORS.expired, expiredItems));
    }

    if (expiredAfter30DaysItems.length > 0) {
        bubbles.push(createBubbleContent("30天內過期", TITLE_COLORS.thirtyDays, expiredAfter30DaysItems));
    }

    if (expiredAfter60DaysItems.length > 0) {
        bubbles.push(createBubbleContent("60天內過期", TITLE_COLORS.sixtyDays, expiredAfter60DaysItems));
    }

    return {
        type: "flex",
        altText: "惜食週報",
        contents: {
            type: "carousel",
            contents: bubbles
        }
    };
}