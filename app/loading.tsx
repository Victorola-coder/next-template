import { Loader } from "@/app/components/global";

export default function Spin() {
  return (
    <div className="w-screen h-screen bg-body flex items-center justify-center">
      <Loader />
    </div>
  );
}
