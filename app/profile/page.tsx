'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { MdSell } from "react-icons/md";
import { IoIosCart } from "react-icons/io";

import MenuItem from "../components/navbar/MenuItem";
import Avatar from "../components/Avatar";


interface ProfilepageProps {
  currentUser?: SafeUser 
}

const Profilepage: React.FC<ProfilepageProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return rentModal.onOpen();
    }

    // Implement the action for renting
    // For now, let's just open the rent modal
    rentModal.onOpen();
  }, [currentUser, rentModal]);

  return ( 
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex-none bg-gray-200 w-64 px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
        <div>
          <div 
            onClick={onRent}
            className="
              text-sm 
              font-semibold 
              py-3 
              px-4 
              rounded-full 
              hover:bg-gray-300 
              transition 
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between">
              <div>Sell</div>
              <MdSell />
            </div>
          </div>
          <div 
            onClick={() => router.push('/cart')}
            className="
              text-sm 
              font-semibold 
              py-3 
              px-4 
              rounded-full 
              hover:bg-gray-300 
              transition 
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between">
              <div>Checkout</div>
              <IoIosCart />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col cursor-pointer">
          {currentUser ? (
            <>
              <MenuItem 
                label="Cart" 
                onClick={() => router.push('/trips')}
              />
              <MenuItem 
                label="My favorites" 
                onClick={() => router.push('/favorites')}
              />
              <MenuItem 
                label="Reservations on my properties" 
                onClick={() => router.push('/reservations')}
              />
              <MenuItem 
                label="My properties" 
                onClick={() => router.push('/properties')}
              />
              <MenuItem 
                label="Profile" 
                onClick={() => router.push('/profile')}
              />
              <MenuItem 
                label="Sell" 
                onClick={rentModal.onOpen}
              />
            </>
          ): null}
        </div>
      </div>
    </div>
   );
}

export default Profilepage;
