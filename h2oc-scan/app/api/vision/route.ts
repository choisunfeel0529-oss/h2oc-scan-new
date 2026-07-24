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

    const apiKey = process.env.ROBOFLOW_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Roboflow API KEY 없음" },
        { status: 500 }
      );
    }


    const response = await fetch(
      "https://serverless.roboflow.com/s-workspace-kzb59/workflows/garbage-ng351-k2ppi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          inputs: {
            image: {
              type: "base64",
              value: image.replace(
                /^data:image\/\w+;base64,/,
                ""
              ),
            },
          },
        }),
      }
    );


    const data = await response.json();

console.log(
  "ROBOFLOW RESPONSE:",
  JSON.stringify(data, null, 2)
);


    return NextResponse.json({
      result: data,
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "분석 실패" },
      { status: 500 }
    );
  }
}
