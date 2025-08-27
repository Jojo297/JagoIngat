import MemoryGame from "./MemoryGame";
import LogoJagoIngat from "./components/LogoJagoIngat";

export default function App() {
  return (
    <div className="py-4">
      <div className="flex flex-col justify-center items-center ">
        {/* Header */}
        <LogoJagoIngat />
        <div className="text-center ">
          {/* <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary text-balance">
            JagoIngat
          </h1> */}

          <p className="text-muted-foreground text-lg text-pretty">
            Watch the pattern, then repeat it back. How far can you go?
          </p>
        </div>
        <MemoryGame />
      </div>
    </div>
  );
}
