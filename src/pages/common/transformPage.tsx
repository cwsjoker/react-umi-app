import ConetntComp from '@/components/business/Content'
const indexPage = () => {

    
    return (
        <>
        <div className="p-10 bg-black">

            <ConetntComp
                angle={5}
                wrapClassName='!w-[100px] !h-[100px]'
                conClassName=" bg-gradient-to-b from-purple-400 to-yellow-500"
            >
                {
                    <div>
                        11111
                    </div>
                }
            </ConetntComp>

            <ConetntComp
                angle={7}
                wrapClassName='mt-10 !w-[200px] !h-[200px]'
                conClassName=" bg-[#f00]"
            >
                {
                    <div>
                        11111
                    </div>
                }
            </ConetntComp>

            <ConetntComp
                angle={6}
                direction='left'
                wrapClassName='mt-10'
                conClassName=" bg-[linear-gradient(205deg,rgba(197,47,255,0.4)_30.6%,rgba(249,136,55,0.00)_101.86%)] gb before:bg-cbdd before:rounded-[inherit] "
                childConClassName=" gbbb before:bg-cbdd"
            >
                {
                    <div className='pb-10 -mt-10'>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                        <div>123</div>
                    </div>
                }
            </ConetntComp>
        </div>
        </>
    )
}

export default indexPage



