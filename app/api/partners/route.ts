import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    const where = published === "true" ? { published: true } : {}

    const partners = await prisma.partner.findMany({
      where,
      orderBy: { order: "asc" },
    })

    return NextResponse.json(partners)
  } catch (error) {
    console.error("Failed to fetch partners:", error)
    return NextResponse.json(
      { error: "Ошибка при получении партнеров" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, logo, fallback, url, published, order } = body

    if (!name) {
      return NextResponse.json(
        { error: "Обязательное поле: name" },
        { status: 400 }
      )
    }

    const partner = await prisma.partner.create({
      data: {
        name,
        logo,
        fallback: fallback ?? "🏠",
        url,
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(partner, { status: 201 })
  } catch (error) {
    console.error("Failed to create partner:", error)
    return NextResponse.json(
      { error: "Ошибка при создании партнера" },
      { status: 500 }
    )
  }
}
