
"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type LeaveSearchFilters = {
    fromDate: string;
    toDate: string;
    leaveType: string;
    status: string;
};

export function LeaveHistorySearch({ value, setValue }: { value: LeaveSearchFilters; setValue: React.Dispatch<React.SetStateAction<LeaveSearchFilters>> }) {
    const [loading, setLoading] = useState(false);

    const handleChange = (key: keyof LeaveSearchFilters, value: string) => {
        setValue((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);

        try {
            const params = new URLSearchParams();

            if (value.fromDate) params.set("fromDate", value.fromDate);
            if (value.toDate) params.set("toDate", value.toDate);
            if (value.leaveType !== "all") {
                params.set("leaveType", value.leaveType);
            }
            if (value.status !== "all") {
                params.set("status", value.status);
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/leave/history?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch leave history");
            }

            const result = await response.json();

            // Pass the result to your leave history table.
            console.log("Leave history:", result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function resetFilters() {
        setValue({
            fromDate: "",
            toDate: "",
            leaveType: "all",
            status: "all",
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
        >
            {/* From Date */}
            <div className="space-y-2">
                <Label htmlFor="fromDate">From Date</Label>
                <Input
                    id="fromDate"
                    type="date"
                    value={value.fromDate}
                    onChange={(e) => handleChange("fromDate", e.target.value)}
                />
            </div>

            {/* To Date */}
            <div className="space-y-2">
                <Label htmlFor="toDate">To Date</Label>
                <Input
                    id="toDate"
                    type="date"
                    min={value.fromDate || undefined}
                    value={value.toDate}
                    onChange={(e) => handleChange("toDate", e.target.value)}
                />
            </div>

            {/* Leave Type */}
            <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select
                    value={value.leaveType}
                    onValueChange={(value) => handleChange("leaveType", value ?? "all")}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Leave Types</SelectItem>
                        <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Earn Leave">Earn Leave</SelectItem>
                        <SelectItem value="Unpaid Leave">Leave Without Pay</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
                <Label>Status</Label>
                <Select
                    value={value.status}
                    onValueChange={(value) => handleChange("status", value ?? "all")}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2 pb-2 ">
                <Button type="submit" disabled={loading} className="flex-1">
                    <Search className="mr-2 size-4" />
                    {loading ? "Searching..." : "Search"}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={resetFilters}
                    title="Reset filters"
                >
                    <RotateCcw className="size-4" />
                </Button>
            </div>
        </form>
    );
}
