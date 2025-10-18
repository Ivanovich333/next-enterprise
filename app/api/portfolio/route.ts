import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - получить все проекты
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    const where = published === "true" ? { published: true } : {}

    const portfolio = await prisma.portfolio.findMany({
      where,
      orderBy: { order: "asc" },
    })

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error("Failed to fetch portfolio:", error)
    return NextResponse.json(
      { error: "Ошибка при получении портфолио" },
      { status: 500 }
    )
  }
}

// POST - создать новый проект (требует авторизации)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, image, category, location, area, year, published, order } = body

    if (!title || !image || !category) {
      return NextResponse.json(
        { error: "Обязательные поля: title, image, category" },
        { status: 400 }
      )
    }

    const project = await prisma.portfolio.create({
      data: {
        title,
        description,
        image,
        category,
        location,
        area,
        year: year ? parseInt(year) : null,
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Failed to create portfolio item:", error)
    return NextResponse.json(
      { error: "Ошибка при создании проекта" },
      { status: 500 }
    )
  }
}
