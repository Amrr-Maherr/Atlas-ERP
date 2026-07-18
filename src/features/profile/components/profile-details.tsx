import type { UserProfile } from "../types/profile.types";
import { ProfileDetailsHeader } from "./profile-details-header";
import { ProfileDetailsCard } from "./profile-details-card";
import { ProfileDetailsSkeleton } from "./profile-details-skeleton";
import { ProfileDetailsError } from "./profile-details-error";

type ProfileDetailsProps = {
  userData: UserProfile | undefined;
  isLoading: boolean;
  error: Error | null;
};

export function ProfileDetails({
  userData,
  isLoading,
  error,
}: ProfileDetailsProps) {
  return (
    <section className="flex flex-col gap-6">
      <ProfileDetailsHeader />
      <ProfileDetailsSkeleton isLoading={isLoading} />
      <ProfileDetailsError error={error} />
      {!isLoading && !error && userData && (
        <ProfileDetailsCard user={userData} />
      )}
    </section>
  );
}
