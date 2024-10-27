import { Metadata } from 'next';
import { ButtonGroup } from '@/components/button-group';
import { ButtonLink } from '@/components/button-link';
import {
    Jumbotron,
    JumbotronBody,
    JumbotronTitle
} from '@/components/jumbotron';

export const metadata: Metadata = {
    title: 'Not Found'
};

export default function NotFound() {
    return (
        <Jumbotron>
            <JumbotronTitle>Not Found</JumbotronTitle>
            <JumbotronBody>
                Sorry, the resource you were looking for could not be found.
            </JumbotronBody>
            <ButtonGroup>
                <ButtonLink href="/" size="lg">
                    Home
                </ButtonLink>
            </ButtonGroup>
        </Jumbotron>
    );
}
