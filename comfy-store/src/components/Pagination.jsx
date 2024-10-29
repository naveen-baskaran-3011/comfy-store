import { useCallback } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

export default function Pagination({ currentPage, pageCount }) {
    const navigate = useNavigate();
    const { search, pathname } = useLocation();

    const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

    const onPageClick = useCallback((page) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set('page', page);
        navigate(`${pathname}?${searchParams.toString()}`);
    }, []);

    return (<div>
        <div className="join">
            <button
                className='btn btn-xs sm:btn-md join-item'
                onClick={() => {
                    let prevPage = currentPage - 1;
                    if (prevPage < 1) prevPage = pageCount;
                    onPageClick(prevPage);
                }}>
                Prev
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageClick(page)}
                    className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}>
                    {page}
                </button>
            ))}
            <button
                className='btn btn-xs sm:btn-md join-item'
                onClick={() => {
                    let prevPage = currentPage + 1;
                    if (prevPage > pageCount) prevPage = pageCount;
                    onPageClick(prevPage);
                }}>
                Next
            </button>
        </div>
    </div>);
}