'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface ProfileClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}
const ProfileClient: React.FC<ProfileClientProps> = ({
    currentUser,
    listings
  }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
  
    const onDelete = useCallback((id: string) => {
      setDeletingId(id);
  
      axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
    }, [router]);

    // Return JSX here
    return (
      <Container>
        
      </Container>
    );
}

export default ProfileClient;
