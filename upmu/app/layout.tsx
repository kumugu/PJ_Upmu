import "./global.css";

export const metadata = {
  title: '업무체크',
  description: '업무체크',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
