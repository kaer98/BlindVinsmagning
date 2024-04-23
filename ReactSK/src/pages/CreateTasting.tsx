
import CreateMenuButton from "../components/CreateMenuButton"

function CreateTasting() {

    return (
        <div className="flex flex-col justify-center  items-center">
            <h1 className="font-bold">
                Opret Smagning!
            </h1>
            <div className="m-10 flex flex-row items-center space-x-3 ">
            <CreateMenuButton  imgUrl="https://www.pngrepo.com/png/381632/180/file-create.png">Opret Nu!</CreateMenuButton>
            <CreateMenuButton  imgUrl="https://www.pngrepo.com/png/453407/512/schedule.png">Opret til senere..</CreateMenuButton>
            <CreateMenuButton  imgUrl="https://www.pngrepo.com/png/94821/512/delete.png">Slet smagning</CreateMenuButton>

            </div>

        </div>


    )

}

export default CreateTasting