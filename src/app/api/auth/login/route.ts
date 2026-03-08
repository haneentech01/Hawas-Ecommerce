import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Login attempt:", body);

    // Dummy successful login
    return NextResponse.json(
      {
        success: true,
        user: {
          id: "1",
          name: "User",
          email: body.email,
        },
      },
      { status: 200 },
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
