import React from 'react'


import { Container } from "react-bootstrap";
import { Image } from "react-bootstrap";
import TableCoin from './TableCoin';

import banner from '../Image/banner2.jpg'

const Inicio = () => {
    return (
        <div >
            <section >
                <Image src={banner} className='img-fluid' style={{height: '350px', width: '100%', objectFit: 'cover' }}/>
            </section>
            <section className='mt-5 mb-5 pt-5 pb-1 px-5 shadow w-100' style={{ backgroundColor: '#121212' }}>
                <div>
                    <h4 className='fw-bold' >Top <span style={{ color: 'rgb(97, 136, 255)' }}>50</span> monedas</h4>
                </div>
            </section>
            <section className='px-3' >
                <TableCoin />
            </section>
        </div>
    )
}

export default Inicio