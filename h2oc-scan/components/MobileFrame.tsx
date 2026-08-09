export default function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="relative h-dvh w-full max-w-[420px] overflow-hidden shadow-2xl md:my-6 md:h-[calc(100dvh-3rem)] md:rounded-[2.5rem] md:border-8 md:border-gray-900">
        
        <div className="absolute inset-0 bg-[url('/bg-paper.png')] bg-cover bg-center" />

        <div className="relative z-10 h-full">
          {children}
        </div>

      </div>
    </div>
  );
}
