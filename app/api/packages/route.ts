import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")

    const where = published === "true" ? { published: true } : {}

    const packages = await prisma.package.findMany({
      where,
      orderBy: { order: "asc" },
    })

    // Parse features JSON
    const packagesWithFeatures = packages.map((pkg) => ({
      ...pkg,
      features: JSON.parse(pkg.features),
    }))

    return NextResponse.json(packagesWithFeatures)
  } catch (error) {
    console.error("Failed to fetch packages:", error)
    return NextResponse.json(
      { error: "Ошибка при получении пакетов" },
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
    const { name, price, popular, features, published, order } = body

    if (!name || !price || !features) {
      return NextResponse.json(
        { error: "Обязательные поля: name, price, features" },
        { status: 400 }
      )
    }

    const pkg = await prisma.package.create({
      data: {
        name,
        price,
        popular: popular ?? false,
        features: JSON.stringify(features),
        published: published ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(
      { ...pkg, features: JSON.parse(pkg.features) },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to create package:", error)
    return NextResponse.json(
      { error: "Ошибка при создании пакета" },
      { status: 500 }
    )
  }
}
