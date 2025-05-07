import { Link } from "react-router-dom"

const LocationSection = () => {
    return (
        <div>
            <section className="text-gray-600 body-font mb-10 px-10">
                <div className="container px-5 mx-auto">
                    <div className="flex justify-center my-12">
                        <h1 className='text-4xl px-1 text-center text-white bg-pink-800'>VISIT OUR STORES</h1>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="mb-8 object-cover object-center inline-block border-2 border-gray-200 bg-gray-100" src="https://riyaasat.in/cdn/shop/files/varoda_87646c36-963f-4b15-9aef-3779c1e1b0b7.jpg?v=1714488669&width=600" />
                                <p className="leading-relaxed mb-7 text-lg">RIYAASAT VADODARA</p>
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">1st Floor, Gamthi Complex, BPC Rd, Vadodara, Gujarat 390020</h2>
                                <button className="my-5 text-white bg-pink-800 px-3 py-2 rounded transition delay-150 duration-300 ease-in-out hover:scale-110"><Link target="_blank" to="https://maps.app.goo.gl/KgkELRwg3wewADYc9">Location More</Link></button>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className=" mb-8 object-cover object-center inline-block border-2 border-gray-200 bg-gray-100" src="https://riyaasat.in/cdn/shop/files/DSC01492_copy.jpg?v=1700211921&width=600" />
                                <p className="leading-relaxed mb-7 text-lg">RIYAASAT BRIDAL</p>
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">GF-3, Iscon Arcade, Chimanlal Girdharlal Rd,<br /> Ahmedabad, Gujarat 380006</h2>
                                <button className="my-5 text-white bg-pink-800 px-3 py-2 rounded transition delay-150 duration-300 ease-in-out hover:scale-110"><Link target="_blank" to="https://maps.app.goo.gl/KgkELRwg3wewADYc9">Location More</Link></button>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="mb-8 object-cover object-center inline-block border-2 border-gray-200 bg-gray-100" src="https://riyaasat.in/cdn/shop/files/DSC01297-HDR_a003ecc8-33a1-402c-ba65-120820727e4e.jpg?v=1714750108&width=600" />
                                <p className="leading-relaxed mb-7 text-lg">RIYAASAT GROOM</p>
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">GF/1, Time Square, Nr Parisima complex, C G Road, Ahmedabad</h2>
                                <button className="my-5 text-white bg-pink-800 px-3 py-2 rounded transition delay-150 duration-300 ease-in-out hover:scale-110"><Link target="_blank" to="https://maps.app.goo.gl/KgkELRwg3wewADYc9">Location More</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LocationSection