
import {
    BriefcaseBusiness,
    CalendarDays,
    Clock3,
    Home,
    Mail,
    MapPin,
    Mars,
    Moon,
    User,
    Venus,
    VenusAndMars,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ReligionBadge } from "./religionBadge";
import { cn } from "cn";

export interface EmployeeInfoType {
    id: number;
    name: string;
    designation: string;
    employmentStatus: string;
    gender: string;
    religion: string;
    joiningDate: string;
    confirmationDate: string;
    lengthOfService: string;
    email: string;
    presentAddress: string;
    permanentAddress: string;
}


function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
            </div>

            <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}

function GenderBadge({ gender }: { gender: string }) {
    const config = {
        Male: {
            icon: Mars,
            label: "Male",
        },
        Female: {
            icon: Venus,
            label: "Female",
        },
    };

    const item =
        config[gender as keyof typeof config] ?? {
            icon: VenusAndMars,
            label: gender,
        };

    const Icon = item.icon;

    return (
        <Badge variant="secondary" className="gap-1.5">
            <Icon className="size-3.5" />
            {item.label}
        </Badge>
    );
}


export function PersonalInfoCard({ data: employee, className }: { data: EmployeeInfoType; className?: string }) {
    return (
        <Card className={cn("w-full overflow-hidden", className)}>
            <CardHeader className="border-b bg-muted/30  pb-1">
                <div className="flex items-start justify-center gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                        {/* Avatar */}
                        <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="size-7" />
                        </div>

                        <div>
                            <CardTitle className="text-lg">
                                {employee.name}
                            </CardTitle>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {employee.designation}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">
                                    ID: {employee.id}
                                </Badge>

                                <Badge variant="default">
                                    {employee.employmentStatus}
                                </Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <GenderBadge gender={employee.gender} />
                                <ReligionBadge religion={employee.religion} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 ">

                {/* Employment Information */}
                <section>

                    <div className="grid gap-3 ">
                        <InfoItem
                            icon={BriefcaseBusiness}
                            label="Designation"
                            value={employee.designation}
                        />

                        <InfoItem
                            icon={CalendarDays}
                            label="Joining Date"
                            value="13 Apr, 2025"
                        />

                        <InfoItem
                            icon={CalendarDays}
                            label="Confirmation Date"
                            value="16 Jul, 2025"
                        />

                        <InfoItem
                            icon={Clock3}
                            label="Length of Service"
                            value={employee.lengthOfService}
                        />
                    </div>
                </section>

                <Separator />

                {/* Address */}
                <section>
                    <div className="grid gap-3 ">
                        <InfoItem
                            icon={Mail}
                            label="Email"
                            value={employee.email}
                        />

                        <InfoItem
                            icon={MapPin}
                            label="Present Address"
                            value={employee.presentAddress}
                        />

                        <InfoItem
                            icon={Home}
                            label="Permanent Address"
                            value={employee.permanentAddress}
                        />
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}