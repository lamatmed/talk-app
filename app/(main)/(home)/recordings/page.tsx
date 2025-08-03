import CallList from '@/components/CallList';

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 text-white animate-fade-in px-4 sm:px-0">
      <h1 className="text-2xl sm:text-3xl text-black text-center mt-3">Enregistrements d'Appels</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default Recordings;