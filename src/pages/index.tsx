import { trpc } from '../utils/trpc';
import { User } from '@prisma/client'
export default function HomePage() {
    const { data: users } = trpc.userRouter.getUser.useQuery();
  return (
    <>
     <p>hello</p>
     {users?.map((user) => (
        <p key={user.id}>{user.name}</p>
        ))}
    </>
  );
}

