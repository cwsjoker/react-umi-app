import ConetntComp from '@/components/business/Content'
const indexPage = () => {

    
    return (
        <>
        <div className="p-10">
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
                angle={10}
                wrapClassName='mt-10'
                conClassName=" border border-[#000] bg-gradient-to-b from-purple-400 to-yellow-500"
                childConClassName=" border-b-[1px] border-b-[#000]"
            >
                {
                    <div className='pd-10'>
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



