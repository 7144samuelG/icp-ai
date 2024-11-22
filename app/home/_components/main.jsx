import { Copy, SearchCode } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { deleteFilteredDocs, signOut} from "@junobuild/core";
import {
  getDoc,
  initSatellite,
  listDocs,
  setDoc
} from "@junobuild/core";
import { useAuthContext } from "../../stores/authcontext";
import { useRouter } from "next/navigation";
const Main = () => {
  const {user}=useAuthContext();
  const router=useRouter();
  if(!user){
    router.push("/")
  }
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "tcalk-7iaaa-aaaal-arsaq-cai",
      }))();
  }, []);
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "tcalk-7iaaa-aaaal-arsaq-cai",
      }))();
  }, []);
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("");
  const [his, setHis] = useState([]);
  const myId = nanoid();

  useEffect(() => {
    (async () => {
      const { items } = await listDocs({
        collection: "history",
        filter: {
          order: {
            desc: true,
            field: "updated_at",
          },
        },
      });

      setHis(items);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        message: search,
      }),
    });
    const Data = await response.text();
    setResponse(Data);
    await setDoc({
      collection: "history",
      doc: {
        key: myId,
        data: {
          message: search,
          response: Data,
        },
      },
    });
    const { items } = await listDocs({
      collection: "history",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        },
      },
    });
    setHis(items);
    console.log(items, "history");
  };
  const handleClearHistory = async () => {
    await deleteFilteredDocs({
      collection: "history",
      filter: {
        // Same options as filter of listDocs
      },
    });
    const { items } = await listDocs({
      collection: "history",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        },
      },
    });
    setHis(items);
    setResponse("")
  };
  return (
    <div className="flex justify-between w-full h-full">
      <div className="w-1/4 h-full b flex flex-col justify-between pb-3">
        <div className="flex-1">
          <h1 className="underline text-red-500 font-bold text-xl">
            your search history
          </h1>
          <div className="">
            {his.length == 0 ? (
              <p className="py-5 text-sm font-bold">no history found</p>
            ) : (
              <div className="">
                <div className="">
                  {his.map((val, _index) => (
                    <div className="" key={_index}>
                      <p
                        className="text-sm font-medium py-2  oveflow-hidden w-full cursor-pointer hover:underline"
                        onClick={() => setResponse(val.data.response)}
                      >
                        {val.data.message}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="my-2">
                  <Button variant="destructive" onClick={handleClearHistory}>clear history</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="">
          <Button onClick={signOut}>Log out</Button>
        </div>
      </div>
      <div className="flex-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1">
            <p className="font-bold py-4">
              let me write you any article of your choice
            </p>
            <div className="w-full  bg-gray-400 p-3 relative m-3">
              <Copy className="absolute top-1 right-1 cursor-pointer active:text-red-500" />
              <p className="pt-3 text-sm ">{response}</p>
            </div>
          </div>
          <div className="pb-5">
            <div className="px-2">
              <form action="" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="bi rounded-md w-full "
                  />
                  <Button type="submit">
                    <SearchCode />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
