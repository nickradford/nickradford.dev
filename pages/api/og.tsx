import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const date = searchParams.get("date");
    const readTime = searchParams.get("readTime");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgb(39, 39, 42) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgb(39, 39, 42) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
          tw="bg-zinc-900 text-zinc-100 border-b-8 border-sky-700 p-10 justify-center flex flex-col"
        >
          <div tw="absolute top-8 left-10 right-10 flex justify-between text-xl items-center text-zinc-600">
            <time tw="">
              {Intl.DateTimeFormat("en-us", {
                dateStyle: "long",
                timeZone: "GMT",
              }).format(new Date(date))}
            </time>
            <span>{readTime}</span>
          </div>
          <h1 tw="text-5xl leading-tight">{title}</h1>
          <div tw="absolute bottom-2 left-10 right-10 flex justify-between text-xl items-center">
            <h3 tw="text-3xl text-zinc-300">Nick Radford</h3>
            <p tw="text-zinc-500">nickradford.dev</p>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
