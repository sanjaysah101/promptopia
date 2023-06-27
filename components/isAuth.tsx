// hoc/withAuth.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component) {
    return function ProtectedRoute({ ...props }) {
        const { data: session } = useSession();
        const router = useRouter();
        // const user = JSON.parse(session.user.id);
        const userIsAuthenticated = session?.user.id;

        useEffect(() => {
            if (!userIsAuthenticated) {
                router.push('/');
            }
        }, [userIsAuthenticated, router]);

        return <Component {...props} />;
    };
}
