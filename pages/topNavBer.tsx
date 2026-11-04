import { cn } from 'cn';

function TopNavBer({
    className
}: { className?: string }) {
    return (
        < div className={cn("fixed w-full z-50 h-12 flex flex-col justify-between ", className)} >
            top nav ber
            <div className='bg-primary px-4 py-1 text-white font-bold ' >Employee Self Service</div>
        </div >
    )
}

export default TopNavBer
