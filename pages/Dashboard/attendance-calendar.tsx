
"use client";

import { useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    CalendarDays,
    LogIn,
    LogOut,
} from "lucide-react";

export type AttendanceStatus =
    | "PRESENT"
    | "LATE"
    | "HALF_DAY"
    | "ABSENT"
    | "HOLIDAY"
    | "LEAVE";

export interface Attendance {
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    status: AttendanceStatus;
}

interface AttendanceCalendarProps {
    data: Attendance[];
}

const STATUS_CONFIG: Record<
    AttendanceStatus,
    { label: string; color: string; dot: string }
> = {
    PRESENT: {
        label: "Present",
        color: "bg-green-50 text-green-700 border-green-200",
        dot: "bg-green-600",
    },
    LATE: {
        label: "Late",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
    },
    HALF_DAY: {
        label: "Half Day",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        dot: "bg-orange-500",
    },
    ABSENT: {
        label: "Absent",
        color: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
    },
    HOLIDAY: {
        label: "Holiday",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        dot: "bg-purple-500",
    },
    LEAVE: {
        label: "Leave",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
    },
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const pad = (value: number) => String(value).padStart(2, "0");

function getDateKey(year: number, month: number, day: number) {
    return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export default function AttendanceCalendar({
    data
}: AttendanceCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const attendanceMap = useMemo(
        () => new Map(data.map((item) => [item.date, item])),
        [data]
    );

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const calendarDays = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: totalDays }, (_, index) => index + 1),
    ];

    const stats = (() => {
        const monthlyRecords = data.filter((item) =>
            item.date.startsWith(`${year}-${pad(month + 1)}`)
        );
        const count = (status: AttendanceStatus) =>
            monthlyRecords.filter((item) => item.status === status).length;

        return [
            { label: "Present", value: count("PRESENT"), color: "text-green-700" },
            { label: "Late", value: count("LATE"), color: "text-amber-600" },
            { label: "Absent", value: count("ABSENT"), color: "text-red-600" },
            { label: "Half Day", value: count("HALF_DAY"), color: "text-orange-600" },
            { label: "Leave", value: count("LEAVE"), color: "text-blue-600" },
            { label: "Holiday", value: count("HOLIDAY"), color: "text-purple-600" },
        ];
    })();


    const today = getDateKey(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );

    const changeMonth = (direction: number) => {
        setCurrentDate(
            new Date(year, month + direction, 1)
        );
        setSelectedDate(null);
    };

    const monthLabel = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const shortMonthLabel = currentDate.toLocaleDateString("en-US", {
        month: "short",
    });

    return (
        <div className="rounded-xl border bg-white shadow-sm  overflow-hidden " >
            {/* Calendar Header */}
            <div className="flex flex-wrap items-center justify-between gap-4  p-4 sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2.5 text-[#14713e]">
                        <CalendarDays size={22} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Attendance Calendar
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Track your monthly attendance
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changeMonth(-1)}
                        aria-label="Previous month"
                        className="rounded-lg border p-2 transition hover:bg-gray-50"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <span className="min-w-32 text-center text-sm font-semibold">
                        {monthLabel}
                    </span>

                    <button
                        onClick={() => changeMonth(1)}
                        aria-label="Next month"
                        className="rounded-lg border p-2 transition hover:bg-gray-50"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <button
                        onClick={() => {
                            setCurrentDate(new Date());
                            setSelectedDate(null);
                        }}
                        className="rounded-lg bg-[#14713e] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#105b32]"
                    >
                        Today
                    </button>
                </div>
            </div>
            <div className="w-full space-y-6 grid grid-cols-12 ">

                {/* Monthly Statistics */}
                <div className=" bg-white p-4 pb-0 border-t col-span-12 xl:col-span-5 " >
                    <div className="grid grid-cols-3 gap-2 mb-2 ">
                        {stats.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-md flex justify-between border bg-white p-2 shadow-sm"
                            >
                                <p className=" text-xs text-muted-foreground">
                                    {item.label}
                                </p>

                                <p className={`mt-2 text-2xl font-bold ${item.color}`}>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="  max-h-[400px] overflow-y-scroll" >
                        <div className="  h-full " >
                            {
                                calendarDays.map((Day, index) => {

                                    const attendance = attendanceMap.get(getDateKey(year, month, Day));
                                    const status = attendance?.status;
                                    const config = status
                                        ? STATUS_CONFIG[status]
                                        : undefined;

                                    return (<div className="my-0.5 flex border gap-1 rounded-md " key={index} >
                                        <div className="flex flex-col size-12 p-1 justify-center items-center rounded-md bg-green-200 text-green-900 " >
                                            <span className=" text-md font-bold " >{Day.toString().padStart(2, 0)}</span>
                                            <span className=" text-xs" >{shortMonthLabel}</span>
                                        </div>
                                        <div className="flex justify-between items-center w-full ">

                                            <div className="flex items-center w-36 justify-between gap-1 px-1 text-sm text-gray-500">
                                                <LogIn size={22} className="text-[#14713e]" />
                                                <span>{attendance && config ? (attendance.checkIn ?? "--:--") : "--:--"}</span>
                                            </div>

                                            <div className=" w-full" >
                                                <DutyTimeline checkIn={attendance?.checkIn ?? null} checkOut={attendance?.checkOut ?? null} totalDutyHours={8} ></DutyTimeline>
                                            </div>

                                            <div className="flex items-center w-36 justify-between gap-1 px-1 text-sm text-gray-500">
                                                <span>{attendance && config ? (attendance.checkOut ?? "--:--") : "--:--"}</span>
                                                <LogOut size={22} className="text-orange-600" />
                                            </div>

                                        </div>
                                    </div>)
                                })
                            }
                        </div>
                    </div>
                    {/* <div className=" overflow-y-scroll " >
                        {
                            calendarDays.map((Day, index) => {

                                const attendance = attendanceMap.get(getDateKey(year, month, Day));
                                const status = attendance?.status;
                                const config = status
                                    ? STATUS_CONFIG[status]
                                    : undefined;

                                return (<div className="my-0.5 flex border gap-1 rounded-md " key={index} >
                                    <div className="flex flex-col size-12 p-1 justify-center items-center rounded-md bg-green-200 text-green-900 " >
                                        <span className=" text-md font-bold " >{Day.toString().padStart(2, 0)}</span>
                                        <span className=" text-xs" >{shortMonthLabel}</span>
                                    </div>
                                    <div className="flex justify-between items-center w-full ">

                                        <div className="flex items-center w-36 justify-between gap-1 px-1 text-sm text-gray-500">
                                            <LogIn size={22} className="text-[#14713e]" />
                                            <span>{attendance && config ? (attendance.checkIn ?? "--:--") : "--:--"}</span>
                                        </div>

                                        <div className=" w-full" >
                                            <DutyTimeline checkIn={attendance?.checkIn ?? null} checkOut={attendance?.checkOut ?? null} totalDutyHours={8} ></DutyTimeline>
                                        </div>

                                        <div className="flex items-center w-36 justify-between gap-1 px-1 text-sm text-gray-500">
                                            <span>{attendance && config ? (attendance.checkOut ?? "--:--") : "--:--"}</span>
                                            <LogOut size={22} className="text-orange-600" />
                                        </div>

                                    </div>
                                </div>)
                            })
                        }
                    </div> */}
                </div>

                {/* Calendar Container */}
                <div className=" border-t border-l w-full col-span-12 xl:col-span-7 ">

                    {/* Calendar Body */}
                    <div className="p-3 sm:p-6">
                        <div className="grid grid-cols-7 gap-1.5 sm:gap-3">

                            {/* Weekday Names */}
                            {WEEKDAYS.map((day) => (
                                <div
                                    key={day}
                                    className="py-3 text-center text-xs font-semibold text-gray-500 sm:text-sm"
                                >
                                    {day}
                                </div>
                            ))}

                            {/* Calendar Dates */}
                            {calendarDays.map((day, index) => {
                                if (day === null) {
                                    return <div key={`empty-${index}`} />;
                                }

                                const dateKey = getDateKey(year, month, day);
                                const attendance = attendanceMap.get(dateKey);
                                const status = attendance?.status;
                                const config = status
                                    ? STATUS_CONFIG[status]
                                    : undefined;

                                const isToday = dateKey === today;
                                const isSelected = selectedDate === dateKey;

                                return (
                                    <button
                                        key={dateKey}
                                        onClick={() => setSelectedDate(dateKey)}
                                        aria-label={`${dateKey}${status ? `, ${config?.label}` : ", no attendance record"}`}
                                        aria-pressed={isSelected}
                                        className={`group w-full rounded-lg border p-1.5 text-left transition overflow-hidden
                                        ${status ? config?.color : "bg-white"} 
                                        sm:p-3 ${isSelected
                                                ? "border-[#14713e] bg-green-50 ring-1 ring-[#14713e]"
                                                : isToday
                                                    ? "border-green-300 bg-green-50/50 border-2 "
                                                    : "border-gray-100 hover:border-green-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`text-sm font-semibold sm:text-lg ${isToday ? "text-[#14713e]" : "text-gray-700"
                                                    }`}
                                            >
                                                {day.toString().padStart(2, 0)}
                                            </span>

                                            {isToday && (
                                                <span className="hidden text-[10px] font-medium text-[#14713e] sm:block">
                                                    Today
                                                </span>
                                            )}
                                        </div>

                                        {attendance && config ? (
                                            <div className="mt-1 space-y-1.5">
                                                <div className="flex items-center gap-1">
                                                    <span
                                                        className={`h-2 w-2 shrink-0 rounded-full ${config.dot}`}
                                                    />
                                                    <span className="truncate text-[9px] font-semibold sm:text-xs">
                                                        {config.label}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : <div className="mt-1 space-y-1.5">
                                            <div className="flex items-center gap-1">
                                                <span className={`h-2 w-2 shrink-0 rounded-full `} />
                                                <span className="truncate text-[9px] font-semibold sm:text-xs"></span>
                                            </div>
                                        </div>}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Status Legend */}
                        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t pt-5">
                            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                <div key={key} className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
                                    <span className="text-xs text-gray-600">
                                        {config.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// duty pross


interface DutyTimelineProps {
    checkIn: string | null | undefined;
    checkOut: string | null | undefined;
    totalDutyHours?: number;
}

export function DutyTimeline({
    checkIn,
    checkOut,
    totalDutyHours = 9,
}: DutyTimelineProps) {

    if (!checkIn || !checkOut) return <div className="relative w-full ">
        <div className="h-1 w-full rounded-full border-t-2 border-dotted border-gray-500" />
    </div>;

    const toMinutes = (time: string) => {
        const [clock, period] = time.split(" ");
        const [hoursRaw, minutes] = clock.split(":").map(Number);
        let hours = hoursRaw;
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
    };
    const workedMinutes = Math.max(
        0,
        toMinutes(checkOut) - toMinutes(checkIn)
    );
    const totalMinutes = totalDutyHours * 60;
    const progress = Math.min(100, (workedMinutes / totalMinutes) * 100);

    return (
        <div className="relative w-full ">
            <div className="h-1 w-full rounded-full border-t-2 border-dotted border-gray-500" />
            <div
                className="absolute left-0 -top-[1px] h-1 rounded-full bg-green-600"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}