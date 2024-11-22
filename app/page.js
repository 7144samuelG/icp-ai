"use client";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { NavBar } from "./home/_components/navbar";
import { useEffect } from "react";
import { useAuthContext } from "./stores/authcontext";
import { NFIDProvider, initSatellite, signIn } from "@junobuild/core";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "tcalk-7iaaa-aaaal-arsaq-cai",
      }))();
  }, []);

  const handleRoute = async () => {
    if (!user) {
      await signIn({
        provider: new NFIDProvider({
          appName: "ACME",
          logoUrl: "",
        }),
      });
      router.push("/home");
    }
    router.push("/home");
  };
  return (
    <div>
      <NavBar />
      <div className="px-24 pt-4">
        <div className="flex  flex-col items-center">
          <p className="py-4 text-3xl font-semibold">
            WELCOME TO ACME ARTICLE GENERATOR DAPP
          </p>
          <p className="pb-8">
            Paste your text and Translate your text into over 50 main languages
            in the world and copy it{" "}
          </p>
          {user ? (
            <>
              <Button variant="ghost" onClick={() => router.push("/home")}>
                Get Started
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={handleRoute}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
