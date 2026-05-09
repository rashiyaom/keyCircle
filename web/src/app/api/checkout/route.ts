import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export async function POST(req: Request) {
  try {
    const { amount, bookingId } = await req.json();

    // Verify booking in the database
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${bookingId}`,
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
