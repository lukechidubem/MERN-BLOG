import { useEffect, useState } from "react";

//custom HOOK
const useFetch = (url) => {
  //useState hooks
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        //Catching errors
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch Aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 2000);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
