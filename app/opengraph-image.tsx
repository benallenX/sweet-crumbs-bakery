import { ImageResponse } from "next/og";

export const alt = "Sweet Crumbs Bakery — handcrafted pastries, artisan breads, and custom cakes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 160, lineHeight: 1 }}>🥐🧁🍞</div>
        <div
          style={{
            marginTop: 32,
            fontSize: 84,
            fontWeight: 700,
            color: "#78350f",
            textAlign: "center",
          }}
        >
          Sweet Crumbs Bakery
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: "#92400e",
            textAlign: "center",
          }}
        >
          Handcrafted pastries, artisan breads &amp; custom cakes
        </div>
      </div>
    ),
    size
  );
}
