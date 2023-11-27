import Sidebar from './sidebar';

export default function Layout({ children }: { children: any }) {
  return (
    <div className="flex h-screen">
      <div className="flex-none w-[350px]">
        <Sidebar />
      </div>
      <main className="flex-grow bg-[#F5F7F9] overflow-auto">
        {children}
      </main>
    </div>
  );
}
