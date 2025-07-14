import React, { useState, useEffect } from 'react'

const AppointmentForm = ({
    selectedDate,
    existingEvent,
    onClose,
    onAddEvent,
    onUpdateEvent,
    onDeleteEvent,
    allEvents,
}) => {

    const [patientName, setPatientName] = useState('');
    const [doctor, setDoctor] = useState("Dr. S.K Viswas");
    const [time, setTime] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (existingEvent) {
            setPatientName(existingEvent.title.split(" - ")[0]);
            setTime(existingEvent.resource.time);
            setDoctor(existingEvent.resource.doctor);
            setIsEditing(true);
        } else {
            setPatientName("");
            setTime("");
            setDoctor("Dr. S.K Viswas");
            setIsEditing(false);
        }
    }, [existingEvent]);

    const bookedTimes = allEvents
        .filter(
            (event) =>
                existingEvent !== event &&
                new Date(event.start).toDateString() === new Date(selectedDate).toDateString()
        )
        .map((event) => event.resource.time);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientName || !time || !doctor) {
            alert("All fields are required.");
            return;
        }

        const eventData = {
            patientName,
            time,
            doctor,
            date: selectedDate,
        };

        isEditing ? onUpdateEvent(generateEvent(eventData)) : onAddEvent(eventData);
    };

    const generateEvent = ({ patientName, time, doctor, date }) => {
        const [hour, minute] = time.split(":").map(Number);
        const start = new Date(date);
        start.setHours(hour, minute);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 30);

        return {
            id: Date.now(),
            title: `${patientName} - ${time}`,
            start,
            end,
            resource: { time, doctor },
        };
    };

    return (

        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-96 space-y-4"
            >
                <h2 className="text-xl font-bold">
                    {isEditing ? "Edit Appointment" : "Book Appointment"}
                </h2>
                <p className="text-gray-600">Date: {new Date(selectedDate).toDateString()}</p>

                <label className="block">
                    Patient Name:
                    <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full border rounded px-2 py-1 mt-1"
                    />
                </label>

                <label className="block">
                    Doctor:
                    <select value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="w-full border rounded px-2 py-1 mt-1">
                        <option value="Dr. S.K Viswas">S.K Viswas</option>
                        <option value="Dr. Haldaar">Haldaar</option>
                        <option value="Dr. Sarwar Alam">Sarwar Alam</option>
                        <option value="Dr. Manas Chandra">Manas Chandra</option>
                        <option value="Dr. Tim Cook">Tim Cook</option>
                        <option value="Dr. Larry Page">Larry Page</option>
                    </select>
                </label>

                <label className="block">
                    Appointment Time:
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border px-2 py-1 mt-1 rounded"
                    >
                        <option value="">Select Time</option>
                        {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"].map((slot) => (
                            <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex justify-between mt-4">
                    <button type="button" onClick={onClose} className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer">
                        Cancel
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onDeleteEvent}
                            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                        >
                            Delete
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
                    >
                        {isEditing ? "Update" : "Book"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AppointmentForm