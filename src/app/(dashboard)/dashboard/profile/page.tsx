"use client";

import { useEffect, useState } from "react";
import { useUser, getStoredUser } from "@/features/profile";
import { ProfileDetails } from "@/features/profile";
import type { StoredUser } from "@/features/profile/types/profile.types";

export default function ProfilePage() {
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStoredUser(getStoredUser());
    setMounted(true);
  }, []);

  const userId = storedUser?.id ?? "";
  const { data, isLoading, error } = useUser({ id: userId });

  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <ProfileDetails userData={undefined} isLoading={true} error={null} />
      </div>
    );
  }

  if (!storedUser) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
          <p className="text-sm text-muted-foreground">
            No user session found. Please log in again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProfileDetails
        userData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
