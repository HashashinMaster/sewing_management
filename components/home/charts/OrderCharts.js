import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
  Export,
  Tooltip,
} from "devextreme-react/chart";
import { useEffect, useReducer } from "react";
import styles from "@/styles/Home.module.css";
import OverviewCard from "@/components/home/OverviewCard";
import PocketBase from "pocketbase";
export default function OrderCharts(params) {
  const [thisYearMonthData, dispatchMonths] = useReducer((state, action) => {
    const months = [
      {
        month: "1",
        income: 20000,
      },
      {
        month: "2",
        income: 1000,
      },
      {
        month: "3",
        income: 10000,
      },
      {
        month: "4",
        income: 200000,
      },
      {
        month: "5",
        income: 0,
      },
      {
        month: "6",
        income: 0,
      },
      {
        month: "7",
        income: 0,
      },
      {
        month: "8",
        income: 0,
      },
      {
        month: "9",
        income: 0,
      },
      {
        month: "10",
        income: 0,
      },
      {
        month: "11",
        income: 0,
      },
      {
        month: "12",
        income: 0,
      },
    ];
    action.map((order) => {
      const month = months.find(
        (month) => order.created.slice(6, 7) === month.month
      );
      if (month)
        month.income +=
          parseInt(order.quantity) + parseInt(order.price_per_unit);
    });

    return months;
  }, []);
  const [orderIncomes, disptachOrderIncomes] = useReducer(
    (state, action) => {
      const totalIncome = action.reduce(
        (prevValue, currValue) =>
          parseInt(currValue.quantity) * parseInt(currValue.price_per_unit) +
          prevValue,
        0
      );
      return {
        totalIncome,
      };
    },
    { totalIncome: 0 }
  );
  const [completedOrders, dispatchCompletedOrders] = useReducer(
    (state, action) => {
      return action.reduce(
        (prevValue, currValue) => {
          if (currValue.completed) {
            prevValue[0].counter++;
          } else {
            prevValue[1].counter++;
          }
          return prevValue;
        },
        [
          {
            status: "completed",
            counter: 0,
          },
          {
            status: "uncompleted",
            counter: 0,
          },
        ]
      );
    }
  );

  useEffect(() => {
    (async () => {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const orders = await pb.collection("orders").getFullList({
        batch: "-1",
        filter: `created >= "${new Date().getFullYear()}"`,
      });
      const allOrders = await pb.collection("orders").getFullList({
        batch: "-1",
      });
      dispatchMonths(orders);
      disptachOrderIncomes(orders);
      dispatchCompletedOrders(allOrders);
    })();
  }, []);
  return (
    <div style={{ display: "flex", gap: "1rem" }} className="mt-5">
      <div style={{ width: "50%" }}>
        <div className={styles.cards_container}>
          <OverviewCard
            title={`Total Orders income in ${new Date().getFullYear()}`}
            value={orderIncomes.totalIncome}
            format={"currency"}
          />
        </div>
        <Chart dataSource={thisYearMonthData}>
          <CommonSeriesSettings
            argumentField="month"
            valueField="income"
            type="bar"
            ignoreEmptyPoints={true}
          />
          <SeriesTemplate nameField="month" />
          <Title
            text="Month Orders Income Breakdown"
            subtitle={`as of ${new Date().getFullYear()}`}
          />
          <Tooltip
            enabled={true}
            format={{
              style: "currency",
              currency: "MAD",
            }}
          />
          <Export enabled={true} />
        </Chart>
      </div>
      <Chart dataSource={completedOrders} width={"49%"}>
        <CommonSeriesSettings
          argumentField="status"
          valueField="counter"
          type="bar"
          ignoreEmptyPoints={true}
        />
        <SeriesTemplate nameField="status" />
        <Title text="Orders Status Breakdown" subtitle={`All Orders`} />
        <Tooltip enabled={true} />
        <Export enabled={true} />
      </Chart>
    </div>
  );
}
