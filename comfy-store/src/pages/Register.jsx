import { Form, Link } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';

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