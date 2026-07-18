import type { Setting, SettingSection } from "../types/settings.types";
import { SettingsCard } from "./settings-card";

const sectionConfig: Record<
  SettingSection,
  { label: string; description: string }
> = {
  company: {
    label: "Company",
    description: "Company information displayed across the application",
  },
  finance: {
    label: "Finance",
    description: "Currency, tax, and invoice settings",
  },
  inventory: {
    label: "Inventory",
    description: "Stock management and tracking preferences",
  },
  sales: {
    label: "Sales",
    description: "Sales, returns, and loyalty program settings",
  },
  notifications: {
    label: "Notifications",
    description: "Email and alert notification preferences",
  },
  preferences: {
    label: "Preferences",
    description: "Date, time, language, and display preferences",
  },
};

type SettingsSectionProps = {
  section: SettingSection;
  settings: Setting[];
};

export function SettingsSection({ section, settings }: SettingsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {sectionConfig[section].description}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {settings.map((setting) => (
          <SettingsCard key={setting.id} setting={setting} />
        ))}
      </div>
    </div>
  );
}

export { sectionConfig };
