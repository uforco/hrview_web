import { PersonalInfoCard } from '@/components/employee/personalInfoCard'
import { personalInfo, attendance, leaveBalance } from '@/lib/demo.json'
import { AttendanceCard } from './AttendanceCard';
import { LeaveBalanceCard } from './LeaveBalanceCard';
import AttendanceCalendar, { type Attendance } from './attendance-calendar';
import { attendanceData as _attendanceData } from '@/lib/demo.json';
import { Suspense } from 'react';

const attendanceData = _attendanceData as Attendance[];



function Dashboard() {

    return (
        <div className=' grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-4 relative  ' >
            <PersonalInfoCard className=' w-full md:max-w-sm  md:sticky top-16 h-fit ' data={personalInfo} />
            <div className='grid grid-cols-6  gap-4 w-full'>
                <div className=" col-span-6 lg:col-span-3 2xl:col-span-2 " >
                    <AttendanceCard className='' attendance={attendance} />
                </div>
                <div className="col-span-6 lg:col-span-3 2xl:col-span-2 " >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className=' w-full col-span-6  ' >
                    <Suspense fallback={''}>
                        <AttendanceCalendar data={attendanceData} ></AttendanceCalendar>
                    </Suspense>
                </div>
                <div className=' col-span-6 md:col-span-3 2xl:col-span-2 2xl:row-start-1 2xl:col-start-5' >
                    <LeaveBalanceCard data={leaveBalance} />
                </div>
                <div className="col-span-6 lg:col-span-3 2xl:col-span-2" >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className="col-span-6 lg:col-span-3 2xl:col-span-2" >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className="col-span-6 lg:col-span-3 2xl:col-span-2" >
                    <AttendanceCard attendance={attendance} />
                </div>
            </div>
        </div>

    )
}

export default Dashboard
