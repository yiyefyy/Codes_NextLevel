"use client";

import { useState } from "react";
import LoadingDots from "./loading-dots";
import { Select, SelectItem, DatePicker, NumberInput, DatePickerValue } from "@tremor/react";
import { useEffect } from "react";
import { createEvent } from "../../pages/api/eventApis";

export default function EventForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventId: parseFloat(""),
    eventName: "",
    eventType: "",
    description: "",
    date: new Date(),
    capacity:parseFloat(""),
    signUps: 0,
    status:"Open",
    image: ""
  });


  const [date, setDate] = useState<DatePickerValue>(new Date());
  const [type, setType] = useState("")

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ["eventType"]: type,
      ["date"]: date as Date
    }));
  };

  const saveChanges = async () => {
    try {
      const updatedEvent = await createEvent(formData);
      console.log('Event updated successfully:', updatedEvent);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error updating event:', error);
    }
  }

  useEffect(() => {
      setFormData((prevData) => ({
          ...prevData,
          ["eventType"]: type,
          ["date"]: date as Date
        }));
      console.log("use effect called")
  }, [date, type])

   return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
 
        console.log(formData)
        setLoading(false);

        }}
      className="flex flex-col space-y-4 bg-white px-2 pb-8 pt-2 sm:px-16"
    >
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          EventId
        </label>
        <NumberInput
          id="eventId"
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          required
          min = {0}
        />
      </div>
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          Event Name
        </label>
        <input
          id="eventName"
          name="eventName"
          type="text"
          value={formData.eventName}
          onChange={handleChange}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2} // Adjust the number of rows as needed
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"

        />
      </div>
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          Image
        </label>
        <textarea
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          rows={1} // Adjust the number of rows as needed
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"

        />
      </div>
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          Type
        </label>
        <Select value={type} onValueChange={setType}>
            <SelectItem value="Workshop">
                Workshop
            </SelectItem>
            <SelectItem value="Activity">
                Activity
            </SelectItem>
        </Select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 uppercase">
          Date
        </label>
        <DatePicker 
            className="mt-1 block w-full appearance-none  placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            id="date"
            value={date}
            enableClear={false}
            onValueChange={setDate}
        />
      </div>
      <div>
        <label
          className="block text-xs text-gray-600 uppercase"
        >
          Capacity
        </label>
        <NumberInput
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          min = {0}
        />
      </div>
      
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        onClick={saveChanges}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>Add</p>
        )}
      </button>
    
      
    </form>
    
  );
}