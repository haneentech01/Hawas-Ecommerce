import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Register attempt:", body);

    // Dummy successful registration
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "1",
          name: body.username || "User",
          email: body.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
