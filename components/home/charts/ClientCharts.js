import { useEffect, useReducer } from "react";
import PocketBase from "pocketbase";
import PieChart, {
  Series,
  Label,
  Legend,
  Size,
  Export,
} from "devextreme-react/pie-chart";
import OverviewCard from "../OverviewCard";
import { Tooltip } from "devextreme-react";

export default function ClientCharts() {
  const [clientsGender, dispatchClientGender] = useReducer(
    (state, action) => {
      return action.reduce(
        (prevValue, currValue) => {
          if (currValue.sexe === "masculin") prevValue[0].counter++;
          else prevValue[1].counter++;
          return prevValue;
        },
        [
          { gender: "Males", counter: 0 },
          { gender: "Females", counter: 0 },
        ]
      );
    },
    [
      { gender: "Males", counter: 0 },
      { gender: "Females", counter: 0 },
    ]
  );
  useEffect(() => {
    (async () => {
      const pb = new PocketBase("http://127.0.0.1:8090");

      const clients = await pb.collection("clients").getFullList({
        batch: "-1",
      });
      dispatchClientGender(clients);
    })();
  });
  return (
    <div className="d-flex" style={{ height: "400px" }}>
      <PieChart dataSource={clientsGender} title="Clients Gender Breakdown">
        <Series argumentField="gender" valueField="counter">
          <Label visible={true}></Label>
        </Series>
        <Size width={400} />
        <Export enabled={true} />
        <Tooltip enabled />
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          itemTextPosition="right"
          rowCount={1}
        />
      </PieChart>
      <div className="" style={{ width: "20%" }}>
        <OverviewCard
          title={"Total Males Clients"}
          value={clientsGender[0].counter}
        />
        <OverviewCard
          title={"Total Females Clients"}
          value={clientsGender[1].counter}
        />
      </div>
      <h1>IDK WHAT TO POST HERE HEHE</h1>
    </div>
  );
}
