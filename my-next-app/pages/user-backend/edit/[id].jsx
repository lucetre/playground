import { AddEdit } from 'components/user-backend';
import { userBackendService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const user = await userBackendService.getById(params.id);

    return {
        props: { user }
    }
}