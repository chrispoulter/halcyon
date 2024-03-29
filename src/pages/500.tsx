import { Meta } from '@/components/Meta/Meta';
import {
    Jumbotron,
    JumbotronBody,
    JumbotronTitle
} from '@/components/Jumbotron/Jumbotron';
import { ButtonGroup } from '@/components/Button/ButtonGroup';
import { ButtonLink } from '@/components/Button/ButtonLink';

const ErrorPage = () => (
    <>
        <Meta title="Error" />

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
    </>
);

export default ErrorPage;
