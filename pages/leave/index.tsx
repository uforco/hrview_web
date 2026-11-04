import React from 'react'
import { LeaveApplicationForm } from './leaveApplictionform';
import { LeaveBalanceTable } from './LeaveBalanceTable';
import { leaveBalance } from '@/lib/demo.json'
import { LeaveHistory } from './LeaveHistory';


function Index() {

    return <div className=' w-full  grid grid-cols-6 gap-4 p-4 '>
        <LeaveApplicationForm className=' col-span-3 ' ></LeaveApplicationForm>
        <LeaveBalanceTable data={leaveBalance} className=' col-span-3 ' ></LeaveBalanceTable>
        <LeaveHistory className='col-span-6' ></LeaveHistory>
    </div>
}

export default Index
