'use client';
import { SignedIn,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';
import { neobrutalism } from '@clerk/themes'
import { cn } from '@/lib/utils';


const NavBar = () => {
  const pathname = usePathname();

    return (
        <>
          <nav className="flex justify-between items-center fixed z-50 w-full h-20 sm:h-28 bg-gray-200 px- sm:px-10 gap-2 sm:gap-4 shadow-2xl">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-1 hover:scale-150 duration-500 ">
                <Image
                  src="/assets/logo.svg"
                  width={40}
                  height={40}
                  className="sm:w-[60px] sm:h-[60px]"
                  alt="Let's talk"
                />
              </Link>

              {/* Nav Links */}
              <section className="sticky top-0 flex justify-between text-black ">
                <div className="flex flex-1 max-sm:gap-1 sm:gap-6">
                  {navLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                    
                    return (
                      <Link
                        href={item.route}
                        key={item.label}
                        className={
                          cn('flex gap-1 sm:gap-4 items-center p-2 sm:p-4 rounded-lg justify-start hover:scale-150 duration-300 ',
                            isActive && 'bg-blue-100 rounded-3xl'
                          )
                        }
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="sm:w-6 sm:h-6"
                        />
                        
                        
                        
                        <p className={cn(
                            "text-xs sm:text-lg font-semibold max-sm:hidden",
                          )}>
                          {item.label}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* User button */}
              <div className='hover:scale-150 duration-500 '>
                <SignedIn>
                    {/* Mount the UserButton component */}
                    <UserButton
                      appearance={{
                        baseTheme: neobrutalism,
                      }}
                    />
                </SignedIn>
        
              </div>
          </nav>
        </>
    )
}

export default NavBar