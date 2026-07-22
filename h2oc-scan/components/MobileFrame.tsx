export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="relative h-dvh w-full max-w-[420px] overflow-hidden bg-[#f8fdf9] shadow-2xl md:my-6 md:h-[calc(100dvh-3rem)] md:rounded-[2.5rem] md:border-8 md:border-gray-900">
        {children}
      </div>
    </div>
  );
}
