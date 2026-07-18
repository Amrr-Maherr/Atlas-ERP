"use client";

import type { Setting, SettingSection } from "../types/settings.types";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsSkeleton } from "./settings-skeleton";
import { SettingsError } from "./settings-error";
import { SettingsSection, sectionConfig } from "./settings-section";
import {
  Building2Icon,
  BanknoteIcon,
  WarehouseIcon,
  ShoppingCartIcon,
  BellIcon,
  SlidersHorizontalIcon,
} from "lucide-react";

const sectionIcons: Record<SettingSection, React.ReactNode> = {
  company: <Building2Icon className="size-4" />,
  finance: <BanknoteIcon className="size-4" />,
  inventory: <WarehouseIcon className="size-4" />,
  sales: <ShoppingCartIcon className="size-4" />,
  notifications: <BellIcon className="size-4" />,
  preferences: <SlidersHorizontalIcon className="size-4" />,
};

type SettingsListProps = {
  settingsData: Setting[];
  isLoading: boolean;
  error: Error | null;
};

export function SettingsList({ settingsData, isLoading, error }: SettingsListProps) {
  const sections = Object.keys(sectionConfig) as SettingSection[];
  const defaultSection =
    sections.find((s) => settingsData.some((st) => st.section === s)) ??
    sections[0];

  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Configure your application settings"
      />
      <SettingsSkeleton isLoading={isLoading} />
      <SettingsError error={error} />
      {!isLoading && !error && (
        <Tabs defaultValue={defaultSection}>
          <TabsList>
            {sections.map((section) => {
              const count = settingsData.filter((s) => s.section === section).length;
              if (count === 0) return null;
              return (
                <TabsTrigger key={section} value={section}>
                  <span className="flex items-center gap-1.5">
                    {sectionIcons[section]}
                    {sectionConfig[section].label}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {sections.map((section) => {
            const sectionSettings = settingsData.filter(
              (s) => s.section === section,
            );
            if (sectionSettings.length === 0) return null;
            return (
              <TabsContent key={section} value={section}>
                <SettingsSection section={section} settings={sectionSettings} />
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </section>
  );
}
