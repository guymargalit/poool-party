import { UserAuthForm } from "@/components/user-auth-form";
import Flamingo from "./components/flamingo";
import Wave from "./components/wave";
import Logo from "./components/logo";

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen bg-[#8fd0fa]">
      <header className="sticky z-10 w-[calc(100%-4rem)] md:w-[calc(100%-12rem)] top-0 flex flex-col h-24 p-4 md:p-8 md:ml-12">
        <div className="flex items-center">
          <Logo className="w-24 md:w-32 fill-white" />
        </div>
      </header>
      <section className="flex flex-col h-96 w-full relative overflow-hidden justify-center items-start">
        <div className="flex flex-col max-w-5xl items-end justify-end z-10 mx-auto w-full h-[300px]">
          <Flamingo className="md:w-56 md:h-56 sm:w-40 sm:h-40 w-32 h-32 animate-[floating_4s_ease-in-out_infinite]" />
        </div>
        <Wave />
      </section>
      <section className="flex flex-col h-screen w-full bg-[#54c0f9]">
        <div className="flex flex-col max-w-xl mx-auto md:mx-12 p-8 z-10">
          <h1 className="text-3xl md:text-5xl md:text-left text-center font-bold text-white">
            Make a Splash.
          </h1>
          <p className="text-md py-3 max-w-lg md:text-left text-center md:text-lg leading-tight md:leading-tight font-medium text-white">
            Automatically split monthly bills and other shared expenses, all
            through Venmo.
          </p>
          <div className="w-full max-w-lg mt-4">
            <UserAuthForm />
          </div>
        </div>
      </section>
      <footer className="flex flex-col h-24 w-full bg-[#54c0f9]">
        <div className="flex flex-col max-w-xl mx-auto md:mx-12 p-8 z-10">
          <p className="text-white">© 2024 Birthday Guy</p>
        </div>
      </footer>
    </main>
  );
}
