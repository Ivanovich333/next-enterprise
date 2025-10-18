import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - получить один проект
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.portfolio.findUnique({
      where: { id: params.id },
    })

    if (!project) {
      return NextResponse.json({ error: "Проект не найден" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to fetch portfolio item:", error)
    return NextResponse.json(
      { error: "Ошибка при получении проекта" },
      { status: 500 }
    )
  }
}

// PUT - обновить проект
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, image, category, location, area, year, published, order } = body

    const project = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        title,
        description,
        image,
        category,
        location,
        area,
        year: year ? parseInt(year) : null,
        published,
        order,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to update portfolio item:", error)
    return NextResponse.json(
      { error: "Ошибка при обновлении проекта" },
      { status: 500 }
    )
  }
}

// DELETE - удалить проект
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.portfolio.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete portfolio item:", error)
    return NextResponse.json(
      { error: "Ошибка при удалении проекта" },
      { status: 500 }
    )
  }
}
