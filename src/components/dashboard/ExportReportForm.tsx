"use client"
import { Button, Label, Select } from 'flowbite-react';
import { JSX, useState } from 'react';
import DatePicker from 'react-datepicker';
import { HiDocumentReport } from 'react-icons/hi';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const ExportReportForm = (): JSX.Element => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [status, setStatus] = useState("PROCESSED");

    const handleGetReport = async () => {
        
        if (!startDate || !endDate) {
          toast.warn("Please choose the start and end date")
          return  
        }

        const startDateUnix =  Math.floor(startDate.getTime() / 1000);
        const endDateUnix = Math.floor(endDate.getTime() / 1000);

        const params: URLSearchParams = new URLSearchParams({
            'startDate': `${startDateUnix}`,
            'endDate': `${endDateUnix}`,
            'status': `${status}`
        })

        try {
            const res = await fetch(`/api/service/order/export/csv?${params.toString()}`, {
                method: "GET",
            });

            if (!res.ok) {
                toast.error("Failed to export report");
                return;
            }

            // Get the blob (CSV data)
            const blob = await res.blob();

            // Create temporary download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            // Set filename (from backend or fallback)
            const disposition = res.headers.get("content-disposition");
            const match = disposition && disposition.match(/filename="?([^"]+)"?/);
            link.download = match ? match[1] : "orders.csv";

            // Trigger download
            document.body.appendChild(link);
            link.click();
            link.remove();

            // Cleanup
            window.URL.revokeObjectURL(url);
        } catch (error : unknown) {
            console.error(error);
            toast.error("Unexpected error exporting report");
            
        }

    }

    return (

        <div className="flex flex-col md:flex-row md:justify-between gap-5 mb-5">
            <div className="w-xl bg-white shadow-xl rounded-2xl p-5 h-100">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Export Order Report
                    </h3>
                </div>

                <div className='mb-5'>
                    <div className="mb-2">
                        <Label htmlFor="startDate">Start Date</Label>
                    </div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15} // minutes step
                        timeCaption="Time"
                        className="w-50 px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    text-sm text-gray-700"
                        popperClassName="z-50"
                        calendarClassName="rounded-lg border border-gray-200 shadow-lg bg-white p-2"
                    />
                </div>

                <div className='mb-5'>
                    <div className="mb-2">
                        <Label htmlFor="endDate">End Date</Label>
                    </div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy hh:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15} // minutes step
                        timeCaption="Time"
                        className="w-50 px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    text-sm text-gray-700"
                        popperClassName="z-50"
                        calendarClassName="rounded-lg border border-gray-200 shadow-lg bg-white p-2"
                    />
                </div>

                <div className='mb-5'>
                    <div className="mb-2">
                        <Label htmlFor="status">Status</Label>
                    </div>
                    <Select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="w-50"
                    >
                        <option value="PROCESSED">PROCESSED</option>
                        <option value="FINISHED">FINISHED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="PENDING PAYMENT">PENDING PAYMENT</option>
                        <option value="PAYMENT RECEIVED">PAYMENT RECEIVED</option>
                    </Select>
                </div>

                <Button className="w-50" onClick={()=> handleGetReport()}><HiDocumentReport className='mr-2'/> Generate Report</Button>

            </div>
        </div>

    );
};

export default ExportReportForm;