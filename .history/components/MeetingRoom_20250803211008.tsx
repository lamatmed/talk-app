'use client'

import { useUser } from "@clerk/nextjs";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
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
    const router = useRouter();
    const pathname = usePathname()  
    const { user } = useUser();
    if(!user) return
    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()
    if (callingState !== CallingState.JOINED) return <Loading />;

    const CallLayout = () => {
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
        <section >
            <Button className='ml-2 sm:ml-5 font-semibold bg-gray-900 hover:scale-110 rounded-3xl text-xs sm:text-base px-3 sm:px-4 py-2'
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

            <div className="relative flex size-full items-center justify-center px-2 sm:px-4">
                <div className="flex size-full max-w-[100vw] items-center animate-fade-in">
                <CallLayout/>
                </div>
                <div
                className={cn('h-[calc(100vh-86px)] hidden ml-2', {
                    'show-block': showParticipants,
                })}
                >
                <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            {/* call controls - Improved mobile responsive */}
          
         </section>
      )


}

export default MeetingRoom

