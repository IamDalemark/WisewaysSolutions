import Image from "next/image";

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

      <main className="text-blue-green min-h-screen pt-36 mx-[6%]">
        <section className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-7xl mx-auto mt-10">
          <div className="flex-1 ml-[2%]">
            <h1 className="text-4xl md:text-6xl font-bold text-center pb-3">{title}</h1>
            <p className="text-lg md:text-xl mt-4 text-center md:text-left">{subtitle}</p>
          </div>

          <div className="flex-1">
            <Image
              src={imageSrc}
              alt={altText}
              className="rounded-xl object-cover justify-self-center"
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
