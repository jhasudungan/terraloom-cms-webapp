"use client"

import { AccountReport, OrderReport } from '@/schema/entity';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { JSX } from 'react';
import {
    HiChartBar,
    HiCheckCircle,
    HiClock,
    HiCreditCard,
    HiExclamation,
    HiUserCircle,
    HiUsers,
    HiXCircle
} from 'react-icons/hi';


interface OrderReportProps {
    orderReport: OrderReport;
    accountReport: AccountReport;
}

const ReportTab = ({ orderReport, accountReport }: OrderReportProps): JSX.Element => {
    
    const orderReportData = [
        {
            icon: HiChartBar,
            label: 'Total',
            value: orderReport.total,
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: HiCheckCircle,
            label: 'Finished',
            value: orderReport.finishedOrder,
            iconColor: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: HiClock,
            label: 'Pending',
            value: orderReport.pendingOrder,
            iconColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        },
        {
            icon: HiCreditCard,
            label: 'Paid',
            value: orderReport.paidOrder,
            iconColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
        },
        {
            icon: HiExclamation,
            label: 'Cancelled',
            value: orderReport.cancelledOrder,
            iconColor: 'text-red-600',
            bgColor: 'bg-red-50'
        },
        {
            icon: HiXCircle,
            label: 'Failed',
            value: orderReport.failedOrder,
            iconColor: 'text-orange-600',
            bgColor: 'bg-orange-50'
        }
    ];

    const accountReportData = [
        {
            icon: HiUsers,
            label: 'Active Account',
            value: accountReport.activeAccount,
            iconColor: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: HiUsers,
            label: 'Inactive Account',
            value: accountReport.inactiveAccount,
            iconColor: 'text-gray-600',
            bgColor: 'bg-gray-50'
        },
        {
            icon: HiUserCircle,
            label: 'Admin Account',
            value: accountReport.adminAccount,
            iconColor: 'text-yellow-600',
            bgColor: 'bg-yellow-50'
        }
    ];

    return (

        <div className="flex flex-col md:flex-row md:justify-between gap-5 mb-5">
            <div className="w-xl bg-white shadow-xl rounded-2xl p-5">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order Report
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="w-16"></TableHeadCell>
                                <TableHeadCell>Order Status</TableHeadCell>
                                <TableHeadCell>Total</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderReportData.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <TableRow
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <TableCell className="w-16">
                                            <div
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.bgColor}`}
                                            >
                                                <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {item.label}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className={`text-lg font-bold ${item.iconColor}`}>
                                                {item.value.toLocaleString()}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </div>
            </div>
            <div className="w-xl bg-white shadow-xl rounded-2xl p-5">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Account Report
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="w-16"></TableHeadCell>
                                <TableHeadCell>Account type</TableHeadCell>
                                <TableHeadCell>Total</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accountReportData.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <TableRow
                                        key={index}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <TableCell className="w-16">
                                            <div
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${item.bgColor}`}
                                            >
                                                <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-900 dark:text-white">
                                            {item.label}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <span className={`text-lg font-bold ${item.iconColor}`}>
                                                {item.value.toLocaleString()}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>

        
    );
};

export default ReportTab;