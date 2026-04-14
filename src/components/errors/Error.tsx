import Card from "../common/Card"

function Error() {
    return (
        <>
            <div>
                <Card className="text-center hover:scale-[1.02] cursor-pointer">
                    <div className="text-2xl font-bold text-secondarytext font-mono">
                        Something went wrong
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Error