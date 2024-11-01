import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { SubmitBtn, FormInput } from "../components";
import { login } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { triggerFlashMessage } from "../utils";

export const action = (store) => {
    return async ({ request }) => {
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        try {
            const result = await fetch('https://strapi-store-server.onrender.com/api/auth/local', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res => res.json()).then(loginDetails => {
                store.dispatch(login(loginDetails));
                triggerFlashMessage({
                    message: 'Logged in successfully !',
                    messageType: 'success'
                });
            });
            return redirect('/');
        } catch (e) {
            triggerFlashMessage({
                message: 'Error while loggin you in',
                messageType: 'error'
            });
            console.error(e);
        }
    }
}

const loginAsGuestUser = async (dispatch, navigate) => {

    try {
        const result = await fetch('https://strapi-store-server.onrender.com/api/auth/local', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                identifier: 'test@test.com',
                password: 'secret',
            })
        }).then(res => res.json()).then(loginDetails => {
            dispatch(login(loginDetails));
            triggerFlashMessage({
                message: 'Logged in successfully as Guest !',
                messageType: 'success'
            });
        });
        return navigate('/');
    } catch (e) {
        triggerFlashMessage({
            message: 'Error while logging in successfully as Guest !',
            messageType: 'error'
        });
        console.error(e);
    }
};

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<section className='h-screen grid place-items-center'>
        <Form
            method="post"
            className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
            <h4 className="text-center text-3xl font-bold">Login</h4>
            <FormInput
                label={'Email'}
                type={'email'}
                name={'identifier'} />
            <FormInput
                label={'Password'}
                type={'password'}
                name={'password'} />

            <div className='mt-4'>
                <SubmitBtn text='Login' />
            </div>
            <button type='button' className='btn btn-secondary btn-block' onClick={() => loginAsGuestUser(dispatch, navigate)}>
                Guest user
            </button>
            <p className='text-center'>
                Not a member yet?
                <Link
                    to='/register'
                    className='ml-2 link link-hover link-primary capitalize'>
                    register
                </Link>
            </p>
        </Form>
    </section>);
};