import { AddEdit } from 'components/postgres';
import { userPostgresService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const user = await userPostgresService.getById(params.id);

    return {
        props: { user }
    }
}