// MyCalendar.jsx
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentForm from "./AppointmentForm";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onLogout }) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("appointments");
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return parsed.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(events));
  }, [events]);


  const handleSelectSlot = (slotInfo) => {
    const { start } = slotInfo;

    const clickedMonth = start.getMonth();
    const currentMonth = selectedDate.getMonth();
    const clickedYear = start.getFullYear();
    const currentYear = selectedDate.getFullYear();

    if (clickedMonth !== currentMonth || clickedYear !== currentYear) {
      alert("Please select a date from the current month only.");
      return;
    }

    if (moment(start).isBefore(moment(), 'day')) {
      alert("Cannot book appointments in the past.");
      return;
    }

    setSelectedDate(start);
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedDate(event.start);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleAddEvent = ({ patientName, time, doctor, date }) => {
    const [hour, minute] = time.split(":").map(Number);

    const start = new Date(date);
    start.setHours(hour, minute);

    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 15);

    const newEvent = {
      id: Date.now(),
      title: `${patientName} - ${time}`,
      start,
      end,
      resource: { time, doctor }
    };

    setEvents((prev) => [...prev, newEvent]);
    setShowForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.start.getTime() === selectedEvent.start.getTime() &&
          event.title === selectedEvent.title && event.id === selectedEvent.id
          ? updatedEvent
          : event
      )
    );

    setSelectedEvent(null);
    setShowForm(false);
  }

  const handleDeleteEvent = () => {
    setEvents((prev) =>
      prev.filter(
        (event) =>
          !(
            event.start.getTime() === selectedEvent.start.getTime() &&
            event.title === selectedEvent.title && event.id === selectedEvent.id
          )
      )
    );
    setSelectedEvent(null);
    setShowForm(false);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const calendarViews = isMobile ? ['day'] : ['month'];

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="block md:hidden mb-4 flex items-center justify-between mb-4 gap-2">

        <input
          type="date"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border px-2 py-1 rounded"
        />

      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        popup
        popupOffset={{ x: 0, y: 20 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onNavigate={(date) => setSelectedDate(date)}
        defaultView={isMobile ? 'day' : 'month'}
        views={calendarViews}
        tooltipAccessor={(event) =>
          `Doctor: ${event.resource.doctor} | Time: ${event.resource.time}`
        }
      />

      {showForm && selectedDate && (
        <AppointmentForm
          selectedDate={selectedDate}
          existingEvent={selectedEvent}
          onClose={() => {
            setShowForm(false);
            setSelectedEvent(null);
          }}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
          allEvents={events}
        />
      )}
    </div>
  );
};

export default MyCalendar;
