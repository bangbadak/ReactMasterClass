import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const Chart = ({ coinId }: CharProps) => {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
    return (
        <div>
            {isLoading ? "Loading chart..." : <ApexChart type="line"
                series={[
                    {
                        name: "Price",
                        data: data?.map((price) => price.close) ?? [], //as number[]
                    },

                ]}
                options={{
                    theme: {
                        mode: "dark"
                    },
                    chart: {
                        height: 500,
                        width: 500,
                        toolbar: {
                            show: false,
                        },
                        background: "transparent",
                    },
                    // grid: {
                    //     show: false,
                    // },
                    stroke: {
                        curve: "smooth",
                        width: 4,
                    },
                    xaxis: {
                        labels: { show: false },

                    },
                    yaxis: {
                        show: false,
                        axisBorder: { show: false },
                        axisTicks: { show: false, },
                    }
                }} />}
        </div>
    );
}

export default Chart;