import Image from "next/image";
import NavBar from "@/components/navbar/NavBar";

interface ServicePageProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  altText: string;
}

const ServicePage = ({
  title,
  subtitle,
  imageSrc,
  altText,
}: ServicePageProps) => {
  return (
    <div className="bg-[#E1E1E1]">
      <NavBar />

      <main className="text-blue-green min-h-screen pt-24 px-6 md:px-16 ">
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto mt-10">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl">{subtitle}</p>
          </div>

          <div className="flex-1">
            <Image
              src={imageSrc}
              alt={altText}
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

export default ServicePage;
