'use client'

import { useEffect, useState } from "react";

const DateAndTime = () => {
    const [time, setTime] = useState(() => {
        const now = new Date();
        return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      });

    const [date, setDate] = useState(() => {
    const now = new Date();
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(now);
    });

    
    useEffect(() => {
        const intervalId = setInterval(() => {
          const now = new Date();
          setTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit'}));
          setDate(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(now));

        }, 1000); // Update every 1 sec
    
        return () => clearInterval(intervalId); // Clean up on component unmount
      }, []);
    return (
        <div className="flex flex-col gap-3 sm:gap-5">
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-base sm:text-lg lg:text-2xl font-medium text-sky-1">{date}</p>
        </div>
    )
}

export default DateAndTime