import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { name, project, rating, text, avatar, published, order } = body

    const review = await prisma.review.update({
      where: { id },
      data: {
        name,
        project,
        rating,
        text,
        avatar,
        published,
        order,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Failed to update review:", error)
    return NextResponse.json(
      { error: "Ошибка при обновлении отзыва" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await prisma.review.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete review:", error)
    return NextResponse.json(
      { error: "Ошибка при удалении отзыва" },
      { status: 500 }
    )
  }
}
