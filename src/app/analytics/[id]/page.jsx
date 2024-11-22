"use client";
import { useEffect } from "react"
import { useState } from "react"

function page() {
  return (
    <div className="dashboard-container">
        <div className="analytics-container">
        <div className="analytics-component">
        <div> Total Visits:</div>
        <div> 23</div>
        </div>
        <div className="analytics-component">
        <div> See who visits your profile in last 5 mins:</div>
        <div> Click here</div>
        </div>
        </div>
    </div>
  )
}

export default page