import { IHomePageLayoutProps } from '@/shared/typedefs'

export const HomePageLayout = ({ children }: IHomePageLayoutProps) => {
  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-800">
      <header className="text-3xl font-bold text-white border-black mb-8 text-center">
        To-Do App
      </header>
      <main className="flex flex-col items-center">{children}</main>
      <footer className="text-center text-white mt-8">
        &copy; 2024 To-Do App
      </footer>
    </div>
  );
};
