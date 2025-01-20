export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] rounded-[24px] p-5 animate-float">
      {children}
    </div>
  );
}
