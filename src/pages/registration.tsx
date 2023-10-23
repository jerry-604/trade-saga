import { trpc } from "../utils/trpc";

export default function Registration() {
  const mutation = trpc.userRouter.createUser.useMutation();
  const testHandler = () => {
    const name = 'Romulus' + Math.floor(Math.random() * 100000);
    const Fname = 'Rom';
    const Lname = 'Ulus';
    const email = `rom${Math.floor(Math.random() * 100000)}@rom.rom`;
    const password = 'TestPassword';
    const result = mutation.mutate({ name, Fname, Lname, email, password });
    console.log(result);
  };
  return <div>
    <p>This will be the registration page</p>
    <form>
      <input type="text" placeholder="Email"></input>
      <input type="text" placeholder="Username"></input>
      <input type="text" placeholder="First Name"></input>
      <input type="text" placeholder="Last Name"></input>
      <input type="password" placeholder="password"></input>
      <input type="password" placeholder="password"></input>
      <button onClick={testHandler} type="submit">Submit</button>
    </form>
  </div>;
}