import { PersonalInfoCard } from '@/components/employee/personalInfoCard'
import React from 'react'
import { personalInfo, attendance, leaveBalance } from '@/lib/demo.json'
import { AttendanceCard } from './AttendanceCard';
import { LeaveBalanceCard } from './LeaveBalanceCard';


function Dashboard() {

    return (
        <div className=' grid grid-cols-[280px_minmax(0,1fr)] gap-4 relative  ' >
            <PersonalInfoCard className=' w-full md:max-w-sm  sticky top-16 h-fit ' data={personalInfo} />
            <div className='grid grid-cols-6  gap-4 w-full'>
                <div className=" col-span-6 md:col-span-3 2xl:col-span-2 " >
                    <AttendanceCard className='' attendance={attendance} />
                </div>
                <div className="col-span-6 md:col-span-3 2xl:col-span-2 " >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className=' w-full col-span-6 bg-amber-400 h-96 ' >
                    calendar
                </div>
                <div className=' col-span-6 md:col-span-3 2xl:col-span-2 2xl:row-start-1 2xl:col-start-5' >
                    <LeaveBalanceCard data={leaveBalance} />
                </div>
                <div className="col-span-3" >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className="col-span-3" >
                    <AttendanceCard attendance={attendance} />
                </div>
                <div className="col-span-3" >
                    <AttendanceCard attendance={attendance} />
                </div>
            </div>
        </div>

    )
}

export default Dashboard
