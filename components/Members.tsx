'use client'

import { cn } from "@/lib/utils" // Utility function for conditional class names
import { Call } from "@stream-io/video-react-sdk" // Importing Call type from Stream SDK
import Image from "next/image" // Next.js Image component for optimized images
import { useEffect, useState } from "react" // React hooks for state and effects

// Interface for component props
type MembersProps = {
    call: Call // Expects a Call object from Stream SDK
}

// Members component to display meeting participants
const Members = ({ call }: MembersProps) => {
    if(!call) return // If no call is provided, return nothing
    
    const [callMembers, setCallMembers] = useState<any[]>([]) // State to store call members
    
    useEffect(() => {
        const getMembers = async () => {
            const members = await call.queryMembers() // Fetching call members
            setCallMembers(members.members) // Updating state with members
        }
        getMembers()
    }, []) // Runs once when component mounts
    
    // If there are members in the call, render their avatars
    if(callMembers.length > 0) {
        return (
            <div className="relative flex w-full justify-center">
              <div className="flex items-center">
                {callMembers.slice(0, 3).map((member, index) => {
                  const user = member.user // Extract user details from member object
                  return (
                      <div
                        key={user.id} // Unique key for React list rendering
                        className={cn("relative", { 
                          "-ml-2": index > 0,
                          "z-10": index === 0,
                          "z-5": index === 1,
                          "z-0": index === 2
                        })}
                      >
                        <Image
                          src={user.image || '/assets/default-avatar.png'} // User avatar image with fallback
                          alt={`Participant ${index + 1}`}
                          width={32} // Smaller image width for mobile
                          height={32} // Smaller image height for mobile
                          className="rounded-full border-2 border-white shadow-sm sm:w-10 sm:h-10"
                        />
                      </div>
                    )
                })}
                
                {/* Show the total number of participants if more than 3 */}
                {callMembers.length > 3 && (
                  <div className="flex justify-center items-center -ml-2 size-8 sm:size-10 rounded-full border-2 border-white bg-gray-600 text-white text-xs sm:text-sm font-medium shadow-sm">
                    +{callMembers.length - 3}
                  </div>
                )}
              </div>
              
              {/* Show total count on mobile */}
              <div className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
                {callMembers.length} participant{callMembers.length > 1 ? 's' : ''}
              </div>
            </div>
        )
    }
    
    return null
}

export default Members