import React from "react";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  function get<T>(key: string, defaultValue: T) {
    const value = (searchParams.get(key) as T) ?? defaultValue;

    if (typeof defaultValue === "boolean" && typeof value === "string") {
      return value === "1" ? true : false;
    }
    return value;
  }

  try {
    const title = get<string>("title", "Nick Radford");
    const subtitle = get<string>(
      "subtitle",
      "Software engineer, pool shark, and amateur improviser."
    );
    const date = get("date", null);
    const readTime = get<string>("readTime", null);
    const showName = get<boolean>("showName", true);
    const showSubtitle = get<boolean>("showSubtitle", false);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #e4e4e7 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e4e4e7 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
          tw="bg-zinc-100 text-zinc-500 border-b-[18px] border-sky-400 p-10 justify-center flex flex-col"
        >
          <div
            tw="absolute top-8 left-10 right-10 flex justify-between text-xl items-center"
            style={{ letterSpacing: "0.125rem" }}
          >
            <time tw="">
              {date &&
                Intl.DateTimeFormat("en-us", {
                  dateStyle: "long",
                  timeZone: "GMT",
                }).format(new Date(date))}
            </time>
            <span>{readTime}</span>
          </div>
          <h1 tw="text-5xl leading-tight text-zinc-900">{title}</h1>
          {subtitle && showSubtitle && <h2 tw="text-2xl">{subtitle}</h2>}
          <div tw="absolute bottom-2 left-10 right-10 flex justify-between text-xl items-baseline">
            <h3 tw="text-3xl text-zinc-900">{showName && "Nick Radford"}</h3>
            <p style={{ letterSpacing: "0.125rem" }} tw="">
              nickradford.dev
            </p>
          </div>

          <div
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(2,0,36,0) 50%, rgba(2,132,199,1) 100%)",
            }}
            tw="absolute -bottom-8 left-0 right-0 h-8"
          ></div>
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
