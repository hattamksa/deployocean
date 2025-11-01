// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from Digital Path Ocean API! 🌊',
    timestamp: new Date().toISOString(),
    status: 'success',
    environment: process.env.NODE_ENV
  });
}
