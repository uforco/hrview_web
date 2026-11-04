
"use client";

import { useMemo, useState } from "react";
import {
    Eye,
    Search,
    Paperclip,
    CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LeaveHistorySearch, LeaveSearchFilters } from "./LeaveHistorySearch";

// Types
type LeaveHistoryItem = {
    id: number;
    leaveType: string;
    fromDate: string;
    toDate: string;
    totalDays: number;
    location: string;
    reliever: string;
    reason: string;
    attachment?: string;
    applicationDate: string;
    status: "Pending" | "Approved" | "Rejected";
};

// Example data
const leaveHistoryData: LeaveHistoryItem[] = [
    {
        id: 1,
        leaveType: "Casual Leave",
        fromDate: "2026-10-10",
        toDate: "2026-10-11",
        totalDays: 2,
        location: "Dhaka",
        reliever: "Rahim Uddin",
        reason: "Personal work",
        attachment: "",
        applicationDate: "2026-10-05",
        status: "Approved",
    },
    {
        id: 2,
        leaveType: "Sick Leave",
        fromDate: "2026-09-15",
        toDate: "2026-09-15",
        totalDays: 1,
        location: "Dhaka",
        reliever: "Karim Hasan",
        reason: "Fever and illness",
        attachment: "/documents/medical.pdf",
        applicationDate: "2026-09-14",
        status: "Pending",
    },
    {
        id: 3,
        leaveType: "Earn Leave",
        fromDate: "2026-08-01",
        toDate: "2026-08-03",
        totalDays: 3,
        location: "Chittagong",
        reliever: "Rahim Uddin",
        reason: "Family visit",
        applicationDate: "2026-07-25",
        status: "Rejected",
    },
];

const statusStyles = {
    Pending: "border-amber-500/30 bg-amber-500/10 text-amber-600",
    Approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-600",
};

export function LeaveHistory({ className }: { className?: string }) {
    const [search, setSearch] = useState("");
    const [value, setValue] = useState<LeaveSearchFilters>({
        fromDate: "",
        toDate: "",
        leaveType: "all",
        status: "all",
    });
    const filteredData = useMemo(() => {
        return leaveHistoryData.filter((leave) => {
            const matchesSearch = [
                leave.leaveType,
                leave.location,
                leave.reliever,
                leave.reason,
            ]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesFromDate =
                !value.fromDate || leave.fromDate >= value.fromDate;

            const matchesToDate =
                !value.toDate || leave.toDate <= value.toDate;

            const matchesLeaveType =
                value.leaveType === "all" || leave.leaveType.toLowerCase() === value.leaveType.toLowerCase();

            const matchesStatus =
                value.status === "all" || leave.status.toLowerCase() === value.status.toLowerCase();

            return (
                matchesSearch &&
                matchesFromDate &&
                matchesToDate &&
                matchesLeaveType &&
                matchesStatus
            );
        });
    }, [search, value]);

    // searchLocalstore

    return (
        <div className={cn("", className)} >
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Leave History</CardTitle>
                    <CardDescription>
                        View and track your previous leave applications.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Search and Filters */}
                    <LeaveHistorySearch setValue={setValue} value={value} ></LeaveHistorySearch>

                    {/* Search */}
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search leave history..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">SL</TableHead>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead className="min-w-48">Leave Duration</TableHead>
                                    <TableHead className="text-center">Total Days</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Leave Reliever</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Attachment</TableHead>
                                    <TableHead>Application Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Leave Details</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((leave, index) => (
                                        <TableRow key={leave.id}>
                                            <TableCell className="text-center">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell className="font-medium">
                                                {leave.leaveType}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CalendarDays className="size-4 text-muted-foreground" />
                                                    <span>
                                                        {leave.fromDate} - {leave.toDate}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-center tabular-nums">
                                                {leave.totalDays}
                                            </TableCell>

                                            <TableCell>{leave.location}</TableCell>
                                            <TableCell>{leave.reliever}</TableCell>

                                            <TableCell className="max-w-40 truncate">
                                                {leave.reason}
                                            </TableCell>

                                            <TableCell>
                                                {leave.attachment ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        type="button"
                                                        title="View attachment"
                                                        onClick={() =>
                                                            window.open(leave.attachment, "_blank")
                                                        }
                                                    >
                                                        <Paperclip className="size-4" />
                                                    </Button>
                                                ) : (
                                                    "—"
                                                )}
                                            </TableCell>

                                            <TableCell>{leave.applicationDate}</TableCell>

                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={statusStyles[leave.status]}
                                                >
                                                    {leave.status}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    type="button"
                                                    onClick={() =>
                                                        console.log("Leave details:", leave)
                                                    }
                                                >
                                                    <Eye className="mr-1 size-4" />
                                                    View
                                                </Button>
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    type="button"
                                                    disabled={leave.status !== "Pending"}
                                                    onClick={() =>
                                                        console.log("Cancel leave:", leave.id)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={12}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            No leave history found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Showing {filteredData.length} of {leaveHistoryData.length} applications
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
