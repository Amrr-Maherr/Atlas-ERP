import type { Setting } from "../types/settings.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SettingsCardProps = {
  setting: Setting;
};

function formatKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(setting: Setting): string {
  if (setting.type === "boolean") {
    return setting.value === "true" ? "Enabled" : "Disabled";
  }
  if (setting.key.includes("rate") || setting.key.includes("threshold")) {
    return `${setting.value}%`;
  }
  return setting.value;
}

export function SettingsCard({ setting }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {formatKey(setting.key)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {setting.type === "boolean" ? (
            <Badge variant={setting.value === "true" ? "default" : "secondary"}>
              {formatValue(setting)}
            </Badge>
          ) : (
            <span className="text-lg font-semibold">{formatValue(setting)}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{setting.description}</p>
      </CardContent>
    </Card>
  );
}
