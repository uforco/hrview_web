
import { CheckCircle2 } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LeaveBalance = {
    title: string;
    left: number;
    used: number;
    total: number;
};

const leaveData: LeaveBalance[] = [
    {
        title: "Casual Leave",
        left: 3.5,
        used: 6.5,
        total: 10,
    },
    {
        title: "Sick Leave",
        left: 13,
        used: 1,
        total: 14,
    },
    {
        title: "Earn Leave",
        left: 21,
        used: 0,
        total: 21,
    },
    {
        title: "Leave Without Pay",
        left: 365,
        used: 0,
        total: 365,
    },
];

const leaveCodes: Record<string, string> = {
    "Casual Leave": "CL",
    "Sick Leave": "SL",
    "Earn Leave": "EL",
    "Leave Without Pay": "LWP",
};

export function LeaveBalanceTable({
    data = leaveData,
    className
}: {
    data?: LeaveBalance[];
    className?: string;
}) {
    return (
        <div className={cn("", className)} >
            <Card className="w-full h-full ">
                <CardHeader>
                    <CardTitle>Leave Balance</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead className="text-center">Taken</TableHead>
                                    <TableHead className="text-center">Balance</TableHead>
                                    <TableHead className="text-center">Total</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {data.map((leave) => (
                                    <TableRow key={leave.title}>
                                        <TableCell>
                                            <div className="font-medium">{leave.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                [{leaveCodes[leave.title] ?? "—"}]
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center tabular-nums">
                                            {leave.used}
                                        </TableCell>

                                        <TableCell className="text-center font-medium tabular-nums">
                                            {leave.left}
                                        </TableCell>

                                        <TableCell className="text-center tabular-nums">
                                            {leave.total}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <Badge
                                                variant="outline"
                                                className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                                            >
                                                <CheckCircle2 className="mr-1 size-3" />
                                                Active
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
