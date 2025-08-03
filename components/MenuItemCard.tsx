'use client'

import Image from "next/image";

interface MenuItemCardProps {
    img: string;
    title: string;
    bgColor: string;
    hoverColor: string;
    handleClick?: () => void;
  }

const MenuItemCard = ({ bgColor, hoverColor , img, title, handleClick }: MenuItemCardProps) => {
    return (
        <section
            className={`${bgColor} ${hoverColor} menu-item-card shadow-2xl p-4 sm:p-6 min-h-[120px] sm:min-h-[150px]`}
             onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Image src={img} alt="meeting" width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
            
            <div className="text-center">
              <h1 className="text-base sm:text-xl text-white font-black">{title}</h1>
            </div>
          </div>
        </section>
      );
}

export default MenuItemCard