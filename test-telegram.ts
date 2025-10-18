// Тестовый скрипт для проверки Telegram
const botToken = "8366176933:AAGk_zoS4KA0xTzPrD2OlWTdZPZ9qdu4POw"
const chatId = process.argv[2] // Передай Chat ID как аргумент

if (!chatId) {
  console.error("❌ Использование: tsx test-telegram.ts YOUR_CHAT_ID")
  process.exit(1)
}

async function testTelegram() {
  try {
    console.log("📱 Отправка тестового сообщения в Telegram...")
    console.log("Bot Token:", botToken.substring(0, 20) + "...")
    console.log("Chat ID:", chatId)

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🔔 Тестовое сообщение с сайта Smart Home!\n\n✅ Telegram интеграция работает!",
          parse_mode: "HTML",
        }),
      }
    )

    const data = await response.json()
    
    if (data.ok) {
      console.log("✅ Сообщение успешно отправлено!")
      console.log("Message ID:", data.result.message_id)
    } else {
      console.error("❌ Ошибка:", data)
    }
  } catch (error) {
    console.error("❌ Ошибка при отправке:", error)
  }
}

testTelegram()
