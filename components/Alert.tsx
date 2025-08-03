import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface AlertProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: AlertProps) => {
  return (
    <section className="flex justify-center items-center mt-5 px-4 sm:px-0">
      <Card className="w-full max-w-[520px] border-none bg-gray-500 p-4 sm:p-6 py-6 sm:py-9 text-white shadow-2xl scale-110">
        <CardContent>
          <div className="flex flex-col gap-6 sm:gap-9" >
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  <Image src={iconUrl} width={60} height={60} className="sm:w-[72px] sm:h-[72px]" alt="icône" />
                </div>
              )}
              <p className="text-center text-lg sm:text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-gray-900 rounded-2xl text-sm sm:text-base">
              <Link href="/">Retour à l'Accueil</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;