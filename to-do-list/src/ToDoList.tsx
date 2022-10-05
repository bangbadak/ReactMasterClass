import React, { useState } from "react";
import { useForm } from 'react-hook-form';

type IForm = {
    errors: {
        email: {
            message: string;
        };
    };
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    password1: string;
    extraError?: string;
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
    const { register, watch, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password1) {
            return setError("password1", {
                message: "Password are not the same",

            }, { shouldFocus: true })
        }
        console.log(data)
        // setError("extraError", {
        //     message: "Server offline.",
        // })
    }
    console.log(errors);
    return (
        <div>

            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span>{errors?.email?.message}</span>
                <input
                    {...register("firstName", {
                        required: "write here",
                        validate: {
                            noNico: (value) =>
                                value.includes("nico") ? "no nicos allowed" : true, //value.includes("nico") || "error message"
                            noNick: (value) =>
                                value.includes("nick") ? "no nicks allowed" : true,


                        }
                    }
                    )}
                    placeholder="First Name"
                />
                <span>{errors?.firstName?.message}</span>
                <input
                    {...register("lastName", { required: "write here" })}
                    placeholder="Last Name"
                />
                <span>{errors?.lastName?.message}</span>
                <input
                    {...register("username", { required: "write here", minLength: 10 })}
                    placeholder="Username"
                />
                <span>{errors?.username?.message}</span>
                <input
                    {...register("password", { required: "write here", minLength: 5 })}
                    placeholder="Password"
                />
                <span>{errors?.password?.message}</span>
                <input
                    {...register("password1", {
                        required: "Password is required",
                    })}
                    placeholder="Password1"
                />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );

}

export default ToDoList;