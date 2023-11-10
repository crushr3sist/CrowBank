import useDarkMode from "use-dark-mode";
import NavBar from "../navbar";

const ThemeProvider = ({ MainPage }: any) => {
  const darkMode = useDarkMode(false);

  return (
    <>
      <NavBar />
      <div
        className={`${
          darkMode.value ? "dark" : ""
        } text-foreground bg-background h-screen w-screen flex justify-center items-center flex-col`}
      >
        {MainPage}
      </div>
    </>
  );
};

export default ThemeProvider;
