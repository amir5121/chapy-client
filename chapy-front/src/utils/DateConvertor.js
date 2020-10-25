const options = {};

// const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
// const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
// const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
//
// const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
// const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])

export function toPersian(date, dateType = "PICK") {
  date = new Date(date);
  let result = date.toLocaleString("fa-IR", options);

  if (dateType === "TIME") {
    result = date.toLocaleTimeString("fa-IR", options);
  } else if (dateType === "DATE") {
    result = date.toLocaleDateString("fa-IR", options);
  } else if (dateType === "DATETIME") {
  } else if (dateType === "PICK") {
    let today = new Date();
    return date.getDate() === today.getDate()
      ? toPersian(date, "TIME")
      : toPersian(date, "DATE");
  }
  return p2e(result.replace("،‏", "-"));
}

export function addDateToMessages(messages) {
  const result = [];
  if (messages && messages.length <= 0) {
    return result;
  }

  let previousMessage = messages[0];
  for (let message in messages) {
    message = messages[message];
    if (
      new Date(previousMessage.created).getDay() !==
      new Date(message.created).getDay()
    ) {
      result.push({
        text: toPersian(message.created, "DATE"),
        is_date: true,
        id: Number(message.id) * 10,
      });
    }
    previousMessage = message;
    result.push(message);
  }
  return result;
}
