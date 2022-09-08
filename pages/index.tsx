import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import database from "../db";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home: NextPage = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(15);
  const [copied, setCopied] = useState<boolean>(false);

  const changeLength = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLength(Number(e.target.value));
  };

  const generatePassword = () => {
    let newPassword: string = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * database.length);

      const newCharacter = database[randomIndex];

      console.log(newCharacter);
      newPassword += newCharacter;
    }
    console.log(newPassword);

    setPassword(newPassword);
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center flex-col gap-8">
      <h1 className="text-white font-semibold text-3xl">
        Gerador de senha forte
      </h1>
      <div className="flex flex-col items-center w-[300px] bg-white text-black p-12 rounded gap-12">
        <p className="text-xl">{password}</p>
        <input
          className="text-black text-lg border-zinc-300 p-1 border-2 rounded-lg w-16"
          onChange={changeLength}
          type="number"
          value={passwordLength}
        />
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xl font-semibold w-full py-2 rounded pb-3 text-white"
          onClick={generatePassword}
        >
          Gerar
        </button>
        <CopyToClipboard text={password}>
          <button
            onClick={() => {
              setCopied(true);
            }}
            className={`${
              copied
                ? "bg-green-500"
                : "bg-gradient-to-r from-sky-500 to-violet-500"
            } text-xl font-semibold w-full py-2 rounded pb-3 text-white`}
          >
            Copiar
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default Home;
