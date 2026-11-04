
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type LeaveBalance = {
    title: string;
    left: number;
    used: number;
    total: number;
};

interface LeaveBalanceCardProps {
    data: LeaveBalance[];
    className?: string;
}

const leaveColors: Record<string, string> = {
    "Casual Leave": "[&_[data-slot=progress-indicator]]:bg-blue-500",
    "Sick Leave": "[&_[data-slot=progress-indicator]]:bg-emerald-500",
    "Earn Leave": "[&_[data-slot=progress-indicator]]:bg-violet-500",
    "Leave Without Pay": "[&_[data-slot=progress-indicator]]:bg-orange-500",
    "optional": "[&_[data-slot=progress-indicator]]:bg-primary",
};

const dotColors: Record<string, string> = {
    "Casual Leave": "bg-blue-500",
    "Sick Leave": "bg-emerald-500",
    "Earn Leave": "bg-violet-500",
    "Leave Without Pay": "bg-orange-500",
    "optional": "bg-primary",
};

export function LeaveBalanceCard({ data, className }: LeaveBalanceCardProps) {
    return (
        <div className={cn("w-full h-full ", className)}>
            <Card className={"w-full h-full overflow-hidden"}>
                <CardHeader>
                    <CardTitle>Leave Balance</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    {data.map((leave) => {
                        const percentage =
                            leave.total > 0 ? (leave.used / leave.total) * 100 : 0;

                        return (
                            <div key={leave.title} className="space-y-1 border rounded-md p-3 py-1.5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("inline-block w-2 h-2 rounded-full", dotColors[leave.title] ?? dotColors["optional"])}></span>
                                        <p className="text-sm font-semibold">{leave.title}</p>
                                    </div>

                                    <p className="shrink-0 text-sm font-semibold">
                                        {leave.left}{" "}
                                        <span className="font-normal text-muted-foreground">
                                            left
                                        </span>
                                    </p>
                                </div>

                                <Progress
                                    value={percentage}
                                    className={cn(
                                        "h-2",
                                        leaveColors[leave.title] ?? leaveColors["optional"]
                                    )}
                                />

                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{leave.used} used</span>
                                    <span>{leave.total} total</span>
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
