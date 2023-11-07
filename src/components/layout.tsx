import Sidebar from './sidebar'
export default function Layout({ children }: {children: any}) {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1">
          <Sidebar />
        <main className="ml-[350px] bg-[#F5F7F9] w-screen">{children}</main>
      </div>
    </main>
  );
}
