
"use client";

import { useState } from "react";
import { FileText, CloudUpload, X } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";

export function LeaveApplicationForm({ className }: { className?: string }) {
    const [attachment, setAttachment] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (attachment) {
            formData.set("attachment", attachment);
        }

        setLoading(true);

        try {
            // Connect your NestJS API here.
            console.log(formData);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={cn("", className)} >
            <Card className="flex  min-h-0 w-full flex-col overflow-hidden">
                <CardHeader className="shrink-0">
                    <CardTitle>Leave Application</CardTitle>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 ">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                            {/* Leave Type */}
                            <div className="space-y-2">
                                <Label>Leave Type *</Label>
                                <Select name="leaveType" required>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Select leave type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="casual">Casual Leave</SelectItem>
                                        <SelectItem value="sick">Sick Leave</SelectItem>
                                        <SelectItem value="earned">Earn Leave</SelectItem>
                                        <SelectItem value="unpaid">Leave Without Pay</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Leave Consume Type */}
                            <div className="space-y-2">
                                <Label>Leave Consume Type *</Label>
                                <Select name="consumeType" required>
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Select consume type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="full-day">Full Day</SelectItem>
                                        <SelectItem value="first-half">First Half</SelectItem>
                                        <SelectItem value="second-half">Second Half</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* From Date */}
                            <div className="space-y-2">
                                <Label htmlFor="fromDate">From Date *</Label>
                                <Input
                                    id="fromDate"
                                    name="fromDate"
                                    type="date"
                                    required
                                />
                            </div>

                            {/* To Date */}
                            <div className="space-y-2">
                                <Label htmlFor="toDate">To Date *</Label>
                                <Input
                                    id="toDate"
                                    name="toDate"
                                    type="date"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="Enter location"
                                    required
                                />
                            </div>

                            {/* Reason */}
                            <div className="space-y-2  ">
                                <Label htmlFor="reason">Reason *</Label>
                                <Input
                                    id="reason"
                                    name="reason"
                                    placeholder="Explain your leave reason..."
                                    required
                                />
                            </div>

                            {/* Upload Attachment */}
                            <div className="space-y-2 col-span-3 w-full ">
                                <Label>Upload Attachment</Label>
                                <div className="flex items-center gap-2 w-full ">
                                    <div className="w-1/2">
                                        <label
                                            htmlFor="attachment"
                                            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-2 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                        >
                                            <CloudUpload className="size-7 text-muted-foreground" />
                                            {/* <span className="text-sm font-medium">
                                                Click to upload attachment
                                            </span> */}
                                            <span className="text-xs text-muted-foreground">
                                                PDF, JPG, PNG (Max 5 MB)
                                            </span>
                                        </label>

                                        <Input
                                            id="attachment"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="hidden"
                                            onChange={(event) =>
                                                setAttachment(event.target.files?.[0] ?? null)
                                            }
                                        />
                                    </div>
                                    {attachment && (
                                        <div className="flex w-1/2 items-center justify-between rounded-md border p-2">
                                            <div className="flex min-w-0 items-center gap-2 text-sm">
                                                <FileText className="size-4 shrink-0 text-primary" />
                                                <span className="truncate  ">{attachment.name}</span>
                                            </div>

                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setAttachment(null)}
                                            >
                                                <X className="size-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            form="leave-application-form"
                            disabled={loading}
                            className={"cursor-pointer"}
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
