"use client";

import { useSettings } from "@/features/settings";
import { SettingsList } from "@/features/settings";

export default function SettingsPage() {
  const { data, isLoading, error } = useSettings();

  return (
    <div className="flex flex-col gap-6 p-6">
      <SettingsList
        settingsData={data ?? []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
