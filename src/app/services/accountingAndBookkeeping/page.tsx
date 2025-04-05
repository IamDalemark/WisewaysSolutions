import Image from "next/image";
import NavBar from "@/components/layout/NavBar";

const AccountingAndBookkeepingPage = () => {
  return (
    <div className="bg-[#E1E1E1]"> 
      <NavBar /> 

      <main className="text-[#0D767A] min-h-screen pt-24 px-6 md:px-16">
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Accounting and Bookkeeping
            </h1>
            <p className="text-lg md:text-xl">
              Crunching numbers so you don’t have to.
            </p>
          </div>

          <div className="flex-1">
            <Image
              src="/accounting.png"
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

export default AccountingAndBookkeepingPage;