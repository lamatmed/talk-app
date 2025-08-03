import MainMenu from "@/components/MainMenu";
import StatusBar from "@/components/StatusBar";

const HomePage = () => {
  return (
    <section className="flex size-full flex-col gap- sm:gap-10 text-white animate-fade-in px-4 sm:px-0">
      <StatusBar />
      <MainMenu />
    </section>
  );
};

export default HomePage;