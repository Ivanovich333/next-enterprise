import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTelegramNotification, formatContactRequestMessage } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    console.log("📬 New contact request received")
    const body = await request.json()
    const { name, phone, email, message, source } = body

    console.log("📝 Request data:", { name, phone, email, source })

    // Валидация
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Имя и телефон обязательны" },
        { status: 400 }
      )
    }

    // Сохранение в БД
    console.log("💾 Saving to database...")
    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        email,
        message,
        source: source || "website",
      },
    })
    console.log("✅ Saved to database, ID:", contactRequest.id)

    // Отправка уведомления в Telegram
    console.log("📱 Preparing Telegram notification...")
    const telegramMessage = formatContactRequestMessage({
      name,
      phone,
      email,
      message,
    })

    const telegramSent = await sendTelegramNotification(telegramMessage)
    console.log("📱 Telegram notification result:", telegramSent ? "SUCCESS" : "FAILED")

    return NextResponse.json(
      { success: true, id: contactRequest.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Contact request error:", error)
    return NextResponse.json(
      { error: "Ошибка при обработке заявки" },
      { status: 500 }
    )
  }
}

// GET для админки - получить все заявки
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where = status ? { status } : {}

    const requests = await prisma.contactRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Failed to fetch contact requests:", error)
    return NextResponse.json(
      { error: "Ошибка при получении заявок" },
      { status: 500 }
    )
  }
}
