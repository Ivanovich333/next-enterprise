import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    const where = published === "true" ? { published: true } : {}

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { order: "asc" },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
    return NextResponse.json(
      { error: "Ошибка при получении отзывов" },
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
    const { name, project, rating, text, avatar, published, order } = body

    if (!name || !project || !text) {
      return NextResponse.json(
        { error: "Обязательные поля: name, project, text" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        name,
        project,
        rating: rating ?? 5,
        text,
        avatar: avatar ?? "👤",
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error("Failed to create review:", error)
    return NextResponse.json(
      { error: "Ошибка при создании отзыва" },
      { status: 500 }
    )
  }
}
