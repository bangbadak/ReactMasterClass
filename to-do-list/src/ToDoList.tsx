import React, { useState } from "react";
import { useForm } from 'react-hook-form';

type IFormData = {
    errors: {
        email: {
            message: string;
        };
    };
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// const ToDoList = () => {

//     const [todo, setTodo] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: { value }
//         } = event;
//         setTodo(value);
//     };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(todo);
//     }

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={todo} placeholder="Write a to do" />
//                 <button>Add</button>
//             </form>
//         </div>
//     );
// }

const ToDoList = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<IFormData>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: any) => {
        console.log("data : " + data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("email", {
                        required: "It is required",
                        // minLength: {
                        //     value: 5,
                        //     message: "It's too short"
                        // }
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only for naver users"
                        }
                    })}
                    placeholder="Write a to do" />
                <button>Add</button>
            </form>
            <span>
                {errors?.email?.message}
            </span>
        </div>
    );

}

export default ToDoList;