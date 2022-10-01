import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: number;
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
            {isLoading ? "Loading chart..." :
                <ApexChart type="line"
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
                        grid: {
                            show: false,
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false, },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => (price.time_close * 1000)),
                        },
                        yaxis: {
                            show: false,

                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }
                        },
                        colors: ['#0fbcf9'],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(3)}`,
                            }
                        }
                    }}
                />}
        </div>
    );
}

export default Chart;