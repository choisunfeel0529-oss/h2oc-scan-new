# H2OC Scan

폐기물 사진을 AI로 분석하여 품목만 분류하는 모바일 웹 서비스.

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속. 카메라는 HTTPS 또는 localhost에서만 동작합니다.

## Vertex AI 연결

`services/vision.ts` 내부 Mock 구현만 교체하면 됩니다. UI는 `analyzeImage(image)` 시그니처만 사용합니다.
