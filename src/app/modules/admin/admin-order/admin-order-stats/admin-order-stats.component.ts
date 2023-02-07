import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartData, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { pl } from 'date-fns/locale';
import { AdminOrderService } from '../admin-order.service';
import { Period } from './model/period';
import { QueryPeriod } from './model/queryPeriod';

@Component({
    selector: 'app-admin-order-stats',
    templateUrl: './admin-order-stats.component.html',
    styleUrls: ['./admin-order-stats.component.scss']
})
export class AdminOrderStatsComponent implements OnInit, AfterViewInit {

    @ViewChild("stats") private stats!: ElementRef;
    formGroup!: FormGroup;
    chart!: Chart;
    ordersCount: number = 0;
    salesSum: number = 0;
    statuses = []; //!: Map <string, string>;
    periods?: string[] = Object.keys(Period).filter(f => isNaN(Number(f)));

    private data = {
        labels: [],
        datasets: [
            {
                label: 'Zamówienia',
                data: [],
                borderColor: '#FF3F7C',
                backgroundColor: '#FF7A9F',
                order: 1,
                yAxisID: 'y'
            },
            {
                label: 'Sprzedaż',
                data: [],
                borderColor: '#0088FF',
                backgroundColor: '#00A1FF ',
                type: 'line',
                order: 0,
                yAxisID: 'y1'
            }
        ]
    } as ChartData;

    constructor(
        private adminOrderService: AdminOrderService,
        private formBuilder: FormBuilder
    ) {
        Chart.register(...registerables);
    }
    ngAfterViewInit(): void {
        this.setupChart();
        this.getSalesStatistics();
    }

    getSalesStatistics() {
        let queryPeriod!: QueryPeriod;
        let from: string;
        let to: string;
        if (this.formGroup.get('chartType')?.value == 'PREDEFINED_PERIOD') {
            queryPeriod = this.specifyPeriod(this.formGroup.get('period')?.value);
            from = queryPeriod.from.toISOString();
            to = queryPeriod.to.toISOString();
        } else {
            from = this.formGroup.get('from')?.value.toISOString();
            to = this.formGroup.get('to')?.value.toISOString();
        }
        //console.log("From:\t" + from + "\nto:\t " + to);
        this.adminOrderService.getSalesStatistics(
            from,
            to,
            this.formGroup.get('orderStatus')?.value
        )
            .subscribe(stats => {
                this.data.labels = stats.placeDate;
                this.data.datasets[0].data = stats.order;
                this.data.datasets[1].data = stats.sale;
                this.chart.update();
                this.ordersCount = stats.ordersCount;
                this.salesSum = stats.salesSum;
            });
    }

    ngOnInit(): void {
        this.getInitData();
        let date = new Date();
        this.formGroup = this.formBuilder.group({
            from: [new Date(date.setDate(1)), Validators.required],
            to: [new Date(), Validators.required],
            orderStatus: ['', Validators.required],
            period: ['', Validators.required],
            chartType: ['CUSTOM_PERIOD', Validators.required]
        })
        this.formGroup.get('orderStatus')?.setValue('COMPLETED');
        this.formGroup.get('period')?.setValue('TODAY');
    }

    getInitData() {
        this.adminOrderService.getInitData()
            .subscribe(data => {
                this.statuses = data.orderStatuses;
            });
    }

    submit() {
        this.getSalesStatistics();
    }

    specifyPeriod(period: string): QueryPeriod {
        let queryPeriod!: QueryPeriod;
        let dateFrom = new Date();
        let dateTo = new Date();
        dateFrom.setUTCHours(0, 0, 0);
        dateTo.setUTCHours(23, 59, 59);
        switch (Period[period as keyof typeof Period]) {
            case Period.TODAY: {
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            case Period.YESTERDAY: {
                dateFrom = new Date(dateFrom.setDate(dateFrom.getDate() - 1));
                dateTo = new Date(dateTo.setDate(dateTo.getDate() - 1));
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            case Period.THIS_WEEK: {
                queryPeriod = {
                    from: new Date(dateFrom.setDate(dateFrom.getDate() - dateFrom.getDay() + 1)),
                    to: dateTo
                };
                break;
            }
            case Period.LAST_WEEK: {
                dateFrom = new Date(dateFrom.setDate(dateFrom.getDate() - dateFrom.getDay() - 6));
                dateTo = new Date(dateTo.setDate(dateTo.getDate() - dateTo.getDay() + 1));
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            case Period.THIS_MONTH: {
                queryPeriod = {
                    from: new Date(dateFrom.setDate(1)),
                    to: dateTo
                };
                break;
            }
            case Period.LAST_MONTH: {
                dateFrom.setMonth(dateFrom.getMonth() - 1);
                dateFrom.setDate(1);
                dateTo = new Date(dateTo.getFullYear(), dateTo.getMonth(), 0, 23, 59, 59);
                queryPeriod = {
                    from: new Date(dateFrom),
                    to: dateTo
                };
                break;
            }
            case Period.THIS_QUARTER: {
                let quarter: number = Math.floor((dateFrom.getMonth() / 3));
                dateFrom.setMonth(quarter * 4);
                dateFrom.setDate(1);
                queryPeriod = {
                    from: dateFrom, //new Date(dateFrom.getFullYear(), dateFrom.getMonth() - quarter + 1, 1, 0, 0, 0),
                    to: dateTo
                };
                break;
            }
            case Period.LAST_QUARTER: {
                let quarter: number = Math.floor((dateFrom.getMonth() / 3));
                dateFrom.setMonth(quarter * 4 - 4);
                dateFrom.setUTCDate(1);
                dateFrom.setUTCHours(0, 0, 0);
                console.log(dateFrom.toDateString());
                dateTo = new Date(dateFrom.getFullYear(), dateFrom.getMonth() + 4, 0, 23, 59, 59);
                dateTo.setUTCHours(23, 59, 59)
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            case Period.THIS_YEAR: {
                //dateFrom = new Date(dateFrom.getFullYear(), 0, 1, 0, 0, 0);
                dateFrom.setUTCMonth(0);
                dateFrom.setUTCDate(1);
                dateFrom.setUTCHours(0, 0, 0);
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            case Period.LAST_YEAR: {
                dateFrom.setUTCFullYear(dateFrom.getUTCFullYear()-1);
                dateFrom.setUTCMonth(0);
                dateFrom.setUTCDate(1);
                dateTo = new Date(dateFrom);
                dateTo.setUTCMonth(11);
                dateTo.setUTCDate(31);
                queryPeriod = {
                    from: dateFrom,
                    to: dateTo
                };
                break;
            }
            default:
                throw new Error(`Non-existent period in switch: ${period}`);
        }
        return queryPeriod;

    }

    setupChart() {
        this.chart = new Chart(this.stats.nativeElement, {
            type: 'bar',
            data: this.data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Wykres sprzedaży'
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        display: true,
                        offset: true,
                        time: {
                            unit: 'day',
                            round: 'day'
                        },
                        adapters: {
                            date: {
                                locale: pl,
                            },
                        },
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        // grid line settings
                        grid: {
                            drawOnChartArea: false,
                        }
                    }
                }
            },
        })
    }
}
