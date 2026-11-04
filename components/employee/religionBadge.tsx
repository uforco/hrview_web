import {
  Moon,
  Cross,
  Star,
  Omega,
  CircleDot,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const religionConfig = {
  Islam: {
    icon: Moon,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  Christianity: {
    icon: Cross,
    color: "text-blue-600 bg-blue-500/10",
  },
  Hinduism: {
    icon: Omega,
    color: "text-orange-600 bg-orange-500/10",
  },
  Buddhism: {
    icon: CircleDot,
    color: "text-amber-600 bg-amber-500/10",
  },
  Judaism: {
    icon: Star,
    color: "text-indigo-600 bg-indigo-500/10",
  },
} as const;

type Religion = keyof typeof religionConfig;

interface ReligionBadgeProps {
  religion: string;
}

export function ReligionBadge({ religion }: ReligionBadgeProps) {
  const config =
    religionConfig[religion as Religion];

  const Icon = config?.icon ?? CircleDot;

  return (
    <Badge
      variant="outline"
      className={`gap-1.5 ${
        config?.color ?? "bg-muted text-muted-foreground"
      }`}
    >
      <Icon className="size-3.5" />
      {religion}
    </Badge>
  );
}