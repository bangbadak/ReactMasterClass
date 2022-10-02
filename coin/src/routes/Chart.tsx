import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const Chart = ({ coinId }: CharProps) => {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
    return (
        <div>
            {isLoading ? "Loading chart..." :
                <ApexChart type="candlestick"
                    series={[
                        {
                            name: "Price",

                            // data: data?.map((price) => price.close) ?? [], //as number[]
                            // data: data?.map((price) => [price.time_close, price.open, price.high, price.low, price.close]) as any,
                            data: data?.map((price) => ({
                                x: price.time_close * 1000,
                                y: [price.open, price.high, price.low, price.close]
                            })) as any,
                        },

                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            // background: "transparent",
                        },
                        // grid: {
                        //     show: false,
                        // },
                        // stroke: {
                        //     curve: "smooth",
                        //     width: 4,
                        // },
                        xaxis: {
                            // axisBorder: { show: false },
                            // axisTicks: { show: false, },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map((price) => (price.time_close * 1000)),
                        },
                        yaxis: {
                            // show: false,

                            labels: {
                                formatter: (price) => `$${price.toFixed(0)}`,
                                style: {
                                    colors: ['#ffffff'],
                                }
                            },



                        },
                        // fill: {
                        //     type: "gradient",
                        //     gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }
                        // },
                        // colors: ['#0fbcf9'],
                        tooltip: {
                            theme: 'dark',
                            y: {
                                formatter: (value) => `$${value.toFixed(3)}`,
                            }
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    // upward: '#3C90EB',
                                    // downward: '#DF7D46',
                                },
                                wick: {
                                    useFillColor: true,
                                }
                            }
                        }

                    }}
                />}
        </div>
    );
}

export default Chart;