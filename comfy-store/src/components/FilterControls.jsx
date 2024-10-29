import { Form, Link } from "react-router-dom";
import { formatPrice } from "../utils";

export default function ({
    companies, selectedCompany,
    categories, selectedCategory,
    selectedSort,
    selectedRange, setSelectedRange }) {
    return (
        <Form className="bg-base-200 py-4 px-8 rounded-md items-center">
            <div className="top-section flex gap-x-4 pb-8">
                <div className="grow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text capitalize">Search product</span>
                        </div>
                        <input type="text" name="search" className="input input-bordered input-sm" />
                    </label>
                </div>
                <div className="grow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text capitalize">Select category</span>
                        </div>
                        <select
                            className='select select-bordered select-sm'
                            defaultValue={selectedCategory}
                            name="category"
                        >
                            {categories.map(category => (
                                <option value={category} key={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="grow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text capitalize">Select company</span>
                        </div>
                        <select
                            className='select select-bordered select-sm'
                            defaultValue={selectedCompany}
                            name="company"
                        >
                            {companies.map(company => (
                                <option value={company} key={company}>{company}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="grow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text capitalize">Sort By</span>
                        </div>
                        <select
                            className='select select-bordered select-sm'
                            defaultValue={selectedSort}
                            name="order"
                        >
                            <option value="a-z">a-z</option>
                            <option value="z-a">z-a</option>
                            <option value="high">high</option>
                            <option value="low">low</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="bottom-section flex gap-x-4">
                <div className="grow">
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text capitalize">Select price</span>
                            <span>{formatPrice(selectedRange)}</span>
                        </div>
                        <input
                            name="price"
                            type="range"
                            step={1000}
                            min={0}
                            max={100000}
                            value={selectedRange}
                            className="range range-sm"
                            onChange={(event) => { setSelectedRange(event.target.value) }} />
                        <div className="flex w-full justify-between text-xs px-2">
                            <span className="font-bold text-md">0</span>
                            <span className="font-bold text-md">Max: $1,000.00</span>
                        </div>
                    </label>
                </div>
                <div className="grow">
                    <label className="form-control items-center">
                        <div className="label">
                            <span className="label-text capitalize">Free shiping</span>
                        </div>
                        <input type="checkbox" name="shipping" className="checkbox checkbox-sm" />
                    </label>
                </div>
                <div className="grow items-center flex">
                    <button className="btn btn-primary btn-sm w-full" type="submit">Search</button>
                </div>
                <div className="grow items-center flex">
                    <Link className="btn btn-accent btn-sm w-full" to="/products">
                        Reset
                    </Link>
                </div>
            </div>
        </Form>
    );
}