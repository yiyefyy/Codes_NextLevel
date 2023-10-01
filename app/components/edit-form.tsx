"use client";

import { useState } from "react";
import LoadingDots from "./loading-dots";
import { Select, SelectItem, DatePicker, NumberInput } from "@tremor/react";
import { useEffect } from "react";

export default function EditForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    description: "",
    date: new Date(),
    capacity:"",
    status:"Open"
  });

  const [date, setDate] = useState(new Date())
  const [type, setType] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ["eventType"]: type,
      ["date"]: date
    }));
  };

  useEffect(() => {
      setFormData((prevData) => ({
          ...prevData,
          ["eventType"]: type,
          ["date"]: date
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
      className="flex flex-col space-y-4 bg-white px-2 pb-4 pt-2 sm:px-16"
    >
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