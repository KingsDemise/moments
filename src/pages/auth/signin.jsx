import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
export default function signin({ providers }) {
  return (
    <main className=" relative min-h-screen bg-gradient-to-tr from-red-200 to-yellow-100">
      <Header />
      <div className="flex justify-center space-x-7 mt-5 ">
        <div className="">
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="flex flex-col items-center">
              <img
                className="object-cover w-9/12 rounded-lg"
                src="https://images.unsplash.com/photo-1555943591-dc21f75b9f44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80"
                alt="moments"
              />
              <h1 className="p-5 head_text text-center">
                <span className="bg-clip-text bg-gradient-to-r from-black to-cyan-600 text-transparent text-center">
                  {" "}
                  Relive It All...
                </span>
              </h1>
              <p className="text-gray-500 p-5 text-center font-bold leading-[1.15]font-extrabold leading-[1.15]">
                Welcome to Moments
              </p>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
