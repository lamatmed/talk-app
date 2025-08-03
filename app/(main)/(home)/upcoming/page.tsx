import CallList from "@/components/CallList";

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 animate-fade-in px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl text-black text-center mt-3">Réunions à Venir</h1>

      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;