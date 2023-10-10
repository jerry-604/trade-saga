import Sidebar from './sidebar'
export default function Layout({ children }) {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
          <Sidebar />
        <main className="ml-[300px] bg-[#F5F7F9] w-screen">{children}</main>
      </div>
    </main>
  );
}
