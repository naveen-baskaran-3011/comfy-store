import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { triggerFlashMessage } from '../utils';

export const action = () => {
    return async({ request }) => {
        const data = await request.formData();
        const formData = Object.fromEntries(data);

        try {
            const res = await fetch('https://strapi-store-server.onrender.com/api/auth/local/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.user_name,
                    email: formData.email,
                    password: formData.password
                })
            });
            triggerFlashMessage({
                message: 'Registered successfully !',
                messageType: 'success'
            });
            return redirect('/login');
        } catch(e) {
            triggerFlashMessage({
                message: 'Error while registering !',
                messageType: 'error'
            });
            console.error(e);
        }
    }
}

export default function Register() {
    return (
        <section className='h-screen grid place-items-center'>
            <Form className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4" method="post">
                <h4 className='text-center text-3xl font-bold'>Register</h4>
                <FormInput
                    label="User name"
                    name='user_name'
                    type='text' />
                <FormInput
                    label="Email"
                    name='email'
                    type='email' />
                <FormInput
                    label="Password"
                    name='password'
                    type='password' />
                <div className='mt-4'>
                    <SubmitBtn text='Register' />
                </div>
                <p className='text-center'>
                    Already a member?
                    <Link
                        to='/login'
                        className='ml-2 link link-hover link-primary capitalize'>
                        Login
                    </Link>
                </p>
            </Form>
        </section>
    )
};