import { auth } from '@/auth';

interface Props {}
const SettingsPage = async (props: Props) => {
    const session = await auth();
    console.log('🚀 ~ SettingsPage ~ session:', session);
    return <div>a{JSON.stringify(session)}</div>;
};
export default SettingsPage;
