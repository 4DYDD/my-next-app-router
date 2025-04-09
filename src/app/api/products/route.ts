// import { DataType } from "@/types/datatype";

import { NextRequest, NextResponse } from "next/server";

const data: Array<{
  id: string;
  category: string;
  image?: string;
  name: string;
  price: number;
}> = [
  {
    id: (Math.random() + 1).toString(36).substring(7),
    category: "Elektronik",
    image:
      "https://images.unsplash.com/photo-1636211990414-8edec17ba047?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Laptop Asus",
    price: 12_000_000,
  },
  {
    id: (Math.random() + 1).toString(36).substring(7),
    category: "Elektronik",
    image:
      "https://images.unsplash.com/photo-1693206578601-21cdc341d2c8?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Laptop Acer",
    price: 15_000_000,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const product = data.find((item) => item.id === id);

    if (product) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: product,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Failed",
        errors: ["Data not found"],
      });
    }
  }

  return NextResponse.json({ status: 200, message: "Success", data });
}
