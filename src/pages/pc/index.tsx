

const IndexPage = () => {
    const menu_1 = [1, 2, 3, 4, 5, 6, 7, 8]
    const menu_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    return (
        <div className=" flex pad:flex-col">
            <div className="w-[80px] flex flex-col pad:w-full pad:flex-row bg-[#f00]">
                {
                    menu_1.map((item: any) => {
                        return (
                            <div className="w-[80px] h-[80px] flex justify-center items-center bg-[#fff]">{item}</div>
                        )
                    })
                }
            </div>
            <div className="flex-1 bg-[#0f0] p-10 grid grid-cols-2 gap-8 pad:grid-cols-5">
                {
                    menu_2.map((item) => {
                        return (
                            <div className="flex justify-center items-center bg-[#fff]">{item}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default IndexPage;