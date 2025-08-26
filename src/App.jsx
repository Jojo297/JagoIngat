import MemoryGame from "./MemoryGame";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="">
      <Navbar />

      <div className="flex justify-center items-center min-h-screen">
        <MemoryGame />
      </div>
    </div>
  );
}
