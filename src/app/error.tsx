'use client';

import { Metadata } from 'next';
import { ButtonGroup } from '@/components/button-group';
import { ButtonLink } from '@/components/button-link';
import {
    Jumbotron,
    JumbotronBody,
    JumbotronTitle
} from '@/components/jumbotron';

export const metadata: Metadata = {
    title: 'Error'
};

export default function Error() {
    return (
        <Jumbotron>
            <JumbotronTitle>Error</JumbotronTitle>
            <JumbotronBody>
                Sorry, something went wrong. Please try again later.
            </JumbotronBody>
            <ButtonGroup>
                <ButtonLink href="/" size="lg">
                    Home
                </ButtonLink>
            </ButtonGroup>
        </Jumbotron>
    );
}
