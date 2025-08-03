'use client'

import { useUser } from "@clerk/nextjs";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react"; // Ajout de useEffect
import Loading from "./Loading";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
    const [isTwoPersonCall, setIsTwoPersonCall] = useState(false); // Nouvel état
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();
    
    // Hook pour obtenir les participants
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    
    if(!user) return;
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();
    if (callingState !== CallingState.JOINED) return <Loading />;

    // Détecter si l'appel a seulement 2 participants
    useEffect(() => {
        setIsTwoPersonCall(participants.length === 1); // Utilisateur courant + 1 autre
    }, [participants]);

    const CallLayout = () => {
        // Layout spécial pour 2 personnes
        if (isTwoPersonCall) {
            return <SpeakerLayout participantsBarPosition="right" />;
        }
        
        switch (layout) {
          case 'grid':
            return <PaginatedGridLayout />;
          case 'speaker-right':
            return <SpeakerLayout participantsBarPosition="left" />;
          case 'speaker-left':
            return <SpeakerLayout participantsBarPosition="right" />;
          default:
            return <SpeakerLayout participantsBarPosition="right" />;
        }
      };

      return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <Button className='ml-2 sm:ml-5 font-semibold bg-gray-900 hover:scale-110 rounded-3xl text-xs sm:text-base px-3 sm:px-4 py-1.5 sm:py-2'
                onClick={() => {
                    const meetingLink = `https://talk-app-two.vercel.app${pathname}`
                    navigator.clipboard.writeText(meetingLink);
                    toast('Lien de réunion copié',{ 
                    duration: 3000,
                    className: '!bg-gray-300 !rounded-3xl !py-8 !px-5 !justify-center',
                });
                }}
                >
                    Inviter des Personnes
            </Button>

            <div className={cn(
                "relative flex size-full items-center justify-center px-2 sm:px-4 mt-2",
                {
                    "max-sm:flex-col": isTwoPersonCall, // Mode vertical sur mobile
                }
            )}>
                <div className={cn(
                    "flex size-full max-w-[100vw] items-center animate-fade-in",
                    {
                        "max-sm:h-3/4": isTwoPersonCall, // Ajustement hauteur
                        "max-sm:max-h-[75vh]": isTwoPersonCall, // Limite hauteur
                    }
                )}>
                <CallLayout/>
                </div>
                <div
                className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                    'show-block': showParticipants,
                    'max-sm:block max-sm:h-auto max-sm:w-full': isTwoPersonCall && showParticipants, // Pleine largeur
                })}
                >
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            {/* Contrôles optimisés pour mobile */}
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 p-1.5 xs:p-2 sm:p-3 bg-black bg-opacity-50 backdrop-blur-sm">
                <CallControls onLeave={() => router.push(`/`)} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] p-1.5 xs:p-2 sm:px-3 sm:py-2 hover:bg-[#4c535b]">
                            <LayoutList className="text-white w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-black bg-black text-white">
                        {['Grille', 'Orateur-Gauche', 'Orateur-Droite'].map((item, index) => (
                        <div key={index}>
                            <DropdownMenuItem
                            onClick={() =>
                                setLayout(item.toLowerCase() as CallLayoutType)
                            }
                            >
                            {item}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="border-black" />
                        </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <CallStatsButton />
                
                <button 
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className={cn(
                        "cursor-pointer rounded-2xl bg-[#19232d] p-1.5 xs:p-2 sm:px-3 sm:py-2 hover:bg-[#4c535b]",
                        {
                            "bg-[#4c535b]": showParticipants // Indicateur visuel
                        }
                    )}
                >
                    <Users className="text-white w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                </button>
                
                <EndCallButton />
            </div>
         </section>
      )
}

export default MeetingRoom