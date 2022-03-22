import { AddEdit } from 'components/user-frontend';
import { userFrontendService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const user = await userFrontendService.getById(params.id);

    return {
        props: { user }
    }
}