export type SettingType = "string" | "number" | "boolean";

export type SettingSection =
  | "company"
  | "finance"
  | "inventory"
  | "sales"
  | "notifications"
  | "preferences";

export type Setting = {
  id: string;
  section: SettingSection;
  key: string;
  value: string;
  type: SettingType;
  description: string;
  createdAt: string;
  updatedAt: string;
};
