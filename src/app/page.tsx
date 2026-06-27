import Hero from "@/components/Hero";
import HomeMenuPreview from "@/components/HomeMenuPreview";
import Gatherings from "@/components/Gatherings";
import HomeAbout from "@/components/HomeAbout";
import HomeGalleryTeaser from "@/components/HomeGalleryTeaser";
import Gazette from "@/components/Gazette";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <RevealOnScroll direction="up">
        <HomeMenuPreview />
      </RevealOnScroll>
      <RevealOnScroll direction="up" threshold={0.08}>
        <Gatherings />
      </RevealOnScroll>
      <RevealOnScroll direction="fade">
        <HomeAbout />
      </RevealOnScroll>
      <RevealOnScroll direction="up" threshold={0.08}>
        <HomeGalleryTeaser />
      </RevealOnScroll>
      <RevealOnScroll direction="up" threshold={0.06}>
        <Gazette />
      </RevealOnScroll>
    </>
  );
}
