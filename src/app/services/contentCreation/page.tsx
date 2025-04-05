import Image from "next/image";
import NavBar from "@/components/layout/NavBar";

const ContentCreationPage = () => {
  return (
    <div className="bg-[#E1E1E1]"> 
      <NavBar /> 

      <main className="text-[#0D767A] min-h-screen pt-24 px-6 md:px-16">
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Content Creation
            </h1>
            <p className="text-lg md:text-xl">
            Blogs, videos, social media posts… basically making companies look smarter and cooler online.
            </p>
          </div>

          <div className="flex-1">
            <Image
              src="/content.png"
              alt="Accounting illustration"
              className="rounded-xl object-cover"
              width={500}
              height={350}
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContentCreationPage;