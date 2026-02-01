import React from 'react';
import type { Metadata } from 'next';
import ProgramClient from './ProgramClient';

export const metadata: Metadata = {
    title: 'Program Kami - Yayasan Panti Asuhan Amanah',
    description: 'Program-program unggulan Yayasan Amanah dalam pendidikan, keagamaan, kesehatan, dan kesejahteraan sosial.',
};

const ProgramPage = () => {
    return <ProgramClient />;
};

export default ProgramPage;
