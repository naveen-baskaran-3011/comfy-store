import { Link, useRouteError } from "react-router-dom";

function Error_404() {
    return (<main className='grid min-h-[100vh] place-items-center px-8 '>
        <div className="text-center">
            <h1 className="text-9xl font-semibold text-primary">404</h1>
            <h3 className="mt-5 text-4xl font-bold">Page not found</h3>
            <p className="mt-5 text-lg">Sorry, we couldn’t find the page you’re looking for.</p>
            <Link to={'/'} className="mt-5 btn btn-primary">Go back home</Link>
        </div>
    </main>
    );
}

function OtherErrors() {
    return (<main className='grid min-h-[100vh] place-items-center px-8 '>
        <div className="text-center">
            <h3 className="mt-5 text-4xl font-bold">Other error...</h3>
        </div>
    </main>
    );
}

export default function Error() {
    const error = useRouteError();

    if (error.status === 404) {
        return <Error_404 />
    }
    return <OtherErrors />
};