function composeHtmlTable(caption, items) {
  const numOfItems = items.length;

  var tables = "";
  const trBackground = ["", 'style="background-color: #edeef2;"'];

  items.forEach((item, index) => {
    const year = item.expiredTime.getFullYear();
    const month = (item.expiredTime.getMonth() + 1).toString().padStart(2, '0');
    const date = item.expiredTime.getDate().toString().padStart(2, '0');
    const formattedExpiredDate = `${year}/${month}/${date}`;

    const htmlTrTemplate = `
    <tr ${trBackground[index % 2]}>
      <th style="border: 1px solid #a0a0a0; padding: 8px 10px;" scope="row">${item.name}</th>
      <td style="border: 1px solid #a0a0a0; padding: 8px 10px;">${formattedExpiredDate}</td>
      <td style="border: 1px solid #a0a0a0; padding: 8px 10px; text-align: center;">${item.loc}</td>
    `;
    tables += htmlTrTemplate;
  });

  const htmlTableTemplate = `
  <table style="border-collapse: collapse; border: 2px solid #8c8c8c; font-family: sans-serif; font-size: 0.8rem; letter-spacing: 1px;">
    <caption style="caption-side: top; padding: 10px; font-weight: bold;">
    ${caption}
    </caption>
    <thead style="background-color: #e4f0f5;">
      <tr>
        <th style="border: 1px solid #a0a0a0; padding: 8px 10px;" scope="col">品項</th>
        <th style="border: 1px solid #a0a0a0; padding: 8px 10px;" scope="col">過期時間</th>
        <th style="border: 1px solid #a0a0a0; padding: 8px 10px;" scope="col">位置</th>
      </tr>
    </thead>
    <tbody>
      ${tables}
    </tbody>
    <tfoot style="background-color: #e4f0f5;">
      <tr>
        <th style="text-align: right; border: 1px solid #a0a0a0; padding: 8px 10px;" scope="row" colspan="2">數量</th>
        <td style="font-weight: bold; border: 1px solid #a0a0a0; padding: 8px 10px; text-align: center;">${numOfItems}</td>
      </tr>
    </tfoot>
  </table>
  `;
  return htmlTableTemplate;
}

function composeHtmlEmail(tables) {
  const htmlEmailTemplate = `
  <html>
  <head>
  </head>
  <body>
  ${tables}
  </body>
  </html>
  `;
  return htmlEmailTemplate;
}