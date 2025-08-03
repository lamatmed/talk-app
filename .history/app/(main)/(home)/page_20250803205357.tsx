import MainMenu from "@/components/MainMenu";
import StatusBar from "@/components/StatusBar";

const HomePage = () => {
  return (
    <section className="flex size-full flex-col gap-3 sm:gap-1 text-white animate-fade-in px-4 sm:px-2">
      <StatusBar />
      <MainMenu />
    </section>
  );
};

export default HomePage;