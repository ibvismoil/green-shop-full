import Footer from "@/components/Footer";
import HeroCarousel from "@/components/Hero";
import Main from "@/components/main";


export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <HeroCarousel/>
      <Main/>
    </div>
  );
}
