'use client'

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const EndCallButton = () => {
    const router = useRouter();
    const call = useCall();
    if (!call)
        throw new Error(
          'useStreamCall doit être utilisé dans un composant StreamCall.',
    );

    const { useLocalParticipant } = useCallStateHooks();

    const localParticipant = useLocalParticipant();

    const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

    if (!isMeetingOwner) return null;

    const endCall = async () => {
        await call.endCall();
        router.push('/');
    };

    return (
        <Button onClick={endCall} className="bg-red-500">
          Terminer l'appel pour tout le monde
        </Button>
      );




}

export default EndCallButton