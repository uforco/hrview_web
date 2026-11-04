import {
    CalendarDays,
    Clock,
    MapPin,
    Building2,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Attendance = {
    status: string;
    dutyStart: string;
    dutyEnd: string;
    officeName: string;
    officeAddress: string;
};

interface AttendanceCardProps {
    attendance: Attendance;
    className?: string;
}

export function AttendanceCard({ attendance, className }: AttendanceCardProps) {
    return (
        <div  className={cn("w-full h-full ", className)}>
            <Card className={"  w-full h-full overflow-hidden "}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{"Today's Attendance"}</p>
                        <CardTitle className="text-xl">Attendance</CardTitle>
                    </div>

                    <CalendarDays className="size-6 text-primary" />
                </CardHeader>

                <CardContent className="flex h-[calc(100%-5rem)] gap-3 flex-col justify-between">
                    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                        <div className="flex items-center gap-2">
                            <Clock className="size-5 text-muted-foreground" />
                            <span className="text-sm font-medium">Attendance Status</span>
                        </div>

                        <Badge
                            variant={
                                attendance.status === "Present"
                                    ? "default"
                                    : attendance.status === "Late"
                                        ? "secondary"
                                        : "outline"
                            }
                        >
                            {attendance.status}
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Clock className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Office Time</p>
                                <p className="font-semibold">
                                    {attendance.dutyStart} – {attendance.dutyEnd}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Building2 className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Office</p>
                                <p className="font-semibold">{attendance.officeName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <MapPin className="size-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Office Address</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {attendance.officeAddress}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}