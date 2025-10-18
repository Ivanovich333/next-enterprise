export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  console.log("🔍 Telegram config check:", {
    hasBotToken: !!botToken,
    botTokenLength: botToken?.length || 0,
    hasChatId: !!chatId,
    chatId: chatId || "NOT_SET",
  })

  if (!botToken || !chatId) {
    console.error("❌ Telegram credentials not configured", {
      botToken: botToken ? "SET" : "MISSING",
      chatId: chatId ? "SET" : "MISSING",
    })
    return false
  }

  try {
    console.log("📱 Sending Telegram notification...")
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    )

    const data = await response.json()

    if (data.ok) {
      console.log("✅ Telegram notification sent successfully:", data.result.message_id)
    } else {
      console.error("❌ Telegram API error:", data)
    }

    return data.ok
  } catch (error) {
    console.error("❌ Failed to send Telegram notification:", error)
    return false
  }
}

export function formatContactRequestMessage(data: {
  name: string
  phone: string
  email?: string
  message?: string
}) {
  return `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
${data.email ? `📧 <b>Email:</b> ${data.email}` : ""}
${data.message ? `💬 <b>Сообщение:</b>\n${data.message}` : ""}

⏰ ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}
  `.trim()
}
