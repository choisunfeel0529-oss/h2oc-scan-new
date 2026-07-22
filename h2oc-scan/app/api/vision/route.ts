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

가능한 분류:
- PET
- PP
- PE
- PS
- 캔
- 종이
- 유리
- 기타

반드시 JSON 형식으로만 답해주세요.

예시:
{
 "category":"PET"
}
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