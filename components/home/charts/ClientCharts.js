import { useEffect, useReducer } from "react";
import PocketBase from "pocketbase";

export default function ClientCharts(params) {
  const [clientsGender, dispatchClientGender] = useReducer((state, action) => {
    return action.reduce(
      (prevValue, currValue) => {
        if (currValue.sexe === "masculin") prevValue[0].Males++;
        else prevValue[1].Females++;
        return prevValue;
      },
      [
        { arg: "Males", Males: 0 },
        { arg: "Females", Females: 0 },
      ]
    );
  }, []);
  useEffect(() => {
    (async () => {
      const pb = new PocketBase("http://127.0.0.1:8090");

      const clients = await pb.collection("clients").getFullList({
        batch: "-1",
      });
      dispatchClientGender(clients);
    })();
  });
  return <div></div>;
}
