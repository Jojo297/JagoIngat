import MemoryGame from "./MemoryGame";
import LogoJagoIngat from "./components/LogoJagoIngat";

export default function App() {
  return (
    <div className="lg:mt-8">
      <div className="flex flex-col justify-center items-center ">
        <LogoJagoIngat />
        <div className="text-center ">
          <p className="text-muted-foreground pl-4 pr-4 text-lg text-pretty">
            Perhatikan polanya, lalu ulangi. Seberapa jauh Anda bisa melangkah?
          </p>
        </div>
        <MemoryGame />
      </div>
    </div>
  );
}
