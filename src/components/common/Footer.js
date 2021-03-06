import React from 'react';
import { Container } from 'reactstrap';
import { config } from '../../utils/config';

const currentYear = new Date().getFullYear();

export const Footer = () => (
    <footer>
        <Container className="pt-3">
            <hr />
            <div className="d-flex justify-content-between">
                <p>
                    &copy;{' '}
                    <a href="https://www.chrispoulter.com">Chris Poulter</a>{' '}
                    {currentYear}
                </p>
                <p>v{config.VERSION}</p>
            </div>
        </Container>
    </footer>
);
