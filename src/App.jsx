import MemoryGame from "./MemoryGame";
import LogoJagoIngat from "./components/LogoJagoIngat";

export default function App() {
  return (
    <div className="py-4">
      <div className="flex flex-col justify-center items-center ">
        {/* Header */}
        <LogoJagoIngat />
        <div className="text-center ">
          <p className="text-muted-foreground text-lg text-pretty">
            Perhatikan polanya, lalu ulangi. Seberapa jauh Anda bisa melangkah?
          </p>
        </div>
        <MemoryGame />
      </div>
    </div>
  );
}
