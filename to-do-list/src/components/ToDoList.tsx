import { useRecoilValue } from "recoil";
import { toDoState } from '../atoms';
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


const ToDoList = () => {

    const toDos = useRecoilValue(toDoState);


    console.log(toDos);
    return (
        <div>
            <h1>To Dos</h1>
            <hr />
            <CreateToDo />

            <ul>
                {toDos.map(toDo =>
                    <ToDo {...toDo} />
                )}
            </ul>
        </div >
    );
}

export default ToDoList;