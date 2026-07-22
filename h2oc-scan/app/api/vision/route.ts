import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "이미지가 없습니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API KEY 없음" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
사진 속 재활용품을 분석해주세요.

반드시 아래 중 하나만 JSON으로 반환하세요.

PET
PP
HDPE
LDPE
폐지
알루미늄 캔
지원하지 않는 품목

답변 형식:
{
 "category":"PP"
}

설명하지 말고 JSON만 출력하세요.
`,
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: image.replace(
                      /^data:image\/\w+;base64,/,
                      ""
                    ),
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      result: text,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "분석 실패" },
      { status: 500 }
    );
  }
}